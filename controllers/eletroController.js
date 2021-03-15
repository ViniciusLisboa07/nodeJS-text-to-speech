const mongoose = require('mongoose');
const User = mongoose.model('Users');
const Call = mongoose.model('Call');

exports.index = async (req, res) => {
    const chamadasEletro = await Call.find({ consultorio: 'eletro' });

    let fila = [];
    for (i in chamadasEletro) {
        // se houver prioridade muitoAlta no DB
        if (chamadasEletro[i]._doc['prioridade'] == 'muitoAlta') {
            console.log('se houver prioridade muitoAlta no DB')
            // se houver prioridade muitoAlta no array, insiro na proxima posição
            if (fila.some(obj => obj.prioridade == 'muitoAlta')) {
                console.log('se houver prioridade muitoAlta no array, insiro na proxima posição');
                let indexUltimo = fila.lastIndexOf(fila.some(obj => obj.prioridade == 'muitoAlta')); //ultimo indice com muito Alta

                fila[indexUltimo + 1] = fila.push({
                    nomePaciente: chamadasEletro[i]._doc['nomePaciente'],
                    consultorio: chamadasEletro[i]._doc['consultorio'],
                    repetir: chamadasEletro[i]._doc['repetir'],
                    prioridade: chamadasEletro[i]._doc['prioridade']
                }) 

            } else { //senao, insiro na posição inicial
                console.log('senao, insiro na posição inicial')
                fila.unshift({
                    nomePaciente: chamadasEletro[i]._doc['nomePaciente'],
                    consultorio: chamadasEletro[i]._doc['consultorio'],
                    repetir: chamadasEletro[i]._doc['repetir'],
                    prioridade: chamadasEletro[i]._doc['prioridade']
                })
            }
        } else {
            fila.push({
                nomePaciente: chamadasEletro[i]._doc['nomePaciente'],
                consultorio: chamadasEletro[i]._doc['consultorio'],
                repetir: chamadasEletro[i]._doc['repetir'],
                prioridade: chamadasEletro[i]._doc['prioridade']
            })
        }

    }
 
    // console.log("123 : " + fila);
    res.render('eletro', { fila: fila })
}   