import { Request, Response } from 'express';
import db from '../config/db'; // Import MySQL database connection

class OrgController {

    async getOptions(req: Request, res: Response): Promise<void> {
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
                p.project_id, p.project_name, p.customer_id, p.project_manager_id, p.type_of_project_id, 
                p.type_of_engagement_id, p.project_status_id, p.planned_start_date, p.actual_start_date, 
                p.tentative_end_date, p.project_description,
                u.user_first_name AS project_manager_first_name, u.user_last_name AS project_manager_last_name
            FROM master_project p
            LEFT JOIN master_user u ON p.project_manager_id = u.user_id
            WHERE p.is_deleted = 0
        `;
        
            const projectDeliverablesQuery = `
        SELECT 
            pd_id, customer_id, project_id, project_deliverable_name 
        FROM master_project_deliverables WHERE is_deleted = 0
        `;

        const taskCategoryQuery = `
        SELECT 
            task_cat_id, task_category_name 
        FROM master_task_category WHERE is_deleted = 0
        `;

        const projectRoleQuery = `
        SELECT 
            project_role_id, project_role_name, is_deleted, created_at, updated_at
        FROM master_project_role WHERE is_deleted = 0
    `;
    
    const designationQuery = `
    SELECT 
        designation_id, designation_name, is_deleted, created_at, updated_at
    FROM master_designation WHERE is_deleted = 0
`;
    // New query for master_category
    const masterCategoryQuery = `
    SELECT 
        category_id, sector, industry, domain, is_deleted, created_at, updated_at
    FROM master_category WHERE is_deleted = 0
`;



            // Fetch roles, departments, and users in parallel
            const [roles, departments, users, customers, typeOfEngagement, typeOfProject, projectStatus, projects, projectDeliverables, taskCategories, projectRole, designation, masterCategory ] = await Promise.all([
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
                new Promise((resolve, reject) => {
                    db.query(projectDeliverablesQuery, (err: any, results: any) => {
                        if (err) reject(err);
                        resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    db.query(taskCategoryQuery, (err: any, results: any) => {
                        if (err) reject(err);
                        resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    db.query(projectRoleQuery, (err: any, results: any) => {
                        if (err) reject(err) ;
                         resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    db.query(designationQuery, (err: any, results: any) => {
                        if (err) reject(err) ;
                         resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    db.query(masterCategoryQuery, (err: any, results: any) => {
                        if (err) reject(err);
                        resolve(results);
                    });
                }),

            ]);

            // Return roles, departments, and user info in the response
            res.status(200).json({ roles, departments, users, customers, typeOfEngagement, typeOfProject, projectStatus, projects,projectDeliverables,
                taskCategories,projectRole,designation,  masterCategory });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // ---- Customer --------

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

    // ---- Category --------

    async getMasterCategories(req: Request, res: Response): Promise<void> {
        try {
            const query = 'SELECT category_id, sector, industry, domain FROM master_category WHERE is_deleted = 0 ORDER BY category_id DESC';

            db.query(query, (err: any, results: { category_id: number, sector: string, industry: string, domain: string }[]) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({ error: 'Error fetching categories' });
                    return;
                }

                // Group categories into a single array of objects
                const categories = results.map(row => ({
                    category_id: row.category_id, // Ensure this is included
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

    async softDeleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId } = req.params;

            const updateQuery = `UPDATE master_category SET is_deleted = 1 WHERE category_id = ?`;

            db.query(updateQuery, [categoryId], (err: any, result: any) => {
                if (err) {
                    console.error('Error deleting category:', err);
                    return res.status(500).json({ error: 'Error deleting category' });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'category not found' });
                }

                res.status(200).json({ message: 'category soft deleted successfully' });
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async addCategory(req: Request, res: Response): Promise<void> {
        try {
            const { sector, industry, domain } = req.body;

            if (!sector || !industry || !domain) {
                res.status(400).json({ error: 'Sector, Industry, and Domain are required' });
                return;
            }

            // Check if category already exists
            const checkQuery = `
            SELECT category_id FROM master_category 
            WHERE sector = ? AND industry = ? AND domain = ?
            LIMIT 1
        `;

            db.query(checkQuery, [sector, industry, domain], (err: any, results: any) => {
                if (err) {
                    console.error('Error checking existing category:', err);
                    res.status(500).json({ error: 'Database error while checking category' });
                    return;
                }

                if (results.length > 0) {
                    console.log(`Category already exists: ${results[0].category_id}`);
                    res.status(400).json({ error: 'Category already exists' });
                    return;
                }

                // Insert new category
                const insertQuery = `
                INSERT INTO master_category (sector, industry, domain)
                VALUES (?, ?, ?)
            `;

                db.query(insertQuery, [sector, industry, domain], (insertErr: any, result: any) => {
                    if (insertErr) {
                        console.error('Database error:', insertErr);
                        res.status(500).json({ error: 'Error adding category' });
                        return;
                    }

                    res.status(201).json({
                        message: 'Category added successfully',
                        categoryId: result.insertId
                    });
                });
            });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // ----------------------------------------------EMPLOYEE SECTION----------------------------------------------

    // ---- Department --------

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

    // ---- Position --------

    async addProjectRole(req: Request, res: Response): Promise<void> {
        try {
          const { project_role_name } = req.body;
      
          if (!project_role_name) {
            res.status(400).json({ error: 'Project role name is required' });
            return;
          }
      
          const insertQuery = `
            INSERT INTO master_project_role (project_role_name)
            VALUES (?)`;
      
          db.query(insertQuery, [project_role_name], (err: any, result: any) => {
            if (err) {
              console.error('Error adding project role:', err);
              res.status(500).json({ error: 'Error adding project role' });
              return;
            }
            res.status(201).json({ message: 'Project role added successfully', project_role_id: result.insertId });
          });
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      
      async getAllProjectRoles(req: Request, res: Response): Promise<void> {
        try {
          const query = `
            SELECT project_role_id, project_role_name
            FROM master_project_role
            WHERE is_deleted = 0
            ORDER BY project_role_id DESC`;
      
          db.query(query, (err, results) => {
            if (err) {
              console.error('Error fetching project roles:', err);
              return res.status(500).json({ error: 'Error fetching project roles' });
            }
            res.status(200).json(results);
          });
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      
      async softDeleteProjectRole(req: Request, res: Response): Promise<void> {
        try {
          const { projectRoleId } = req.params;
      
          const updateQuery = `UPDATE master_project_role SET is_deleted = 1 WHERE project_role_id = ?`;
      
          db.query(updateQuery, [projectRoleId], (err: any, result: any) => {
            if (err) {
              console.error('Error deleting project role:', err);
              return res.status(500).json({ error: 'Error deleting project role' });
            }
      
            if (result.affectedRows === 0) {
              return res.status(404).json({ error: 'Project role not found' });
            }
      
            res.status(200).json({ message: 'Project role soft deleted successfully' });
          });
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }

          // ---- Designation --------

          async addDesignation(req: Request, res: Response): Promise<void> {
            try {
              const { designation_name } = req.body;
          
              if (!designation_name) {
                res.status(400).json({ error: 'Designation name is required' });
                return;
              }
          
              const insertQuery = `
                INSERT INTO master_designation (designation_name)
                VALUES (?)`;
          
              db.query(insertQuery, [designation_name], (err: any, result: any) => {
                if (err) {
                  console.error('Error adding designation:', err);
                  res.status(500).json({ error: 'Error adding designation' });
                  return;
                }
                res.status(201).json({ message: 'Designation added successfully', designation_id: result.insertId });
              });
            } catch (error) {
              console.error('Error:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          }
          
          async getAllDesignations(req: Request, res: Response): Promise<void> {
            try {
              const query = `
                SELECT designation_id, designation_name
                FROM master_designation
                WHERE is_deleted = 0
                ORDER BY designation_id DESC`;
          
              db.query(query, (err, results) => {
                if (err) {
                  console.error('Error fetching designations:', err);
                  return res.status(500).json({ error: 'Error fetching designations' });
                }
                res.status(200).json(results);
              });
            } catch (error) {
              console.error('Error:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          }
          
          async softDeleteDesignation(req: Request, res: Response): Promise<void> {
            try {
              const { designationId } = req.params;
          
              const updateQuery = `UPDATE master_designation SET is_deleted = 1 WHERE designation_id = ?`;
          
              db.query(updateQuery, [designationId], (err: any, result: any) => {
                if (err) {
                  console.error('Error deleting designation:', err);
                  return res.status(500).json({ error: 'Error deleting designation' });
                }
          
                if (result.affectedRows === 0) {
                  return res.status(404).json({ error: 'Designation not found' });
                }
          
                res.status(200).json({ message: 'Designation soft deleted successfully' });
              });
            } catch (error) {
              console.error('Error:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          }

    // ---- Employee --------

    async addEmployee(req: Request, res: Response): Promise<void> {
        try {
            const {
                user_code, user_first_name, user_middle_name, user_last_name,
                user_email, user_contact, user_password
            } = req.body;
    
            // Default password if not provided
            const password = user_password ? user_password : '123';
    
            // SQL query to insert the new employee into the database
            const query = `
                INSERT INTO master_user (
                    user_code, user_first_name, user_middle_name, user_last_name, 
                    user_email, user_contact, user_password
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
    
            const values = [
                user_code, user_first_name, user_middle_name, user_last_name,
                user_email, user_contact, password
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
    async assignDetails(req: Request, res: Response): Promise<void> {
        try {
            const {
                user_id,
                user_emergency_contact,
                is_passport,
                passport_validity,
                user_current_address,
                user_DOB,
                user_blood_group,
                user_DOJ,
                role_id,
                department_id,
                designation_id, // Added

                is_timesheet_required,
                reporting_manager_id
            } = req.body;
    
            // Validate required fields
            if (!user_id) {
                res.status(400).json({ error: "User ID is required" });
                return;
            }
    
            // Update master_user table with personal details
            const updateMasterUserQuery = `
                UPDATE master_user
                SET 
                    user_emergency_contact = ?,
                    is_passport = ?,
                    passport_validity = ?,
                    user_current_address = ?,
                    user_DOB = ?,
                    user_blood_group = ?,
                    user_DOJ = ?
                WHERE user_id = ?
            `;
    
            const masterUserValues = [
                user_emergency_contact,
                is_passport,
                passport_validity,
                user_current_address,
                user_DOB,
                user_blood_group,
                user_DOJ,
                user_id
            ];
    
            // Execute the update query for master_user
            db.query(updateMasterUserQuery, masterUserValues, (err: any, result: any) => {
                if (err) {
                    console.error("Error updating master_user:", err);
                    res.status(500).json({ error: "Error updating employee details" });
                    return;
                }
    
                // Check if a record already exists in trans_user_details for the given user_id
                const checkRecordQuery = `
                    SELECT * FROM trans_user_details WHERE user_id = ?
                `;
    
                db.query(checkRecordQuery, [user_id], (err: any, result: any) => {
                    if (err) {
                        console.error("Error checking trans_user_details:", err);
                        res.status(500).json({ error: "Error checking trans_user_details" });
                        return;
                    }
    
                    if (result.length > 0) {
                        // Record exists, perform UPDATE
                        const updateTransUserDetailsQuery = `
                            UPDATE trans_user_details
                            SET 
                                role_id = ?,
                                department_id = ?,
                                                            designation_id = ?, 

                                is_timesheet_required = ?,
                                reporting_manager_id = ?
                            WHERE user_id = ?
                        `;
    
                        const updateValues = [
                            role_id,
                            department_id,
                            designation_id,
                            is_timesheet_required,
                            reporting_manager_id,
                            user_id
                        ];
    
                        db.query(updateTransUserDetailsQuery, updateValues, (err: any, result: any) => {
                            if (err) {
                                console.error("Error updating trans_user_details:", err);
                                res.status(500).json({ error: "Error updating trans_user_details" });
                                return;
                            }
                            res.status(200).json({ message: "Details updated successfully" });
                        });
                    } else {
                        // Record does not exist, perform INSERT
                        const insertTransUserDetailsQuery = `
                            INSERT INTO trans_user_details (
                                user_id, role_id, department_id, designation_id, is_timesheet_required, reporting_manager_id
                            )
                        VALUES (?, ?, ?, ?, ?, ?)
                        `;
    
                        const insertValues = [
                            user_id,
                            role_id,
                            department_id,
                            designation_id, 
                            is_timesheet_required,
                            reporting_manager_id
                        ];
    
                        db.query(insertTransUserDetailsQuery, insertValues, (err: any, result: any) => {
                            if (err) {
                                console.error("Error inserting trans_user_details:", err);
                                res.status(500).json({ error: "Error inserting trans_user_details" });
                                return;
                            }
                            res.status(200).json({ message: "Details assigned successfully" });
                        });
                    }
                });
            });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

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
        LEFT JOIN trans_user_details tud ON u.user_id = tud.user_id
        LEFT JOIN master_role r ON tud.role_id = r.role_id
        LEFT JOIN master_department d ON tud.department_id = d.department_id
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
        }
    }

    async getEmployeeDetails(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
    
            // Query to fetch employee details from master_user and trans_user_details
            const query = `
                SELECT 
                    mu.user_id, mu.user_first_name, mu.user_last_name, 
                    mu.user_emergency_contact, mu.is_passport, mu.passport_validity, 
                    mu.user_current_address, mu.user_DOB, mu.user_blood_group, mu.user_DOJ,
                    tud.role_id, tud.department_id, tud.designation_id, tud.is_timesheet_required, tud.reporting_manager_id
                FROM master_user mu
                LEFT JOIN trans_user_details tud ON mu.user_id = tud.user_id
                WHERE mu.user_id = ?
            `;
    
            // Execute the query
            db.query(query, [userId], (err: any, result: any) => {
                if (err) {
                    console.error('Error fetching employee details:', err);
                    return res.status(500).json({ error: 'Error fetching employee details' });
                }
    
                if (result.length === 0) {
                    return res.status(404).json({ error: 'Employee not found' });
                }
    
                // Return the employee details
                res.status(200).json(result[0]);
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    
    
    

    // ---- Skill --------

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

    // ---- Reporting Manager History --------

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

    // ---- project --------

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

    async getAllProjects(req: Request, res: Response): Promise<void> {
        try {
            const query = `
        SELECT 
          p.project_id,
          p.project_name,
          c.customer_name,
          CONCAT(u.user_first_name, ' ', u.user_last_name) AS project_manager,
            p.type_of_project_id, -- Include ID
          tp.project_type_name AS type_of_project,
            p.type_of_engagement_id, -- Include ID

          te.type_of_engagement_name AS type_of_engagement,
            p.project_status_id, -- Include ID

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

    // ---- Project Deliverable --------

    async addProjectDeliverable(req: Request, res: Response): Promise<void> {
        try {
            const { customer_id, project_id, project_deliverable_name } = req.body;

            if (!customer_id || !project_id || !project_deliverable_name) {
                res.status(400).json({ error: 'All fields are required' });
                return;
            }

            const query = `
        INSERT INTO master_project_deliverables 
        (customer_id, project_id, project_deliverable_name, is_deleted) 
        VALUES (?, ?, ?, 0)
      `;

            const values = [customer_id, project_id, project_deliverable_name];

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

    async getProjectDeliverables(req: Request, res: Response): Promise<void> {
        try {
            const query = `
            SELECT 
    mpd.pd_id, 
    mpd.project_deliverable_name,
    mc.customer_name,
    mp.project_name
FROM master_project_deliverables mpd
JOIN master_project mp ON mpd.project_id = mp.project_id
JOIN master_customer mc ON mp.customer_id = mc.customer_id
WHERE mpd.is_deleted = 0
ORDER BY mpd.pd_id DESC;

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

    // ---- Task Category --------

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
