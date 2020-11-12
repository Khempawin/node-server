'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const pool = require('./config/dbConnect');
const ormLogging = require('./middlewares/ormLogging');
const app = express();
app.use(cors());
//Apply middlewares
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

const staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 5000);

//Apply route handlers

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    // Express will serve up production assets
    // like main.js, main.css file
    app.use(express.static('client/build'));
    // Express will serve up the index.html file
    // if it doesn't recognize route
    const path = require('path');
    app.get('*', ormLogging, (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
module.exports = app;
