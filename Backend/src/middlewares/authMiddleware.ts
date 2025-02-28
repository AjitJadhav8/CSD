import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { user_id: number };

    (req as any).user = decoded; // Use "as any" to avoid TypeScript error
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

