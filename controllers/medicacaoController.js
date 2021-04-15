const { validationResult, matchedData } = require('express-validator');

const { Socket } = require("../utils/socket");

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Call = mongoose.model('Call');

exports.index = async (req, res) => {

    let user = req.user;
    let userName = user.name;

    const chamadasEletro = await Call.find({ consultorio: 'medicacao' });

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

    res.render('medicacao', { userName: userName, fila: fila });

}



exports.medicacaoAction = async (req, res) => {

    let id = req.body.id;
    
    const alteracao = await Call.findOne({ _id: id });
    const chamada = await Call.find({ _id: id }).updateOne({ consultorio: 'medicacao_Recepcao' });

    Socket.emit('call', alteracao);
    console.log('medicacaoAction');
    res.redirect('/medicacao');    

}