const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');
var session = require('express-session');

const mongoose = require('mongoose');
const User = mongoose.model('Users');

exports.index = async (req, res) => {

    res.render('login')
}

exports.loginAction = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect("/login");
        return;
    }

    const data = matchedData(req);

 
    const user = await User.findOne({ name: data.name })
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);


    try {
        user.token = token;
        user.save();

        req.session.user = user;
        req.session.token = token;

        req.flash('success', 'Login efetuado com sucesso!');

        res.redirect('/');
        
    } catch (err) {
        req.flash('error', 'Problemas no login!');
        res.redirect("/login");
    }

}  