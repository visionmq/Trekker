const amqp = require('amqplib');

const exchangeName = 'trekker_topic';

//Key is the name of the microService, msgObj is an object that has method and message property.
//Method is like the action being performed (login, signup)
export const sendMsg = async (key, msgObj) => {

  //create a connection to localhost
  //create a channel/ear to listen to messages
  //define what type of channel it is (we decided on using a topic exchange)
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'topic', { durable: true });


  //sends out the msgObj to our topic exchange(exchangeName) with directions to our specified microservice(key)
  channel.publish(exchangeName, key, Buffer.from(JSON.stringify(msgObj)));
  console.log(`[x] App just sent: ${msgObj}`);

  setTimeout(() => {
    connection.close();
  }, 500);
};

module.exports = sendMsg
