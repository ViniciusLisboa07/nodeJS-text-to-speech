const mongoose = require('mongoose');
const User = mongoose.model('User');
const Call = mongoose.model('Call');
const { Socket } = require("../utils/socket");

exports.index = async(req, res) => {
    const chamadasEletro = await Call.find({ consultorio: 'consultorio2' });

    let fila = [];
    let userName = req.user.nick;
    for (i in chamadasEletro) {

        fila.push({
            nomePaciente: chamadasEletro[i]._doc['nomePaciente'],
            consultorio: chamadasEletro[i]._doc['consultorio'],
            prioridade: chamadasEletro[i]._doc['prioridade'],
            id: chamadasEletro[i]._doc['_id']
        });

    }

    fila.sort((a, b) => a.prioridade > b.prioridade ? -1 : 1);

    res.render('consultorio2', { username: userName, fila: fila });
};

exports.consultorio2Action = async(req, res) => {
    let id = req.body.id;

    const chamada = await Call.updateOne({ _id: id }, { consultorio: 'consultorio2_Recepcao' });
    const alteracao = await Call.findOne({ _id: id });

    Socket.emit('call', alteracao);
    console.log('consultorio2Action');
    res.redirect('/consultorio2');
};