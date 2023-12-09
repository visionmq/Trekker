const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

const sendMsg = require('./publisher');
// const receiveMsg = require('./consumer');

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
  await sendMsg('Inv', req.body.message); //message could be load or checkout
  res.send();
});

//rabbitMQ endpoint for testing websocket

app.post('/rabbit', async (req, res) => {
  console.log('Sending to rabbit');
  // console.log(req.body.message);
  await sendMsg('Inv', req.body.message);
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
app.listen(3000, async () => {
  console.log(`Server listening on port ${PORT}`);
  // receiveMsg();
});

/**
 * Web Socket
 *
 * It's possible that we just call the publisher.js sendMsg here
 * so that we don't have to go thru the server
 */

const { WebSocketServer } = require('ws');
const wsserver = new WebSocketServer({ port: 443 });
const amqp = require('amqplib/callback_api');

wsserver.on('connection', (ws) => {
  // ws.session = { secret: 'Secret Info Here' };
  ws.on('close', () => console.log('Client has disconnected!'));

  ws.onerror = function (err) {
    console.log('WEBSOCKET ERROR: ', err);
  };

  console.log('Websocket connected, turning on consumer');
  ws.send('Websocket Server working');

  const socketSend = (msgObj) => {
    console.log('in socket send: ', msgObj);
    ws.send(msgObj);
  };

  const exchangeName = 'trekker_topic';

  // const receiveMsg = () => {
  amqp.connect('amqp://localhost', function (error, connection) {
    if (error) console.log(error);
    console.log('Connection established for consumer');

    connection.createChannel(function (err, channel) {
      // console.log('err', err, 'channel', channel);
      channel.assertExchange(exchangeName, 'topic', { durable: true });

      channel.assertQueue('AppQueue');
      channel.bindQueue('AppQueue', exchangeName, 'App');
      channel.bindQueue('AppQueue', exchangeName, '#.success');
      channel.bindQueue('AppQueue', exchangeName, '#.failed');

      channel.consume(
        'AppQueue',
        (msg) => {
          const msgObj = msg.content.toString();
          console.log(
            `[x] App received: ${msgObj}, now sending thru websocket...`
          );
          switch (msgObj.status) {
            case 'inv-property-updated-app':
              socketSend({socketAction: 'updateInventoryState', properties: msgObj.body.properties}); 
              break;

            case 'inv-load-failed-app':
              socketSend({socketAction: 'propertySearchFailed'}); 
              break;

            case 'inv-preCharge-noAvail-app':
              socketSend({socketAction: 'noAvail', properties: msgObj.body.properties})
              break;
            case 'bill-postCharge-success-all':
              socketSend({socketAction: 'orderComplete', body: msgObj.body})
            break;

            case 'bill-postCharge-failed-app':
              socketSend({socketAction: 'billingFailed'})
              break;
            
            case 'bill-postCharge-success-all':
              socketSend({socketAction: 'orderComplete', body: msgObj.body})
            break;

            case 'auth-signup-success-app': 
              socketSend({socketAction: 'signupSuccessful', user: msgObj.user})
              break;
            
            case 'auth-signup-failed-app':
              socketSend({socketAction: 'signupFailed'})
              break;

            case 'auth-login-sucess-app': 
            socketSend({socketAction: 'loginSuccessful', user: msgObj.user})
              break;
            
            case 'auth-login-failed-app':
              socketSend({socketAction: 'loginFailed'})
              break;
            default:
              console.log('server could not find a route for the message it received.')
          }
          
        },
        {
          noAck: true,
        }
      );
    });
  });
});
