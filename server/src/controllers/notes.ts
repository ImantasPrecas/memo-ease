import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import Notes from '../models/notes';
import User from '../models/user';

exports.addNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, description }: { title: string; description: string } =
    req.body;
  const userId = req.userId;

  try {
    if (!userId) {
      const error = new Error('Unauthorized') as any;
      error.statusCode = 401;
      throw error;
    }

    const note = new Notes({ title, description, creator: userId });
    const newNote = await note.save();

    const user = await User.findById(userId);

    user?.notes.push(newNote)
    await user?.save()


    res.status(200).json(newNote);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.userId;
  console.log('notes-controler--getNotes--userId: ', userId)
  try {
    if (!userId) {
      const error = new Error('Unauthorized') as any;
      error.statusCode = 401;
      throw error;
    }

    const notes = await Notes.find();
    res.status(200).json(notes);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const noteId = req.params.id;
  const { title, description }: { title: string; description: string } =
    req.body;

  try {
    const note = await Notes.findById(noteId);
    if (!note) {
      const error = new Error('Could not find note') as any;
      error.statusCode = 404;
      throw error;
    }
    if (note.creator.toString() !== req.userId) {
      const error = new Error('Not authorized!') as any;
      error.statusCode = 403;
      throw error;
    }

    note.title = title;
    note.description = description;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const noteId = req.params.id;

  try {
    const note = await Notes.findById(noteId);

    if (!note) {
      const error = new Error('Could not find note.') as any;
      error.statusCode = 404;
      throw error;
    }
    if (note.creator.toString() !== req.userId) {
      const error = new Error('Not authorized!') as any;
      error.statusCode = 403;
      throw error;
    }
    await Notes.findByIdAndDelete(noteId)

    const user = await User.findById(req.userId)

    if (!user) {
        const error = new Error('Unauthorized') as any;
      error.statusCode = 404;
      throw error;
    }

     // Assuming that `notes` is of type mongoose.Types.Array<mongoose.Types.ObjectId>
     const notesArray = user.notes as mongoose.Types.Array<mongoose.Types.ObjectId>;
        
     // Using the `pull` method on the array
     notesArray.pull(noteId);
 
     // Save the user after modifying the notes array
     await user.save();

     res.status(200).json({message: 'Note deleted succesfuly'})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
