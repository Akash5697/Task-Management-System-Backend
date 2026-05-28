const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/roles');
const {
  profile,
  employeeArea,
  managerArea,
  adminArea,
} = require('../controllers/protectedController');

router.get('/profile', auth, profile);
router.get('/employee-area', auth, authorizeRoles('Employee', 'Manager', 'Admin'), employeeArea);
router.get('/manager-area', auth, authorizeRoles('Manager', 'Admin'), managerArea);
router.get('/admin-area', auth, authorizeRoles('Admin'), adminArea);

module.exports = router;
