const jwt = require('jsonwebtoken');
const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = require('../config/serverConfig');

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    // fixed admin credentials (simple equality check)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ role: 'admin', email }, JWT_SECRET, { expiresIn: '1d' });
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
      });
      return res.json({ message: 'Login successful', role: 'admin' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Logged out' });
};

const checkAuth = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not logged in' });
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ role: decoded.role || null, email: decoded.email || null });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  login,
  logout,
  checkAuth
};
