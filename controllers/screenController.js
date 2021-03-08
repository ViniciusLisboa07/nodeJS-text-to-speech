const { exec } = require('child_process');
const fs = require('fs');

exports.index = (req, res) => {

    res.render('screen');
};

exports.receivingData = (req, res) => {

    var str = "Atenção: " + req.body.nomePaciente + " se dirija ao " + req.body.consultorio;

    fs.writeFile('textos/helloworld.txt', str, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
    });

    let createAudioFile = new Promise(function (resolve, reject) {

        exec('espeak -vpt-br -f textos/helloworld.txt --stdout > src/audios/rtyqqty.wav', (stdout, stderr, err) => {
            if (err) {
                reject(
                    console.log("Erro ao executar o espeak: " + err)
                );
            } else{
                resolve();
            }
            // console.log("STDOUT: "  + stdout);
            // console.log("STDERR: "  + stderr);
        });        
    })

    console.log(str)
    console.log(req.body)
    console.log("SCREEN")
    
    createAudioFile.then(
        res.render('screen', { nomePaciente: req.body.nomePaciente, consultorio: req.body.consultorio })
    );

}