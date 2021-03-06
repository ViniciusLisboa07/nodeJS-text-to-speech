import $ from 'jquery';
import { io } from 'socket.io-client';

var socket = io();
var tblFilaRecepcao = document.getElementById('tblFilaRecepcao');
var rowFila = document.getElementsByClassName("linha");
var tableRow = Array.from(rowFila);
var btnChamar = document.getElementById('btnChamar');

var screen = null;

if (screen == null || screen.closed) {

    screen = window.open('/screen', 'screen', 'left=0,top=0,width=1024,height=1140,toolbar=0,scrollbars=0,status=0');

} else {

    screen.location.reload(true);
    screen.focus();

}


function aplicandoEstilo() {
    for (let i = 0; i < $('#tblFilaRecepcao > tbody')[0].children.length; i++) {

        if ($('#tblFilaRecepcao > tbody')[0].children[i].children[1].outerText == '1') {
            $('#tblFilaRecepcao > tbody')[0].children[i].children[1].innerHTML = "Normal";
            $('#tblFilaRecepcao > tbody')[0].children[i].children[1].className = 'bg-info';

        } else if ($('#tblFilaRecepcao > tbody')[0].children[i].children[1].outerText == '2') {
            $('#tblFilaRecepcao > tbody')[0].children[i].children[1].innerHTML = "Alta";
            $('#tblFilaRecepcao > tbody')[0].children[i].children[1].className = 'bg-warning';

        } else if ($('#tblFilaRecepcao > tbody')[0].children[i].children[1].outerText == '3') {
            $('#tblFilaRecepcao > tbody')[0].children[i].children[1].innerHTML = "Muito Alta";
            $('#tblFilaRecepcao > tbody')[0].children[i].children[1].className = 'bg-danger';
        }
    };
    console.log($('#tblFilaRecepcao > tbody')[0].children.length);
}

aplicandoEstilo();

socket.on('call', (data) => {
    console.log(data);

    var novaLinha = document.createElement('tr');
    var novoNome = document.createElement('td');
    var novaPrioridade = document.createElement('td');
    var novoId = document.createElement('input');

    novoNome.innerHTML = data['nomePaciente'];
    novaPrioridade.innerHTML = data['prioridade'];

    novoId.type = "hidden";
    novoId.value = data['_id'];

    novaLinha.appendChild(novoNome);
    novaLinha.appendChild(novaPrioridade);
    novaLinha.appendChild(novoId);
    novaLinha.className = "linha";

    // Se a prioridade da nova linha for Normal
    if (novaPrioridade.innerHTML == '1') {
        $('#tblFilaRecepcao > tbody').append(novaLinha);

        // Se ela for Alta
    } else if (novaPrioridade.innerHTML == '2') {
        // Se j?? houver alguma linha com prioridade Alta
        console.log(tableRow);
        if (tableRow.find(a => a.children[1].outerText == "Alta")) {

            // Index da ultima linha "Alta" encontrada [utlizei o metodo slice() para criar uma copia do array e o metodo reverse em conjunto com o indexOf e find para pegar o ultimo elemento com prioridade "Alta" na tabela]
            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Alta"));
            console.log(tableRow.slice().reverse());
            console.log(i);
            $('#tblFilaRecepcao > tbody > tr').eq(i - 1).after(novaLinha); // Adicionando ap??s

            // Se houver alguma linha com prioridade Muito Alta 
        } else if (tableRow.find(a => a.children[1].outerText == "Muito Alta")) {

            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Muito Alta"));
            console.log(i);
            // Adicionando ap??s
            $('#tblFilaRecepcao > tbody > tr').eq(i - 1).after(novaLinha);
            console.log('muito alta');

            // Se nao houver nenhuma linha com prioridade "Alta" nem "Muito Alta"
        } else {

            $('#tblFilaRecepcao > tbody').prepend(novaLinha);

        }

    } else {

        if (tableRow.find(a => a.children[1].outerText == "Muito Alta")) {

            var i = tableRow.indexOf(tableRow.slice().reverse().find(a => a.children[1].outerText == "Muito Alta"));

            $('#tblFilaRecepcao > tbody > tr').eq(i).after(novaLinha); // Adicionando ap??s
            console.log('algum muito alta');

        } else {

            $('#tblFilaRecepcao > tbody').eq(0).prepend(novaLinha);
            console.log('nenhum muito alta');

        }

    }
    aplicandoEstilo();

});

console.log($('#tblFilaRecepcao > tbody')[0].children)

var form = null;
btnChamar.onclick = (x) => {
    rowFila = document.getElementsByClassName("linha");
    tableRow = Array.from(rowFila);

    console.log($('#tblFilaRecepcao')[0].children[1].children[0].children[2]);
    if (tableRow.length > 0) {

        console.log($('#tblFilaRecepcao')[0].children[1]);
        console.log($('#tblFilaRecepcao')[0].children[1].children[0].children[2].value);
        var id = $('#tblFilaRecepcao')[0].children[1].children[0].children[2].value;
        console.log("!!! " + form);
        if (form == null) {
            form = document.createElement('form');
            form.setAttribute("action", "/screen");
            form.setAttribute("method", "post");
            form.setAttribute("target", "screen");
            form.setAttribute("id", "chamarForm");

            var input = document.createElement("input");
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', 'id');
            input.setAttribute('id', 'id');
            input.value = id;

            form.appendChild(input);
            $('body').append(form);
        } else {
            $("#id").val(id);
            console.log("alterou");
        }

        tblFilaRecepcao.children[1].children[0].remove();

        console.log($("#chamarForm"));
        $("#chamarForm").submit();
    } else {
        console.log("A fila est?? vazia");

    }
};

console.log(socket)
socket.on('recepcaoLogOut', (data) => {
    let msg = "Algu??m fez log in na conta da recep????o!"
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


    // $.get('/logout', { msg })
});