const User = require('../models/User');

async function getEmployees() {
  return User.find({ role: 'Employee' }).select('-password').sort({ name: 1 });
}

module.exports = {
  getEmployees,
};
