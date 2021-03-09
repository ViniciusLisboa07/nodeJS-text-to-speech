const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const callSchema = new mongoose.Schema({
    patientName: {
        type:String,
        trim: true,
        required:"A chamada precisa do nome do paciente."
    },
    clinic: {
        type:String,
        trim: true,
        required:"A chamada precisa de um consultório",    
    }
});

module.exports = mongoose.model('Call', callSchema);