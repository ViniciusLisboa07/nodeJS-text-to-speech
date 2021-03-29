const express = require('express');

const homeController = require('../controllers/homeController');
const screenController = require('../controllers/screenController');
const loginController = require('../controllers/loginController');
const eletroController = require('../controllers/eletroController');
const medicacaoController = require('../controllers/medicacaoController');

const triagemController = require('../controllers/triagemController');

const consultorio1Controller = require('../controllers/consultorio1Controller');

const signInValidator = require('../validators/SignInValidator');

const router = express.Router();
router.use("/vendors",express.static(__dirname + "/vendors"));
router.use("/src/dist/js",express.static(__dirname + "/src/dist/js"));
 

// Rotas 
router.get('/login', loginController.index);
router.post('/login', signInValidator.signIn,  loginController.loginAction);

router.get('/', homeController.userMidleware, homeController.index);
router.post('/', homeController.homeAction);

router.get('/screen', screenController.index); 
router.post('/screen', screenController.screenAction); 
 
router.get('/eletro', homeController.userMidleware,  eletroController.index);
router.post('/eletro', eletroController.eletroAction);

router.get('/medicacao', homeController.userMidleware,  medicacaoController.index);
router.post('/medicacao', medicacaoController.medicacaoAction);

router.get('/triagem', homeController.userMidleware, triagemController.index);
router.post('/triagem', triagemController.triagemAction);

router.get('/consultorio1', homeController.userMidleware, consultorio1Controller.index);
router.post('/consultorio1', consultorio1Controller.consultorio1Action);

module.exports = router;   