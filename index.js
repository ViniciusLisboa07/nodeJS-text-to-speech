const app = require('./app');
const mongoose = require('mongoose'); 


mongoose.connect('mongodb://127.0.0.1:27017/teste', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error)=>{
    console.log('Error: ' + error.message)
});

require('./models/Call');

app.set('port', 80);
const server = app.listen(app.get('port'), () => {
    console.log("Server rodando na porta: " + server.address().port);
});