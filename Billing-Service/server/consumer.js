const amqp = require('amqplib');

export const receive = async() => {
  const exchange = 'trekker_topic';
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'topic', {durable: true})
  }
  catch (err) {
    console.log(err.message);
  }
  try {
    const BillQueue = await channel.assertQueue('BillQueue');
    channel.bindQueue(BillQueue, exchange, 'Bill');

    channel.consume(
      BillQueue,
      (msg) => {
        switch (msg.method) {
          case 'attempt-charge':
            //talk to the billing server 
            const msgObj = JSON.parse(msg.content.toString());
            console.log(`[x] App received: ${msgObj}`);
            //access the publisher methods to send out a #.success message to all MS's
            break;
          }
        },
      { noAck: true }
    );
  }
  catch (err) {
    console.log(err.message);
  }
};