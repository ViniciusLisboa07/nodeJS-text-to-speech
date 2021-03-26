const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');
var session = require('express-session');


const mongoose = require('mongoose');
const User = mongoose.model('User');
const Call = mongoose.model('Call');

exports.index = async (req, res) => {

    let userName = req.session.user['name'];
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

    console.log(req.body)
    var id = req.body.id;

    var call = await Call.findOne({ _id: id });
    var endIndex = call._doc['consultorio'].indexOf('_');
    var consultorio = call._doc['consultorio'].slice(0, endIndex);

    var str = "Atenção: " + call._doc['nomePaciente'] + " se dirija ao " + consultorio;

    fs.writeFile('textos/helloworld.txt', str, function (err) {
        if (err) return console.log(err);
    });

    var dataAtual = Date.now();
    var nomeAudio = dataAtual;

    const myPromise = new Promise((resolve, reject) => {

        var audioFile = exec('espeak -vpt-br -f textos/helloworld.txt --stdout > src/audios/' + nomeAudio + '.wav', (err) => {
            if (err) {
                console.log("Erro ao executar o espeak: " + err);
            }
        });

        if (audioFile) {
            resolve('Promise is resolved successfully.');
        } else {
            reject('Promise is rejected');
        }

    });



    myPromise.then((msg) => {

        setTimeout(
            () => {
                res.render('screen', { nomePaciente: call._doc['nomePaciente'], consultorio: consultorio, nomeAudio: nomeAudio });
            }, 1500);

        console.log("Success:" + msg);
    });

    await Call.deleteOne({ _id: id });

    
}