var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var userSchema = new Schema({  
  name:     { type: String },
  email: { type: String },
  password: { type: String },
  photo : { type: String }
});

module.exports = mongoose.model('user', userSchema);