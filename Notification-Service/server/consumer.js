const amqp = require('amqplib/callback_api');
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

const notifConsume = () => {
  amqp.connect('amqp://localhost', function (error, connection) {
    console.log('Notification MS connecting to the consumer.')
    if (error) console.log('error connecting to amqp: ', error.message)
    connection.createChannel(function (error, channel) {
      if (error) console.log('error connecting to the channel: ', error.message)
      channel.assertExchange(exchange, 'topic', { durable: true })
      channel.assertQueue('NotifQueue');
      channel.bindQueue('NotifQueue', exchange, '#.success');

      channel.consume(
        'NotifQueue',
        async (msg) => {
          const msgObj = JSON.parse(msg.content.toString());
          console.log(msgObj)
          const email = msgObj.body.email;
          const user = msgObj.body.user.uername;
          const orderNum = msgObj.body.orderID;
          console.log(user, orderNum);
          const mailOptions = {
            from: 'TrekkerRentals@gmail.com',
            to: email,
            subject: 'Trekker: Your booking is complete!',
            text: `Howdy! Your booking order number is: ${orderNum}.`
          };
          console.log(`Hi ${user}! Your booking order number is: ${orderNum}.`)

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log('Error: could not send mail.', error);
            else console.log('Email confirmation sent!');
          });
        },
        { noAck: true }
      )
    })
  })
};

module.exports = notifConsume;