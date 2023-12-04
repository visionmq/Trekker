const amqp = require('amqplib/callback_api');
// const { connect } = require('react-redux');

const exchangeName = 'trekker_topic';

const sendMsg = async (key, msgObj) => {
  console.log('trying to connect');
  const connection = await amqp.connect('amqp://localhost');
  console.log('connected!!', connection);
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'topic', { durable: true });

  channel.publish(exchangeName, key, Buffer.from(JSON.stringify(msgObj)));
  console.log(`[x] App just sent: ${msgObj}`);

  setTimeout(() => {
    connection.close();
    // process.exit(0);
  }, 500);
};

module.exports = sendMsg;
