"use strict";

var express = require('express');

var router = require('./routes/main');

var bodyParser = require('body-parser');

var mustache = require('mustache-express');

var helpers = require('./helpers');

var dotenv = require('dotenv').config();

var io = require('socket.io');

var cookieParser = require('cookie-parser');

var session = require('express-session');

var flash = require('express-flash');

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser(process.env.SECRECT));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRECT
}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  next();
});
app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/User');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); // Rotas

app.use('/', router);
app.engine('mst', mustache());
app.use("/src", express["static"](__dirname + '/src'));
app.use("/node_modules", express["static"](__dirname + '/node_modules'));
app.use("/utils", express["static"](__dirname + '/utils'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');
module.exports = app;