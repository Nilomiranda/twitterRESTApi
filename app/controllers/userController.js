const mongoose = require('mongoose');

const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');

// User controller methods
module.exports = {
  async me(req, res, next) {
    // retrieving informations of the logged user
    try {
      const me = await User.findById(req.userId); // searching for user
      const { username } = me;
      const tweetCount = await Tweet.find({ userId: me.id }).count(); // counting his tweets
      const followersCount = me.followers.length; // counting followers
      const followingCount = me.following.length; // counting following

      return res.json({
        username,
        tweetCount,
        followersCount,
        followingCount,
      });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = req.userId;

      const {
        password,
        confirmPassword,
        name,
        username,
      } = req.body;

      /**
       * checking if a new password was set and if it matcher with the
       * confirmation password
       */
      if (password && password !== confirmPassword) {
        res.status(401).json({ Error: 'Passwords don\'t match' });
      }

      // updates name and username (returning the modified data // -> new: true)
      const user = await User.findByIdAndUpdate(id, { name, username }, { new: true });

      // checks if a new password is set, and then save the new one
      if (password) {
        user.password = password;
        await user.save();
      }

      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  },

  async feed(req, res, next) {
    try {
      const user = await User.findById(req.userId);

      // searching for tweets to fetch
      const tweets = await Tweet
        .find({ userId: { $in: [user.id, ...user.following] } }) // searching...
        .limit(50) // limiting the number to return => 50...
        .sort('-createdAt'); // sorting the tweets by date of creating, newest first...

      return res.json(tweets);
    } catch (err) {
      return next(err);
    }
  }
};
