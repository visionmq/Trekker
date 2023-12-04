const amqp = require('amqplib/callback_api');//change to callbackApi not promiseApi (in nodeModule)
const sendMsg = require('./publisher.js');
const exchangeName = 'trekker_topic';

console.log('in consumer')



const receiveMsg = () => {
  console.log('in receive')
  amqp.connect('amqp://localhost', function(error, connection){
    // console.log('connection1', connection)
    connection.createChannel(function(error, channel){
      // console.log('channel', channel)
      channel.assertExchange(exchangeName, 'topic', { durable: true });
      channel.assertQueue('AuthQueue');
      channel.bindQueue('AuthQueue', exchangeName, 'Auth');
      channel.bindQueue('AuthQueue', exchangeName, '#.success');
    
      channel.consume(
        'AuthQueue',
        async (msg) => {
        const msgObj = msg.content.toString();
              console.log(`[x] Auth received: ${msgObj.method}, now sending sending to switcher...`)
          switch(msgObj.method) {
            case 'signup':
              try{
            console.log('in signup')
            const msgObj = JSON.parse(msg.content.toString());
            console.log(`[x] Auth received: ${msgObj}`);
            const data = await fetch('/signup', {
              method: 'POST',
              body: msgObj
            });
            sendMsg(key, data)
          }
          catch (err){
            console.log(err.message)
          }
            case 'signin':
              try{
            const msgObj = JSON.parse(msg.content.toString());
            console.log(`[x] Auth received: ${msgObj}`);
            const data = await fetch('/signin', {
              method: 'POST',
              body: msgObj
            })
            sendMsg(key, data)
          }
          catch (err){
            console.log(err.message)
          }
          case 'checkout':
              try{
            const msgObj = JSON.parse(msg.content.toString());
            console.log(`[x] Auth received: ${msgObj}`);
            const data = await fetch('/checkout', {
              method: 'POST',
              body: msgObj
            })
            sendMsg(key, data)
          }
          catch (err){
            console.log(err.message)
          }
          }
        },
        {
          noAck: true,
        }
      );
    });
  })
}

console.log('bout to receive')
receiveMsg()

// module.exports = receiveMsg
