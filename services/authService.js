const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

async function registerUser({ name, email, password, role }) {
  if (!name || !email || !password) throw { status: 400, message: 'Missing fields' };
  const existing = await User.findOne({ email });
  if (existing) throw { status: 400, message: 'User already exists' };
  const user = await User.create({ name, email, password, role });
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
}

async function authenticateUser({ email, password }) {
  if (!email || !password) throw { status: 400, message: 'Missing fields' };
  const user = await User.findOne({ email });
  if (!user) throw { status: 400, message: 'Invalid credentials' };
  const ok = await user.comparePassword(password);
  if (!ok) throw { status: 400, message: 'Invalid credentials' };
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
}

module.exports = { registerUser, authenticateUser };
