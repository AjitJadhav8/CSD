import db from './config/db'; // Your existing db.ts import
import bcrypt from 'bcrypt';
import { exit } from 'process';

const saltRounds = 10;

async function hashPasswords() {
  try {
    console.log('🔐 Starting password migration...');

    // 1. Fetch all users (ignore TypeScript errors with @ts-ignore)
    // @ts-ignore
    const users = await new Promise((resolve, reject) => {
      db.query('SELECT user_id, user_password FROM master_user', (err, results: any) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    // 2. Hash each password
    for (const user of users as any[]) {
      const hashedPassword = await bcrypt.hash(user.user_password, saltRounds);
      
      await new Promise((resolve, reject) => {
        db.query(
          'UPDATE master_user SET user_password = ? WHERE user_id = ?',
          [hashedPassword, user.user_id],
          (err) => {
            if (err) reject(err);
            else resolve(true);
          }
        );
      });
      console.log(`🔄 Hashed password for user ${user.user_id}`);
    }

    console.log('✅ All passwords migrated successfully!');
    exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    exit(1);
  }
}

hashPasswords();