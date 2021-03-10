const express = require('express');

const homeController = require('../controllers/homeController');
const screenController = require('../controllers/screenController');
const loginController = require('../controllers/loginController');

const signInValidator = require('../validators/SignInValidator')

const router = express.Router();
router.use("/vendors",express.static(__dirname + "/vendors"));
router.use("/src/dist/js",express.static(__dirname + "/src/dist/js"));


// Rotas 
router.get('/login', loginController.index);
router.post('/login', signInValidator.signIn,  loginController.loginAction);

router.get('/', homeController.index);

router.get('/screen', screenController.index); 
router.post('/screen', screenController.screenAction); 

module.exports = router;