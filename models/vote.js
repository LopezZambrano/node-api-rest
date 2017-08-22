var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var voteSchema = new Schema({  
  idPoll:  { type: String },
  options:   { type: Object },
  
});

module.exports = mongoose.model('vote', voteSchema);