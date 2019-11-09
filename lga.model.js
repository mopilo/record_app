const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let LGA = new Schema({
  person_name: {
    type: String,
    required: true,
  },
  lga_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  }
},{
    collection: 'lga'
});

module.exports = mongoose.model('LGA', LGA);