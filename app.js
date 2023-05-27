/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const colors = require('colors');
const mongoose = require('mongoose');
const limiter = require('./middlewares/apiLimiter');
const errorHandler = require('./middlewares/errorHandler');
const WaitListRoute = require('./routes/v1/waitlist.route');

const app = express();

/* ----------------- Express Middlewares ------------------ */
app.use(cors());
app.use(express.json());
app.use(limiter, (req, res, next) => {next()});


/* ----------------- Routes ------------------ */



app.use('/api/v1/waitlist', WaitListRoute);

app.use('/api/v1', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the inventional server.',
    });
})

app.all('*', (req, res, next) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

/* ----------------- Global Error Handler ------------------ */
app.use(errorHandler);

module.exports = app;
