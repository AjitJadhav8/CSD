import { Request, Response } from 'express';
import db from '../config/db'; // Import MySQL database connection

class RmgController {

    async assignProjectTeam(req: Request, res: Response): Promise<void> {
        try {
            const { customer_id, project_id, employee_id, project_role_id, project_manager_id, start_date, end_date, allocation_status, allocation_percentage } = req.body;

            // Validate required fields
            if (!customer_id || !project_id || !employee_id || !project_role_id || !project_manager_id || !start_date || !allocation_status || allocation_percentage === undefined) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            // Validate allocation_percentage (must be a number between 0 and 100)
            if (isNaN(allocation_percentage) || allocation_percentage < 0 || allocation_percentage > 100) {
                res.status(400).json({ error: 'allocation_percentage must be a number between 0 and 100' });
                return;
            }

            // Validate start_date and end_date (if provided)
            if (end_date && new Date(start_date) > new Date(end_date)) {
                res.status(400).json({ error: 'start_date must be before or equal to end_date' });
                return;
            }

            const query = `
                INSERT INTO trans_project_team 
                (customer_id, project_id, employee_id, project_role_id, project_manager_id, start_date, end_date, allocation_status, allocation_percentage, is_deleted, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())`;

            // Execute the query using a callback function
            db.query(query, [customer_id, project_id, employee_id, project_role_id, project_manager_id, start_date, end_date, allocation_status, allocation_percentage],
                (error, result) => {
                    if (error) {
                        console.error('Database Error:', error);
                        res.status(500).json({ error: 'Database Error', details: error.message });
                        return;
                    }

                    console.log('Project Team Insert Result:', result);
                    res.status(201).json({ message: 'Project team assigned successfully' });
                });

        } catch (error) {
            console.error('Error assigning project team:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

export default new RmgController();
