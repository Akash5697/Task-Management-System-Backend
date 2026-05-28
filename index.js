require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employee');
const tasksRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

async function start() {
	try {
		await connectDB();
		app.use('/api/auth', authRoutes);
		app.use('/api', protectedRoutes);
		app.use('/api/admin', adminRoutes);
		app.use('/api/employee', employeeRoutes);
		app.use('/api/tasks', tasksRoutes);
		const PORT = process.env.PORT || 4000;
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (err) {
		console.error('Failed to start server', err);
		process.exit(1);
	}
}

start();
