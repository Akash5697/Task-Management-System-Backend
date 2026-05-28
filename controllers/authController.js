const { registerUser, authenticateUser } = require('../services/authService');

const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const result = await authenticateUser(req.body);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
};

module.exports = { register, login };
