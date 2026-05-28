const User = require('../models/User');
const Task = require('../models/Task');

const ALLOWED_ADMIN_ROLES = ['Employee', 'Manager'];
const ALLOWED_ROLE_UPDATES = ['Employee', 'Manager', 'Admin'];

async function getAllUsers() {
  return User.find().select('-password').sort({ createdAt: -1 });
}

async function createUser({ name, email, password, role }) {
  if (!name || !email || !password) throw { status: 400, message: 'Missing fields' };
  if (!ALLOWED_ADMIN_ROLES.includes(role)) {
    throw { status: 400, message: 'Role must be Employee or Manager' };
  }

  const existing = await User.findOne({ email });
  if (existing) throw { status: 400, message: 'User already exists' };

  const user = await User.create({ name, email, password, role });
  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

async function updateUserRole(userId, role) {
  if (!ALLOWED_ROLE_UPDATES.includes(role)) {
    throw { status: 400, message: 'Invalid role' };
  }

  const user = await User.findById(userId);
  if (!user) throw { status: 404, message: 'User not found' };

  user.role = role;
  await user.save();

  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

async function deleteUser(userId, currentUserId) {
  if (String(userId) === String(currentUserId)) {
    throw { status: 400, message: 'You cannot delete your own account' };
  }

  const user = await User.findById(userId);
  if (!user) throw { status: 404, message: 'User not found' };

  await User.deleteOne({ _id: userId });
}

async function getTaskStatistics() {
  const [totalTasks, assignedTasks, pendingTasks, inProgressTasks, completedTasks, cancelledTasks, lowPriorityTasks, mediumPriorityTasks, highPriorityTasks] = await Promise.all([
    Task.countDocuments(),
    Task.countDocuments({ assignedEmployee: { $ne: null } }),
    Task.countDocuments({ status: 'Pending' }),
    Task.countDocuments({ status: 'In Progress' }),
    Task.countDocuments({ status: 'Completed' }),
    Task.countDocuments({ status: 'Cancelled' }),
    Task.countDocuments({ priority: 'Low' }),
    Task.countDocuments({ priority: 'Medium' }),
    Task.countDocuments({ priority: 'High' }),
  ]);

  return {
    totalTasks,
    assignedTasks,
    unassignedTasks: totalTasks - assignedTasks,
    byStatus: {
      pendingTasks,
      inProgressTasks,
      completedTasks,
      cancelledTasks,
    },
    byPriority: {
      lowPriorityTasks,
      mediumPriorityTasks,
      highPriorityTasks,
    },
  };
}

module.exports = {
  getAllUsers,
  createUser,
  updateUserRole,
  deleteUser,
  getTaskStatistics,
};
