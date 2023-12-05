const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.NOTIFICATION_PORT
const notifConsume = require('./consumer')
app.use(express.json());




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
    notifConsume();
    console.log(`listening on port ${PORT}`)
});
