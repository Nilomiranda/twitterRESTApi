/**
 * for mongoose instructions, refer to its documentation
 * http://mongoosejs.com/docs/guide.html
 */

const app = require('express')();

const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database');

mongoose.connect(dbConfig.url);
requireDir(dbConfig.modelsPath);

app.use(bodyParser.json());

app.post('/create', (req, res) => {
  const User = mongoose.model('User');
  User.create(req.body);

  return res.send();
});

app.listen(3000);