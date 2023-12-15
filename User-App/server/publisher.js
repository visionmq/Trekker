const amqp = require('amqplib/callback_api');
// const { connect } = require('react-redux');

const exchangeName = 'trekker_topic';

const sendMsg = (key, msgObj) => {
  console.log('trying to connect: ', key, msgObj);
  amqp.connect('amqp://localhost', function (error, connection) {
    if (error) console.log(error);

    connection.createChannel(function (err, channel) {
      channel.assertExchange(exchangeName, 'topic', { durable: true });

      channel.publish(exchangeName, key, Buffer.from(JSON.stringify(msgObj)));
      console.log(`Publisher: App just sent: ${msgObj}`);

      setTimeout(() => {
        connection.close();
      }, 500);
    });
  });
};

module.exports = sendMsg;
