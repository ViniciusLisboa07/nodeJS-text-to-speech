const express = require('express');
const router = require('./routes/main');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const helpers = require('./helpers');
const dotenv = require('dotenv').config()
const io = require('socket.io');

const cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('express-flash')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser(process.env.SECRECT));

app.use(session({

    resave : true,
    saveUninitialized : true,
    secret : process.env.SECRECT,
    store: MongoStore.create({ 
        mongoUrl: 'mongodb://localhost:27017/tts',
        autoRemove: 'interval',
        autoRemoveInterval: 10 // In minutes. Default
    })

}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    next();
});

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Rotas
app.use('/', router);

app.engine('mst', mustache());

app.use("/src",express.static(__dirname + '/src'));
app.use("/node_modules",express.static(__dirname + '/node_modules'));
app.use("/utils",express.static(__dirname + '/utils'));

app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app;