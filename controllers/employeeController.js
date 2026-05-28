const taskService = require('../services/taskService');

async function viewProfile(req, res) {
  try {
    res.json({ user: req.user });
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

async function listAssignedTasks(req, res) {
  try {
    const tasks = await taskService.getAssignedTasksForEmployee(req.user._id);
    res.json(tasks);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

async function updateTaskStatus(req, res) {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'status is required' });

    const task = await taskService.updateTaskStatusForEmployee(req.params.id, status, req.user);
    res.json(task);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

module.exports = {
  viewProfile,
  listAssignedTasks,
  updateTaskStatus,
};
