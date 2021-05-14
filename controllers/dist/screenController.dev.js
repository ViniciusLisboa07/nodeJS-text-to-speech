"use strict";

var _require = require('child_process'),
    exec = _require.exec;

var fs = require('fs');

var mongoose = require('mongoose');

var Call = mongoose.model('Call');

var _require2 = require("../utils/socket"),
    Socket = _require2.Socket;

exports.index = function(req, res) {
    res.render('screen');
};

exports.screenAction = function _callee(req, res) {
    var id, call, endIndex, consultorio, str, dataAtual, nomeAudio, myPromise, updateTriagemTela, alteracao;
    return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    console.log(req.body);
                    id = req.body.id;
                    _context.next = 4;
                    return regeneratorRuntime.awrap(Call.findOne({
                        _id: id
                    }));

                case 4:
                    call = _context.sent;
                    endIndex = call._doc['consultorio'].indexOf('_');
                    consultorio = call._doc['consultorio'].slice(0, endIndex);
                    str = "Atenção: " + call._doc['nomePaciente'] + " se dirija ao " + consultorio;
                    fs.writeFile('textos/helloworld.txt', str, function(err) {
                        if (err) return console.log(err);
                    });
                    dataAtual = Date.now();
                    nomeAudio = dataAtual;
                    myPromise = new Promise(function(resolve, reject) {
                        var audioFile = exec('espeak -vpt-br -f textos/helloworld.txt --stdout > src/audios/' + nomeAudio + '.wav', function(err) {
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
                    myPromise.then(function(msg) {
                        setTimeout(function() {
                            res.render('screen', {
                                nomePaciente: call._doc['nomePaciente'],
                                consultorio: consultorio,
                                nomeAudio: nomeAudio
                            });
                        }, 1500);
                        console.log("Success:" + msg);
                    });

                    if (!(consultorio == 'triagem')) {
                        _context.next = 24;
                        break;
                    }

                    _context.next = 16;
                    return regeneratorRuntime.awrap(Call.find({
                        _id: id
                    }).updateOne({
                        consultorio: 'tela_triagem'
                    }));

                case 16:
                    updateTriagemTela = _context.sent;
                    _context.next = 19;
                    return regeneratorRuntime.awrap(Call.findOne({
                        _id: id
                    }));

                case 19:
                    alteracao = _context.sent;
                    Socket.emit('triagemTela_call', alteracao);
                    console.log('tela-triagemqweqwe');
                    _context.next = 26;
                    break;

                case 24:
                    _context.next = 26;
                    return regeneratorRuntime.awrap(Call.deleteOne({
                        _id: id
                    }));

                case 26:
                case "end":
                    return _context.stop();
            }
        }
    });
};