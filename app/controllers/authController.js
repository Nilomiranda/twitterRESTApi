const mongoose = require('mongoose'); // importing mongoose

const User = mongoose.model('User');

module.exports = {
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      console.log(email, password, user);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (!await user.compareHash(password)) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      return next(err);
    }
  },

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
    } catch (err) {
      return next(err);
    }
  },
};
