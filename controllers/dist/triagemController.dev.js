"use strict";

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Call = mongoose.model('Call');

var _require = require("../utils/socket"),
    Socket = _require.Socket;

exports.index = function _callee(req, res) {
  var chamadasTriagem, chamadasTelaTriagem, fila, filaPacientesProntos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Call.find({
            consultorio: 'triagem'
          }));

        case 2:
          chamadasTriagem = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Call.find({
            consultorio: 'tela_triagem'
          }));

        case 5:
          chamadasTelaTriagem = _context.sent;
          fila = [];
          filaPacientesProntos = [];

          for (i in chamadasTriagem) {
            fila.push({
              nomePaciente: chamadasTriagem[i]._doc['nomePaciente'],
              consultorio: chamadasTriagem[i]._doc['consultorio'],
              repetir: chamadasTriagem[i]._doc['repetir'],
              prioridade: chamadasTriagem[i]._doc['prioridade'],
              id: chamadasTriagem[i]._doc['_id']
            });
          }

          ;
          fila.sort(function (a, b) {
            return a.prioridade > b.prioridade ? -1 : 1;
          });

          for (i in chamadasTelaTriagem) {
            filaPacientesProntos.push({
              nomePaciente: chamadasTelaTriagem[i]._doc['nomePaciente'],
              prioridade: chamadasTelaTriagem[i]._doc['prioridade'],
              id: chamadasTelaTriagem[i]._doc['_id']
            });
          }

          ;
          filaPacientesProntos.sort(function (a, b) {
            return a.prioridade > b.prioridade ? -1 : 1;
          });
          res.render('triagem', {
            fila: fila,
            filaPacientesProntos: filaPacientesProntos
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.triagemAction = function _callee2(req, res) {
  var id, alteracao, chamada;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.body.id;
          console.log(req.body);
          _context2.next = 4;
          return regeneratorRuntime.awrap(Call.findOne({
            _id: id
          }));

        case 4:
          alteracao = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(Call.find({
            _id: id
          }).updateOne({
            consultorio: 'triagem_Recepcao'
          }));

        case 7:
          chamada = _context2.sent;
          Socket.emit('call', alteracao);
          console.log('triagemAction: ;-; ');
          res.redirect('/triagem');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.delAction = function _callee3(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.body.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Call.findOneAndRemove({
            _id: id
          }));

        case 4:
          console.log('deletou triagem!!!');
          res.redirect('/triagem');
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log('Erro ao deletar: ' + _context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.enviarPaciente = function _callee4(req, res) {
  var id, consultorio, prioridade, callUpdate, alteracao;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.body.id;
          consultorio = req.body.consultorio;
          prioridade = req.body.prioridade;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Call.updateOne({
            _id: id
          }, {
            consultorio: consultorio,
            prioridade: prioridade
          }));

        case 5:
          callUpdate = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(Call.findOne({
            _id: id
          }));

        case 8:
          alteracao = _context4.sent;

          if (consultorio == "consultorio1") {
            Socket.emit('consultorio1', alteracao);
          } else if (consultorio == "consultorio2") {
            Socket.emit('consultorio2', alteracao);
          } else if (consultorio == "consultorio3") {
            Socket.emit('consultorio3', alteracao);
          }

          req.flash('querySuccess', 'Paciente enviado ao médico com sucesso!');
          res.redirect('/triagem');

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
};