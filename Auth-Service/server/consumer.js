const amqp = require('amqplib');
const sendMsg = require('./publisher.js')
const exchangeName = 'trekker_topic';

export const receiveMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'topic', { durable: true });

  const AuthQueue = await channel.assertQueue('AuthQueue');
  channel.bindQueue(AuthQueue, exchangeName, 'Auth');
  channel.bindQueue(AuthQueue, exchangeName, '#.success');

  channel.consume(
    AuthQueue,
    async (msg) => {
      switch(msg.method) {
        case 'signup':
          try{
        const msgObj = JSON.parse(msg.content.toString());
        console.log(`[x] App received: ${msgObj}`);
        const data = await fetch({
          method: POST,
          body: msgObj
        })//include the localhost
        sendMsg(key, data)
        //import method from Authpublisher to send message with loginOutcome
      }
      catch (err){
        console.log(err.message)
      }
        break
      }
    },
    {
      noAck: true,
    }
  );
};