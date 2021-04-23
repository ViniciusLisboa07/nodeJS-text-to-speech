const mongoose = require('mongoose');
const User = mongoose.model('User');
const Call = mongoose.model('Call');
const { Socket } = require("../utils/socket");
 
exports.index = async (req, res) => {
    const chamadasConsultorio1 = await Call.find({ consultorio: 'consultorio1' });

    let fila = [];
    let userName = req.user.nick;

    for (i in chamadasConsultorio1) {

        fila.push({
            nomePaciente: chamadasConsultorio1[i]._doc['nomePaciente'],
            consultorio: chamadasConsultorio1[i]._doc['consultorio'],
            repetir: chamadasConsultorio1[i]._doc['repetir'],
            prioridade: chamadasConsultorio1[i]._doc['prioridade'],
            id: chamadasConsultorio1[i]._doc['_id']
        });

    }

    fila.sort((a, b) => a.prioridade > b.prioridade ? -1 : 1);

    res.render('consultorio1', { username: userName, fila: fila });
};

exports.consultorio1Action = async (req, res) => {
    let id = req.body.id;
    
    const alteracao = await Call.findOne({ _id: id });
    const chamada = await Call.updateOne({ _id: id }, { consultorio: 'consultorio1_Recepcao' });

    Socket.emit('call', alteracao);
    console.log('consultorio1Action');
    res.redirect('/consultorio1');
};  