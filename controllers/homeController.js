const { exec } = require('child_process')

exports.index = (req, res) => {  

    exec('espeak -vpt-br -f testando.txt --stdout > rtyqqty.wav', (stdout, stderr,err) => {
        if (err) {
            console.log("Erro ao executar o espeak: "+ err);
        }
        console.log("STDOUT: " + stdout);
        console.log("STDERR: "  + stderr);
    });

    res.render('home'); 
};