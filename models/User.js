const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        trim: true,
        required: ''
    },
    
    token:String

});

userSchema.plugin(passportLocalMongoose, { usernameField: 'name' });


const modelName = "Users";

if(mongoose.connection && mongoose.connection.models[modelName]){

    module.exports = mongoose.connection.models[modelName]

} else {

    module.exports = mongoose.model( modelName, userSchema);

}
