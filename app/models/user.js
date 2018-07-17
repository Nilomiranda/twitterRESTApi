const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  // relationship in mongodb
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * creating a hook to happen BEFORE a saving activity happens
 * inside the database e.g ".create() and .save()"
 */
UserSchema.pre('save', async function hashPassword(next) {
  /**
   * checks if password was modified
   * if NOT, then proceeds ... -> "next()""
   */
  if (!this.isModified('password')) next();

  // if MODIFIED then the password gets encrypted
  this.password = await bcrypt.hash(this.password, 8);
});

mongoose.model('User', UserSchema); // exporting the created model 'User'
