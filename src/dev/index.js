import $ from 'jquery';

var socket = io();

var tblFilaRecepcao = document.getElementById('tblFilaRecepcao');

var btnFalar = document.getElementById("btnFalar");

var rowFila = document.getElementsByClassName("linha");

var tableRow = Array.from(rowFila);

console.log(tableRow);

function aplicandoEstilo() {
    for (let i = 0; i < tableRow.length; i++) {

        if (tableRow[i].children[1].outerText == '1') {
            tableRow[i].children[1].innerHTML = "Normal";
            tableRow[i].children[1].className = 'bg-info';

        } else if (tableRow[i].children[1].outerText == '2') {
            tableRow[i].children[1].innerHTML = "Alta";
            tableRow[i].children[1].className = 'bg-warning';

        } else if (tableRow[i].children[1].outerText == '3') {
            tableRow[i].children[1].innerHTML = "Muito Alta";
            tableRow[i].children[1].className = 'bg-danger';
        }
    };
}

aplicandoEstilo();

btnFalar.onclick = (event) => {
    // event.preventDefault();
}

socket.on('call', (data) => {

    var novaLinha = document.createElement('tr');
    var novoNome = document.createElement('td');
    var novaPrioridade = document.createElement('td');

    novoNome.innerHTML = data['nomePaciente'];
    novaPrioridade.innerHTML = data['prioridade'];


    novaLinha.appendChild(novoNome);
    novaLinha.appendChild(novaPrioridade);
    novaLinha.className = "linha";

    // Se a prioridade da nova linha for Normal
    if (novaPrioridade.innerHTML == '1') {
        tblFilaRecepcao.appendChild(novaLinha);

        // Se ela for Alta
    } else if (novaPrioridade.innerHTML == '2') {
        // Se já houver alguma linha com prioridade Alta
        console.log(tableRow);
        if ((tableRow.find(a => a.children[1].outerText == "Alta") == true)) {

            // Index da ultima linha "Alta" encontrada [utlizei o metodo slice() para criar uma copia do array e o metodo reverse em conjunto com o indexOf e find para pegar o ultimo elemento com prioridade "Alta" na tabela]
            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Alta"));
            $('#tblFilaRecepcao > tbody > tr').eq(i - 1).after(novaLinha); // Adicionando após

        // Se houver alguma linha com prioridade Muito Alta 
        } else if ((tableRow.find(a => a.children[1].outerText == "Muito Alta")) == true) {

            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Muito Alta"));
            // Adicionando após
            $('#tblFilaRecepcao > tbody > tr').eq(i - 1).after(novaLinha);

        // Se nao houver nenhuma linha com prioridade "Alta" nem "Muito Alta"
        } else {
            $('#tblFilaRecepcao > tbody > tr').eq(0).before(novaLinha);
        }

    } else {

        if(tableRow.find(a => a.children[1].outerText == "Muito Alta")){
            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Muito Alta"));
            $('#tblFilaRecepcao > tbody > tr').eq(i - 1).after(novaLinha);// Adicionando após
        } else {
            $('#tblFilaRecepcao > tbody > tr').eq(0).before(novaLinha);
        }

    }

    aplicandoEstilo();

});

tblFilaRecepcao.onchange = () => {
    console.log('mudou');
}