const taskService = require('../services/taskService');

async function createTask(req, res) {
  try {
    const task = await taskService.createTask(req.body, req.user._id);
    res.status(201).json(task);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

async function listTasks(req, res) {
  try {
    const tasks = await taskService.getTasksForUser(req.user);
    res.json(tasks);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

async function listAssignedTasks(req, res) {
  try {
    // Only Manager or Admin should reach here (route protected)
    const tasks = await taskService.getAssignedTasksForManager(req.user._id);
    res.json(tasks);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

async function getTask(req, res) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    // check access: employee can only view if assigned; manager only if created; admin sees all
    if (req.user.role === 'Employee' && String(task.assignedEmployee?._id) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    if (req.user.role === 'Manager' && String(task.createdBy?._id) !== String(req.user._id) && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(task);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

async function updateTask(req, res) {
  try {
    const task = await taskService.updateTask(req.params.id, req.body, req.user);
    res.json(task);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

async function deleteTask(req, res) {
  try {
    await taskService.deleteTask(req.params.id, req.user);
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

async function assignTask(req, res) {
  try {
    const { employeeId } = req.body;
    if (!employeeId) return res.status(400).json({ message: 'employeeId is required' });
    const task = await taskService.assignTask(req.params.id, employeeId, req.user);
    res.json(task);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

module.exports = { createTask, listTasks, listAssignedTasks, getTask, updateTask, deleteTask, assignTask };
