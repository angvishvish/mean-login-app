var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var userSchema = new mongoose.Schema({
  username:   String,
  password:   String, //hash created from password
  created_at: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
  id: { type: Schema.ObjectId, ref: 'User' }, //should be changed to ObjectId, ref "User"
  created_by: String,
  created_at: {type: Date, default: Date.now},
  text:       String,
  archived:   { type: Boolean, default: false }
});

mongoose.model('User', userSchema);
mongoose.model('Post', postSchema);
