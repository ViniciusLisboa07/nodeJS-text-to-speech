const mongoose = require('mongoose');
const User = mongoose.model('Users');
const Call = mongoose.model('Call');

exports.index = async (req, res) => {
    const chamadasEletro = await Call.find({ consultorio: 'eletro' });

    let fila = [];
    for( i in chamadasEletro) {
        fila.push({ ...chamadasEletro[i] })
    }

    console.log(fila)
    res.render('eletro', { file: fila })
}