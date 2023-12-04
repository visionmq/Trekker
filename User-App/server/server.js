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
app.use('/assets', express.static(path.join(__dirname, './client/assets')));

//functional endpoints
app.post('/auth', async (req, res) => {
  await sendMsg('Auth', req.body.messsage); //message could be login or signup
  res.send();
});

app.post('/inv', async (req, res) => {
  await sendMsg('Inv', req.body.messsage); //message could be load or checkout
  res.send();
});

//rabbitMQ endpoint for testing websocket

app.post('/rabbit', async (req, res) => {
  console.log('Sending to rabbit');
  await sendMsg('App', req.body.messsage);
  console.log('Rabbit message sent');
  res.send();
});

//used for serving the application
app.use('/', async (req, res) => {
  // await receiveMsg();
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

/**
 * Web Socket
 *
 * It's possible that we just call the publisher.js sendMsg here
 * so that we don't have to go thru the server
 */

const { WebSocketServer } = require('ws');
const wsserver = new WebSocketServer({ port: 443 });

wsserver.on('connection', async (ws) => {
  // ws.session = { secret: 'Secret Info Here' };
  ws.on('close', () => console.log('Client has disconnected!'));

  ws.onerror = function (err) {
    console.log('WEBSOCKET ERROR: ', err);
  };

  console.log('Websocket connected, turning on consumer');
  await receiveMsg();
  ws.send('Websocket working');

  const socketSend = (msgObj) => {
    ws.send(msgObj);

    exports.module = socketSend;
  };
});
