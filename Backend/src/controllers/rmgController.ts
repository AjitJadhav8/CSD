import { Request, Response } from 'express';
import db from '../config/db'; // Import MySQL database connection

class RmgController {


  constructor() {
    // Bind `this` to the class instance
    this.updateAssignTeam = this.updateAssignTeam.bind(this);
  }
  // Delete project team assignment
  async softDeleteProjectTeam(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Check if project team exists
      const checkQuery = `SELECT * FROM trans_project_team WHERE project_team_id = ? AND is_deleted = 0`;
      db.query(checkQuery, [id], (err, results) => {
        if (err) {
          console.error('Database Error:', err);
          res.status(500).json({ error: 'Database Error', details: err.message });
          return;
        }


        // Perform soft delete by updating is_deleted = 1
        const deleteQuery = `UPDATE trans_project_team SET is_deleted = 1, updated_at = NOW() WHERE project_team_id = ?`;

        db.query(deleteQuery, [id], (error) => {
          if (error) {
            console.error('Error deleting project team:', error);
            res.status(500).json({ error: 'Failed to delete project team', details: error.message });
            return;
          }

          res.status(200).json({ message: 'Project team deleted successfully' });
        });
      });

    } catch (error) {
      console.error('Internal Server Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async assignProjectTeam(req: Request, res: Response): Promise<void> {
    try {
      const { customer_id, project_id, employee_id, project_role_id, project_manager_id, start_date, end_date, allocation_status, allocation_percentage, billed_status, billing_percentage } = req.body;

      // Validate required fields
      if (!customer_id || !project_id || !employee_id || !project_role_id || !project_manager_id || !start_date || allocation_status  === undefined  || allocation_percentage === undefined || billed_status === undefined || billing_percentage === undefined) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      // Validate allocation_percentage (must be a number between 0 and 100)
      // Current validation (might reject 0)
      if (isNaN(allocation_percentage) || allocation_percentage < 0 || allocation_percentage > 100) {
        res.status(400).json({ error: 'allocation_percentage must be a number between 0 and 100' });
        return;
      }

      // Validate start_date and end_date (if provided)
      if (end_date && new Date(start_date) > new Date(end_date)) {
        res.status(400).json({ error: 'start_date must be before or equal to end_date' });
        return;
      }

      // Check if the employee is already assigned to the same project
      const checkAssignmentQuery = `
                SELECT COUNT(*) AS assignment_count
                FROM trans_project_team
                WHERE employee_id = ? AND project_id = ? AND is_deleted = 0`;

      db.query(checkAssignmentQuery, [employee_id, project_id], (error, results: any) => {
        if (error) {
          console.error('Database Error:', error);
          res.status(500).json({ error: 'Database Error', details: error.message });
          return;
        }

        const assignmentCount = results[0]?.assignment_count || 0;
        if (assignmentCount > 0) {
          res.status(400).json({ error: 'Employee is already assigned to this project' });
          return;
        }

        // Check current allocation
        this.getEmployeeAllocation(employee_id).then(currentAllocation => {
          console.log(`Current allocation for employee ${employee_id}:`, currentAllocation);
          console.log(`Requested allocation:`, allocation_percentage);

          // Check if the new allocation exceeds 100%
          if (currentAllocation + allocation_percentage > 100) {
            const remainingAllocation = Math.max(0, 100 - currentAllocation);
            res.status(400).json({
              error: `Employee allocation exceeds 100%. Only ${remainingAllocation}% allocation is remaining.`
            });
            return;
          }

          // Insert the new assignment
          const insertQuery = `
                        INSERT INTO trans_project_team 
                        (customer_id, project_id, employee_id, project_role_id, project_manager_id, start_date, end_date, allocation_status, allocation_percentage, billed_status, billing_percentage, is_deleted, created_at, updated_at)
                        VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())`;

          db.query(insertQuery, [customer_id, project_id, employee_id, project_role_id, project_manager_id, start_date, end_date, allocation_status, allocation_percentage, billed_status, billing_percentage],
            (error, result) => {
              if (error) {
                console.error('Database Error:', error);
                res.status(500).json({ error: 'Database Error', details: error.message });
                return;
              }

              console.log('Project Team Insert Result:', result);
              res.status(201).json({ message: 'Project team assigned successfully' });
            });
        }).catch(err => {
          console.error('Error getting employee allocation:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      });

    } catch (error) {
      console.error('Error assigning project team:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }



  // Fetch all assigned project teams
  async getAllProjectTeams(req: Request, res: Response): Promise<void> {
    try {
      const query = `SELECT 
                tpt.project_team_id,
                mc.customer_id, mc.customer_name,
                mp.project_id, mp.project_name,
                mu1.user_id AS employee_id, CONCAT(mu1.user_first_name, ' ', mu1.user_last_name) AS employee_name,
                mpj.project_role_id AS project_role_id, mpj.project_role_name AS project_role_name,
                mu2.user_id AS project_manager_id, CONCAT(mu2.user_first_name, ' ', mu2.user_last_name) AS project_manager_name,
                tpt.start_date,
                tpt.end_date,
                tpt.allocation_status,
                tpt.allocation_percentage,
                tpt.billed_status,
                tpt.billing_percentage
            FROM trans_project_team tpt
            LEFT JOIN master_customer mc ON tpt.customer_id = mc.customer_id
            LEFT JOIN master_project mp ON tpt.project_id = mp.project_id
            LEFT JOIN master_user mu1 ON tpt.employee_id = mu1.user_id
            LEFT JOIN master_project_role mpj ON tpt.project_role_id = mpj.project_role_id
            LEFT JOIN master_user mu2 ON tpt.project_manager_id = mu2.user_id
            WHERE tpt.is_deleted = 0
             ORDER BY tpt.project_team_id DESC`;

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

  // Get Employee Allocation

  async getEmployeeAllocation(employeeId: number, excludeProjectTeamId?: number): Promise<number> {
    return new Promise((resolve, reject) => {
      let query = `
            SELECT COALESCE(SUM(allocation_percentage), 0) AS total_allocation
            FROM trans_project_team
            WHERE employee_id = ? AND is_deleted = 0`;

      const params: any[] = [employeeId];

      // Exclude the current assignment if `excludeProjectTeamId` is provided
      if (excludeProjectTeamId) {
        query += ` AND project_team_id != ?`;
        params.push(excludeProjectTeamId);
      }

      db.query(query, params, (error, results: any) => {
        if (error) {
          console.error('Database Error:', error);
          reject(error);
        } else {
          const totalAllocation = Number(results[0]?.total_allocation) || 0;
          console.log(`Employee ${employeeId} Current Allocation:`, totalAllocation);
          resolve(totalAllocation);
        }
      });
    });
  }

  async updateAssignTeam(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const {
        customer_id, project_id, employee_id, project_role_id,
        start_date, end_date, allocation_status, allocation_percentage,
        billed_status, billing_percentage
      } = req.body;

      console.log('Received Project ID:', project_id);

      // Validate required fields
      if (!customer_id || !project_id || !employee_id || !project_role_id || !start_date || allocation_status=== undefined || allocation_percentage === undefined || billed_status === undefined || billing_percentage === undefined) {
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

      // Check if the employee is already assigned to the same project (excluding the current assignment)
      const checkAssignmentQuery = `
            SELECT COUNT(*) AS assignment_count
            FROM trans_project_team
            WHERE employee_id = ? AND project_id = ? AND project_team_id != ? AND is_deleted = 0`;

      db.query(checkAssignmentQuery, [employee_id, project_id, id], (error, results: any) => {
        if (error) {
          console.error('Database Error:', error);
          res.status(500).json({ error: 'Database Error', details: error.message });
          return;
        }

        const assignmentCount = results[0]?.assignment_count || 0;
        if (assignmentCount > 0) {
          res.status(400).json({ error: 'Employee is already assigned to this project' });
          return;
        }

        // Use an arrow function to preserve `this` context
        this.getEmployeeAllocation(employee_id, id).then(currentAllocation => {
          console.log(`Current allocation for employee ${employee_id}:`, currentAllocation);
          console.log(`Requested allocation:`, allocation_percentage);

          // Check if the new allocation exceeds 100%
          if (currentAllocation + allocation_percentage > 100) {
            const remainingAllocation = Math.max(0, 100 - currentAllocation);
            res.status(400).json({
              error: `Employee allocation exceeds 100%. Only ${remainingAllocation}% allocation is remaining.`
            });
            return;
          }

          // Update the assignment
          const updateQuery = `
                UPDATE trans_project_team
                SET
                  customer_id = ?, project_id = ?, employee_id = ?, project_role_id = ?,
                  start_date = ?, end_date = ?, allocation_status = ?, allocation_percentage = ?,
                  billed_status = ?, billing_percentage = ?, updated_at = NOW()
                WHERE project_team_id = ?`;

          db.query(updateQuery, [
            customer_id, project_id, employee_id, project_role_id,
            start_date, end_date, allocation_status, allocation_percentage,
            billed_status, billing_percentage, id
          ], (error, result) => {
            if (error) {
              console.error('Database Error:', error);
              res.status(500).json({ error: 'Database Error', details: error.message });
              return;
            }

            res.status(200).json({ message: 'Assign Team updated successfully' });
          });
        }).catch(err => {
          console.error('Error getting employee allocation:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      });
    } catch (error) {
      console.error('Error updating assign team:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // all teams timesheet

  // Fetch all timesheet entries
  async getAllTimesheets(req: Request, res: Response): Promise<void> {
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
LEFT JOIN master_project_phases mpp ON mpd.phase_id = mpp.phase_id
LEFT JOIN master_project mp ON mpp.project_id = mp.project_id
LEFT JOIN master_customer mc ON mp.customer_id = mc.customer_id
LEFT JOIN master_user pm ON mp.project_manager_id = pm.user_id  -- Joining to get the project manager
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





}

export default new RmgController();
