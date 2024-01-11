import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

module.exports = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) {
    const error = new Error('Not authenticated!') as any;
    error.statusCode = 401;
    throw error;
  }
  const token = req.headers.authorization?.split(' ')[1];

  let decodedToken;
  try {
    decodedToken = jwt.decode(token, process.env.SECRET_KEY) as {
      id: string;
      email: string;
      username: string;
    };
    console.log('is-auth.ts-- decodedToken: ', decodedToken)
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.') as any;
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.id;


  next();
};
