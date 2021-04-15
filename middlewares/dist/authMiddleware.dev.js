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
          route = req.route; // Protegento rotas, se o usuário nao estiver logado

          if (req.isAuthenticated()) {
            _context.next = 6;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar está página!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 6:
          if (!(user.name == 'consultorio1' && route.path != '/consultorio1')) {
            _context.next = 12;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar outra página além do Consutório 1!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 12:
          if (!(user.name == 'consultorio2' && route.path != '/consultorio2')) {
            _context.next = 18;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar outra página além do Consutório 2!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 18:
          if (!(user.name == 'consultorio3' && route.path != '/consultorio3')) {
            _context.next = 24;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar outra página além do Consutório 2!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 24:
          if (!(user.name == 'eletro' && route.path != '/eletro')) {
            _context.next = 30;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar outra página além do Eletro!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 30:
          if (!(user.name == 'medicacao' && route.path != '/medicacao')) {
            _context.next = 36;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar outra página além da Medicação!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 36:
          if (!(user.name == 'triagem' && (route.path == '/triagem' || route.path == '/enviarAoMedico'))) {
            _context.next = 42;
            break;
          }

          req.flash('success', ':)');
          res.redirect('/login');
          next();
          _context.next = 46;
          break;

        case 42:
          if (!(user.name == 'recepcao' && route.path != '/')) {
            _context.next = 46;
            break;
          }

          req.flash('error', 'Você não tem permissão para acessar outra página além da Recepção!');
          res.redirect('/login');
          return _context.abrupt("return");

        case 46:
          next();

        case 47:
        case "end":
          return _context.stop();
      }
    }
  });
};