const jwt = require("jsonwebtoken");
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require("../config/serverConfig");

const login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (
    email ===ADMIN_EMAIL &&
    password === ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
      maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

module.exports = { login };
