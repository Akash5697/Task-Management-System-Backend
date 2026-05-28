const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/roles');
const employeeController = require('../controllers/employeeController');

router.use(auth, authorizeRoles('Employee'));

router.get('/profile', employeeController.viewProfile);
router.get('/tasks', employeeController.listAssignedTasks);
router.patch('/tasks/:id/status', employeeController.updateTaskStatus);

module.exports = router;
