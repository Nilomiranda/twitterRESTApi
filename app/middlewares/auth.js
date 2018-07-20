const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { secret } = require('../../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check if an authorization was sent in this requet
  if (!authHeader) {
    // if not, throw and error
    return res.status(401).json({ error: 'Token not provided' });
  }

  // breaking the authorization data into parts, in its spaces
  const authHeaderParts = authHeader.split(' ');

  // check the broken auth data format
  if (!authHeaderParts === 2) {
    // if it's more than two parts, throw an error --> Expected: Bearer TOKENNUMBER
    return res.status(401).json({ error: 'Invalid token' });
  }

  // destructuring the auth data array
  // scheme -> Expected Bearer, token -> A certain TOKENNUMBER
  const [scheme, token] = authHeaderParts;

  // check if scheme is equal to Bearer
  if (scheme !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  // checking the given token in the request
  try {
    const decoded = await promisify(jwt.verify)(token, secret);
    req.userId = decoded.id; // sending the authenticade user Id to the whole request
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

};
