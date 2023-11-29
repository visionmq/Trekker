const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  name: { type: String, required: false },
  image: { type: String, required: true }, //url from supabase
  description: { type: String, required: true },
  state: { type: String, required: true },
  city: {type: String, required: true},
  pricePerDay: {type: String, required: true},
  address: { type: String, required: true},
  zipCode: { type: String, required: true },
});

module.exports = mongoose.model('Property', propertySchema);