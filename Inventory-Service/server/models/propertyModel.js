const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  state: { type: String, required: false },
  city: {type: String, required: false},
  pricePerDay: {type: Number, required: false},
  address: { type: String, required: false},
  zipCode: { type: Number, required: false },
  quantity: { type: Number, required: false},
  specs: {type: Array, required: true},
  images: { type: Array, required: true }, //urls from supabase
});

module.exports = mongoose.model('Property', propertySchema);