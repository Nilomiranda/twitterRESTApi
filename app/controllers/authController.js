const mongoose = require('mongoose'); // importing mongoose

const User = mongoose.model('User');

module.exports = {
  async signup(req, res, next) {
    try {
      const { email, username } = req.body;

      // check if username or email is already registered
      if (await User.findOne({ $or: [{ email }, { username }] })) {
        return res.status(400).json('User already exists');
      }

      // creates new user if the email or username isn't under use
      const user = await User.create(req.body);

      return res.json(user);
    } catch(err) {
      return next(err);
    }
  }
};
