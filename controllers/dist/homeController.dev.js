"use strict";

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Call = mongoose.model('Call');

var _require = require("../utils/socket"),
    Socket = _require.Socket;

exports.userMidleware = function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // if (!req.query.token && !req.body.token && !req.session.token) {
          //     req.flash("error", "Efetue o LogIn 1!");
          //     res.redirect('/login');
          //     return;
          // }
          // let token = '';
          // if (req.query.token) {
          //     token = req.query.token;
          // } else if (req.body.token) {
          //     token = req.body.token;
          // } else if (req.session.token) {
          //     token = req.session.token;
          // }
          // if (token == "") {
          //     req.flash("error", "Efetue o LogIn 2!");
          //     res.redirect('/login');
          //     return;
          // }
          // const user = await User.findOne({ token: token });
          // if (!user) {
          //     req.flash("error", "Efetue o LogIn 3!");
          //     res.redirect('/login')
          //     return;
          // }
          next();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.index = function _callee2(req, res) {
  var userName, chamadasEletro, fila;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.body, req.session, req.query);
          userName = req.session.user['name'];
          _context2.next = 4;
          return regeneratorRuntime.awrap(Call.find({
            "consultorio": {
              "$regex": "_Recepcao"
            }
          }));

        case 4:
          chamadasEletro = _context2.sent;
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
          res.render('home', {
            userName: userName,
            fila: fila
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.homeAction = function _callee3(req, res) {
  var nomePaciente, consultorio, repetir, prioridade, alteracao;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          nomePaciente = req.body.nomePaciente;
          consultorio = req.body.consultorio;
          repetir = req.body.repetir;
          prioridade = req.body.prioridade;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Call.create({
            nomePaciente: nomePaciente,
            consultorio: consultorio,
            repetir: repetir,
            prioridade: prioridade
          }));

        case 6:
          alteracao = _context3.sent;

          if (consultorio == 'eletro') {
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

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};