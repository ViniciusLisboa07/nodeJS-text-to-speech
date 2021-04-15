"use strict";

module.exports.isLogged = function (req, res, next) {
  var user = req.user;
  var route = req.route;

  if (!req.isAuthenticated()) {
    req.flash('error', 'Você não tem permissão para acessar está página!');
    res.redirect('/login');
    return;
  }

  console.log('@======@');
  console.log(req);
  console.log('@======@');

  if (user.name == 'consultorio1' && route.path != '/consultorio1') {
    req.flash('error', 'Você não tem permissão para acessar outra página além do Consutório 1!');
    res.redirect('/login');
    return;
  } else if (user.name == 'consultorio2' && route.path != '/consultorio2') {
    req.flash('error', 'Você não tem permissão para acessar outra página além do Consutório 2!');
    res.redirect('/login');
    return;
  } else if (user.name == 'consultorio3' && route.path != '/consultorio3') {
    req.flash('error', 'Você não tem permissão para acessar outra página além do Consutório 2!');
    res.redirect('/login');
    return;
  } else if (user.name == 'eletro' && route.path != '/eletro') {
    req.flash('error', 'Você não tem permissão para acessar outra página além do Eletro!');
    res.redirect('/login');
    return;
  } else if (user.name == 'medicacao' && route.path != '/medicacao') {
    req.flash('error', 'Você não tem permissão para acessar outra página além da Medicação!');
    res.redirect('/login');
    return;
  } else if (user.name == 'triagem' && route.path != '/triagem') {
    req.flash('error', 'Você não tem permissão para acessar outra página além da Triagem!');
    res.redirect('/login');
    return;
  } else if (user.name == 'recepcao' && route.path != '/') {
    req.flash('error', 'Você não tem permissão para acessar outra página além da Recepção!');
    res.redirect('/login');
    return;
  }

  next();
};