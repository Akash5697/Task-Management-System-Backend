const Task = require('../models/Task');
const User = require('../models/User');

async function createTask(data, creatorId) {
  const { title, description, priority, status, assignedEmployee, dueDate } = data;
  if (!title) throw { status: 400, message: 'Title is required' };

  if (assignedEmployee) {
    const user = await User.findById(assignedEmployee);
    if (!user) throw { status: 400, message: 'Assigned employee not found' };
    if (user.role !== 'Employee') throw { status: 400, message: 'Assigned user is not an Employee' };
  }

  const task = await Task.create({
    title,
    description,
    priority,
    status,
    assignedEmployee,
    dueDate,
    createdBy: creatorId,
  });
  return task;
}

async function getTasksForUser(user) {
  if (user.role === 'Admin') return Task.find().populate('assignedEmployee createdBy');
  if (user.role === 'Manager') return Task.find({ createdBy: user._id }).populate('assignedEmployee createdBy');
  return Task.find({ assignedEmployee: user._id }).populate('assignedEmployee createdBy');
}

async function getAssignedTasksForManager(managerId) {
  return Task.find({ createdBy: managerId, assignedEmployee: { $ne: null } }).populate('assignedEmployee createdBy');
}

async function getTaskById(id) {
  const task = await Task.findById(id).populate('assignedEmployee createdBy');
  if (!task) throw { status: 404, message: 'Task not found' };
  return task;
}

async function updateTask(id, data, user) {
  const task = await Task.findById(id);
  if (!task) throw { status: 404, message: 'Task not found' };

  // Only Admin or the Manager who created the task can update
  if (user.role !== 'Admin' && String(task.createdBy) !== String(user._id)) {
    throw { status: 403, message: 'Forbidden' };
  }

  if (data.assignedEmployee) {
    const u = await User.findById(data.assignedEmployee);
    if (!u) throw { status: 400, message: 'Assigned employee not found' };
    if (u.role !== 'Employee') throw { status: 400, message: 'Assigned user is not an Employee' };
  }

  Object.assign(task, data);
  await task.save();
  return task.populate('assignedEmployee createdBy');
}

async function deleteTask(id, user) {
  const task = await Task.findById(id);
  if (!task) throw { status: 404, message: 'Task not found' };
  if (user.role !== 'Admin' && String(task.createdBy) !== String(user._id)) {
    throw { status: 403, message: 'Forbidden' };
  }
  await task.remove();
  return;
}

async function assignTask(id, employeeId, user) {
  const task = await Task.findById(id);
  if (!task) throw { status: 404, message: 'Task not found' };

  // Only Admin or the Manager who created the task can assign
  if (user.role !== 'Admin' && String(task.createdBy) !== String(user._id)) {
    throw { status: 403, message: 'Forbidden' };
  }

  const emp = await User.findById(employeeId);
  if (!emp) throw { status: 400, message: 'Assigned employee not found' };
  if (emp.role !== 'Employee') throw { status: 400, message: 'Assigned user is not an Employee' };

  task.assignedEmployee = emp._id;
  await task.save();
  return task.populate('assignedEmployee createdBy');
}

module.exports = { createTask, getTasksForUser, getAssignedTasksForManager, getTaskById, updateTask, deleteTask, assignTask };
