var mongoose = require('mongoose'),  Schema   = mongoose.Schema;
var user = require('./user.js');

var friendSchema = new Schema({  
  idUser:     { type: String },
  idFriends:  [{ type: Schema.Types.ObjectId, ref: 'user'}]
});

module.exports = mongoose.model('friend', friendSchema);