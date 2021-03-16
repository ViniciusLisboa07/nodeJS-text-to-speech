const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');
var session = require('express-session');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Call = mongoose.model('Call');

exports.index = async (req, res) => {

    const user = await Call.find({ repetir: 1 });
    console.log(user);
    res.render('login');

}

exports.loginAction = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect("/login");
        return;
    }

    const data = matchedData(req);
    console.log(data)
    const user = await User.findOne({ name: data.name });
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    console.log(user);

    try {
        user.token = token;
        user.save();

        req.session.user = user;
        req.session.token = token;

        console.log(user.name);
        if (user.name == 'recepcao') { 
            req.flash('success', 'Login efetuado com sucesso!');
            res.redirect('/');
        } else if (user.name == 'eletro') {
            req.flash('success', 'Login efetuado na eletro com sucesso!');
            res.redirect('/eletro')
        }

    } catch (err) {
        req.flash('error', 'Problemas no login!');
        res.redirect("/login");
    }

}  