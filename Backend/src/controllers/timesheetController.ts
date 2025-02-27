import { Request, Response } from 'express';
import db from '../config/db'; // Import MySQL database connection


class TimesheetController {
    async submitTimesheet(req: Request, res: Response): Promise<void> {
        try {
            const { user_id, pd_id, task_description, hours, minutes, task_status, task_cat_id } = req.body;
    
            // Validate required fields
            if (!user_id || !pd_id || !task_cat_id || hours === undefined || minutes === undefined || task_status === undefined) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }
    
            const query = `
                INSERT INTO trans_timesheet (user_id, pd_id, task_description, hours, minutes, task_status, task_cat_id, is_deleted, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())`;
    
            db.query(query, [user_id, pd_id, task_description, hours, minutes, task_status, task_cat_id]);
    
            res.status(201).json({ message: 'Timesheet entry submitted successfully' });
        } catch (error) {
            console.error('Error submitting timesheet:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    

   // fethch timesheet
   async getUserTimesheets(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.userId;

        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }

        const query = `
            SELECT 
                t.timesheet_id, 
                t.user_id, 
                t.pd_id, 
                t.task_description,
                m.project_deliverable_name, 
                p.project_name, 
                c.customer_name, 
                tc.task_category_name, 
                t.hours, 
                t.minutes, 
                t.task_status, 
                t.created_at
            FROM trans_timesheet t
            LEFT JOIN master_project_deliverables m ON t.pd_id = m.pd_id
            LEFT JOIN master_project p ON m.project_id = p.project_id
            LEFT JOIN master_customer c ON p.customer_id = c.customer_id
            LEFT JOIN master_task_category tc ON t.task_cat_id = tc.task_cat_id
            WHERE t.is_deleted = 0 AND t.user_id = ?
            ORDER BY t.timesheet_id DESC`;

        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error('Error fetching timesheets:', err);
                return res.status(500).json({ error: 'Error fetching timesheets' });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


   // Soft delete a timesheet entry
   async softDeleteTimesheet(req: Request, res: Response): Promise<void> {
    try {
      const { timesheetId } = req.params;

      const updateQuery = `UPDATE trans_timesheet SET is_deleted = 1 WHERE timesheet_id = ?`;

      db.query(updateQuery, [timesheetId], (err: any, result: any) => {
        if (err) {
          console.error('Error deleting timesheet entry:', err);
          return res.status(500).json({ error: 'Error deleting timesheet entry' });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Timesheet entry not found' });
        }

        res.status(200).json({ message: 'Timesheet entry soft deleted successfully' });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new TimesheetController();