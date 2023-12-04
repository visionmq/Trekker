const amqp = require('amqplib');

const billPublisher = async(key, msgObj) => {
  const exchange = 'trekker_topic'
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'topic', {durable: true})
    console.log('inside of the publisher');

    channel.publish(exchange, key, Buffer.from(JSON.stringify(msgObj)))

  }
  catch (err) {
    console.log('error connecting to the publisher: ', err.message);
  }
  finally {
    setTimeout(() => {
      //connection.close();
      process.exit(0);
    }, 500)
  }
};

module.exports = billPublisher;