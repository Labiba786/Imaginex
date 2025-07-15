// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

// const protect = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

//   if (!token) return res.status(401).json({ message: 'Not authorized' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };

// module.exports = protect;


const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key'; // Fallback only for dev

/**
 * Middleware to protect routes by verifying JWT tokens.
 * Attaches decoded user object to `req.user` if valid.
 */
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Example payload: { id, fullName, email, iat, exp }

    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

module.exports = protect;
