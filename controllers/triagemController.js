const mongoose = require('mongoose');
const User = mongoose.model('User');
const Call = mongoose.model('Call');
const { Socket } = require("../utils/socket");

exports.index = async(req, res) => {
    const chamadasTriagem = await Call.find({ consultorio: 'triagem' });
    const chamadasTelaTriagem = await Call.find({ consultorio: 'tela_triagem' });

    let fila = [];
    let filaPacientesProntos = [];
    let username = req.user.nick;

    for (i in chamadasTriagem) {

        fila.push({
            nomePaciente: chamadasTriagem[i]._doc['nomePaciente'],
            consultorio: chamadasTriagem[i]._doc['consultorio'],
            repetir: chamadasTriagem[i]._doc['repetir'],
            prioridade: chamadasTriagem[i]._doc['prioridade'],
            id: chamadasTriagem[i]._doc['_id']
        });
    };

    fila.sort((a, b) => a.prioridade > b.prioridade ? -1 : 1);


    for (i in chamadasTelaTriagem) {

        filaPacientesProntos.push({
            nomePaciente: chamadasTelaTriagem[i]._doc['nomePaciente'],
            prioridade: chamadasTelaTriagem[i]._doc['prioridade'],
            id: chamadasTelaTriagem[i]._doc['_id']
        });
    };

    filaPacientesProntos.sort((a, b) => a.prioridade > b.prioridade ? -1 : 1);

    res.render('triagem', { userName: username, fila: fila, filaPacientesProntos: filaPacientesProntos });
};

exports.triagemAction = async(req, res) => {
    let id = req.body.id;
    console.log(req.body);
    const alteracao = await Call.findOne({ _id: id });

    const chamada = await Call.find({ _id: id }).updateOne({ consultorio: 'triagem_Recepcao' });

    Socket.emit('call', alteracao);
    console.log('triagemAction: ;-; ');
    res.redirect('/triagem');
};

exports.delAction = async(req, res) => {

    let id = req.body.id;
    await Call.findOneAndRemove({ _id: id });
    console.log('deletou triagem!!!');

    req.flash('querySuccess', 'Consulta encerrada com sucesso!');
    res.redirect('/triagem');

};

exports.enviarPaciente = async(req, res) => {

    var id = req.body.id;
    var consultorio = req.body.consultorio;
    var prioridade = req.body.prioridade;

    var callUpdate = await Call.updateOne({ _id: id }, { consultorio, prioridade });
    var alteracao = await Call.findOne({ _id: id });

    if (consultorio == "consultorio1") {
        Socket.emit('consultorio1', alteracao);

    } else if (consultorio == "consultorio2") {
        Socket.emit('consultorio2', alteracao);

    } else if (consultorio == "consultorio3") {
        Socket.emit('consultorio3', alteracao);

    }

    req.flash('querySuccess', 'Paciente enviado ao médico com sucesso!');
    res.redirect('/triagem');
}