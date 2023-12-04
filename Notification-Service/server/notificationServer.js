const express = require('express');
const app = express();
const PORT = process.env.BILLING_PORT
require('dotenv').config()
const notifConsumer = require('./consumer')
app.use(express.json());


notifConsumer();

app.use((error, req, res, next) => {
    const defaultError = {
        log: 'There was an unknown middleware error in Notification',
        status: 500,
        message: 'Housten, there\'s a problem sending a notification',
    };
    const errObj = Object.assign(defaultError, err)
    res.status(errObj.status).json(errObj.message)
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});
