var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var pollSchema = new Schema({  
  title:    { type: String },
  ubication:{ type: String },
  commentary:  { type: String },
  negativeVote:   { type: Boolean },
  private:  { type: Boolean },
  oneVote:    { type: Boolean },
  possibilities : {type: Object},
  type: {type: String},
  idUser: {type: String}
});

module.exports = mongoose.model('poll', pollSchema);


