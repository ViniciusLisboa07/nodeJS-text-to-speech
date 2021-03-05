const { exec } = require('child_process')
const fs = require('fs');

exports.index = (req, res) => {  

    fs.writeFile('textos/helloworld.txt', 'Hello World!', function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
    });

    exec('espeak -vpt-br -f textos/helloworld.txt --stdout > audios/rtyqqty.wav', (stdout, stderr,err) => {
        if (err) {
            console.log("Erro ao executar o espeak: "+ err);
        }
        // console.log("STDOUT: "  + stdout);
        // console.log("STDERR: "  + stderr);
    });

    res.render('home'); 
};