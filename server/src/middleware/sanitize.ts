import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';

export const sanitizeInput = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body) {
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        req.body[key] = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
      }
    }
  }
  next();
};