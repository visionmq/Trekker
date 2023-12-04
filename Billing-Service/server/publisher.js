const amqp = require('amqplib');

export const billPublisher = async(key, msgObj) => {
  const exchange = 'trekker_topic'
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'topic', {durable: true})

    channel.publish(exchange, key, Buffer.from(JSON.stringify(msgObj)))

  }
  catch (err) {
    console.log(err.message);
  }
  finally {
    setTimeout(() => {
      connect.close();
      process.exit(0);
    }, 500)
  }
};