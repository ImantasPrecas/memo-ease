import mongoose, { Schema, Document, Types } from 'mongoose';

interface INotes extends Document {
  title: String,
  description: String,
  creator: Types.ObjectId
}

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model<INotes>('Notes', notesSchema);

export default Notes