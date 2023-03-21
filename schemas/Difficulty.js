import mongoose from "mongoose";

const difficultySchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
  }
}, {
  collection: 'Difficulties',
});

const Difficulty = mongoose.model('Difficulty', difficultySchema)

export default Difficulty