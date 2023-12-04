const amqp = require('amqplib');
const sendMsg = require('./publisher.js')
const exchangeName = 'trekker_topic';


const receiveMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'topic', { durable: true });

  const AuthQueue = await channel.assertQueue('AuthQueue');
  channel.bindQueue(AuthQueue, exchangeName, 'Auth');
  channel.bindQueue(AuthQueue, exchangeName, '#.success');

  channel.consume(
    AuthQueue,
    async (msg) => {
  const msgObj = msg.content.toString();
           console.log(`[x] Auth received: ${msgObj}, now sending sending to switcher...`);
      switch(msg.method) {
        case 'signup':
          try{
        const msgObj = JSON.parse(msg.content.toString());
        console.log(`[x] Auth received: ${msgObj}`);
        const data = await fetch('/signup', {
          method: 'POST',
          body: msgObj
        })
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
};

module.exports = receiveMsg
// const amqp = require('amqplib/callback_api');
// // const socketSend = require('./server');
// const exchangeName = 'trekker_topic';
//    amqp.connect('amqp://localhost',async function(err0,connection){
//    connection.createChannel(async function(err1,channel){
//   channel.assertExchange(exchangeName, 'topic', { durable: true });
//        channel.assertQueue('AppQueue');
//        channel.bindQueue('AppQueue', exchangeName, 'App');
//        channel.bindQueue('AppQueue', exchangeName, '#.success');
//        channel.consume(
//          'AppQueue',
//          (msg) => {
//            const msgObj = msg.content.toString();
//            console.log(`[x] App received: ${msgObj}, now sending thru websocket...`);
//            //ws function
//            // socketSend(msgObj); //send json back to fe via ws with instructions in body
//          },
//          {
//            noAck: true,
//          }
//        );
//      });
//      });