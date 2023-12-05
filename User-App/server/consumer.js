// const amqp = require('amqplib/callback_api');

// const exchangeName = 'trekker_topic';

// const receiveMsg = () => {
//   amqp.connect('amqp://localhost', function (error, connection) {
//     if (error) console.log(error);
//     // console.log('Connection established', connection);

//     connection.createChannel(function (err, channel) {
//       // console.log('err', err, 'channel', channel);
//       channel.assertExchange(exchangeName, 'topic', { durable: true });

//       channel.assertQueue('AppQueue');
//       channel.bindQueue('AppQueue', exchangeName, 'App');
//       channel.bindQueue('AppQueue', exchangeName, '#.success');

//       channel.consume(
//         'AppQueue',
//         (msg) => {
//           const msgObj = msg.content.toString();
//           console.log(
//             `[x] App received: ${msgObj}, now sending thru websocket...`
//           );
//           //ws function
//           console.log('This is socketsend: ', socketSend);
//           socketSend(msgObj); //send json back to fe via ws with instructions in body
//         },
//         {
//           noAck: true,
//         }
//       );
//     });
//   });
// };

// module.exports = receiveMsg;
