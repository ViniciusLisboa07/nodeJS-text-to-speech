const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passportLocalMongoose = require('passport-local-mongoose')

const sessionSchema = new mongoose.Schema({
    _id:String,
    session:String
});
 
sessionSchema.plugin(passportLocalMongoose, { usernameField: 'name' });

const modelName = "Session";

if(mongoose.connection && mongoose.connection.models[modelName]){
    console.log('ses s io');
    module.exports = mongoose.connection.models[modelName];

} else {
    console.log('ses s io');
    module.exports = mongoose.model('Session', sessionSchema, 'sessions');
 
}
