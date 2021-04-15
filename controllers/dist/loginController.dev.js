"use strict";

var _require = require('express-validator'),
    validationResult = _require.validationResult,
    matchedData = _require.matchedData;

var bcrypt = require('bcrypt');

var session = require('express-session');

var mongoose = require('mongoose');

var User = mongoose.model('User'); // const User = require('../models/User');

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

exports.register = function (req, res) {
  res.render('register');
};

exports.registerAction = function (req, res) {
  User.register(new User(req.body), req.body.password, function (err) {
    if (err) {
      console.log("Erro ao regisrtar: " + err);
      req.flash('error', "erro ao registrar");
      res.redirect('/register');
      return;
    }

    ;
    req.flash('success', "login efetuado com sucesso");
    res.redirect('/login');
  });
};

exports.loginAction = function _callee2(req, res) {
  var auth;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.authenticate());

        case 2:
          auth = _context2.sent;
          console.log(req.body);
          auth(req.body.name, req.body.password, function (err, result) {
            console.log('=======');
            console.log("aa " + result);
            console.log('====-==');

            if (result == undefined || result == null) {
              req.flash('error', "Problemas no login! [;-;] ");
              res.redirect("/login");
              return;
            }

            req.login(result, function () {});
            var payload = (Date.now() + Math.random()).toString();
            var token = bcrypt.hash(payload, 10);
            var updateToken = User.updateOne({
              _id: result._id
            }, {
              token: token
            });

            if (result.name == 'recepcao') {
              req.flash('success', 'Login efetuado com sucesso!');
              res.redirect('/');
            } else if (result.name == 'eletro') {
              req.flash('success', 'Login efetuado na eletro com sucesso!');
              res.redirect('/eletro');
            } else if (result.name == 'medicacao') {
              req.flash('success', 'Login efetuado em Medicação com sucesso!');
              res.redirect('/medicacao');
            } else if (result.name == 'triagem') {
              req.flash('success', 'Login efetuado em Triagem com sucesso!');
              res.redirect('/triagem');
            } else if (result.name == 'consultorio1') {
              req.flash('success', 'Login efetuado no Consultorio 1 com sucesso');
              res.redirect('/consultorio1');
            } else if (result.name == 'consultorio2') {
              req.flash('success', 'Login efetuado no Consultorio 2 com sucesso');
              res.redirect('/consultorio2');
            } else if (result.name == 'consultorio3') {
              req.flash('success', 'Login efetuado no Consultorio 3 com sucesso');
              res.redirect('/consultorio3');
            }
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // const errors = validationResult(req);
// if (!errors.isEmpty()) {
//     res.redirect("/login");
//     return;
// }