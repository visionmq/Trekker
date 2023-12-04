const amqp = require('amqplib');
const billPublisher = require('./publisher');

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
      async (msg) => {
        const msgObj = JSON.parse(msg.content.toString());
        switch (msgObj.method) {
          case 'attempt-charge':

            console.log(`[x] App received: ${msgObj}`);

            const options = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json'},
              body: {cardNum: msgObj.body.cardNum, total: msgObj.body.total, user: msgObj.body.userName},
            }
            try {
              const attemptCharge = await fetch('http://localhost:5000/attempt-charge', options);
              const outcome = await JSON.parse(attemptCharge);
              if (outcome.ok) {
                msgObj.body.orderID = outcome.orderID 
                msgObj.body.charged = true;
                delete msgObj.body.cardNum;
                delete msgObj.body.total;
                billPublisher('order.success', msgObj);
              }
              else billPublisher('order.failed', {outcome: outcome});
            }
            catch (err) {
              billPublisher('order.failed', {error: err});
            }
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