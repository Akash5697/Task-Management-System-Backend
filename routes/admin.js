const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/roles');
const adminController = require('../controllers/adminController');

router.use(auth, authorizeRoles('Admin'));

router.get('/users', adminController.listUsers);
router.post('/users', adminController.createUser);
router.patch('/users/:id/role', adminController.changeUserRole);
router.delete('/users/:id', adminController.removeUser);

module.exports = router;
