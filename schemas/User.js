import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
  baja: {
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  modified: {
    type: Boolean,
    required: false,
    default: false,
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  roles: [{
    required: false,
    default: [],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  }],
  userName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
  },
}, {
  collection: 'Users',
});

const User = mongoose.model('User', userSchema);

export default User;
