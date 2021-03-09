const { exec } = require('child_process');
const fs = require('fs');

exports.index = (req, res) => {

    res.render('screen');
};

exports.receivingData = (req, res) => {

    var str = "Atenção: " + req.body.nomePaciente + " se dirija ao " + req.body.consultorio;

    fs.writeFile('textos/helloworld.txt', str, function (err) {
        if (err) return console.log(err);
        // console.log('Hello World > helloworld.txt');
    });

    var dataAtual = Date.now();
    var nomeAudio = req.body.nomePaciente;

    const myPromise = new Promise((resolve, reject) => {  
        
        var audioFile = exec('espeak -vpt-br -f textos/helloworld.txt --stdout > src/audios/'+ nomeAudio +'.wav', (stdout, stderr, err) => {
            if (err) {
                console.log("Erro ao executar o espeak: " + err);
                x++;
            }
        }); 
        
        if(audioFile) {    
            resolve('Promise is resolved successfully.');  
        } else {    
            reject('Promise is rejected');
        }
        
    });  


    myPromise.then((msg) => {
        setTimeout(res.render('screen', { nomePaciente: req.body.nomePaciente, consultorio: req.body.consultorio, nomeAudio: nomeAudio }), 2000);
        console.log(msg);
    }).catch((msg)=>{
        console.log(msg);
    });

} 