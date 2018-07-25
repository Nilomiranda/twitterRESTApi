const mongoose = require('mongoose');

const User = mongoose.model('User');

// User controller methods
module.exports = {
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
};
