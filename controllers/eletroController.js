const mongoose = require('mongoose');
const User = mongoose.model('Users');
const Call = mongoose.model('Call');

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
    fila.sort((a, b) => a.prioridade > b.prioridade ? -1 : 1);
    // console.log("123 : " + fila);
    res.render('eletro', { fila: fila });
};

exports.eletroAction = async (req, res) => {
    let id = req.body.id;
    const chamada = await Call.find({ _id: id }).updateOne({ consultorio: 'eletroRecepcao' });

    res.redirect('/eletro');
    console.log(chamada);
};  