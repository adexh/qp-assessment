import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const addRequestId = (req: Request, res: Response, next: NextFunction) => {
  const id = uuidv4();
  req.id = id;
  res.setHeader('X-Request-ID', id);
  next();
};