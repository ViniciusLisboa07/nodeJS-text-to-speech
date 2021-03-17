const mongoose = require('mongoose');
const User = mongoose.model('User');
const Call = mongoose.model('Call');
const { Socket } = require("../utils/socket");

exports.index = async (req, res) => {
    const chamadasEletro = await Call.find({ consultorio: 'eletro' });

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

    Call.watch({ $match: [{ operationType: 'update' }] } )
    .on('change', async (change) => {
        
        console.log(change.documentKey['_id']);
        let alteracao = await Call.findOne({ _id: change.documentKey['_id'] });

        Socket.emit('call', alteracao);

    });

    fila.sort((a, b) => a.prioridade > b.prioridade ? -1 : 1);

    res.render('eletro', { fila: fila });
};

exports.eletroAction = async (req, res) => {
    let id = req.body.id;
    const chamada = await Call.find({ _id: id }).updateOne({ consultorio: 'eletroRecepcao' });
    console.log('eletroAction');
    res.redirect('/eletro');
};  