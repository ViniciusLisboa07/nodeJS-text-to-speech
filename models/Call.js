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
    }, 
    prioridade : {
        type:String, 
        required: "A chamada deve conter uma prioridade."
    }
 
});
const modelName = "Call";

if(mongoose.connection && mongoose.connection.models[modelName]){

    module.exports = mongoose.connection.models[modelName]

} else {

    module.exports = mongoose.model( modelName, callSchema);

}
