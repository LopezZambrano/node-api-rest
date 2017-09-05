var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var sendSchema = new Schema({  
  idUser:  { type: String },
  idPolls:   [{ type: String }],
  
});

module.exports = mongoose.model('send', sendSchema);