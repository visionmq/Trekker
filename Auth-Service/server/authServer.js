const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3002
require('dotenv').config()

const mongoURI = process.env.MONGO_URI_USERS

mongoose.connect(mongoURI);

mongoose.connection.once('open', () => {
    console.log('connected to the users DB by the users server')
});

app.use(express.json());

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});

