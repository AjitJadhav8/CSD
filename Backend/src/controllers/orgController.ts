import { Request, Response } from 'express';
import db from '../config/db'; // Import MySQL database connection

class OrgController {
  async getMasterCategories(req: Request, res: Response): Promise<void> {
    try {
      const query = 'SELECT DISTINCT sector, industry, domain FROM master_category WHERE is_deleted = 0';
      
      db.query(query, (err: any, results: { sector: string, industry: string, domain: string }[]) => {
        if (err) {
          console.error('Database error:', err);
          res.status(500).json({ error: 'Error fetching categories' });
          return;
        }

        res.json({
          sectors: [...new Set(results.map(row => row.sector))],
          industries: [...new Set(results.map(row => row.industry))],
          domains: [...new Set(results.map(row => row.domain))]
        });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  

}

export default new OrgController();
