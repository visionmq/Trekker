const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config();
const PORT = process.env.AUTH_PORT;
const mongoURI = process.env.MONGO_URI_USERS;
const sendMsg = require('./publisher.js');

mongoose.connect(mongoURI);

mongoose.connection.once('open', () => {
  console.log('user database online');
});

const authController = require('./controllers/authController.js');
const receiveMsg = require('./consumer.js');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('In Auth');
});

app.post('/login', authController.login, (req, res) => {
  res.status(200).json(res.locals.body);
});

app.post('/signup', authController.signup, (req, res) => {
  res.status(200).json(res.locals.body);
});

app.post('/checkout', authController.checkout, (req, res) => {
  res.status(200).json(res.locals.body);
});

// app.use((req, res, err, next) => {
//   const defaultError = {
//     log: 'There was an unknown middleware error in Authentication',
//     status: 500,
//     message: "Housten, there's been an authentication problem",
//   };
//   const errObj = Object.assign(defaultError, err);
//   res.status(errObj.status).json(errObj.message);
// });

app.listen(4000, () => {
  receiveMsg();
  console.log(`listening on port ${PORT}`);
});
