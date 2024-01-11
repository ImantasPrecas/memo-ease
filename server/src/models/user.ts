import mongoose, { Schema, Document, Types } from 'mongoose';

interface IUser extends Document {
  username: String,
  password: String,
  email: String
  notes: Types.Array<Types.ObjectId>;
  // other properties...
}

// const Schema = mongoose.Schema;

const userShema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Notes'
    }
  ]
});

const User = mongoose.model<IUser>('User', userShema);

export default User
