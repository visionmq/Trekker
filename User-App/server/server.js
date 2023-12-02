const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

const sendMsg = require('./publisher');
const receiveMsg = require('./consumer');

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

//serves files for the webpack
app.use('/build', express.static(path.join(__dirname, '../build')));

//functional endpoints
app.post('/login', async (req, res) => {
  const routingKey = 'Auth';
  const msg = req.body.messsage;
  await sendMsg(routingKey, msg);
  await receiveMsg(); //?? is this the way to do it maybe make a websocket
  res.send('');
});

//used for serving the application
app.use('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

//wild card route handler
app.use('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: err.message },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

//connects the server to the port
app.listen(3000, () => {
  console.log(`server listening on port ${PORT}`);
});
