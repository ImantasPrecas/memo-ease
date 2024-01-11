import { NextFunction, Request, Response } from 'express';

import Notes from '../models/notes'

exports.addNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, description }: { title: string; description: string } =
    req.body;
  const userId = req.userId;

  try {
    if(!userId) {
        const error = new Error('Unauthorized') as any
        error.statusCode = 401
        throw error
    }

    const note = new Notes({title, description, creator: userId})
    const newNote = await note.save()

    res.status(200).json(newNote)


  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
