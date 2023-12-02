const amqp = require('amqplib');

const exchangeName = 'trekker_topic';

export const sendMsg = async (key, msgObj) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'topic', { durable: true });

  channel.publish(exchangeName, key, Buffer.from(JSON.stringify(msgObj)));
  console.log(`[x] App just sent: ${msgObj}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500)
};
