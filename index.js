const mongoose = require('mongoose'); 
const { ReplSet } = require('mongodb-topology-manager');

mongoose.connect('mongodb://127.0.0.1:27017/tts?replicaSet=rs0', { useNewUrlParser: true , useUnifiedTopology: true });
mongoose.Promise = global.Promise; 
mongoose.connection.on('error', (error)=>{
    console.log('Error: .-.' + error.message);
});

require('./models/Call');
require('./models/User');

// const User = mongoose.model('User');

// User.watch().on('change', (data) => {

//   console.log(data);

// });


require('dotenv').config({ path:'variables.env' });

const app = require('./app');

// app.set('port', 3579);
const server = app.listen(80, () => {
    console.log("Server rodando na porta: " + server.address().port);
});