const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI = process.env.MONGO_URI_BILLING
mongoose.connect(mongoURI);
const Schema = mongoose.Schema

mongoose.connection.once('open', () => {
    console.log('connected to the orders DB by the Billing server')
});

const orders = new Schema({
  total: { type: Number, required: true},
  cardNumber: { type: String, required: true},
  user: {type: String, required: true}
})

module.exports = mongoose.model('Orders', orders)