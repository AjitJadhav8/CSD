import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h'; // Default expiry if not set

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

export const generateToken = (user: any): string => {
  return jwt.sign(
    { user_id: user.user_id, role: user.role_name, email: user.user_email },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
};
