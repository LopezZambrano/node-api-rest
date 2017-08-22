var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var friendSchema = new Schema({  
  idUser:     { type: String },
  idFriends:  { type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
               }
});

module.exports = mongoose.model('friend', friendSchema);