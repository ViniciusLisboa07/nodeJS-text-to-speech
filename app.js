const express = require('express');
const router = require('./routes/main');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const helpers = require('./helpers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv').config()

const cookieParser = require('cookie-parser')
const session = require('express-session');
const flash = require('express-flash')


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser(process.env.SECRECT));
app.use(session({

    resave : false,
    saveUninitialized : false,
    secret : process.env.SECRECT

}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    next();
});

 
// Rotas
app.use('/', router);

app.engine('mst', mustache());

app.use("/src",express.static(__dirname + '/src'));

app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app;