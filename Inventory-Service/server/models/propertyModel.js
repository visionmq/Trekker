const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, //url from supabase
  description: { type: String, required: false },
  state: { type: String, required: false },
  city: {type: String, required: false},
  pricePerDay: {type: String, required: false},
  address: { type: String, required: false},
  zipCode: { type: String, required: false },
  quantity: { type: Number, required: false}
});

module.exports = mongoose.model('Property', propertySchema);