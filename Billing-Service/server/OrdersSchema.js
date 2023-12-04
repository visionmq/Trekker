require('dotenv').config()
const mongoURI = process.env.MONGO_URI_BILLING
mongoose.connect(mongoURI);
const Schema = mongoose.Schema

mongoose.connection.once('open', () => {
    console.log('connected to the users DB by the users server')
});

const orders = new Schema({
  total: { type: Number, required: true, unique: true},
  cardNumber: { type: String, required: true},
  user: {type: String, required: true}
})

module.exports = mongoose.model('Orders', orders)