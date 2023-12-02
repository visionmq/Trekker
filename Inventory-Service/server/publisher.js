const amqplib = require('amqplib');

const exchangeName = 'trekker_topic';

export const sendMessage = async (key,msgObj) => {
    const connection = await amqplib.connect("amqp://localhost");

    const channel = await connection.createChannel()

    await channel.assertExchange(exchangeName, 'topic', {durable:true})

    console.log('sent: ',msgObj.body,' to ',key)

    setTimeout(() => {
        connection.close()
        process.exit(0)
    },500)
}