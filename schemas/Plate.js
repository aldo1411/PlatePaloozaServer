import mongoose from "mongoose";

const plateSchema = new mongoose.Schema({
  unsubscribed: {
    type: Boolean,
    required: false,
    default: false
  },
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
  plateType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlateType'
  },
  ingredients: {
    type: [],
    required: true
  },
}, {
  collection: 'Plates',
});

const Plate = mongoose.model('Plate', plateSchema)

export default Plate