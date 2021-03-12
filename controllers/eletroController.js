const mongoose = require('mongoose');
const User = mongoose.model('Users');
const Call = mongoose.model('Call');

exports.index = async (req, res) => {
    const chamadasEletro = await Call.find({ consultorio: 'eletro' });

    let fila = [];
    for( i in chamadasEletro) {
        fila.push({
            nomePaciente: chamadasEletro[i]._doc['nomePaciente'],
            consultorio: chamadasEletro[i]._doc['consultorio'],
            repetir: chamadasEletro[i]._doc['repetir']
        })
    }

    console.log(fila);
    res.render('eletro', { fila: fila })
} 