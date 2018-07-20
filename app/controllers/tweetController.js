const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet');

module.exports = {
  async create(req, res, next) {
    try {
      // creating the new tweet
      const tweet = await Tweet.create({ ...req.body, userId: req.userId });
      return res.json(tweet);
    } catch (err) {
      return next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const tweetId = req.params.id;
      await Tweet.findByIdAndRemove(tweetId);
      return res.json({ message: 'Tweet deleted successfully' });
    } catch (err) {
      return next(err);
    }
  },
};
