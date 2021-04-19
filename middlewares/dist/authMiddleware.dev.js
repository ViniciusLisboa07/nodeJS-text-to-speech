"use strict";

var mongoose = require('mongoose');

var User = mongoose.model('User');

var bcrypt = require('bcrypt');

module.exports.isLogged = function _callee(req, res, next) {
  var user, route;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = req.user;
          route = req.route;
          console.log('-----');
          console.log(req.user); // Protegento rotas, se o usuário nao estiver logado

          if (req.isAuthenticated()) {
            _context.next = 8;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar está página!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 8:
          if (!(user.name == 'consultorio1' && route.path != '/consultorio1')) {
            _context.next = 14;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar outra página além do Consutório 1!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 14:
          if (!(user.name == 'consultorio2' && route.path != '/consultorio2')) {
            _context.next = 20;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar outra página além do Consutório 2!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 20:
          if (!(user.name == 'consultorio3' && route.path != '/consultorio3')) {
            _context.next = 26;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar outra página além do Consutório 2!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 26:
          if (!(user.name == 'eletro' && route.path != '/eletro')) {
            _context.next = 32;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar outra página além do Eletro!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 32:
          if (!(user.name == 'medicacao' && route.path != '/medicacao')) {
            _context.next = 38;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar outra página além da Medicação!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 38:
          if (!(user.name == 'triagem' && (route.path == '/triagem' || route.path == '/enviarAoMedico'))) {
            _context.next = 44;
            break;
          }

          req.flash('success', ':)');
          res.redirect('/login');
          next();
          _context.next = 48;
          break;

        case 44:
          if (!(user.name == 'recepcao' && route.path != '/')) {
            _context.next = 48;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar outra página além da Recepção!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 48:
          next();

        case 49:
        case "end":
          return _context.stop();
      }
    }
  });
};