const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config()
const PORT = process.env.AUTH_PORT//not working
const mongoURI = process.env.MONGO_URI_USERS//not working
const sendMsg = require('./publisher.js')

mongoose.connect('mongodb+srv://Houses-R-Us:KIMVTjsFPqWXOSzc@houses-r-us-users.o0ujl8u.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.once('open', () => {
    console.log('user database online')
});

const controller = require('./controllers/authController.js')

app.use(express.json());

app.post('/signin', controller.signin, (req, res) => {
    sendMsg('App', res.locals.msg)
    res.status(200).send('complete')
  });
app.post('/signup', controller.signup, (req, res) => {
    sendMsg('App', res.locals.msg)
    res.status(200).send('complete')
  });
app.post('/checkout', controller.checkout, (req, res) => {
    sendMsg('App', res.locals.msg)
    res.status(200).send('complete')
  });

app.use((req, res, err, next) => {
    const defaultError = {
        log: 'There was an unknown middleware error in Authentication',
        status: 500,
        message: 'Housten, there\'s been an authentication problem',
    };
    const errObj = Object.assign(defaultError, err)
    res.status(errObj.status).json(errObj.message)
});

app.listen(4000, () => {
    console.log(`listening on port 4000`)
});

