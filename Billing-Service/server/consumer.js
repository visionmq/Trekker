const amqp = require('amqplib/callback_api');
const billPublisher = require('./publisher');
//const { response } = require('express');

const billConsume = () => {
  const exchange = 'trekker_topic';
  amqp.connect('amqp://localhost', function (error, connection) {
    
    if (error) console.log('error connecting to amqp: ', error.message);
    connection.createChannel(function (error, channel) {
  
      if (error) console.log('error connecting to the channel: ',error.message)
      channel.assertExchange(exchange, 'topic', {durable: true})
      
      channel.assertQueue('BillQueue');
      channel.bindQueue('BillQueue', exchange, 'Bill');
      channel.consume(
        'BillQueue',
        async (msg) => {
          const msgObj = JSON.parse(msg.content.toString());
          switch (msgObj.method) {
            case 'attempt-charge':
  
              console.log('Bill Consumer received: ', msgObj);
              const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({cardNum: msgObj.body.cardNum, total: msgObj.body.total, user: msgObj.body.user}),
              }
              try {
               
                const attemptCharge = await fetch('http://localhost:5001/attempt-charge/', options);
                const response = await attemptCharge.json();
                console.log('Order ID from the server ', response);
                if (attemptCharge.status < 299) {
                  msgObj.body.orderID = response.id;
                  msgObj.body.charged = true;
                  msgObj.method = 'post-charge';
                  msgObj.stage = 'sucessfully-charged'
                  delete msgObj.body.cardNum;
                  delete msgObj.body.total;
                  billPublisher('order.success', msgObj);
                }
                else {
                  console.log('response from billing server indicated the order failed')
                  billPublisher('order.failed', {outcome: attemptCharge});
                }
              }
              catch (err) {
                console.log(err)
                billPublisher('order.failed', {error: err});
              }
              break;
            }
          },
      { noAck: true }
  )
    })
  })
}
  

module.exports = billConsume;