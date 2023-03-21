import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    required: false,
    default: true
  },
  baja: {
    type: Boolean,
    required: false,
    default: false
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
  }
}, {
  collection: 'roles',
});

const Role = mongoose.model('Role', roleSchema)

export default Role