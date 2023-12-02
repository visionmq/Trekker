const amqp = require('amqplib');

const exchangeName = 'trekker_topic';

export const receiveMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'topic', { durable: true });

  const AppQueue = await channel.assertQueue('AppQueue');
  channel.bindQueue(AppQueue, exchangeName, 'App');
  channel.bindQueue(AppQueue, exchangeName, '#.success');

  channel.consume(
    AppQueue,
    (msg) => {
      const msgObj = JSON.parse(msg.content.toString());
      console.log(`[x] App received: ${msgObj}`);
      //  fetch(msg.content.toString();
    },
    {
      noAck: true,
    }
  );
};
