const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        trim: true,
        required: ''
    },
    nick: {
        type: String,
        required: ''
    },
    sessionID:String,
    token:String

});
 
userSchema.plugin(passportLocalMongoose, { usernameField: 'name' });

const modelName = "User";

module.exports = mongoose.model('User', userSchema);