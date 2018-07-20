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
 * post Auth routes
 */

/**
 * tweets routes
 */
routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.delete);


module.exports = routes;
