const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    lat: Number,
    lng: Number,
    status:{
      type:Boolean,
      default:false
    }
  });
  
  const Location = mongoose.model('Location', locationSchema);

  module.exports = Location;