import jwt from 'jsonwebtoken';
import { config } from '@/config';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};