"use strict";

var _require = require('express-validator'),
    validationResult = _require.validationResult,
    matchedData = _require.matchedData;

var _require2 = require("../utils/socket"),
    Socket = _require2.Socket;

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Call = mongoose.model('Call');

exports.index = function _callee(req, res) {
  var user, userName, chamadasEletro, fila;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = req.user;
          userName = user.name;
          _context.next = 4;
          return regeneratorRuntime.awrap(Call.find({
            consultorio: 'medicacao'
          }));

        case 4:
          chamadasEletro = _context.sent;
          fila = [];

          for (i in chamadasEletro) {
            fila.push({
              nomePaciente: chamadasEletro[i]._doc['nomePaciente'],
              consultorio: chamadasEletro[i]._doc['consultorio'],
              repetir: chamadasEletro[i]._doc['repetir'],
              prioridade: chamadasEletro[i]._doc['prioridade'],
              id: chamadasEletro[i]._doc['_id']
            });
          }

          fila.sort(function (a, b) {
            return a.prioridade > b.prioridade ? -1 : 1;
          });
          res.render('medicacao', {
            userName: userName,
            fila: fila
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.medicacaoAction = function _callee2(req, res) {
  var id, alteracao, chamada;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.body.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Call.findOne({
            _id: id
          }));

        case 3:
          alteracao = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(Call.find({
            _id: id
          }).updateOne({
            consultorio: 'medicacao_Recepcao'
          }));

        case 6:
          chamada = _context2.sent;
          Socket.emit('call', alteracao);
          console.log('medicacaoAction');
          res.redirect('/medicacao');

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
};