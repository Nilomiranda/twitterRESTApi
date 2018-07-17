const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const controllers = requireDir('./controllers');

/**
 * Auth routes
 */
routes.post('/signup', controllers.authController.signup);

module.exports = routes;
