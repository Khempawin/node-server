'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

app.get('/api', (req, res) => {
    res.send('Hello World!');
})

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    // Express will serve up production assets
    // like main.js, main.css file
    app.use(express.static('node-react-client/build'));
    // Express will serve up the index.html file
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'node-react-client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`NODE_ENV => ${process.env.NODE_ENV}`);
    console.log(`Listening at http://localhost:${port}`);
})