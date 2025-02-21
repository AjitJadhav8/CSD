import { Request, Response } from 'express';
import db from '../config/db';
import { generateToken } from '../config/jwt';

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const query = 'SELECT * FROM master_user WHERE user_email = ? AND is_deleted = 0';
      db.query(query, [email], (err, results: any[]) => {
        if (err) {
          res.status(500).json({ message: 'Server error' });
          return;
        }

        if (results.length === 0) {
          res.status(401).json({ message: 'Invalid credentials' });
          return;
        }

        const user = results[0];

        // Compare plain passwords directly
        if (password !== user.user_password) {
          res.status(401).json({ message: 'Invalid credentials' });
          return;
        }

        // Generate JWT token
        const token = generateToken(user);
        res.status(200).json({
          token,
          user: {
            user_id: user.user_id,
            first_name: user.user_first_name,
            last_name: user.user_last_name,
            role_id: user.role_id,
            email: user.user_email
          }
        });
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new AuthController();
