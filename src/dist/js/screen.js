/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dev/screen.js":
/*!***************************!*\
  !*** ./src/dev/screen.js ***!
  \***************************/
/***/ (() => {

eval("var pacienteTela = document.getElementById('pacienteTela');\r\nvar consultorioTela = document.getElementById('consultorioTela');\r\n\r\nwindow.onload = () => {\r\n\r\n    var audio = document.getElementById('audioChamada');\r\n    if (audio) {\r\n\r\n        var audioEffect = new Audio(\"audios/bellEffect.wav\");\r\n        audioEffect.load();\r\n        audioEffect.play();\r\n\r\n        audio.load();\r\n        setTimeout(() => {\r\n            audio.play();\r\n        }, 3000);\r\n\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://node-tts/./src/dev/screen.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/dev/screen.js"]();
/******/ 	
/******/ })()
;