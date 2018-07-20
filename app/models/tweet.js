const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Tweet', TweetSchema);
