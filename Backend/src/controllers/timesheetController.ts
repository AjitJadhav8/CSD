import { Request, Response } from 'express';
import db from '../config/db'; // Import MySQL database connection


class TimesheetController {

//     async getAssignedCustomersAndProjects(req: Request, res: Response): Promise<void> {
//         try {
//             const { employee_id } = req.params; // Assuming you pass the employee_id as a parameter

//             const assignedQuery = `
//                 SELECT 
//   tpt.customer_id, 
//   tpt.project_id, 
//   mc.customer_name, 
//   mp.project_name,
//   mp.customer_id -- Ensure this is included
// FROM trans_project_team tpt
// JOIN master_customer mc ON tpt.customer_id = mc.customer_id
// JOIN master_project mp ON tpt.project_id = mp.project_id
// WHERE tpt.employee_id = ? AND tpt.is_deleted = 0
//             `;

//             db.query(assignedQuery, [employee_id], (err: any, results: any) => {
//                 if (err) {
//                     console.error('Error fetching assigned customers and projects:', err);
//                     res.status(500).json({ error: 'Internal Server Error' });
//                     return;
//                 }

//                 const assignedData = results.reduce((acc: any, row: any) => {
//                     if (!acc.customers.some((c: any) => c.customer_id === row.customer_id)) {
//                         acc.customers.push({ customer_id: row.customer_id, customer_name: row.customer_name });
//                     }
//                     if (!acc.projects.some((p: any) => p.project_id === row.project_id)) {
//                         acc.projects.push({ project_id: row.project_id, project_name: row.project_name, customer_id: row.customer_id });
//                     }
//                     return acc;
//                 }, { customers: [], projects: [] });

//                 res.status(200).json(assignedData);
//             });
//         } catch (error) {
//             console.error('Error:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     }

async getAssignedCustomersAndProjects(req: Request, res: Response): Promise<void> {
    try {
        const { employee_id } = req.params;

        const assignedQuery = `
            SELECT 
                tpt.customer_id, 
                tpt.project_id, 
                mc.customer_name, 
                mp.project_name,
                mp.customer_id
            FROM trans_project_team tpt
            JOIN master_customer mc ON tpt.customer_id = mc.customer_id
            JOIN master_project mp ON tpt.project_id = mp.project_id
            WHERE tpt.employee_id = ? 
            AND tpt.is_deleted = 0 
            AND tpt.is_released = 0`;  // Added is_released = 0 condition

        db.query(assignedQuery, [employee_id], (err: any, results: any) => {
            if (err) {
                console.error('Error fetching assigned customers and projects:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            const assignedData = results.reduce((acc: any, row: any) => {
                if (!acc.customers.some((c: any) => c.customer_id === row.customer_id)) {
                    acc.customers.push({ customer_id: row.customer_id, customer_name: row.customer_name });
                }
                if (!acc.projects.some((p: any) => p.project_id === row.project_id)) {
                    acc.projects.push({ 
                        project_id: row.project_id, 
                        project_name: row.project_name, 
                        customer_id: row.customer_id 
                    });
                }
                return acc;
            }, { customers: [], projects: [] });

            res.status(200).json(assignedData);
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

    async submitTimesheet(req: Request, res: Response): Promise<void> {
        try {
            const { timesheet_date, phase_id, pd_id, task_description, hours, minutes, task_status } = req.body;
            const user_id = (req as any).user?.user_id;

            // Validate required fields
            if (!timesheet_date || !user_id || !phase_id || !pd_id || hours === undefined || minutes === undefined || task_status === undefined) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            const query = `
            INSERT INTO trans_timesheet (timesheet_date, user_id, phase_id, pd_id, task_description, hours, minutes, task_status, is_deleted, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())`;

            db.query(query, [timesheet_date, user_id, phase_id, pd_id, task_description, hours, minutes, task_status]);

            res.status(201).json({ message: 'Timesheet entry submitted successfully' });
        } catch (error) {
            console.error('Error submitting timesheet:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUserTimesheets(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).user?.user_id;
            const date = req.query.date;

            console.log('Fetching timesheets for user:', userId, 'with date:', date);

            if (!userId) {
                res.status(400).json({ error: 'User ID is required' });
                return;
            }

            const query = `
            SELECT 
                t.timesheet_id, 
                t.user_id, 
                t.pd_id, 
                t.phase_id,
                t.task_description,
                pd.project_deliverable_name, 
                p.project_name, 
                p.project_id,
                c.customer_name,
                c.customer_id,
                ph.project_phase_name,
                t.hours, 
                t.minutes, 
                t.task_status, 
                t.timesheet_date
            FROM trans_timesheet t
            LEFT JOIN master_project_deliverables pd ON t.pd_id = pd.pd_id
            LEFT JOIN master_project p ON pd.project_id = p.project_id
            LEFT JOIN master_customer c ON p.customer_id = c.customer_id
            LEFT JOIN master_project_phases ph ON t.phase_id = ph.phase_id
            WHERE t.is_deleted = 0 AND t.user_id = ? 
            ${date ? 'AND DATE(t.timesheet_date) = ?' : 'AND DATE(t.timesheet_date) = CURDATE()'}
            ORDER BY t.timesheet_id DESC`;

            const queryParams = date ? [userId, date] : [userId];

            console.log('Executing query:', query);
            console.log('With params:', queryParams);

            db.query(query, queryParams, (err, results) => {
                if (err) {
                    console.error('Error fetching timesheets:', err);
                    return res.status(500).json({ error: 'Error fetching timesheets' });
                }
                console.log('Query results:', results);
                res.status(200).json(results);
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateTimesheet(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const {
                timesheet_date,
                user_id,
                pd_id,
                phase_id,
                hours,
                minutes,
                task_status,
                task_description
            } = req.body;

            // Validate required fields - same as submit
            if (!timesheet_date || !user_id || !pd_id || !phase_id ||
                hours === undefined || minutes === undefined ||
                task_status === undefined || !task_description) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            // Validate hours and minutes range - same as submit
            if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
                res.status(400).json({ error: 'Invalid hours or minutes value' });
                return;
            }

            // Validate task status is either 0 or 1 - same as submit
            if (task_status !== 0 && task_status !== 1) {
                res.status(400).json({ error: 'Invalid task status' });
                return;
            }

            const updateQuery = `
                UPDATE trans_timesheet
                SET 
                    timesheet_date = ?, 
                    pd_id = ?, 
                    phase_id = ?,
                    hours = ?, 
                    minutes = ?, 
                    task_status = ?, 
                    task_description = ?,
                    updated_at = NOW()
                WHERE timesheet_id = ? AND user_id = ?`;

            db.query(updateQuery, [
                timesheet_date,
                pd_id,
                phase_id,
                hours,
                minutes,
                task_status,
                task_description,
                id,
                user_id
            ], (error: any, result: any) => {
                if (error) {
                    console.error('Database Error:', error);
                    res.status(500).json({ error: 'Database Error', details: error.message });
                    return;
                }

                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Timesheet not found or not owned by user' });
                    return;
                }

                res.status(200).json({ message: 'Timesheet updated successfully' });
            });
        } catch (error) {
            console.error('Error updating timesheet:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Soft delete a timesheet entry
    async softDeleteTimesheet(req: Request, res: Response): Promise<Response> {
        try {
            const userId = (req as any).user?.user_id; // Get user_id from JWT token
            const { timesheetId } = req.params;

            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            if (!timesheetId) {
                return res.status(400).json({ error: 'Timesheet ID is required' });
            }

            const updateQuery = `
            UPDATE trans_timesheet 
            SET is_deleted = 1 
            WHERE timesheet_id = ? AND user_id = ?`;

            return new Promise((resolve, reject) => {
                db.query(updateQuery, [timesheetId, userId], (err: any, result: any) => {
                    if (err) {
                        console.error('Error deleting timesheet entry:', err);
                        reject(res.status(500).json({ error: 'Error deleting timesheet entry' }));
                    }

                    if (result.affectedRows === 0) {
                        resolve(res.status(404).json({ error: 'Timesheet entry not found or does not belong to the user' }));
                    }

                    resolve(res.status(200).json({ message: 'Timesheet entry soft deleted successfully' }));
                });
            });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // ------------------------------------------Export-----------------------------------

    // Fetch full timesheet data
    async getUserFullTimesheet(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).user?.user_id;

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
                mpd.project_deliverable_name, 
                mp.project_id,  
                mp.project_name, 
                mc.customer_id,
                mc.customer_name, 
                mpp.phase_id,
                mpp.project_phase_name,
                t.hours, 
                t.minutes, 
                t.task_status, 
                t.timesheet_date,
                pm.user_id as project_manager_id, 
                CONCAT(pm.user_first_name, ' ', pm.user_last_name) as project_manager_name 
            FROM trans_timesheet t
            LEFT JOIN master_project_deliverables mpd ON t.pd_id = mpd.pd_id
            LEFT JOIN master_project_phases mpp ON mpd.pd_id = mpp.pd_id  /* Changed to join on pd_id */
            LEFT JOIN master_project mp ON mpd.project_id = mp.project_id  /* Changed to join through deliverables */
            LEFT JOIN master_customer mc ON mpd.customer_id = mc.customer_id  /* Changed to join through deliverables */
            LEFT JOIN master_user pm ON mp.project_manager_id = pm.user_id
            WHERE t.is_deleted = 0 
                AND t.user_id = ? 
            ORDER BY t.timesheet_id DESC`;

            db.query(query, [userId], (err, results) => {
                if (err) {
                    console.error('Error fetching full timesheet:', err);
                    return res.status(500).json({ error: 'Error fetching full timesheet' });
                }
                res.status(200).json(results);
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // ----------------------- Managers Hub ---------------------------
    // project.controller.ts

    async getProjectTeamByManager(req: Request, res: Response): Promise<void> {
        try {
            const projectManagerId = parseInt(req.params.projectManagerId);

            if (!projectManagerId) {
                res.status(400).json({ error: 'Project Manager ID is required' });
                return;
            }

            const query = `
      SELECT 
                pt.project_team_id,
                pt.is_released,
                pt.released_date,
                c.customer_name,
                p.project_name,
                CONCAT(pmu.user_first_name, ' ', pmu.user_last_name) AS project_manager_name,
                CONCAT(eu.user_first_name, ' ', eu.user_last_name) AS employee_name,
                pr.project_role_name,
                pt.start_date,
                pt.end_date,
                pt.allocation_status,
                pt.allocation_percentage,
                pt.billed_status
            FROM 
                trans_project_team pt
            JOIN 
                master_customer c ON pt.customer_id = c.customer_id
            JOIN 
                master_project p ON pt.project_id = p.project_id
            JOIN 
                master_user pmu ON p.project_manager_id = pmu.user_id
            JOIN 
                master_user eu ON pt.employee_id = eu.user_id
            JOIN 
                master_project_role pr ON pt.project_role_id = pr.project_role_id
            WHERE 
                pt.is_deleted = 0 
                AND p.project_manager_id = ?
            ORDER BY 
                p.project_name, eu.user_first_name
        `;

            db.query(query, [projectManagerId], (err, results) => {
                if (err) {
                    console.error('Error fetching project team:', err);
                    return res.status(500).json({ error: 'Error fetching project team' });
                }
                res.status(200).json(results);
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // async getProjectTeamByManager(req: Request, res: Response): Promise<void> {
    //     try {
    //         const projectManagerId = parseInt(req.params.projectManagerId);
    //         const { showReleased = false } = req.query; // New parameter
    
    //         if (!projectManagerId) {
    //             res.status(400).json({ error: 'Project Manager ID is required' });
    //             return;
    //         }
    
    //         const query = `
    //         SELECT 
    //             pt.project_team_id,
    //             c.customer_name,
    //             p.project_name,
    //             CONCAT(pmu.user_first_name, ' ', pmu.user_last_name) AS project_manager_name,
    //             CONCAT(eu.user_first_name, ' ', eu.user_last_name) AS employee_name,
    //             pr.project_role_name,
    //             pt.start_date,
    //             pt.end_date,
    //             pt.allocation_status,
    //             pt.allocation_percentage,
    //             pt.billed_status,
    //             pt.is_released,
    //             pt.released_date,
    //             CASE 
    //                 WHEN pt.is_released = 1 THEN 'Released'
    //                 WHEN pt.end_date IS NOT NULL AND pt.end_date < CURDATE() THEN 'Completed'
    //                 ELSE 'Active'
    //             END as assignment_status
    //         FROM 
    //             trans_project_team pt
    //         JOIN 
    //             master_customer c ON pt.customer_id = c.customer_id
    //         JOIN 
    //             master_project p ON pt.project_id = p.project_id
    //         JOIN 
    //             master_user pmu ON p.project_manager_id = pmu.user_id
    //         JOIN 
    //             master_user eu ON pt.employee_id = eu.user_id
    //         JOIN 
    //             master_project_role pr ON pt.project_role_id = pr.project_role_id
    //         WHERE 
    //             pt.is_deleted = 0 
    //             AND p.project_manager_id = ?
    //             ${showReleased ? '' : 'AND pt.is_released = 0'}
    //         ORDER BY 
    //             p.project_name, eu.user_first_name`;
    
    //         db.query(query, [projectManagerId], (err, results) => {
    //             if (err) {
    //                 console.error('Error fetching project team:', err);
    //                 return res.status(500).json({ error: 'Error fetching project team' });
    //             }
    //             res.status(200).json(results);
    //         });
    //     } catch (error) {
    //         console.error('Error:', error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // }

    // Add to your TimesheetController

    // async getProjectTeamsTimesheet(req: Request, res: Response): Promise<void> {
    //     try {
    //         const projectManagerId = parseInt(req.params.projectManagerId);

    //         if (!projectManagerId) {
    //             res.status(400).json({ error: 'Project Manager ID is required' });
    //             return;
    //         }

    //         const query = `
    //         SELECT 
    //         t.timesheet_id,
    //         t.timesheet_date,
    //         CONCAT(u.user_first_name, ' ', u.user_last_name) AS employee_name,
    //         p.project_name,
    //         ph.project_phase_name,
    //         pd.project_deliverable_name,
    //         pd.pd_id,
    //         t.task_description,
    //         t.hours,
    //         t.minutes,
    //         t.task_status,
    //         t.user_id,
    //         p.project_id,
    //         ph.phase_id,
    //         CONCAT(pm.user_first_name, ' ', pm.user_last_name) AS current_project_manager_name
    //     FROM 
    //         trans_timesheet t
    //     JOIN 
    //         master_user u ON t.user_id = u.user_id
    //     JOIN 
    //         master_project_deliverables pd ON t.pd_id = pd.pd_id
    //     JOIN 
    //         master_project_phases ph ON pd.pd_id = ph.pd_id
    //     JOIN 
    //         master_project p ON pd.project_id = p.project_id
    //     JOIN 
    //         master_user pm ON p.project_manager_id = pm.user_id
    //     JOIN 
    //         trans_project_team pt ON pt.employee_id = t.user_id AND pt.project_id = p.project_id
    //     WHERE 
    //         t.is_deleted = 0
    //         AND p.project_manager_id = ?  /* Changed to use current manager */
    //         AND pt.is_deleted = 0
    //     ORDER BY 
    //         t.timesheet_date DESC, u.user_first_name            `;

    //         db.query(query, [projectManagerId], (err, results) => {
    //             if (err) {
    //                 console.error('Error fetching project team timesheets:', err);
    //                 return res.status(500).json({ error: 'Error fetching project team timesheets' });
    //             }
    //             res.status(200).json(results);
    //         });
    //     } catch (error) {
    //         console.error('Error:', error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // }


    
   

    async getReportingTeamByManager(req: Request, res: Response): Promise<void> {
        try {
            const reportingManagerId = parseInt(req.params.reportingManagerId);

            if (!reportingManagerId) {
                res.status(400).json({ error: 'Reporting Manager ID is required' });
                return;
            }

            const query = `
            SELECT 
                pt.project_team_id,
                c.customer_name,
                p.project_name,
                CONCAT(rmu.user_first_name, ' ', rmu.user_last_name) AS reporting_manager_name,
                CONCAT(eu.user_first_name, ' ', eu.user_last_name) AS employee_name,
                pr.project_role_name,
                pt.start_date,
                pt.end_date,
                pt.allocation_status,
                pt.allocation_percentage,
                pt.billed_status
            FROM 
                trans_project_team pt
            JOIN 
                master_customer c ON pt.customer_id = c.customer_id
            JOIN 
                master_project p ON pt.project_id = p.project_id
            JOIN 
                master_user eu ON pt.employee_id = eu.user_id
            JOIN 
                trans_user_details ud ON eu.user_id = ud.user_id
            JOIN 
                master_user rmu ON ud.reporting_manager_id = rmu.user_id
            JOIN 
                master_project_role pr ON pt.project_role_id = pr.project_role_id
            WHERE 
                pt.is_deleted = 0 
                AND ud.is_deleted = 0
                AND ud.reporting_manager_id = ?
            ORDER BY 
                p.project_name, eu.user_first_name
        `;

            db.query(query, [reportingManagerId], (err, results) => {
                if (err) {
                    console.error('Error fetching reporting team:', err);
                    return res.status(500).json({ error: 'Error fetching reporting team' });
                }
                res.status(200).json(results);
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // async getProjectTeamsTimesheet(req: Request, res: Response): Promise<void> {
    //     try {
    //         const projectManagerId = parseInt(req.params.projectManagerId);
    
    //         const query = `
    //         SELECT 
    //             t.timesheet_id,
    //             t.timesheet_date,
    //             CONCAT(u.user_first_name, ' ', u.user_last_name) AS employee_name,
    //             p.project_name,
    //             ph.project_phase_name,
    //             pd.project_deliverable_name,
    //             pd.pd_id,
    //             t.task_description,
    //             t.hours,
    //             t.minutes,
    //             t.task_status,
    //             t.user_id,
    //             p.project_id,
    //             ph.phase_id,
    //             CONCAT(pm.user_first_name, ' ', pm.user_last_name) AS current_project_manager_name,
    //             CASE 
    //                 WHEN EXISTS (
    //                     SELECT 1 FROM trans_project_team pt 
    //                     WHERE pt.employee_id = t.user_id 
    //                     AND pt.project_id = p.project_id 
    //                     AND pt.is_deleted = 0 
    //                     AND pt.is_released = 0
    //                 ) THEN 1
    //                 ELSE 0
    //             END as is_active_assignment
    //         FROM 
    //             trans_timesheet t
    //         JOIN 
    //             master_user u ON t.user_id = u.user_id
    //         JOIN 
    //             master_project_deliverables pd ON t.pd_id = pd.pd_id
    //         JOIN 
    //             master_project_phases ph ON t.phase_id = ph.phase_id
    //         JOIN 
    //             master_project p ON pd.project_id = p.project_id
    //         JOIN 
    //             master_user pm ON p.project_manager_id = pm.user_id
    //         WHERE 
    //             t.is_deleted = 0
    //             AND p.project_manager_id = ?
    //         ORDER BY 
    //             t.timesheet_date DESC, u.user_first_name
    //         `;
    
    //         db.query(query, [projectManagerId], (err, results) => {
    //             if (err) {
    //                 console.error('Error fetching project team timesheets:', err);
    //                 return res.status(500).json({ error: 'Error fetching project team timesheets' });
    //             }
    //             res.status(200).json(results);
    //         });
    //     } catch (error) {
    //         console.error('Error:', error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // }
    async getProjectTeamsTimesheet(req: Request, res: Response): Promise<void> {
    try {
        const projectManagerId = parseInt(req.params.projectManagerId);

        // Query for aggregated data (totals by employee and date)
        const aggregatedQuery = `
        SELECT 
            t.user_id,
            CONCAT(u.user_first_name, ' ', u.user_last_name) AS employee_name,
            t.timesheet_date,
            SUM(t.hours) AS total_hours,
            SUM(t.minutes) AS total_minutes,
            COUNT(*) AS entry_count,
            MIN(CASE 
                WHEN EXISTS (
                    SELECT 1 FROM trans_project_team pt 
                    WHERE pt.employee_id = t.user_id 
                    AND pt.project_id = p.project_id 
                    AND pt.is_deleted = 0 
                    AND pt.is_released = 0
                ) THEN 1
                ELSE 0
            END) as is_active_assignment
        FROM 
            trans_timesheet t
        JOIN 
            master_user u ON t.user_id = u.user_id
        JOIN 
            master_project_deliverables pd ON t.pd_id = pd.pd_id
        JOIN 
            master_project_phases ph ON t.phase_id = ph.phase_id
        JOIN 
            master_project p ON pd.project_id = p.project_id
        JOIN 
            master_user pm ON p.project_manager_id = pm.user_id
        WHERE 
            t.is_deleted = 0
            AND p.project_manager_id = ?
        GROUP BY 
            t.user_id, u.user_first_name, u.user_last_name, t.timesheet_date
        ORDER BY 
            t.timesheet_date DESC, u.user_first_name
        `;

        // Query for detailed data (all entries)
        const detailedQuery = `
        SELECT 
            t.timesheet_id,
            t.timesheet_date,
            t.user_id,
            CONCAT(u.user_first_name, ' ', u.user_last_name) AS employee_name,
            p.project_name,
            ph.project_phase_name,
            pd.project_deliverable_name,
            pd.pd_id,
            t.task_description,
            t.hours,
            t.minutes,
            t.task_status,
            p.project_id,
            ph.phase_id,
            CASE 
                WHEN EXISTS (
                    SELECT 1 FROM trans_project_team pt 
                    WHERE pt.employee_id = t.user_id 
                    AND pt.project_id = p.project_id 
                    AND pt.is_deleted = 0 
                    AND pt.is_released = 0
                ) THEN 1
                ELSE 0
            END as is_active_assignment
        FROM 
            trans_timesheet t
        JOIN 
            master_user u ON t.user_id = u.user_id
        JOIN 
            master_project_deliverables pd ON t.pd_id = pd.pd_id
        JOIN 
            master_project_phases ph ON t.phase_id = ph.phase_id
        JOIN 
            master_project p ON pd.project_id = p.project_id
        JOIN 
            master_user pm ON p.project_manager_id = pm.user_id
        WHERE 
            t.is_deleted = 0
            AND p.project_manager_id = ?
        ORDER BY 
            t.timesheet_date DESC, u.user_first_name
        `;

        // Execute both queries in parallel
        Promise.all([
            new Promise((resolve, reject) => {
                db.query(aggregatedQuery, [projectManagerId], (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            }),
            new Promise((resolve, reject) => {
                db.query(detailedQuery, [projectManagerId], (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            })
        ]).then(([aggregatedData, detailedData]) => {
            res.status(200).json({
                aggregated: aggregatedData,
                detailed: detailedData
            });
        }).catch(error => {
            console.error('Error fetching timesheet data:', error);
            res.status(500).json({ error: 'Error fetching timesheet data' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


    async getReportingTeamsTimesheet(req: Request, res: Response): Promise<void> {
        try {
            const reportingManagerId = parseInt(req.params.reportingManagerId);

            if (!reportingManagerId) {
                res.status(400).json({ error: 'Reporting Manager ID is required' });
                return;
            }

            const query = `
            SELECT 
                t.timesheet_id,
                t.timesheet_date,
                CONCAT(u.user_first_name, ' ', u.user_last_name) AS employee_name,
                p.project_name,
                ph.project_phase_name,
                pd.project_deliverable_name,
                pd.pd_id,
                t.task_description,
                t.hours,
                t.minutes,
                t.task_status,
                t.user_id,
                p.project_id,
                ph.phase_id
            FROM 
                trans_timesheet t
            JOIN 
                master_user u ON t.user_id = u.user_id
            JOIN 
                master_project_deliverables pd ON t.pd_id = pd.pd_id
            JOIN 
                master_project_phases ph ON pd.pd_id = ph.pd_id  /* Changed join */
            JOIN 
                master_project p ON pd.project_id = p.project_id  /* Changed join */
            JOIN 
                trans_user_details ud ON u.user_id = ud.user_id
            WHERE 
                t.is_deleted = 0
                AND ud.reporting_manager_id = ?
                AND ud.is_deleted = 0
            ORDER BY 
                t.timesheet_date DESC, u.user_first_name
            `;

            db.query(query, [reportingManagerId], (err, results) => {
                if (err) {
                    console.error('Error fetching reporting team timesheets:', err);
                    return res.status(500).json({ error: 'Error fetching reporting team timesheets' });
                }
                res.status(200).json(results);
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }



}

export default new TimesheetController();