const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/roles');
const taskCtrl = require('../controllers/taskController');

// Create task — Manager or Admin
router.post('/', auth, authorizeRoles('Manager', 'Admin'), taskCtrl.createTask);

// List tasks — role-aware
router.get('/', auth, taskCtrl.listTasks);

// List assigned tasks created by the manager
router.get('/assigned', auth, authorizeRoles('Manager', 'Admin'), taskCtrl.listAssignedTasks);

// Get single task
router.get('/:id', auth, taskCtrl.getTask);

// Assign task to employee — Manager or Admin
router.post('/:id/assign', auth, authorizeRoles('Manager', 'Admin'), taskCtrl.assignTask);

// Update task — only Admin or task creator (Manager)
router.put('/:id', auth, authorizeRoles('Manager', 'Admin'), taskCtrl.updateTask);

// Delete task — only Admin or task creator (Manager)
router.delete('/:id', auth, authorizeRoles('Manager', 'Admin'), taskCtrl.deleteTask);

module.exports = router;
