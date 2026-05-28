const profile = (req, res) => res.json({ user: req.user });

const employeeArea = (req, res) => res.json({ message: 'Hello Employee/Manager/Admin', user: req.user });

const managerArea = (req, res) => res.json({ message: 'Hello Manager/Admin', user: req.user });

const adminArea = (req, res) => res.json({ message: 'Hello Admin', user: req.user });

module.exports = { profile, employeeArea, managerArea, adminArea };
