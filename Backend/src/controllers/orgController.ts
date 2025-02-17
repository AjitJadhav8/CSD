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
  }
  

export default new OrgController();
