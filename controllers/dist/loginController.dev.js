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

exports.loginAction = function (req, res) {
  var auth = User.authenticate();
  console.log(req.body);
  auth(req.body.name, req.body.password, function (err, result) {
    console.log(result); // console.log(err); 

    if (!result) {
      req.flash('error', "Problemas no login! [;-;] ");
      res.redirect("/login");
      return;
    }

    ;
    var data = matchedData(req);
    var user = User.findOne({
      name: data.name
    });
    var payload = (Date.now() + Math.random()).toString();
    var token = bcrypt.hash(payload, 10);
    user.token = token;
    user.save();
    req.session.user = user;
    req.session.token = token;
    res.redirect('/'); // if (user.name == 'recepcao') { 
    //     req.flash('success', 'Login efetuado com sucesso!');
    //     res.redirect('/');
    // } else if (user.name == 'eletro') {
    //     req.flash('success', 'Login efetuado na eletro com sucesso!');
    //     res.redirect('/eletro');
    // } else if (user.name == 'medicacao') {
    //     req.flash('success', 'Login efetuado em Medicação com sucesso!');
    //     res.redirect('/medicacao');
    // } else if (user.name == 'triagem') {
    //     req.flash('success', 'Login efetuado em Triagem com sucesso!');
    //     res.redirect('/triagem');
    // } else if (user.name == 'consultorio1') {
    //     req.flash('success', 'Login efetuado no Consultorio 1 com sucesso');
    //     res.redirect('/consultorio1'); 
    // } else if (user.name == 'consultorio2') {
    //     req.flash('success', 'Login efetuado no Consultorio 2 com sucesso');
    //     res.redirect('/consultorio2');
    // } else if (user.name == 'consultorio3') {
    //     req.flash('success', 'Login efetuado no Consultorio 3 com sucesso');
    //     res.redirect('/consultorio3');
    // }
  }); // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     res.redirect("/login");
  //     return;
  // }
};