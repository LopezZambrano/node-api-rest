var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;
    mongooseEncryption = require('mongoose-field-encryption').fieldEncryption;


var userSchema = new Schema({  
  name:     { type: String },
  email: { type: String },
  password: { type: String },
  photo : { type: String },
});

userSchema.plugin(mongooseEncryption, {fields: ['password'], secret: '0470808'});

module.exports = mongoose.model('user', userSchema);