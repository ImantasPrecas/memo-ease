import bcypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

import User from '../models/user';

interface UserInterface {
  username: string;
  email: string;
  password: string;
}

exports.register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req)
  try {
  if(!errors.isEmpty()) {
    const error  = new Error('Validation failed') as any;
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }

  const { username, email, password }: UserInterface = req.body;

    const hashedPassword = await bcypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword });
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
