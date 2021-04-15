"use strict";

var express = require('express');

var homeController = require('../controllers/homeController');

var screenController = require('../controllers/screenController');

var loginController = require('../controllers/loginController');

var eletroController = require('../controllers/eletroController');

var medicacaoController = require('../controllers/medicacaoController');

var triagemController = require('../controllers/triagemController');

var consultorio1Controller = require('../controllers/consultorio1Controller');

var consultorio2Controller = require('../controllers/consultorio2Controller');

var consultorio3Controller = require('../controllers/consultorio3Controller');

var authMiddleware = require('../middlewares/authMiddleware');

var signInValidator = require('../validators/SignInValidator');

var router = express.Router();
router.use("/vendors", express["static"](__dirname + "/vendors"));
router.use("/src/dist/js", express["static"](__dirname + "/src/dist/js")); // Rotas login

router.get('/login', loginController.index);
router.post('/login', signInValidator.signIn, loginController.loginAction);
router.get('/register', loginController.register);
router.post('/register', loginController.registerAction);
router.get('/logout', loginController.logout); // Rotas recepcao

router.get('/', authMiddleware.isLogged, homeController.index);
router.post('/', authMiddleware.isLogged, homeController.homeAction); // Rotas tela

router.get('/screen', screenController.index);
router.post('/screen', screenController.screenAction); // Rotas eletro

router.get('/eletro', authMiddleware.isLogged, eletroController.index);
router.post('/eletro', eletroController.eletroAction); // Rotas medicacao

router.get('/medicacao', authMiddleware.isLogged, medicacaoController.index);
router.post('/medicacao', medicacaoController.medicacaoAction); // Rotas triagem 

router.get('/triagem', authMiddleware.isLogged, triagemController.index);
router.post('/triagem', triagemController.triagemAction); // Rota para deletar chamada da triagem

router.post('/del', authMiddleware.isLogged, triagemController.delAction); // rota para enviar paciente para o consultorio

router.post('/enviarAoMedico', authMiddleware.isLogged, triagemController.enviarPaciente); // Rotas consultorio

router.get('/consultorio1', authMiddleware.isLogged, consultorio1Controller.index);
router.post('/consultorio1', consultorio1Controller.consultorio1Action);
router.get('/consultorio2', authMiddleware.isLogged, consultorio2Controller.index);
router.post('/consultorio2', consultorio2Controller.consultorio2Action);
router.get('/consultorio3', authMiddleware.isLogged, consultorio3Controller.index);
router.post('/consultorio3', consultorio3Controller.consultorio3Action);
module.exports = router;