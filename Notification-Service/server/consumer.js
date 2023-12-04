const amqp = require('amqplib');
const nodemailer = require('nodemailer');

const exchange = 'trekker_topic';
const gmail = process.env.GMAIL_EMAIL;
const pw = process.env.GMAIL_PW;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: gmail,
    pass: pw,
  },
});

export const receive = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'topic', {durable: true})
  }
  catch (err) {
    console.log(err.message);
  }
  try {
    const NotifQueue = await channel.assertQueue('NotifQueue');
    channel.bindQueue(NotifQueue, exchange, '#.success');

    channel.consume(
      NotifQueue,
      async (msg) => { 
          const msgObj = await JSON.parse(msg.content.toString());
          console.log(`[x] App received: ${msgObj}`);

          const email = msgObj.email;
          const orderNum = msgObj.orderID;

          const mailOptions = {
            from: 'TrekkerRentals@gmail.com',
            to: email,
            subject: 'Your booking is complete!',
            text: `Your booking confirmation code is: ${orderNum}.`
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log('Error: could not send mail.', error);
            else console.log('Email confirmation sent!');
            });
          },
      { noAck: true }
    );
  }
  catch (err) {
    console.log(err.message);
  }
};