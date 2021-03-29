const mongoose = require('mongoose');
const User = mongoose.model('User');
const Call = mongoose.model('Call');
const { Socket } = require("../utils/socket");
 
exports.index = async (req, res) => {
    const chamadasEletro = await Call.find({ consultorio: 'consultorio1' });

    let fila = [];

    for (i in chamadasEletro) {

        fila.push({
            nomePaciente: chamadasEletro[i]._doc['nomePaciente'],
            consultorio: chamadasEletro[i]._doc['consultorio'],
            repetir: chamadasEletro[i]._doc['repetir'],
            prioridade: chamadasEletro[i]._doc['prioridade'],
            id: chamadasEletro[i]._doc['_id']
        });

    }

    fila.sort((a, b) => a.prioridade > b.prioridade ? -1 : 1);

    res.render('consultorio1', { fila: fila });
};

exports.consultorio1Action = async (req, res) => {
    let id = req.body.id;
    
    const alteracao = await Call.findOne({ _id: id });
    const chamada = await Call.find({ _id: id }).updateOne({ consultorio: 'consultorio1_Recepcao' });

    Socket.emit('call', alteracao);
    console.log('consultorio1Action');
    res.redirect('/consultorio1');
};  