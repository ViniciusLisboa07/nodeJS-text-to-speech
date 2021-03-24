const mongoose = require('mongoose');
const User = mongoose.model('User');
const Call = mongoose.model('Call');
const { Socket } = require("../utils/socket");

exports.userMidleware = async (req, res, next) => {
    if (!req.query.token && !req.body.token && !req.session.token) {
        req.flash("error", "Efetue o LogIn 1!");
        res.redirect('/login');
        return;
    }

    let token = '';
    if (req.query.token) {
        token = req.query.token;
    } else if (req.body.token) {
        token = req.body.token;
    } else if (req.session.token) {
        token = req.session.token;
    }

    if (token == "") {
        req.flash("error", "Efetue o LogIn 2!");
        res.redirect('/login');
        return;
    }

    const user = await User.findOne({ token: token });

    if (!user) {
        req.flash("error", "Efetue o LogIn 3!");
        res.redirect('/login')
        return;
    }

    next();
};

exports.index = async (req, res) => {
    let userName = req.session.user['name'];
    const chamadasEletro = await Call.find({ consultorio: 'eletro_Recepcao' });

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

    {
        console.log('=================================================');

        let alteracao = await Call.create({ nomePaciente: nomePaciente, consultorio: consultorio, repetir: repetir, prioridade: prioridade });

        Socket.emit('eletroCall', alteracao);
        res.redirect('/');
    }
    // console.log(req.session);
};   