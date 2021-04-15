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
    token:String

});
 
userSchema.plugin(passportLocalMongoose, { usernameField: 'name' });

const modelName = "User";

if(mongoose.connection && mongoose.connection.models[modelName]){
    console.log('us er s');
    module.exports = mongoose.connection.models[modelName];

} else {
    console.log('us ers')
    module.exports = mongoose.model('User', userSchema, 'users');
 
}
