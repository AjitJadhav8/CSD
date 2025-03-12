import { Request, Response } from 'express';
import * as crypto from 'crypto';

import db from '../config/db';
import { generateToken } from '../config/jwt';
import { sendPasswordResetEmail } from '../utils/mailer';

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const query = `
            SELECT 
                mu.user_id,
                mu.user_first_name,
                mu.user_last_name,
                mu.user_email,
                mu.user_password,
                tud.role_id
                FROM master_user mu
            LEFT JOIN trans_user_details tud ON mu.user_id = tud.user_id
            WHERE mu.user_email = ? AND mu.is_deleted = 0
        `;
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
        // Check if role_id is NULL (role not assigned)
        if (user.role_id === null) {
          res.status(403).json({ message: 'Please assign a role before logging in.' });
          return;
      }

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
            email: user.user_email,
            role_id: user.role_id // Now fetched from trans_user_details

          }
        });
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }



  // FORGOT PASSWORD FUNCTIONALITY
  async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
  
    try {
      const query = 'SELECT * FROM master_user WHERE user_email = ? AND is_deleted = 0';
      db.query(query, [email], async (err, results: any[]) => {
        if (err) {
          res.status(500).json({ message: 'Server error' });
          return;
        }
  
        if (results.length === 0) {
          res.status(404).json({ message: 'Email not found' });
          return;
        }
  
        // Secure token generation
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiryTime = Date.now() + 3600000; // Token valid for 1 hour
  
        // Save token and expiry to database (you need to add these columns)
        const updateQuery = 'UPDATE master_user SET reset_token = ?, reset_token_expiry = ? WHERE user_email = ?';
        db.query(updateQuery, [resetToken, expiryTime, email]);
  
        const resetLink = `http://localhost:4200/reset-password/${resetToken}`;
  
        await sendPasswordResetEmail(email, resetLink);
  
        res.status(200).json({ message: 'Password reset email sent successfully' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  async resetPassword(req: Request, res: Response): Promise<void> {
    const { token, newPassword } = req.body;
  
    try {
      const query = 'SELECT * FROM master_user WHERE reset_token = ? AND reset_token_expiry > ? AND is_deleted = 0';
      db.query(query, [token, Date.now()], (err, results: any[]) => {
        if (err) {
          res.status(500).json({ message: 'Server error' });
          return;
        }
  
        if (results.length === 0) {
          res.status(400).json({ message: 'Invalid or expired token' });
          return;
        }
  
        const user = results[0];
  
        const updateQuery = 'UPDATE master_user SET user_password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE user_id = ?';
        db.query(updateQuery, [newPassword, user.user_id], (err) => {
          if (err) {
            res.status(500).json({ message: 'Error updating password' });
            return;
          }
  
          res.status(200).json({ message: 'Password has been reset successfully' });
        });
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  


}

export default new AuthController();
