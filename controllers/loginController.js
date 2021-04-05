const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');
var session = require('express-session');

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.index = async (req, res) => {

    res.render('login');

}

exports.loginAction = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect("/login");
        return;
    }

    try {
        const data = matchedData(req);
        const user = await User.findOne({ name: data.name });
        
        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        user.token = token;
        user.save();
        req.session.user = user;
        req.session.token = token;

        if (user.name == 'recepcao') { 

            req.flash('success', 'Login efetuado com sucesso!');
            res.redirect('/');

        } else if (user.name == 'eletro') {

            req.flash('success', 'Login efetuado na eletro com sucesso!');
            res.redirect('/eletro');

        } else if (user.name == 'medicacao') {

            req.flash('success', 'Login efetuado em Medicação com sucesso!');
            res.redirect('/medicacao');
 
        } else if (user.name == 'triagem') {

            req.flash('success', 'Login efetuado em Triagem com sucesso!');
            res.redirect('/consultorio1');

        } else if (user.name == 'consultorio1') {

            req.flash('success', 'Login efetuado no Consultorio 1 com sucesso');
            res.redirect('/consultorio1');
            
        }

 
    } catch (err) {
        console.log("Erro: " + err);
        req.flash('error', 'Problemas no login!');
        res.redirect("/login");

    }

}