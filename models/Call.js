const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const callSchema = new mongoose.Schema({
    nomePaciente: {
        type:String,
        trim: true,
        required:"A chamada precisa do nome do paciente."
    },
    consultorio: {
        type:String,
        trim: true,
        required:"A chamada precisa de um consultório",    
    },
    repetir: {
        type:Number,
        required:"A ser executada com uma quantidade determinada."
    }

});

module.exports = mongoose.model('Call', callSchema);