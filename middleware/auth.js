const jwt = require('jsonwebtoken');
const config = require('config');

// @req The request object
// @res The response object
// @next The next callback function for chaining execution.
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if there is no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization defnied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next(); // Execute next middleware callback function
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
