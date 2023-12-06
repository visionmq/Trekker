const amqp = require('amqplib/callback_api');
// const { connect } = require('react-redux');

const exchangeName = 'trekker_topic';

const sendMsg = (key, msgObj) => {
  // console.log('trying to connect:');
  const connection = amqp.connect(
    'amqp://localhost',
    function (error, connection) {
      // console.log('connected!!', connection);
      if (error) console.log(error);
      // console.log('Connection established', connection);

      connection.createChannel(function (err, channel) {
        // console.log('err', err, 'channel', channel);
        channel.assertExchange(exchangeName, 'topic', { durable: true });

        channel.publish(exchangeName, key, Buffer.from(JSON.stringify(msgObj)));
        console.log(`[x] Inv just sent: ${msgObj}`);
        setTimeout(() => {
          connection.close();
          // process.exit(0);
        }, 500);
      });
    }
  );
};
// const msg = {"method":"CheckQuantity","_id":"6568c6155533b3ac5b224cd2"}
// sendMsg('Inv',msg);

module.exports = sendMsg;