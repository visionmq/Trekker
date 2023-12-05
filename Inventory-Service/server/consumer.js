const amqp = require('amqplib/callback_api');
const sendMsg = require('./publisher');
const { send } = require('process');
const exchangeName = 'trekker_topic';

const receiveMsg = () => {
  amqp.connect('amqp://localhost', function (error, connection) {
    if (error) console.log(error);

    connection.createChannel(function (err, channel) {
      channel.assertExchange(exchangeName, 'topic', { durable: true });

      channel.assertQueue('InvQueue');
      channel.bindQueue('InvQueue', exchangeName, 'Inv');
      channel.bindQueue('InvQueue', exchangeName, '#.success');

      channel.consume(
        'InvQueue',
        async function (msg) {
          const msgObj = JSON.parse(msg.content.toString());
          console.log(`Message was received ${msgObj.status} sending to the first switcher now`)
          switch (msgObj.status) {
            case 'NewListing':
              try {
                console.log('inside of newListing')
                const result = await fetch('http://localhost:6002/newListing', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(msgObj)
                });
              } catch (error) {
                throw error;
              }
              break;
            case 'bill-postCharge-success-all':
              try {
                console.log('inside of update quant')
                const result = await fetch('http://localhost:6005/updateQuantity/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(msgObj)
                });
                const response = await result.json();
                sendMsg('App',response)
              } catch (error) {
                throw error;
              }
              break;
            case 'app-preCharge-attempt-bill':
              try {
                console.log('inside of check quant')
                const result = await fetch('http://localhost:6005/checkQuantity', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(msgObj)
                });
                const response = await result.json()
                console.log('JUST GOT THE RESPONSE NOW SENDING TO SECOND SWITCHER')
                switch (response.status){
                  case 'inv-preCharge-noAvail-app':
                    try {
                      console.log('INSIDE OF SECOND SWITCH SENDING BACK TO APP')
                      sendMsg('App',response)
                    } catch (error) {
                      throw error
                    }
                    break;
                  case 'inv-preCharge-attempt-bill':
                    try {
                      console.log('INSIDE OF SECOND SWITCH SENDING TO BILLING')
                      sendMsg('Bill',response)
                    } catch (error) {
                      throw error
                    }
                    break;
                }
              } catch (error) {
                throw error;
              }
              break;
          }
        },
        {
          noAck: true // Add this line to enable no acknowledgment
        }
      );
    });
  });
};

receiveMsg();