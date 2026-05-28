const mongoose = require('mongoose');

async function connectDB(uri) {
  const MONGO_URI = uri || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task-management';
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err);
    throw err;
  }
}

module.exports = { connectDB };
