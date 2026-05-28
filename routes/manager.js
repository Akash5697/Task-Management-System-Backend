const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/roles');
const managerController = require('../controllers/managerController');

router.use(auth, authorizeRoles('Manager', 'Admin'));

router.get('/employees', managerController.listEmployees);

module.exports = router;
