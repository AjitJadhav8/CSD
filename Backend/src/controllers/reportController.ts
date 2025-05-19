import { Request, Response } from 'express';
import db from '../config/db';

class ReportController {
  async getAllTeamTimesheets(req: Request, res: Response): Promise<void> {
    try {
      const query = `SELECT 
        tt.timesheet_id,
        tt.timesheet_date,
        mu.user_id, 
        CONCAT(mu.user_first_name, ' ', mu.user_last_name) AS user_name,
        mpd.pd_id, 
        mpd.project_deliverable_name,
        tt.task_description,
        tt.hours,
        tt.minutes,
        tt.task_status,
        mpp.phase_id, 
        mpp.project_phase_name,
        mp.project_id,
        mp.project_name,
        mc.customer_id,
        mc.customer_name,
        pm.user_id AS project_manager_id,
        CONCAT(pm.user_first_name, ' ', pm.user_last_name) AS project_manager_name
      FROM trans_timesheet tt
      LEFT JOIN master_user mu ON tt.user_id = mu.user_id
      LEFT JOIN master_project_deliverables mpd ON tt.pd_id = mpd.pd_id
      LEFT JOIN master_project_phases mpp ON tt.phase_id = mpp.phase_id

      LEFT JOIN master_project mp ON mpd.project_id = mp.project_id
      LEFT JOIN master_customer mc ON mpd.customer_id = mc.customer_id
      LEFT JOIN master_user pm ON mp.project_manager_id = pm.user_id
      WHERE tt.is_deleted = 0
      ORDER BY tt.timesheet_id DESC`;

      db.query(query, (error, results) => {
        if (error) {
          console.error('Database Error:', error);
          res.status(500).json({ error: 'Database Error', details: error.message });
          return;
        }
        res.status(200).json(results);
      });
    } catch (error) {
      console.error('Error fetching timesheets:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getReportOptions(req: Request, res: Response): Promise<void> {
    try {
      const queries = {
        users: 'SELECT user_id, user_first_name, user_last_name FROM master_user WHERE is_deleted = 0',
        customers: 'SELECT customer_id, customer_name FROM master_customer WHERE is_deleted = 0',
        projects: 'SELECT project_id, project_name FROM master_project WHERE is_deleted = 0',
        projectDeliverables: 'SELECT pd_id, project_deliverable_name FROM master_project_deliverables WHERE is_deleted = 0',
        projectManagers: `SELECT u.user_id, u.user_first_name, u.user_last_name 
                         FROM master_user u 
                         JOIN master_project p ON u.user_id = p.project_manager_id 
                         WHERE u.is_deleted = 0 GROUP BY u.user_id`,
        phases: 'SELECT phase_id, project_phase_name FROM master_project_phases WHERE is_deleted = 0'
      };

      const results: any = {};
      
      for (const [key, query] of Object.entries(queries)) {
        const data = await new Promise((resolve, reject) => {
          db.query(query, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          });
        });
        results[key] = data;
      }

      res.status(200).json(results);
    } catch (error) {
      console.error('Error fetching report options:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// project team report

async getAllProjectTeams(req: Request, res: Response): Promise<void> {
  try {
    const query = `
      SELECT 
        pt.project_team_id,
        c.customer_id,
        c.customer_name,
        p.project_id,
        p.project_name,
        u.user_id as employee_id,
        CONCAT(u.user_first_name, ' ', u.user_last_name) as employee_name,
        pr.project_role_id,
        pr.project_role_name,
        pm.user_id as project_manager_id,
        CONCAT(pm.user_first_name, ' ', pm.user_last_name) as current_project_manager_name,
        pt.start_date,
        pt.end_date,
        pt.allocation_status,
        pt.allocation_percentage,
        pt.billed_status,
        pt.billing_percentage,
        pt.is_released,
        pt.released_date,
        pt.created_at AS assignment_created_at
      FROM trans_project_team pt
      LEFT JOIN master_customer c ON pt.customer_id = c.customer_id
      LEFT JOIN master_project p ON pt.project_id = p.project_id
      LEFT JOIN master_user u ON pt.employee_id = u.user_id
      LEFT JOIN master_project_role pr ON pt.project_role_id = pr.project_role_id
      LEFT JOIN master_user pm ON p.project_manager_id = pm.user_id
      WHERE pt.is_deleted = 0
      ORDER BY pt.project_team_id DESC
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Database Error', details: error.message });
        return;
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error fetching project teams:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//employee report
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
        d.department_name,
        d.department_id,
        des.designation_name,
        des.designation_id,
        rm.user_id AS reporting_manager_id,
        rm.user_first_name AS reporting_manager_first_name,
        rm.user_last_name AS reporting_manager_last_name,
        u.user_DOJ 
      FROM master_user u
      LEFT JOIN trans_user_details tud ON u.user_id = tud.user_id
      LEFT JOIN master_department d ON tud.department_id = d.department_id
      LEFT JOIN master_designation des ON tud.designation_id = des.designation_id
      LEFT JOIN master_user rm ON tud.reporting_manager_id = rm.user_id
      WHERE u.is_deleted = 0
      ORDER BY u.user_id DESC
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Database Error', details: error.message });
        return;
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//customer report
// In reportController.ts
async getCustomerReport(req: Request, res: Response): Promise<void> {
  try {
    const query = `
      SELECT 
        c.customer_id, 
        c.customer_name, 
        c.customer_company_website, 
        c.customer_email, 
        c.customer_phone, 
        c.is_active, 
        cat.sector, 
        cat.industry, 
        cat.domain, 
        c.is_new, 
        c.customer_city, 
        c.customer_country
      FROM master_customer c
      LEFT JOIN master_category cat ON c.category_id = cat.category_id
      WHERE c.is_deleted = 0
      ORDER BY c.customer_id DESC
    `;

    db.query(query, (err: any, results: any) => {
      if (err) {
        console.error('Error fetching customer report:', err);
        res.status(500).json({ error: 'Error fetching customer report' });
        return;
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// project repoert 
// In reportController.ts
async getProjectReport(req: Request, res: Response): Promise<void> {
  try {
    const query = `
      SELECT 
        p.project_id,
        p.project_name,
        c.customer_name,
        c.customer_id,
        u.user_id AS project_manager_id,
        CONCAT(u.user_first_name, ' ', u.user_last_name) AS project_manager,
        tp.project_type_name AS type_of_project,
        tp.type_of_project_id,
        te.type_of_engagement_name AS type_of_engagement,
        te.type_of_engagement_id,
        ps.status_name AS project_status,
        ps.project_status_id,
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

    db.query(query, (err: any, results: any) => {
      if (err) {
        console.error('Error fetching project report:', err);
        res.status(500).json({ error: 'Error fetching project report' });
        return;
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
}

export default new ReportController();