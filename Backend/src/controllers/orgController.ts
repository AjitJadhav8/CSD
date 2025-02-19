import { Request, Response } from 'express';
import db from '../config/db'; // Import MySQL database connection

class OrgController {
    async getMasterCategories(req: Request, res: Response): Promise<void> {
      try {
        const query = 'SELECT category_id, sector, industry, domain FROM master_category WHERE is_deleted = 0';
        
        db.query(query, (err: any, results: { sector: string, industry: string, domain: string }[]) => {
          if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Error fetching categories' });
            return;
          }
  
          // Group categories into a single array of objects
          const categories = results.map(row => ({
            sector: row.sector,
            industry: row.industry,
            domain: row.domain
          }));
  
          res.json({
            categories
          });
        });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    async createCustomer(req: Request, res: Response): Promise<void> {
        try {
            const { 
                customerName, companyWebsite, email, phone, alternatePhone, status, 
                domain, customerType, city, state, pincode, 
                country, description 
            } = req.body;
    
            // Determine flags for active and new customers
            const isActive = status === 'Active' ? 1 : 0;
            const isNew = customerType === 'Existing' ? 1 : 0;
    
            // Query to get category_id based on selected domain
            const categoryQuery = `
                SELECT category_id FROM master_category 
                WHERE domain = ?
                LIMIT 1
            `;
    
            db.query(categoryQuery, [domain], (err: any, results: any) => {
                if (err) {
                    console.error('Error fetching category ID:', err);
                    res.status(500).json({ error: 'Error fetching category ID' });
                    return;
                }
    
                if (results.length === 0) {
                    console.error(`Category not found for Domain: ${domain}`);
                    res.status(400).json({ error: `Invalid domain: ${domain}` });
                    return;
                }
    
                const categoryId = results[0].category_id; // Get category_id
                console.log(`Fetched Category ID: ${categoryId} for Domain: ${domain}`);
    
                // Insert customer data with retrieved category_id
                const insertQuery = `
                    INSERT INTO master_customer 
                    (
                        customer_name, customer_company_website, customer_email, customer_phone, customer_alternate_phone, 
                        category_id, customer_city, customer_state, customer_pincode, customer_country, 
                        customer_description, is_active, is_new
                    ) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
    
                db.query(insertQuery, [
                    customerName, companyWebsite, email, phone, alternatePhone, 
                    categoryId, city, state, pincode, country, description, isActive, isNew
                ], (insertErr: any, result: any) => {
                    if (insertErr) {
                        console.error('Database error:', insertErr);
                        res.status(500).json({ error: 'Error adding customer' });
                        return;
                    }
    
                    res.status(201).json({ message: 'Customer created successfully', customerId: result.insertId });
                });
            });
    
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    async getCustomers(req: Request, res: Response): Promise<void> {
        try {
            const query = `
                SELECT 
                    c.customer_id, 
                    c.customer_name, 
                    c.customer_company_website, 
                    c.customer_email, 
                    c.customer_phone, 
                    c.customer_alternate_phone, 
                    c.is_active, 
                    cat.sector, 
                    cat.industry, 
                    cat.domain, 
                    c.is_new, 
                    c.customer_city, 
                    c.customer_state, 
                    c.customer_pincode, 
                    c.customer_country, 
                    c.customer_description
                FROM master_customer c
                LEFT JOIN master_category cat ON c.category_id = cat.category_id
                WHERE c.is_deleted = 0
                ORDER BY c.customer_id DESC
            `;
    
            db.query(query, (err: any, results: any) => {
                if (err) {
                    console.error('Error fetching customers:', err);
                    res.status(500).json({ error: 'Error fetching customers' });
                    return;
                }
    
                res.status(200).json(results);
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // In orgController.ts
async softDeleteCustomer(req: Request, res: Response): Promise<void> {
    try {
        const { customerId } = req.params;

        // Query to update the is_deleted flag to 1 (soft delete)
        const updateQuery = `
            UPDATE master_customer 
            SET is_deleted = 1 
            WHERE customer_id = ?
        `;

        db.query(updateQuery, [customerId], (err: any, result: any) => {
            if (err) {
                console.error('Error updating customer:', err);
                return res.status(500).json({ error: 'Error deleting customer' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Customer not found' });
            }

            res.status(200).json({ message: 'Customer soft deleted successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
    
  // Soft delete a customer domain (set is_deleted = 1)
  async softDeleteDomain(req: Request, res: Response): Promise<void> {
    try {
        const { domainId } = req.params;

        const updateQuery = `UPDATE master_category SET is_deleted = 1 WHERE category_id = ?`;

        db.query(updateQuery, [domainId], (err: any, result: any) => {
            if (err) {
                console.error('Error deleting domain:', err);
                return res.status(500).json({ error: 'Error deleting domain' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Domain not found' });
            }

            res.status(200).json({ message: 'Domain soft deleted successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ----------------------------------------------EMPLOYEE SECTION----------------------------------------------

// Add a new department
async addDepartment(req: Request, res: Response): Promise<void> {
    try {
        const { department_name } = req.body;

        if (!department_name) {
            res.status(400).json({ error: 'Department name is required' });
            return;
        }

        const insertQuery = `
            INSERT INTO master_department (department_name)
            VALUES (?)`;

        db.query(insertQuery, [department_name], (err: any, result: any) => {
            if (err) {
                console.error('Error adding department:', err);
                res.status(500).json({ error: 'Error adding department' });
                return;
            }
            res.status(201).json({ message: 'Department added successfully', department_id: result.insertId });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Add a new position
async addPosition(req: Request, res: Response): Promise<void> {
    try {
        const { position_name } = req.body;

        if (!position_name) {
            res.status(400).json({ error: 'Position name is required' });
            return;
        }

        const insertQuery = `
            INSERT INTO master_position (position_name)
            VALUES (?)`;

        db.query(insertQuery, [position_name], (err: any, result: any) => {
            if (err) {
                console.error('Error adding position:', err);
                res.status(500).json({ error: 'Error adding position' });
                return;
            }
            res.status(201).json({ message: 'Position added successfully', position_id: result.insertId });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


    // Add a new skill
    async addSkill(req: Request, res: Response): Promise<void> {
        try {
            const { skill_name, skill_category, skill_description } = req.body;

            if (!skill_name || !skill_category) {
                res.status(400).json({ error: 'Skill Name and Category are required' });
                return;
            }

            const insertQuery = `
                INSERT INTO master_skill (skill_name, skill_category, skill_description)
                VALUES (?, ?, ?)`;

            db.query(insertQuery, [skill_name, skill_category, skill_description], (err: any, result: any) => {
                if (err) {
                    console.error('Error adding skill:', err);
                    res.status(500).json({ error: 'Error adding skill' });
                    return;
                }
                res.status(201).json({ message: 'Skill added successfully', skill_id: result.insertId });
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

      // Get Roles and Departments
      async getRolesAndDepartments(req: Request, res: Response): Promise<void> {
        try {
            const rolesQuery = 'SELECT role_id, role_name FROM master_role WHERE is_deleted = 0';
            const departmentsQuery = 'SELECT department_id, department_name FROM master_department WHERE is_deleted = 0';
            const usersQuery = `
                SELECT 
                    user_id, user_code, user_first_name, user_middle_name, user_last_name
                FROM master_user WHERE is_deleted = 0
            `;
    
            const customersQuery = `
            SELECT 
                customer_id, customer_name, category_id
            FROM master_customer WHERE is_deleted = 0
            `;
    
            const typeOfEngagementQuery = `
            SELECT 
                type_of_engagement_id, type_of_engagement_name
            FROM master_type_of_engagement WHERE is_deleted = 0
            `;
    
            const typeOfProjectQuery = `
            SELECT 
                type_of_project_id, project_type_name
            FROM master_type_of_project WHERE is_deleted = 0
            `;
    
            const projectStatusQuery = `
            SELECT 
                project_status_id, status_name
            FROM master_project_status WHERE is_deleted = 0
            `;
    
            const projectQuery = `
            SELECT 
                project_id, project_name, customer_id, project_manager_id, type_of_project_id, type_of_engagement_id, project_status_id, planned_start_date, actual_start_date, 
                tentative_end_date, project_description
            FROM master_project WHERE is_deleted = 0
            `;
    
            // Fetch roles, departments, and users in parallel
            const [roles, departments, users, customers, typeOfEngagement, typeOfProject, projectStatus, projects] = await Promise.all([
                new Promise((resolve, reject) => {
                    db.query(rolesQuery, (err: any, results: any) => {
                        if (err) reject(err);
                        resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    db.query(departmentsQuery, (err: any, results: any) => {
                        if (err) reject(err);
                        resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    db.query(usersQuery, (err: any, results: any) => {
                        if (err) reject(err);
                        resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    db.query(customersQuery, (err: any, results: any) => {
                        if (err) reject(err);
                        resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    db.query(typeOfEngagementQuery, (err: any, results: any) => {
                        if (err) reject(err);
                        resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    db.query(typeOfProjectQuery, (err: any, results: any) => {
                        if (err) reject(err);
                        resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    db.query(projectStatusQuery, (err: any, results: any) => {
                        if (err) reject(err);
                        resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    db.query(projectQuery, (err: any, results: any) => {
                        if (err) reject(err);
                        resolve(results);
                    });
                }),
            ]);
    
            // Return roles, departments, and user info in the response
            res.status(200).json({ roles, departments, users, customers, typeOfEngagement, typeOfProject, projectStatus, projects });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    

      // Method to add a new employee
      async addEmployee(req: Request, res: Response): Promise<void> {
        try {
            const { 
                user_code, user_first_name, user_middle_name, user_last_name, 
                user_email, user_contact, user_emergency_contact, role_id, department_id, 
                is_passport, passport_validity, user_current_address, user_DOB, 
                user_blood_group, user_DOJ 
            } = req.body;

            // SQL query to insert the new employee into the database
            const query = `
                INSERT INTO master_user (
                    user_code, user_first_name, user_middle_name, user_last_name, 
                    user_email, user_contact, user_emergency_contact, role_id, department_id, 
                    is_passport, passport_validity, user_current_address, user_DOB, 
                    user_blood_group, user_DOJ
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            const values = [
                user_code, user_first_name, user_middle_name, user_last_name, 
                user_email, user_contact, user_emergency_contact, role_id, department_id, 
                is_passport, passport_validity, user_current_address, user_DOB, 
                user_blood_group, user_DOJ
            ];

            // Insert the data into the database
            db.query(query, values, (err: any, result: any) => {
                if (err) {
                    console.error('Error saving employee:', err);
                    return res.status(500).json({ error: 'Error saving employee' });
                }
                res.status(201).json({ message: 'Employee saved successfully', employeeId: result.insertId });
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

// Method to get all employees with explicit column names
async getAllEmployees(req: Request, res: Response): Promise<void> {
    try {
        const query = `
        SELECT 
            u.user_id,
            u.user_code,
            u.user_first_name,
            u.user_middle_name,
            u.user_last_name, 
            u.user_email, 
            u.user_contact, 
            u.user_emergency_contact, 
            r.role_name, 
            d.department_name,
            u.is_passport, 
            u.passport_validity, 
            u.user_current_address, 
            u.user_DOB, 
            u.user_blood_group, 
            u.user_DOJ 
        FROM master_user u
        LEFT JOIN master_role r ON u.role_id = r.role_id
        LEFT JOIN master_department d ON u.department_id = d.department_id
        WHERE u.is_deleted = 0
        ORDER BY u.user_id DESC 
    `; // Explicitly mention each column name

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching employees:', err);
                return res.status(500).json({ error: 'Error fetching employees' });
            }
            res.status(200).json(results);  // Return the result as JSON
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Method to get all departments from master_department table
async getAllDepartments(req: Request, res: Response): Promise<void> {
    try {
        const query = `
    SELECT department_id, department_name
    FROM master_department
    WHERE is_deleted = 0
    ORDER BY department_id DESC  
`;  // Fetch all departments
        
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching departments:', err);
                return res.status(500).json({ error: 'Error fetching departments' });
            }
            res.status(200).json(results);  // Return the result as JSON
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async getAllPositions(req: Request, res: Response): Promise<void> {
    try {
        const query = `
    SELECT position_id, position_name
    FROM master_position
    WHERE is_deleted = 0
    ORDER BY position_id DESC  
`;

        
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching positions:', err);
                return res.status(500).json({ error: 'Error fetching positions' });
            }
            res.status(200).json(results);  // Return the result as JSON
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async getAllSkills(req: Request, res: Response): Promise<void> {
    try {
        const query = `
    SELECT skill_id, skill_name, skill_category, skill_description
    FROM master_skill
    WHERE is_deleted = 0
    ORDER BY skill_id DESC  
`;  // Fetch all skills
        
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching skills:', err);
                return res.status(500).json({ error: 'Error fetching skills' });
            }
            res.status(200).json(results);  // Return the result as JSON
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }




}

async softDeleteDepartment(req: Request, res: Response): Promise<void> {
    try {
        const { departmentId } = req.params;

        const updateQuery = `UPDATE master_department SET is_deleted = 1 WHERE department_id = ?`;

        db.query(updateQuery, [departmentId], (err: any, result: any) => {
            if (err) {
                console.error('Error deleting department:', err);
                return res.status(500).json({ error: 'Error deleting department' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Department not found' });
            }

            res.status(200).json({ message: 'Department soft deleted successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Soft delete a position by ID
async softDeletePosition(req: Request, res: Response): Promise<void> {
    try {
        const { positionId } = req.params;

        const updateQuery = `UPDATE master_position SET is_deleted = 1 WHERE position_id = ?`;

        db.query(updateQuery, [positionId], (err: any, result: any) => {
            if (err) {
                console.error('Error deleting position:', err);
                return res.status(500).json({ error: 'Error deleting position' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Position not found' });
            }

            res.status(200).json({ message: 'Position soft deleted successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Soft delete a skill by ID
async softDeleteSkill(req: Request, res: Response): Promise<void> {
    try {
        const { skillId } = req.params;

        const updateQuery = `UPDATE master_skill SET is_deleted = 1 WHERE skill_id = ?`;

        db.query(updateQuery, [skillId], (err: any, result: any) => {
            if (err) {
                console.error('Error deleting skill:', err);
                return res.status(500).json({ error: 'Error deleting skill' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Skill not found' });
            }

            res.status(200).json({ message: 'Skill soft deleted successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// soft delete a employee by ID
async softDeleteEmployee(req: Request, res: Response): Promise<void> {
    try {
        const { employeeId } = req.params;

        const updateQuery = `UPDATE master_user SET is_deleted = 1 WHERE user_id = ?`;

        db.query(updateQuery, [employeeId], (err: any, result: any) => {
            if (err) {
                console.error('Error deleting employee:', err);
                return res.status(500).json({ error: 'Error deleting employee' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Employee not found' });
            }

            res.status(200).json({ message: 'Employee soft deleted successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }}

    

    async addReportingManagerHistory(req: Request, res: Response): Promise<void> {
        const { employee_id, reporting_manager_id, from_date, till_date } = req.body;
    
        const query = `
          INSERT INTO trans_reporting_manager_history 
          (employee_id, reporting_manager_id, from_date, till_date)
          VALUES (?, ?, ?, ?)`;
    
        const values = [employee_id, reporting_manager_id, from_date, till_date];
    
        try {
          db.query(query, values, (err, results) => {
            if (err) {
              console.error('Error inserting reporting manager history:', err);
              return res.status(500).json({ error: 'Error inserting reporting manager history' });
            }
            res.status(201).json({ message: 'Reporting Manager history added successfully' });
          });
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      
      async getReportingManagerHistory(req: Request, res: Response): Promise<void> {
        try {
            const query = `
                SELECT 
                    trm.reporting_manager_history_id, 
                    trm.employee_id, 
                    trm.reporting_manager_id, 
                    trm.from_date, 
                    trm.till_date, 
                    trm.is_deleted, 
                    emp.user_first_name AS employee_first_name, 
                    emp.user_last_name AS employee_last_name, 
                    manager.user_first_name AS manager_first_name, 
                    manager.user_last_name AS manager_last_name 
                FROM trans_reporting_manager_history trm
                LEFT JOIN master_user emp ON trm.employee_id = emp.user_id
                LEFT JOIN master_user manager ON trm.reporting_manager_id = manager.user_id
                WHERE trm.is_deleted = 0
                ORDER BY trm.reporting_manager_history_id DESC
            `;
    
            db.query(query, (err, results) => {
                if (err) {
                    console.error('Error fetching reporting manager history:', err);
                    return res.status(500).json({ error: 'Error fetching reporting manager history' });
                }
                console.log('Fetched reporting manager history:', results);  // Add this log
                res.status(200).json(results);  // Return the result as JSON
            });
            
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    // Soft delete a reporting manager history entry
async softDeleteReportingManager(req: Request, res: Response): Promise<void> {
    try {
        const { managerId } = req.params;

        const updateQuery = `UPDATE trans_reporting_manager_history SET is_deleted = 1 WHERE reporting_manager_history_id = ?`;

        db.query(updateQuery, [managerId], (err: any, result: any) => {
            if (err) {
                console.error('Error deleting reporting manager history:', err);
                return res.status(500).json({ error: 'Error deleting reporting manager history' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Reporting manager history entry not found' });
            }

            res.status(200).json({ message: 'Reporting manager history entry soft deleted successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Add a new project
async addProject(req: Request, res: Response): Promise<void> {
    try {
        const { 
            customer_id, project_name, planned_start_date, actual_start_date, 
            type_of_project_id, type_of_engagement_id, project_manager_id, 
            project_status_id, tentative_end_date, project_description 
        } = req.body;

        const query = `
            INSERT INTO master_project 
            (
                customer_id, project_name, planned_start_date, actual_start_date, 
                type_of_project_id, type_of_engagement_id, project_manager_id, 
                project_status_id, tentative_end_date, project_description
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            customer_id, project_name, planned_start_date, actual_start_date, 
            type_of_project_id, type_of_engagement_id, project_manager_id, 
            project_status_id, tentative_end_date, project_description
        ];

        db.query(query, values, (err: any, result: any) => {
            if (err) {
                console.error('Error adding project:', err);
                return res.status(500).json({ error: 'Error adding project' });
            }
            res.status(201).json({ message: 'Project added successfully', projectId: result.insertId });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// Fetch all projects
async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
      const query = `
        SELECT 
          p.project_id,
          p.project_name,
          c.customer_name,
          CONCAT(u.user_first_name, ' ', u.user_last_name) AS project_manager,
          tp.project_type_name AS type_of_project,
          te.type_of_engagement_name AS type_of_engagement,
          ps.status_name AS project_status,
          p.planned_start_date,
          p.actual_start_date,
          p.tentative_end_date,
          p.project_description
        FROM master_project p
        LEFT JOIN master_customer c ON p.customer_id = c.customer_id
        LEFT JOIN master_user u ON p.project_manager_id = u.user_id
        LEFT JOIN master_type_of_project tp ON p.type_of_project_id = tp.type_of_project_id
        LEFT JOIN master_type_of_engagement te ON p.type_of_engagement_id = te.type_of_engagement_id
        LEFT JOIN master_project_status ps ON p.project_status_id = ps.project_status_id
        WHERE p.is_deleted = 0
        ORDER BY p.project_id DESC
      `;

      db.query(query, (err, results) => {
        if (err) {
          console.error('Error fetching projects:', err);
          return res.status(500).json({ error: 'Error fetching projects' });
        }
        res.status(200).json(results);
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Soft delete a project by ID
async softDeleteProject(req: Request, res: Response): Promise<void> {
    try {
        const { projectId } = req.params;

        const updateQuery = `UPDATE master_project SET is_deleted = 1 WHERE project_id = ?`;

        db.query(updateQuery, [projectId], (err: any, result: any) => {
            if (err) {
                console.error('Error deleting project:', err);
                return res.status(500).json({ error: 'Error deleting project' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Project not found' });
            }

            res.status(200).json({ message: 'Project soft deleted successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Add a new project deliverable
async addProjectDeliverable(req: Request, res: Response): Promise<void> {
    try {
      const { customer_id, project_id, project_deliverable } = req.body;

      if (!customer_id || !project_id || !project_deliverable) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }

      const query = `
        INSERT INTO master_project_deliverables 
        (customer_id, project_id, project_deliverable, is_deleted) 
        VALUES (?, ?, ?, 0)
      `;

      const values = [customer_id, project_id, project_deliverable];

      db.query(query, values, (err: any, result: any) => {
        if (err) {
          console.error('Error adding project deliverable:', err);
          res.status(500).json({ error: 'Error adding project deliverable' });
          return;
        }
        res.status(201).json({ message: 'Project deliverable added successfully', deliverableId: result.insertId });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// Fetch project deliverables along with project and customer names
async getProjectDeliverables(req: Request, res: Response): Promise<void> {
    try {
        const query = `
            SELECT 
                mpd.pd_id AS project_deliverable_id, 
                mpd.project_deliverable_name,
                mc.customer_name,
                mp.project_name
            FROM master_project_deliverables mpd
            JOIN master_project mp ON mpd.project_id = mp.project_id
            JOIN master_customer mc ON mp.customer_id = mc.customer_id
            WHERE mpd.is_deleted = 0
            ORDER BY mpd.pd_id DESC
        `;

        db.query(query, (err: any, results: any) => {
            if (err) {
                console.error('Error fetching project deliverables:', err);
                res.status(500).json({ error: 'Error fetching project deliverables' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async softDeleteProjectDeliverable(req: Request, res: Response): Promise<void> {
    try {
        const { deliverableId } = req.params;

        const updateQuery = `UPDATE master_project_deliverables SET is_deleted = 1 WHERE pd_id = ?`;

        db.query(updateQuery, [deliverableId], (err: any, result: any) => {
            if (err) {
                console.error('Error deleting project deliverable:', err);
                return res.status(500).json({ error: 'Error deleting project deliverable' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Project deliverable not found' });
            }

            res.status(200).json({ message: 'Project deliverable soft deleted successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
  
 // Add Task Category
 async addTaskCategory(req: Request, res: Response): Promise<void> {
    try {
      const { task_category_name } = req.body;

      if (!task_category_name) {
        res.status(400).json({ error: 'Task category name is required' });
        return;
      }

      const query = `
        INSERT INTO master_task_category (task_category_name, is_deleted) 
        VALUES (?, 0)
      `;

      db.query(query, [task_category_name], (err: any, result: any) => {
        if (err) {
          console.error('Error adding task category:', err);
          res.status(500).json({ error: 'Error adding task category' });
          return;
        }
        res.status(201).json({ message: 'Task category added successfully', taskCategoryId: result.insertId });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }



  // Get All Task Categories
  async getTaskCategories(req: Request, res: Response): Promise<void> {
    try {
      const query = `
        SELECT task_cat_id, task_category_name 
        FROM master_task_category 
        WHERE is_deleted = 0 
        ORDER BY task_cat_id DESC
      `;

      db.query(query, (err: any, results: any) => {
        if (err) {
          console.error('Error fetching task categories:', err);
          res.status(500).json({ error: 'Error fetching task categories' });
          return;
        }
        res.status(200).json(results);
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Soft Delete Task Category
  async softDeleteTaskCategory(req: Request, res: Response): Promise<void> {
    try {
      const { taskCatId } = req.params;

      const updateQuery = `UPDATE master_task_category SET is_deleted = 1 WHERE task_cat_id = ?`;

      db.query(updateQuery, [taskCatId], (err: any, result: any) => {
        if (err) {
          console.error('Error deleting task category:', err);
          return res.status(500).json({ error: 'Error deleting task category' });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Task category not found' });
        }

        res.status(200).json({ message: 'Task category soft deleted successfully' });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }







};
  
  

export default new OrgController();
