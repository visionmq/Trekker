const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.BILLING_PORT;
const Orders = require('./OrdersSchema');
const billConsume = require('./consumer');
//const cors = require('cors');

app.use(express.json());
// const corsOptions = {
//     origin: 'http://localhost:8080',
//     credentials: true,
//   };
//   app.use(cors(corsOptions));


// const msg = {
//     method: 'checkout',
//     status: 'inv-preCharge-attempt-bill',
//     body: {
//         cardNum: '1111111111111111', 
//         total: 123.50,
//         user: {username: 'Justin'},
//         email: 'jcreyes917@gmail.com',
//     }
// };



app.use('/attempt-charge', async (req, res) => {
    
    const {cardNum, total, user, property} = req.body;
    // TODO: add the property title to the incoming variables from the body and add it to the Orders Schema to log with the order 
    if (cardNum === '1111111111111111') {
        const last4Digits = cardNum.slice(-4);
        const maskedNumber = last4Digits.padStart(cardNum.length, '*');

        const orderToStore = {
            total: total,
            cardNumber: maskedNumber,
            user: user,
            property: property,
        }
        try {
            console.log('trying to send this to the Orders DB: ', orderToStore)
            const storeOrder = await Orders.create(orderToStore);
            console.log('here is the created order id: ', storeOrder.id)
            const order = {id: storeOrder.id, cardNumber: maskedNumber};
            res.status(200).send(order);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(400);
        }
    }
    else res.sendStatus(400);
});

app.use((err, req, res, next) => {
    const defaultError = {
        log: 'There was an unknown middleware error in billing',
        status: 500,
        message: 'Housten, there\'s been a billing issue',
    };
    const errObj = Object.assign(defaultError, err)
    res.status(errObj.status).json(errObj.message)
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});

billConsume();
