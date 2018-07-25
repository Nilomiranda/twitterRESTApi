const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const controllers = requireDir('./controllers');
const authMiddleware = require('./middlewares/auth');

/**
 * Authentication routes
 */
routes.post('/signup', controllers.authController.signup);
routes.get('/signin', controllers.authController.signin);

routes.use(authMiddleware);

/**
 * tweets routes
 */
routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.delete);

// interaction with tweets
routes.post('/tweets/:id', controllers.likeController.toogle);

/* ============================================================ */

/**
 * user routes
 */
routes.put('/users', controllers.userController.update);

// interaction with users
routes.post('/follow/:id', controllers.followController.create); // follow new user
routes.delete('/unfollow/:id', controllers.followController.destroy); // unfollow new user

/* ============================================================ */

module.exports = routes;
