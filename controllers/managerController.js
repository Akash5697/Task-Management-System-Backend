const userService = require('../services/userService');

async function listEmployees(req, res) {
  try {
    const employees = await userService.getEmployees();
    res.json(employees);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || 'Server error' });
  }
}

module.exports = {
  listEmployees,
};
