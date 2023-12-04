const amqp = require('amqplib/callback_api');
const socketSend = require('./server');

const exchangeName = 'trekker_topic';

const receiveMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'topic', { durable: true });

  const AppQueue = await channel.assertQueue('AppQueue');
  channel.bindQueue(AppQueue, exchangeName, 'App');
  channel.bindQueue(AppQueue, exchangeName, '#.success');

  channel.consume(
    AppQueue,
    (msg) => {
      const msgObj = msg.content.toString();
      console.log(`[x] App received: ${msgObj}, now sending thru websocket...`);
      //ws function
      socketSend(msgObj); //send json back to fe via ws with instructions in body
    },
    {
      noAck: true,
    }
  );
};

module.exports = receiveMsg;

//   fetch('/rabbit', {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json' },
//     body: msgObj,
//   })
//   .then(res => console.log('[x] Rabbit message sent to server'))
//   .catch(err => {
//     console.log(err)
//   })
