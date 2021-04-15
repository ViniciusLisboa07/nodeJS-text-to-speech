const mongoose = require('mongoose');
const User = mongoose.model('User');

const bcrypt = require('bcrypt');

module.exports.isLogged = async (req, res, next) => {
    let user = req.user;
    let route = req.route;

    // Protegento rotas, se o usuário nao estiver logado
    if(!req.isAuthenticated()){
        req.flash('error', 'Você não tem permissão para acessar está página!')
        res.redirect('/login');
        return;
    }

    // console.log(user)
    // let userDB = await User.findOne({ _id: user._id });
    // userDB = userDB._doc;
    
    // console.log('/////-=-=')
    // console.log(req.sessionID);
    // console.log(user.sessionID);

    // if(!(req.sessionID == user.sessionID)){
    //     req.flash('error', "Você foi deslogado! :(")
    //     res.redirect('/login');
    //     return;
    // }
    
    // Protegendo rotas, para cada usuário
    if(user.name == 'consultorio1' && route.path != '/consultorio1'){
        req.flash('error', 'Você não tem permissão para acessar outra página além do Consutório 1!')
        res.redirect('/login');
        return;
    } else if (user.name == 'consultorio2' && route.path != '/consultorio2') {
        req.flash('error', 'Você não tem permissão para acessar outra página além do Consutório 2!')
        res.redirect('/login');
        return;
    } else if (user.name == 'consultorio3' && route.path != '/consultorio3') {
        req.flash('error', 'Você não tem permissão para acessar outra página além do Consutório 2!')
        res.redirect('/login');
        return;
    } else if (user.name == 'eletro' && route.path != '/eletro') {
        req.flash('error', 'Você não tem permissão para acessar outra página além do Eletro!')
        res.redirect('/login');
        return;
    } else if (user.name == 'medicacao' && route.path != '/medicacao') {
        req.flash('error', 'Você não tem permissão para acessar outra página além da Medicação!')
        res.redirect('/login');
        return;
    } else if (user.name == 'triagem' && (route.path == '/triagem' || route.path == '/enviarAoMedico')) {
        req.flash('success', ':)')
        res.redirect('/login');
        next();
    } else if (user.name == 'recepcao' && route.path != '/') {
        req.flash('error', 'Você não tem permissão para acessar outra página além da Recepção!')
        res.redirect('/login');
        return;
    }

    next();
};