/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const colors = require('colors');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const TaskRoute = require('./routes/v1/task.route');

const app = express();

/* ----------------- Express Middlewares ------------------ */
app.use(cors());
app.use(express.json());

/* ----------------- Routes ------------------ */



app.use('/api/v1/task', TaskRoute);

app.use('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the scrap insta api',
    });
})

app.all('*', (req, res, next) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

/* ----------------- Global Error Handler ------------------ */
app.use(errorHandler);

module.exports = app;
