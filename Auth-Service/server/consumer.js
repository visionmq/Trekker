const amqp = require('amqplib/callback_api'); //change to callbackApi not promiseApi (in nodeModule)
const sendMsg = require('./publisher.js');
const exchangeName = 'trekker_topic';

const receiveMsg = () => {
  console.log(`READY TO RECIEVE CAPT'N`);
  amqp.connect('amqp://localhost', function (error, connection) {
    connection.createChannel(function (error, channel) {
      channel.assertExchange(exchangeName, 'topic', { durable: true });
      channel.assertQueue('AuthQueue');
      channel.bindQueue('AuthQueue', exchangeName, 'Auth');
      channel.bindQueue('AuthQueue', exchangeName, '#.success');

      channel.consume(
        'AuthQueue',
        async (msg) => {
          const msgObj = JSON.parse(msg.content.toString());
          console.log(
            `[x] Auth received: ${msgObj.status}, now sending sending to switcher...`
          );
          switch (msgObj.status) {
            case 'app-signup-request-auth':
              try {
                console.log(`[x] signup received: ${msgObj.status}`);
                const data = await fetch('http://localhost:4000/signup', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(msgObj),
                });
                const response = await data.json();
                console.log('signup response: ', response);
                sendMsg('App', response);
              } catch (err) {
                console.log('signup error is: ', err.message);
              }
              break;
            case 'app-login-request-auth':
              try {
                console.log(`[x] login received: ${msgObj.status}`);
                const data = await fetch('http://localhost:4000/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(msgObj),
                });
                const response = await data.json();
                console.log('login response: ', response);
                sendMsg('App', response);
              } catch (err) {
                console.log('login error is: ', err.message);
              }
              break;
            case 'bill-postCharge-success-all':
              try {
                console.log(`[x] checkout received: ${msgObj.status}`);
                const data = await fetch('http://localhost:4000/checkout', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(msgObj),
                });
                const response = await data.json();
                console.log('checkout response: ', response);
                sendMsg('App', response);
              } catch (err) {
                console.log('checkout error is: ', err.message);
              }
              break;
          }
        },
        {
          noAck: true,
        }
      );
    });
  });
};
module.exports = receiveMsg;
