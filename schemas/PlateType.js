import mongoose from 'mongoose';

const plateTypeSchema = new mongoose.Schema({
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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  collection: 'PlateTypes',
});

const PlateType = mongoose.model('PlateType', plateTypeSchema);

export default PlateType;
