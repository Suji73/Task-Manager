const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const tasksRoute = require('./routes/tasks');
app.use('/api/tasks', tasksRoute);

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskmanager';

// DB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
