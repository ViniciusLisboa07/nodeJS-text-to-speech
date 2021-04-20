const mongoose = require('mongoose');
const { ReplSet } = require('mongodb-topology-manager');

mongoose.connect('mongodb://127.0.0.1:27017/tts?replicaSet=rs0', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.log('Error: .-.' + error.message);
});


require('./models/Call');
require('./models/User');
require('./models/Session');


require('dotenv').config({ path: 'variables.env' });

const app = require('./app');
const http = require('http').Server(app);
const { io } = require("./utils/socket");
io.attach(http);

const server = http.listen(80, () => {
    console.log("Server rodando na porta: " + server.address().port);
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject;