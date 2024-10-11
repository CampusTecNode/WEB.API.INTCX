const jwt = require('jsonwebtoken');
const {Roles, UserRoles } = require('../data/models/index');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// Middleware para verificar el token JWT (Autenticación)
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Middleware para verificar roles (Autorización)
const verifyRole = (roles) => {
  return async (req, res, next) => {
    try {
      const userRoles = await UserRoles.findAll({
        where: { userId: req.userId },
        include: [{ model: Roles }],
      });

      const roleNames = userRoles.map((ur) => ur.Role.name);

      if (!roles.some((role) => roleNames.includes(role))) {
        return res.status(403).json({ message: 'Access forbidden: You do not have the required role' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Error verifying roles', error: error.message });
    }
  };
};

module.exports = { verifyToken, verifyRole };
