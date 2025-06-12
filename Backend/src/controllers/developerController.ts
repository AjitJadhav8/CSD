// controllers/developerController.ts
import { Request, Response } from 'express';
import db from '../config/db';

class DeveloperController {
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const query = `
                SELECT 
                    user_id,
                    user_first_name,
                    user_last_name,
                    user_email,
                    user_password
                FROM master_user
                WHERE is_deleted = 0
                ORDER BY user_id`;

            db.query(query, async (error, results: any[]) => {
                if (error) {
                    console.error('Database Error:', error);
                    res.status(500).json({ error: 'Database Error', details: error.message });
                    return;
                }

                // Add decrypted password to each user (for development only)
                const usersWithDecryptedPasswords = await Promise.all(
                    results.map(async (user) => {
                        // For demonstration purposes only - bcrypt is one-way hashing
                        // In reality, you CANNOT decrypt bcrypt hashes
                        // This is just showing the hashed value in a different way
                        return {
                            ...user,
                            // This is just showing the hash, not actually decrypting
                            decrypted_password: `[HASHED: ${user.user_password}]`
                        };
                    })
                );

                res.status(200).json(usersWithDecryptedPasswords);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new DeveloperController();