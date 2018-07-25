const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet');

module.exports = {
  async toogle(req, res, next) {
    try {
      const tweetId = req.params.id;

      // check if the tweet currently exists
      const tweet = await Tweet.findById(tweetId);

      if (!tweet) {
        return res.status(400).json({ Error: 'Tweet not found/doesn\'t exist' });
      }

      // check if the current tweet has a like already
      const liked = tweet.likes.indexOf(req.userId);

      if (liked === -1) {
        /**
         * if the current userId is not found in the current tweet
         * likes array, then it's added (liked sucessfull)
         */
        tweet.likes.push(req.userId);
      } else {
        /**
         * if the current userId is found in the current tweet likes
         * array, then it's removed (disliked sucessfull)
         */
        tweet.likes.splice(liked, 1);
      }

      await tweet.save(); // saves the new array of likes of this tweet

      return res.status(200).json(tweet);
    } catch (err) {
      return next(err);
    }
  }
}
