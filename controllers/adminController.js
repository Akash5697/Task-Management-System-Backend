const adminService = require('../services/adminService');

async function listUsers(req, res) {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

async function createUser(req, res) {
  try {
    const user = await adminService.createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

async function changeUserRole(req, res) {
  try {
    const { role } = req.body;
    if (!role) return res.status(400).json({ message: 'role is required' });

    const user = await adminService.updateUserRole(req.params.id, role);
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

async function removeUser(req, res) {
  try {
    await adminService.deleteUser(req.params.id, req.user._id);
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

module.exports = {
  listUsers,
  createUser,
  changeUserRole,
  removeUser,
};
