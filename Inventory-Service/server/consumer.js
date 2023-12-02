const amqplib = require('amqplib');
const { send } = require('process');
import { sendMessage } from './publisher';

const exchangeName = 'trekker_topic';

const sendMessage = async (key,msgObj) => {
    const connection = await amqplib.connect("amqp://localhost");

    const channel = await connection.createChannel()

    await channel.assertExchange(exchangeName, 'topic', {durable:true})

    const InvQueue = await channel.assertQueue('InvQueue')
    channel.publish(exchangeName,key,Buffer.from(msgObj))
    channel.bindQueue(invQueue,exchangeName,'App')
    channel.bindQueue(invQueue,exchangeName,'#.success')


    channel.consume(InvQueue, async (msg) => {
        const msgObj = JSON.parse(msg.content.toString())
        console.log('recieved: ',msgObj.body,' from ',key)
        await fetch('/newListing',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: msgObj
        })
        sendMessage(key,msgObj)
    }, 
    {
        noAck: true
    }
  )
}