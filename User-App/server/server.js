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

app.get('/inv', (req, res) => {
  const message = {
    method: 'load',
    status: 'app-load-request-inv',
    body: {
      properties: [],
    }
  }
  sendMsg('Inv', message); //message could be load or checkout
  res.sendStatus(200);
});

//rabbitMQ endpoint for testing websocket

app.post('/rabbit', async (req, res) => {
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
  ws.on('close', () => console.log('Client has disconnected!'));

  ws.onerror = function (err) {
    console.log('WEBSOCKET ERROR: ', err);
  };

  console.log('Websocket connected, turning on consumer');
  ws.send(JSON.stringify({message: 'Websocket Server working'}));

  const socketSend = (msgObj) => {
    console.log('in socket send: ');
    ws.send(msgObj);
  };

  const exchangeName = 'trekker_topic';

  amqp.connect('amqp://localhost', function (error, connection) {
    if (error) console.log(error);
    console.log('Connection established for consumer');

    connection.createChannel(function (err, channel) {
      channel.assertExchange(exchangeName, 'topic', { durable: true });

      channel.assertQueue('AppQueue');
      channel.bindQueue('AppQueue', exchangeName, 'App');
      channel.bindQueue('AppQueue', exchangeName, '#.success');
      channel.bindQueue('AppQueue', exchangeName, '#.failed');

      channel.consume(
        'AppQueue',
        async (msg) => {
          let msgObj
          try {
            msgObj = JSON.parse(msg.content); //.toString()
            console.log('this is the message parsed: ', msgObj.status)
          }
          catch (err) {
            console.log('App server could not parse the incoming message.')
          }
          let data;
          switch (msgObj.status) {
            case 'inv-property-updated-app':
              data = JSON.stringify({socketAction: 'updateInventoryState', properties: msgObj.body.properties}) //this probably needs to be changed
              ws.send(data); 
              break;

            case 'inv-load-success-app':
              data = JSON.stringify({socketAction: 'updateInventoryState', properties: msgObj.body.properties});
              ws.send(data); 
              break;
            case 'inv-load-failed-app':
              data = JSON.stringify({socketAction: 'propertySearchFailed'})
              ws.send(data); 
              break;

            case 'inv-preCharge-noAvail-app':
              data = JSON.stringify({socketAction: 'noAvail', properties: msgObj.body.properties})
              ws.send(data);
              break;
              
            case 'bill-postCharge-success-all':
              data = JSON.stringify({socketAction: 'orderComplete', body: msgObj.body})
              ws.send(data);
              break;

            case 'bill-postCharge-failed-app':
              data = JSON.stringify({socketAction: 'billingFailed'})
              ws.send(data);
              break;

            case 'auth-signup-success-app': 
              data = JSON.stringify({socketAction: 'signupSuccessful', user: msgObj.user})
              ws.send(data);
              break;
            
            case 'auth-signup-failed-app':
              data = JSON.stringify({socketAction: 'signupFailed'})
              ws.send(data);
              break;

            case 'auth-login-sucess-app': 
              data = JSON.stringify({socketAction: 'loginSuccessful', user: msgObj.user})
              ws.send(data);
              break;
            
            case 'auth-login-failed-app':
              data = JSON.stringify({socketAction: 'loginFailed'})
              ws.send(data);
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
