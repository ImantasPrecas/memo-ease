const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userShema = new Schema({
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
  notes: [{ type: Schema.Types.ObjectId, ref: 'Notes' }],
});

module.exports = mongoose.model('User', userShema)