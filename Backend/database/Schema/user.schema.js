const mongoose = require('mongoose');
//const validator = require('validator');
const bcrypt = require('bcryptjs');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    Name: {
      type: String,
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [20, 'Name must be at most 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      minlength: [3, 'Password must be at least 3 characters'],
      maxlength: [255, 'Password must be at most 255 characters'],
      select: false,
    },
    confirmPassword: {
      type: String,
      minlength: [3, 'Confirm Password must be at least 3 characters'],
      maxlength: [255, 'Confirm Password must be at most 255 characters'],
    },
  },
  {
    timestamps: true,
    collection: 'user',
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
  }

  next();
});

const User = model('User', userSchema);

module.exports = User;
