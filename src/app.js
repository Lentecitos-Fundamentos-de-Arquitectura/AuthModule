const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/routes');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', authRoutes);

module.exports = app;