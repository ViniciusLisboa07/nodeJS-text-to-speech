import $ from 'jquery';

var nomePaciente = document.getElementById('nomePaciente');
var consultorio = document.getElementById('consultorio');
var repetir = document.getElementById('repetir');
var formTTS = document.getElementById('formTTS');
var tblFilaRecepcao = document.getElementById('tblFilaRecepcao');

var btnFalar = document.getElementById("btnFalar");

var rowFila = document.getElementsByClassName("linha");

for(let i = 0; i < rowFila.length; i++) {

    if(rowFila[i].children[1].outerText == '1'){
        rowFila[i].children[1].innerHTML =  "Normal";
        rowFila[i].children[1].className = 'bg-info'

    } else if(rowFila[i].children[1].outerText == '2') {
        rowFila[i].children[1].innerHTML =  "Alta";
        rowFila[i].children[1].className = 'bg-warning'
        
    } else if(rowFila[i].children[1].outerText == '3') {
        rowFila[i].children[1].innerHTML =  "Muito Alta";
        rowFila[i].children[1].className = 'bg-danger'

    }
};  

btnFalar.onclick =  (event) => {
    // event.preventDefault();
}

tblFilaRecepcao.onchange = () => {
    console.log('mudou');
}