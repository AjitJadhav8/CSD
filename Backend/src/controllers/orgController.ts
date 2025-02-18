import { Request, Response } from 'express';
import db from '../config/db'; // Import MySQL database connection

class OrgController {
    async getMasterCategories(req: Request, res: Response): Promise<void> {
      try {
        const query = 'SELECT sector, industry, domain FROM master_category WHERE is_deleted = 0';
        
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

 // Fetch customer domains from master_category
 async getCustomerDomains(req: Request, res: Response): Promise<void> {
    try {
        const query = `
            SELECT category_id, sector, industry, domain 
            FROM master_category 
            WHERE is_deleted = 0 
            ORDER BY category_id DESC`; // Fetch all domains
        db.query(query, (err: any, results: any) => {
            if (err) {
                console.error('Error fetching customer domains:', err);
                res.status(500).json({ error: 'Error fetching customer domains' });
                return;
            }
            res.status(200).json(results); // Send the retrieved data
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




  }
  
  

export default new OrgController();
