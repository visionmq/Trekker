const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.INVENTORY_PORT
require('dotenv').config();

const mongoURI = process.env.MONGO_URI_PROPERTIES

mongoose.connect(mongoURI)

mongoose.connection.once('open', () => {
    console.log('connected to the properties DB by property server')
});

app.use(express.json());

app.post('/checkInv',(req,res) => {
    req.body
})

app.post('/updateInv')

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
