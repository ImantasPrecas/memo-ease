import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
const crypto = require('crypto');
const dotenv = require('dotenv')

import User from '../models/user';

interface UserInterface {
  username: string;
  email: string;
  password: string;
}

// const generateSecretKey = () => {
//   return crypto.randomBytes(32).toString('hex');
// };

// const generatedSecretKey = generateSecretKey();

// const parsed = {SECRET_KEY: 'verysecret'}

// dotenv.populate(process.env, parsed)


exports.register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed') as any;
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { username, email, password }: UserInterface = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
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

exports.login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const loadedUser = await User.findOne({ email: email });
    if (!loadedUser) {
      const error = new Error(
        'A user with this email could not be found!'
      ) as any;
      error.statusCode = 401;
      throw error;
    }
    const passwordMatch = await bcrypt.compare(password, loadedUser.password);
    if (!passwordMatch) {
      const error = new Error('Wrong password!') as any;
      error.statusCode = 401;
      throw error;
    }

    console.log('auth controler-- loadedUser: ', loadedUser)
    console.log('auth controler-- loadedUser -- id: ', loadedUser._id.toString())

    const token = jwt.sign(
      { id: loadedUser._id.toString(), email: email, username: loadedUser.username },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1]

  try {
  if(!token) {
    const error = new Error('Error! Token was not provided!') as any
    error.statusCode = 401
    throw error
  }

  const decodedToken = jwt.decode(token, process.env.SECRET_KEY) as {id: string, email: string, username: string}

  res.status(200).json({
    data: {
      id: decodedToken.id,
      email: decodedToken.email,
      username: decodedToken.username
    }
  })

    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
