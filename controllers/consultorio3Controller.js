const mongoose = require('mongoose');
const User = mongoose.model('User');
const Call = mongoose.model('Call');
const { Socket } = require("../utils/socket");

exports.index = async(req, res) => {
    const chamadasEletro = await Call.find({ consultorio: 'consultorio3' });

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

    res.render('consultorio3', { username: userName, fila: fila });
};

exports.consultorio3Action = async(req, res) => {
    let id = req.body.id;

    const alteracao = await Call.findOne({ _id: id });
    const chamada = await Call.find({ _id: id }).updateOne({ consultorio: 'consultorio3_Recepcao' });

    Socket.emit('call', alteracao);
    console.log('consultorio3Action');
    res.redirect('/consultorio3');
};