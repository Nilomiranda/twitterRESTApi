const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async create(req, res, next) {
    try {
      const { id } = req.params;

      // checking if the target user to follow exists
      if (!id) {
        return res.status(400).json({ Error: 'User does not exist' });
      }

      const targetUser = await User.findById(id);

      // check if current logged user is already following the target
      const follower = targetUser.followers.indexOf(req.userId);

      if (follower === -1) {
        targetUser.followers.push(req.userId);
      } else {
        return res.status(400).json({
          Error: `You already follow ${targetUser.username}`,
        });
      }

      targetUser.save();

      // searching for the logged user
      const me = await User.findById(req.userId);

      // getting the users that the logged user follows
      const following = me.following.indexOf(targetUser.id);

      if (following === -1) {
        me.following.push(targetUser.id);
      }

      me.save();

      return res.status(200).json(targetUser);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      // checking if target user exists
      if (!id) {
        return res.status(400).json({ Error: 'User does not exist' });
      }

      const targetUser = await User.findById(id);
    } catch (err) {
      return next(err);
    }
  }
}
