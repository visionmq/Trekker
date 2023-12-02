const amqp = require('amqplib');
let globalWs;

const exchangeName = 'trekker_topic';

export const receiveMsg = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'topic', { durable: true });

  const AppQueue = await channel.assertQueue('AppQueue');
  channel.bindQueue(AppQueue, exchangeName, 'App');
  channel.bindQueue(AppQueue, exchangeName, '#.success');

  channel.consume(
    AppQueue,
    (msg) => {
      const msgObj = msg.content.toString();
      console.log(
        `[x] App received: ${msgObj}, now to get this to the frontend...`
      );

      //ws function
      globalWs.send(msgObj); //send json back to fe via ws with instructions in body
    },
    {
      noAck: true,
    }
  );
};

/**
 * Web Socket
 *
 * It's possible that we just call the publisher.js sendMsg here
 * so that we don't have to go thru the server
 */

const { WebSocketServer } = require('ws');
const wsserver = new WebSocketServer({ port: 443 });

wsserver.on('connection', (ws) => {
  globalWs = ws;
  // ws.session = { secret: 'Secret Info Here' };
  // ws.on('close', () => dbg('Client has disconnected!'));

  ws.on('message', async (rawMessage) => {
    // let message;
    //   try {
    //     message = JSON.parse(rawMessage);
    //   } catch (err) {
    //     return dbg('Could not parse message: ', rawMessage);
    //   }
    //   // TODO:
    //   let response;
    //   try {
    //     switch (message.type) {
    //       case '':
    //         // NOTE: Initial handshake is done in Express. user_id must exist at this point.
    //         console.log('Client joined.');
    //         // Store properties on ws.session
    //         ws.session.user_id = message.user_id;
    //     }
    //     const state = {
    //           user_id: ws.session.user_id,
    //           room,
    //           entries,
    //         };
    //         const response = JSON.stringify({
    //           type: 'init',
    //           state,
    //         });
    //         ws.send(response);
    //         // break;
    //         } catch (err) {
    //     console.log(
    //       `ERROR: ${JSON.stringify(err)}. Unable to handle message: `,
    //       message
    //     );
    //   }
  });
});

//   fetch('/rabbit', {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json' },
//     body: msgObj,
//   })
//   .then(res => console.log('[x] Rabbit message sent to server'))
//   .catch(err => {
//     console.log(err)
//   })
