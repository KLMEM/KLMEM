const mongoose = require('mongoose');


const memSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  topText: String,
  bottomText: String,

});


module.exports = mongoose.model('Mem', memSchema); 

