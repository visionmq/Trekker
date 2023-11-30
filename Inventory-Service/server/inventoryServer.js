const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.INVENTORY_PORT //NOT working lol
const propertyController = require('./controllers/propertyController');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI_PROPERTIES //NOT working lol

mongoose.connect('mongodb+srv://Houses-R-Us:FgU27vKgvTY3kjJi@houses-r-us-houses.euebiu2.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.once('open', () => {
    console.log('connected to the properties DB by property server')
});

app.use(express.json());

app.post('/newListing', propertyController.addProperty, (req, res) => {
    return res.status(200).send('property added')
})

app.use((req, res, err, next) => {
    const defaultError = {
        log: 'There was an unknown middleware error in Inventory',
        status: 500,
        message: 'Housten, there\'s a problem with the database',
    };
    const errObj = Object.assign(defaultError, err)
    res.status(errObj.status).json(errObj.message)
});

app.listen(6000, () => {
    console.log(`server listening on port ${6000}`);
  });
