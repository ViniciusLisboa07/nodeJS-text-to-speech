"use strict";

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Call = mongoose.model('Call');

var _require = require("../utils/socket"),
    Socket = _require.Socket;

exports.index = function _callee(req, res) {
    var chamadasEletro, fila;
    return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(Call.find({
                        consultorio: 'consultorio2'
                    }));

                case 2:
                    chamadasEletro = _context.sent;
                    fila = [];

                    for (i in chamadasEletro) {
                        fila.push({
                            nomePaciente: chamadasEletro[i]._doc['nomePaciente'],
                            consultorio: chamadasEletro[i]._doc['consultorio'],
                            prioridade: chamadasEletro[i]._doc['prioridade'],
                            id: chamadasEletro[i]._doc['_id']
                        });
                    }

                    fila.sort(function(a, b) {
                        return a.prioridade > b.prioridade ? -1 : 1;
                    });
                    res.render('consultorio2', {
                        fila: fila
                    });

                case 7:
                case "end":
                    return _context.stop();
            }
        }
    });
};

exports.consultorio2Action = function _callee2(req, res) {
    var id, chamada, alteracao;
    return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    id = req.body.id;
                    _context2.next = 3;
                    return regeneratorRuntime.awrap(Call.updateOne({
                        _id: id
                    }, {
                        consultorio: 'consultorio2_Recepcao'
                    }));

                case 3:
                    chamada = _context2.sent;
                    _context2.next = 6;
                    return regeneratorRuntime.awrap(Call.findOne({
                        _id: id
                    }));

                case 6:
                    alteracao = _context2.sent;
                    Socket.emit('call', alteracao);
                    console.log('consultorio2Action');
                    res.redirect('/consultorio2');

                case 10:
                case "end":
                    return _context2.stop();
            }
        }
    });
};