var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var pendingSchema = new Schema({  
  idUser:  { type: String },
  idPolls:   [{ type: String }],
  
});

module.exports = mongoose.model('pending', pendingSchema);