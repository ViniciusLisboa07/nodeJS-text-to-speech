import $ from 'jquery';

var socket = io();

var tblFilaRecepcao = document.getElementById('tblFilaRecepcao');

var btnFalar = document.getElementById("btnFalar");

var rowFila = document.getElementsByClassName("linha");

function aplicandoEstilo() {
    for (let i = 0; i < rowFila.length; i++) {

        if (rowFila[i].children[1].outerText == '1') {
            rowFila[i].children[1].innerHTML = "Normal";
            rowFila[i].children[1].className = 'bg-info'
    
        } else if (rowFila[i].children[1].outerText == '2') {
            rowFila[i].children[1].innerHTML = "Alta";
            rowFila[i].children[1].className = 'bg-warning'
    
        } else if (rowFila[i].children[1].outerText == '3') {
            rowFila[i].children[1].innerHTML = "Muito Alta";
            rowFila[i].children[1].className = 'bg-danger'
    
        }
    };
}  

aplicandoEstilo();

btnFalar.onclick = (event) => {
    // event.preventDefault();
}

socket.on('call', (data) => {
    
    var novaLinha = document.createElement('tr')
    var novoNome = document.createElement('td')
    var novaPrioridade = document.createElement('td')

    novoNome.innerHTML = data['nomePaciente'];
    novaPrioridade.innerHTML = data['prioridade'];

    novaLinha.appendChild(novoNome);
    novaLinha.appendChild(novaPrioridade);
    novaLinha.className = "linha";

    tblFilaRecepcao.appendChild(novaLinha);

    aplicandoEstilo();
    
});

tblFilaRecepcao.onchange = () => {
    console.log('mudou');
}