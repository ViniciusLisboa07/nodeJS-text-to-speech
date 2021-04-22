const mongoose = require('mongoose');
const User = mongoose.model('User');
const Call = mongoose.model('Call');


const { Socket } = require("../utils/socket");

exports.index = async (req, res) => {
    console.log(req.session.id);

    let user = req.user;
    let userName = user.name;

    console.log("-=-=-=-=-=-=-=");
    console.log(Socket.clients());

    const chamadasEletro = await Call.find( { "consultorio": { "$regex": "_Recepcao"} });

    let fila = [];
    for (i in chamadasEletro) {

        fila.push({
            nomePaciente: chamadasEletro[i]._doc['nomePaciente'],
            consultorio: chamadasEletro[i]._doc['consultorio'],
            repetir: chamadasEletro[i]._doc['repetir'],
            prioridade: chamadasEletro[i]._doc['prioridade'],
            id: chamadasEletro[i]._doc['_id']
        })

    }
    fila.sort((a, b) => a.prioridade > b.prioridade ? -1 : 1);

    res.render('home', { userName: userName, fila: fila });
    
};

exports.homeAction = async (req, res) => {

    let nomePaciente = req.body.nomePaciente;
    let consultorio = req.body.consultorio;
    let repetir = req.body.repetir;
    let prioridade = req.body.prioridade;

    let alteracao = await Call.create({ nomePaciente: nomePaciente, consultorio: consultorio, repetir: repetir, prioridade: prioridade })

    
    if(consultorio == 'eletro') {
        console.log('=================================================');

        Socket.emit('eletroCall', alteracao);
        res.redirect('/');
    } else if (consultorio == 'medicacao') {
    
        console.log("medicacaao 123123");
        Socket.emit('medicacao_call', alteracao);
        res.redirect('/');
    } else if (consultorio == 'triagem') {
        
        console.log('triagemmm');
        Socket.emit('triagem_call', alteracao);
        res.redirect('/');
    } else if (consultorio == 'consultorio1') {
        
        console.log('consultorio1');
        Socket.emit('consultorio1_call', alteracao);
        res.redirect('/');
    } else if (consultorio == 'consultorio2') {

        console.log('consultorio2');
        Socket.emit('consultorio2_call', alteracao);
        res.redirect('/');
    } else if (consultorio == 'consultorio3') {

        console.log('consultorio3');
        Socket.emit('consultorio3_call', alteracao);
        res.redirect('/');
    }
};