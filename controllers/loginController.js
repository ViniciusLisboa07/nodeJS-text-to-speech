const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.index = (req, res) => {
    res.render('login')
}

exports.loginAction = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({ error: errors.mapped() })
        return;
    }

    const data = matchedData(req);

    const user = User.findOne({ name: data.name })

    const payload = (Date.now() + Math.random().toString());
    const token = bcrypt.hash(payload, 10);

    user.token = token;
    user.save();

    if(!user){
        res.json({error: 'Nome não encontrado.'});
        return;
    }

    res.redirect('/');
}