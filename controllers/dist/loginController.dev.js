"use strict";

var _require = require('express-validator'),
    validationResult = _require.validationResult,
    matchedData = _require.matchedData;

var bcrypt = require('bcrypt');

var session = require('express-session');

var mongoose = require('mongoose');

var User = mongoose.model('User');

exports.index = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render('login');

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.loginAction = function _callee2(req, res) {
  var errors, data, user, payload, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 4;
            break;
          }

          res.redirect("/login");
          return _context2.abrupt("return");

        case 4:
          _context2.prev = 4;
          data = matchedData(req);
          _context2.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            name: data.name
          }));

        case 8:
          user = _context2.sent;
          payload = (Date.now() + Math.random()).toString();
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(payload, 10));

        case 12:
          token = _context2.sent;
          user.token = token;
          user.save();
          req.session.user = user;
          req.session.token = token;

          if (user.name == 'recepcao') {
            req.flash('success', 'Login efetuado com sucesso!');
            res.redirect('/');
          } else if (user.name == 'eletro') {
            req.flash('success', 'Login efetuado na eletro com sucesso!');
            res.redirect('/eletro');
          } else if (user.name == 'medicacao') {
            req.flash('success', 'Login efetuado em Medicação com sucesso!');
            res.redirect('/medicacao');
          } else if (user.name == 'triagem') {
            req.flash('success', 'Login efetuado em Triagem com sucesso!');
            res.redirect('/triagem');
          } else if (user.name == 'consultorio1') {
            req.flash('success', 'Login efetuado no Consultorio 1 com sucesso');
            res.redirect('/consultorio1');
          } else if (user.name == 'consultorio2') {
            req.flash('success', 'Login efetuado no Consultorio 2 com sucesso');
            res.redirect('/consultorio2');
          } else if (user.name == 'consultorio3') {
            req.flash('success', 'Login efetuado no Consultorio 3 com sucesso');
            res.redirect('/consultorio3');
          }

          _context2.next = 25;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](4);
          console.log("Erro: " + _context2.t0);
          req.flash('error', 'Problemas no login!');
          res.redirect("/login");

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 20]]);
};