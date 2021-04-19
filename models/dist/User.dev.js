"use strict";

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: ''
  },
  nick: {
    type: String,
    required: ''
  },
  sessionID: String,
  token: String
});
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'name'
});
var modelName = "User";

if (mongoose.connection && mongoose.connection.models[modelName]) {
  console.log('us er s');
  module.exports = mongoose.connection.models[modelName];
} else {
  console.log('us ers');
  module.exports = mongoose.model('User', userSchema, 'users');
}