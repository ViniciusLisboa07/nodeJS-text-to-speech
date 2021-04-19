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

exports.loginAction = function _callee3(req, res) {
  var auth;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.authenticate());

        case 2:
          auth = _context3.sent;
          console.log(req);
          auth(req.body.name, req.body.password, function _callee2(err, result) {
            var userDB, payload, token;
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(result == undefined || result == null)) {
                      _context2.next = 4;
                      break;
                    }

                    req.flash('error', "Problemas no login! [;-;] ");
                    res.redirect("/login");
                    return _context2.abrupt("return");

                  case 4:
                    _context2.next = 6;
                    return regeneratorRuntime.awrap(User.findOne({
                      name: req.body.name
                    }));

                  case 6:
                    userDB = _context2.sent;

                    if (!(userDB.sessionID != req.sessionID)) {
                      _context2.next = 15;
                      break;
                    }

                    if (!(userDB.sessionID == "")) {
                      _context2.next = 12;
                      break;
                    }

                    req.login(result, function () {});
                    _context2.next = 15;
                    break;

                  case 12:
                    req.flash('error', 'um usuario ja esta logado nesta conta');
                    res.redirect("/login");
                    return _context2.abrupt("return");

                  case 15:
                    ;
                    payload = (Date.now() + Math.random()).toString();
                    _context2.next = 19;
                    return regeneratorRuntime.awrap(bcrypt.hash(payload, 10));

                  case 19:
                    token = _context2.sent;
                    console.log('tooooken: ' + token);
                    console.log(req.sessionID);
                    console.log(userDB.sessionID);
                    _context2.next = 25;
                    return regeneratorRuntime.awrap(User.updateOne({
                      name: req.body.name
                    }, {
                      token: token,
                      sessionID: req.sessionID
                    }));

                  case 25:
                    req.login(result, function () {});

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

                  case 27:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.logout = function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.updateOne({
            _id: req.user._id
          }, {
            sessionID: ''
          }));

        case 2:
          req.logout();
          req.session.destroy();
          res.redirect('/login');

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};