const jwt = require('jsonwebtoken');

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
  // Check for token in the Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from "Bearer <token>"
  
  // If no token is provided, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token is invalid or expired
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }

    // Attach user data to the request object for further use
    req.user = user;

    // Call the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;
