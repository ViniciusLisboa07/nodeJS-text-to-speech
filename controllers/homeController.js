const { validationResult, matchedData } = require('express-validator');
const mongoose = require('mongoose');
const User = mongoose.model('Users');


exports.userMidleware = async (req, res, next) =>{
    if(!req.query.token && !req.body.token && !req.session.token) {
        req.flash("error", "Efetue o LogIn 1!");
        res.redirect('/login');
        return;
    }   

    let token = '';
    if (req.query.token) {
        token = req.query.token;
    } else if (req.body.token) {
        token = req.body.token;
    } else if (req.session.token) {
        token = req.session.token;
    }

    if(token == "") {
        req.flash("error", "Efetue o LogIn 2!");
        res.redirect('/login')
        return;
    }

    const user = await User.findOne({ token: token })

    if(!user){
        req.flash("error", "Efetue o LogIn 3!");
        res.redirect('/login')
        return;
    }

    next();
};

exports.index = async (req, res) => {  
     let userName = req.session.user['name'];

    res.render('home', { userName: userName }); 
}; 