const express = require('express');
const router = require('./routes/main');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const helpers = require('./helpers');
 
const app = express();

app.use((req, res, next) => {
    res.locals.h = helpers;
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.use('/', router);

app.engine('mst', mustache());

app.use("/src",express.static(__dirname + '/src'));

app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app;