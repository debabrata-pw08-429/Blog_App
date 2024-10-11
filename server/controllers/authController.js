const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Register
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    const token = createToken(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: "User registration failed" });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = createToken(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: "Login failed" });
  }
};
