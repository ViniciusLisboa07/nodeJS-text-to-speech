import $ from 'jquery';
import { io } from 'socket.io-client';

var socket = io();

var rowFila = document.getElementsByClassName("linha");
var btns = document.getElementsByTagName("button");
var tblPacientesConsultorio1 = document.getElementById('tblPacientesConsultorio1');
var tableRow = Array.from(rowFila);

function aplicandoEstilo(tabelaBody) {
    for (let i = 0; i < rowFila.length; i++) {
        if (tabelaBody[0].children[i].children[1].outerText == '1') {
            tabelaBody[0].children[i].children[1].innerHTML = "Normal";
            tabelaBody[0].children[i].children[1].className = 'bg-info';

        } else if (tabelaBody[0].children[i].children[1].outerText == '2') {
            tabelaBody[0].children[i].children[1].innerHTML = "Alta";
            tabelaBody[0].children[i].children[1].className = 'bg-warning';

        } else if (tabelaBody[0].children[i].children[1].outerText == '3') {
            tabelaBody[0].children[i].children[1].innerHTML = "Muito Alta";
            tabelaBody[0].children[i].children[1].className = 'bg-danger';
        }

        btns[i].onclick = (x) => {
            let id = btns[i].parentNode.parentNode.children[3].value;


            btns[i].parentNode.parentNode.remove();

            $.post("/consultorio1", { id: id }, function() {
                location.reload();
            });
        }

    };
}

aplicandoEstilo($('#tblPacientesConsultorio1 > tbody'));

console.log(socket);

socket.on("consultorio1", (data) => {
    console.log(data)

    var novaLinha = document.createElement('tr');
    var novoNome = document.createElement('td');
    var novaPrioridade = document.createElement('td');
    var novoTD = document.createElement('td');
    var novoButton = document.createElement('button');
    var inputID = document.createElement('input');

    novoNome.innerHTML = data['nomePaciente'];
    novaPrioridade.innerHTML = data['prioridade'];

    novoButton.innerHTML = "Chamar";
    novoButton.className = "btn btn-secondary btn-sm";
    novoTD.appendChild(novoButton);

    inputID.value = data['_id'];
    inputID.type = "hidden";

    novaLinha.appendChild(novoNome);
    novaLinha.appendChild(novaPrioridade);
    novaLinha.appendChild(novoTD);
    novaLinha.appendChild(inputID);
    novaLinha.className = "linha";


    // Se a prioridade da nova linha for Normal
    if (novaPrioridade.innerHTML == '1') {
        $('#tblPacientesConsultorio1 > tbody').append(novaLinha);

        // Se ela for Alta
    } else if (novaPrioridade.innerHTML == '2') {
        // Se j?? houver alguma linha com prioridade Alta
        console.log(tableRow);
        if (tableRow.find(a => a.children[1].outerText == "Alta")) {

            // Index da ultima linha "Alta" encontrada [utlizei o metodo slice() para criar uma copia do array e o metodo reverse em conjunto com o indexOf e find para pegar o ultimo elemento com prioridade "Alta" na tabela]
            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Alta"));
            console.log(i);
            $('#tblPacientesConsultorio1 > tbody > tr').eq(i - 1).after(novaLinha); // Adicionando ap??s

            // Se houver alguma linha com prioridade Muito Alta 
        } else if (tableRow.find(a => a.children[1].outerText == "Muito Alta")) {

            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Muito Alta"));
            console.log(i);
            // Adicionando ap??s
            $('#tblPacientesConsultorio1 > tbody > tr').eq(i - 1).after(novaLinha);
            console.log('muito alta');

            // Se nao houver nenhuma linha com prioridade "Alta" nem "Muito Alta"
        } else {
            console.log('nada. WARNING')
            $('#tblPacientesConsultorio1 > tbody').prepend(novaLinha);
        }

    } else {

        if (tableRow.find(a => a.children[1].outerText == "Muito Alta")) {

            var i = tableRow.indexOf(tableRow.slice().reverse().find(a => a.children[1].outerText == "Muito Alta"));

            $('#tblPacientesConsultorio1 > tbody > tr').eq(i).after(novaLinha); // Adicionando ap??s
            console.log('algum muito alta');

        } else {

            $('#tblPacientesConsultorio1 > tbody').prepend(novaLinha);
            console.log('nenhum muito alta');

        }

    }

    aplicandoEstilo($('#tblPacientesConsultorio1 > tbody'));


});

socket.on('consultorio1LogOut', (data) => {
    let msg = "Algu??m fez log in na conta no Consult??rio 1!"
    console.log(msg);

    var form = document.createElement('form');
    form.setAttribute('method', 'get');
    form.setAttribute('action', 'logout');

    var input = document.createElement("input");
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'msg');
    input.value = msg;

    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();

    // window.location = '/logout';
});