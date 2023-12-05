const amqp = require('amqplib/callback_api');

const billPublisher = (key, msgObj) => {
  const exchange = 'trekker_topic';
  console.log('starting the connection in the publisher')
    amqp.connect('amqp://localhost', function (error, connection) {

      if (error) console.log('error connecting to amqp: ', error.message);

      connection.createChannel(function (err, channel) {

        if (error) console.log('error connecting to the channel: ', err.message);
        channel.assertExchange(exchange, 'topic', {durable: true})
        console.log('sending a message to: ', key);
        channel.publish(exchange, key, Buffer.from(JSON.stringify(msgObj)))
      })
      setTimeout(() => {
        connection.close();
      }, 500)
    })
};

module.exports = billPublisher;