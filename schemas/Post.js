import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    required: false,
    default: true
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now
  },
  modified: {
    type: Boolean,
    required: false,
    default: false
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  difficulty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Difficulty'
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: false,
    default: 0
  },
  comments: [{
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  plate: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plate'
  }
}, {
  collection: 'Posts',
});

const Post = mongoose.model('Post', postSchema)

export default Post