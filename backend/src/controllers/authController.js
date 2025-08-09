const jwt = require('jsonwebtoken');
const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = require('../config/serverConfig');

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ role: 'admin', email }, JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, role: 'admin' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const checkAuth = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    return res.json({ role: decoded.role, email: decoded.email });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const logout = (req, res) => {
  return res.json({ message: 'Logged out' });
};

module.exports = {
  login,
  logout,
  checkAuth
};
