const { exec } = require('child_process');
const fs = require('fs');
const mongoose = require('mongoose');
const Call = mongoose.model('Call');
const { Socket } = require("../utils/socket");

exports.index = (req, res) => {

    res.render('screen');

};

exports.screenAction = async(req, res) => {

    console.log(req.body)
    var id = req.body.id;

    var call = await Call.findOne({ _id: id });
    console.log(call)
    var endIndex = call._doc['consultorio'].indexOf('_');
    var consultorio = call._doc['consultorio'].slice(0, endIndex);

    var str = "Por favor: " + call._doc['nomePaciente'] + " se dirija ao " + consultorio;

    fs.writeFile('textos/helloworld.txt', str, function(err) {
        if (err) return console.log(err);
    });

    var dataAtual = Date.now();
    var nomeAudio = dataAtual;

    const myPromise = new Promise((resolve, reject) => {

        var audioFile = exec('balcon.exe -n "IVONA 2 Ricardo" -f textos/helloworld.txt -w audios/' + nomeAudio + '.wav', (err) => {
            if (err) {
                console.log("Erro ao executar o balcon: " + err);
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

    if (consultorio == 'triagem') {
        let updateTriagemTela = await Call.find({ _id: id }).updateOne({ consultorio: 'tela_triagem' });
        let alteracao = await Call.findOne({ _id: id });

        Socket.emit('triagemTela_call', alteracao);
        console.log('tela-triagemqweqwe');

    } else {
        await Call.deleteOne({ _id: id });
    }

};