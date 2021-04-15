const {
    validationResult,
    matchedData
} = require('express-validator');
const bcrypt = require('bcrypt');
var session = require('express-session');

const mongoose = require('mongoose');
const User = mongoose.model('User');

// const User = require('../models/User');

exports.index = async (req, res) => {

    res.render('login');

}

exports.register = (req, res) => {
    res.render('register');
};

exports.registerAction = (req, res) => {
    User.register(new User(req.body), req.body.password, (err) => {
        if (err) {
            console.log("Erro ao regisrtar: " + err);
            req.flash('error', "erro ao registrar");
            res.redirect('/register');
            return;
        };


        req.flash('success', "login efetuado com sucesso");
        res.redirect('/login');
    });
}

exports.loginAction = async (req, res) => {
    const auth = await User.authenticate();
    console.log(req.body);

    auth(req.body.name, req.body.password, (err, result) => {
        console.log('=======')
        console.log("aa " + result);
        console.log('====-==')

        if (result == undefined || result == null) {
            req.flash('error', "Problemas no login! [;-;] ");
            res.redirect("/login");
            return;

        }

        req.login(result, () => {});

        const payload = (Date.now() + Math.random()).toString();
        const token   = bcrypt.hash(payload, 10);

        var updateToken = User.updateOne({ _id: result._id }, { token: token });    

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

    })
    };

// const errors = validationResult(req);
// if (!errors.isEmpty()) {
//     res.redirect("/login");
//     return;
// }
