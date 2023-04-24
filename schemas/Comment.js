import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  modified: {
    type: Boolean,
    required: false,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  collection: 'Comments',
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
