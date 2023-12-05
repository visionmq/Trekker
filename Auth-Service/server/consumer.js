const amqp = require('amqplib/callback_api');//change to callbackApi not promiseApi (in nodeModule)
const sendMsg = require('./publisher.js');
const exchangeName = 'trekker_topic';

const receiveMsg = () => {
  console.log(`READY TO RECIEVE CAPT'N`)
  amqp.connect('amqp://localhost', function(error, connection){
    connection.createChannel(function(error, channel){
      channel.assertExchange(exchangeName, 'topic', { durable: true });
      channel.assertQueue('AuthQueue');
      channel.bindQueue('AuthQueue', exchangeName, 'Auth');
      channel.bindQueue('AuthQueue', exchangeName, '#.success');
    
      channel.consume(
        'AuthQueue',
        async (msg) => {
        const msgObj = JSON.parse(msg.content.toString());
            console.log(`[x] Auth received: ${msgObj.method}, now sending sending to switcher...`)
          switch(msgObj.method) {
            case 'signup':
              //{"method": "signup", "username": "", "password": ""}
              try{
            console.log(`[x] signup received: ${msgObj.method}`);
            const data = await fetch('http://localhost:4000/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(msgObj)
            });
            sendMsg('App', data)
          }
          catch (err){
            console.log('signup error is: ', err.message)
          }
          break
            case 'signin':
               //{"method": "signup", "username": "", "password": ""}
              try{
            console.log(`[x] signin received: ${msgObj.method}`);
            const data = await fetch('http://localhost:4000/signin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(msgObj)
            })
            sendMsg('App', data)
          }
          catch (err){
            console.log('signin error is: ', err.message)
          }
          break
          case 'checkout':
             //{"username": "signup", "username": "", "bookings": ""}
              try{
            console.log(`[x] checkout received: ${msgObj.method}`);
            const data = await fetch('http://localhost:4000/checkout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(msgObj)
            })
            sendMsg('App', data)
          }
          catch (err){
            console.log('checkout error is: ', err.message)
          }
          break
          }
        },
        {
          noAck: true,
        }
      );
    });
  })
}
receiveMsg()

// module.exports = receiveMsg
