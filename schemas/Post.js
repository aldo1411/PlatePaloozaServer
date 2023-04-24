import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
  unsubscribed: {
    type: Boolean,
    required: false,
    default: false,
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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  difficulty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Difficulty',
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
    default: 0,
  },
  comments: [{
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  plate: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plate',
  },
}, {
  collection: 'Posts',
});

const Post = mongoose.model('Post', postSchema);

export default Post;
