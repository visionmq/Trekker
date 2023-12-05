const amqp = require('amqplib/callback_api');
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
          console.log(`Message was received ${msgObj.method} sending to the switcher now`)
          switch (msgObj.method) {
            case 'NewListing':
              try {
                console.log('inside of newListing')
                const result = await fetch('http://localhost:6002/newListing', {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json'
                  },
                  body: JSON.stringify(msgObj)
                });
              } catch (error) {
                throw error;
              }
              break;
            case 'UpdateQuantity':
              try {
                console.log('inside of update quant')
                const result = await fetch('http://localhost:6002/updateListing/:id', {
                  method: 'PATCH',
                  headers: {
                    'content-type': 'application/json'
                  },
                  body: JSON.stringify(msgObj)
                });
              } catch (error) {
                throw error;
              }
              break;
            case 'CheckQuantity':
              try {
                console.log('inside of check quant')
                const result = await fetch('http://localhost:6002/checkQuantity', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(msgObj)
                });
                console.log(result);
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