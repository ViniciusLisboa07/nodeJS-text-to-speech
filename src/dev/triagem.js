import $ from 'jquery';
import { io } from 'socket.io-client';

var socket = io();
var rowFila = document.getElementsByClassName("linha");
var tblPacientesTriagem = document.getElementById('tblPacientesTriagem');
var btnPostToDoctor = document.getElementById('btnEnviarMedico');

var tableRow = Array.from(rowFila);

function setInput(x, btn) {
    // melhorar isso depois.
    console.log('$$$');
    if (btn.id == 'btnEnviarModal') {
        var bodyModal = document.getElementById('body-modal');
    } else {
        var bodyModal = document.getElementById('body-modal-dismiss');
    }

    var idInput = x;

    var newInput = document.createElement('input');
    newInput.type = 'hidden';
    newInput.value = idInput;
    newInput.className = 'hiddenInputId';

    var listOfInput = document.getElementsByClassName('hiddenInputId');
    // idInput.id = "idCallInput";

    console.log(newInput);
    bodyModal.appendChild(newInput);
    console.log(listOfInput);
    if (listOfInput.length > 1) {
        listOfInput[0].remove();
    }

}

function aplicandoEstilo(tabelaBody) {

    for (let i = 0; i < tabelaBody[0].children.length; i++) {

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

        if (btns != null && btns != undefined && btns.length > 0) {
            var btns = document.getElementsByClassName("chamar");
            console.log(i);
            btns[i].onclick = btnChamar(btns[i]);
        }

    };
}

aplicandoEstilo($('#tblPacientesTriagem > tbody'));

function btnChamar(x) {
    let id = x.id;
    console.log(id);

    console.log($(`#${id}`));
    $(`#${id}`).parentNode.parentNode.remove();

    $.post("/triagem", {
        id: id
    }, function() {
        window.location.reload();
    });
}

socket.on("triagem_call", (data) => {
    // console.log(data)

    var novaLinha = document.createElement('tr');
    var novoNome = document.createElement('td');
    var novaPrioridade = document.createElement('td');
    var novoTD = document.createElement('td');
    var inputID = document.createElement('input');
    var newBtn = document.createElement('button');

    novoNome.innerHTML = data['nomePaciente'];
    novaPrioridade.innerHTML = data['prioridade'];

    inputID.value = data['_id'];
    inputID.type = "hidden";


    newBtn.innerHTML = "Chamar";
    newBtn.className = "btn btn-secondary btn-sm chamar";
    newBtn.id = data['_id'];
    newBtn.onclick = () => {
        let id = newBtn.id;

        novaLinha.remove();

        $.post("/triagem", {
            id: id
        }, function() {
            window.location.reload();
        });
    }

    novoTD.appendChild(newBtn);
    novaLinha.appendChild(novoNome);
    novaLinha.appendChild(novaPrioridade);
    novaLinha.appendChild(novoTD);
    novaLinha.appendChild(inputID);
    novaLinha.className = "linha";


    // Se a prioridade da nova linha for Normal
    if (novaPrioridade.innerHTML == '1') {
        $('#tblPacientesTriagem > tbody').append(novaLinha);

        // Se ela for Alta
    } else if (novaPrioridade.innerHTML == '2') {
        // Se já houver alguma linha com prioridade Alta
        if (tableRow.find(a => a.children[1].outerText == "Alta")) {

            // Index da ultima linha "Alta" encontrada [utlizei o metodo slice() para criar uma copia do array e o metodo reverse em conjunto com o indexOf e find para pegar o ultimo elemento com prioridade "Alta" na tabela]
            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Alta"));
            $('#tblPacientesTriagem > tbody > tr').eq(i - 1).after(novaLinha); // Adicionando após

            // Se houver alguma linha com prioridade Muito Alta 
        } else if (tableRow.find(a => a.children[1].outerText == "Muito Alta")) {

            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Muito Alta"));
            // Adicionando após
            $('#tblPacientesTriagem > tbody > tr').eq(i - 1).after(novaLinha);
            // console.log('muito alta');

            // Se nao houver nenhuma linha com prioridade "Alta" nem "Muito Alta"
        } else {
            // console.log('nada. WARNING')
            $('#tblPacientesTriagem > tbody').prepend(novaLinha);
        }

    } else {

        if (tableRow.find(a => a.children[1].outerText == "Muito Alta")) {

            var i = tableRow.indexOf(tableRow.slice().reverse().find(a => a.children[1].outerText == "Muito Alta"));

            $('#tblPacientesTriagem > tbody > tr').eq(i).after(novaLinha); // Adicionando após
            // console.log('algum muito alta');

        } else {

            $('#tblPacientesTriagem > tbody').prepend(novaLinha);
            // console.log('nenhum muito alta');
        }
    };

    aplicandoEstilo($('#tblPacientesTriagem > tbody'));
});


socket.on('triagemTela_call', (data) => {

    let novaLinha = createLine(data);
    // Se a prioridade da nova linha for Normal
    if (novaLinha.children[1].innerHTML == '1') {
        $('#tblPacientesTelaTriagem > tbody').append(novaLinha);

        // Se ela for Alta
    } else if (novaLinha.children[1].innerHTML == '2') {
        // Se já houver alguma linha com prioridade Alta
        if (tableRow.find(a => a.children[1].outerText == "Alta")) {

            // Index da ultima linha "Alta" encontrada [utlizei o metodo slice() para criar uma copia do array e o metodo reverse em conjunto com o indexOf e find para pegar o ultimo elemento com prioridade "Alta" na tabela]
            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Alta"));
            $('#tblPacientesTelaTriagem > tbody > tr').eq(i - 1).after(novaLinha); // Adicionando após

            // Se houver alguma linha com prioridade Muito Alta 
        } else if (tableRow.find(a => a.children[1].outerText == "Muito Alta")) {

            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Muito Alta"));
            // Adicionando após
            $('#tblPacientesTelaTriagem > tbody > tr').eq(i - 1).after(novaLinha);
            // console.log('muito alta');

            // Se nao houver nenhuma linha com prioridade "Alta" nem "Muito Alta"
        } else {
            // console.log('nada. WARNING')
            $('#tblPacientesTelaTriagem > tbody').prepend(novaLinha);
        }

    } else {

        if (tableRow.find(a => a.children[1].outerText == "Muito Alta")) {

            var i = tableRow.indexOf(tableRow.slice().reverse().find(a => a.children[1].outerText == "Muito Alta"));

            $('#tblPacientesTelaTriagem > tbody > tr').eq(i).after(novaLinha); // Adicionando após
            // console.log('algum muito alta');

        } else {

            $('#tblPacientesTelaTriagem > tbody').prepend(novaLinha);
            // console.log('nenhum muito alta');
        }
    }

    aplicandoEstilo($('#tblPacientesTelaTriagem > tbody'));

});

aplicandoEstilo($('#tblPacientesTelaTriagem > tbody'));

function dismiss(id, novaLinha) {

    novaLinha.remove();

    $.post("/del", {
        id: id
    });

    console.log('dismisss');

}

function createLine(data) {
    var novaLinha = document.createElement('tr');
    var novoNome = document.createElement('td');
    var novaPrioridade = document.createElement('td');
    var TdBtnDispensar = document.createElement('td');
    var TdBtnEnviar = document.createElement('td');

    var btnDispensar = document.createElement('button');
    var btnEnviarMedico = document.createElement('button');
    var inputID = document.createElement('input');

    novoNome.innerHTML = data['nomePaciente'];
    novaPrioridade.innerHTML = data['prioridade'];

    inputID.value = data['_id'];
    inputID.type = "hidden";

    novoNome.innerHTML = data['nomePaciente'];

    btnDispensar.addEventListener('click', () => {
        var bodyModal = document.getElementById('body-modal-dismiss');

        var idInput = data['_id'];

        var newInput = document.createElement('input');
        newInput.type = 'hidden';
        newInput.value = idInput;
        newInput.className = 'hiddenInputIdDismiss';

        var listOfInput = document.getElementsByClassName('hiddenInputIdDismiss');

        console.log(newInput);
        bodyModal.appendChild(newInput);
        console.log(listOfInput);
        if (listOfInput.length > 1) {
            listOfInput[0].remove();
        };

    }, false);

    btnDispensar.innerHTML = "Dispensar";
    btnDispensar.className = "btn btn-danger btn-sm";
    btnDispensar.dataset.toggle = "modal";
    btnDispensar.dataset.target = "#modalDispensar";
    btnDispensar.id = 'btnDispensar';

    TdBtnDispensar.appendChild(btnDispensar);

    btnEnviarMedico.innerHTML = "Enviar";
    btnEnviarMedico.className = "btn btn-success btn-sm";
    btnEnviarMedico.dataset.toggle = "modal";
    btnEnviarMedico.dataset.target = "#enviarModal";
    btnEnviarMedico.id = 'btnEnviarModal';
    btnEnviarMedico.addEventListener('click', () => {
        var bodyModal = document.getElementById('body-modal');

        var idInput = data['_id'];

        var newInput = document.createElement('input');
        newInput.type = 'hidden';
        newInput.value = idInput;
        newInput.className = 'hiddenInputIdEnviar';

        var listOfInput = document.getElementsByClassName('hiddenInputIdEnviar');

        console.log(newInput);
        bodyModal.appendChild(newInput);
        console.log(listOfInput);
        if (listOfInput.length > 1) {
            listOfInput[0].remove();
        };

    }, false);

    TdBtnEnviar.appendChild(btnEnviarMedico);

    novaLinha.className = "linha";

    novaLinha.appendChild(novoNome);
    novaLinha.appendChild(novaPrioridade);
    novaLinha.appendChild(TdBtnDispensar);
    novaLinha.appendChild(TdBtnEnviar);
    novaLinha.appendChild(inputID);

    return novaLinha;
};

btnPostToDoctor.onclick = function() {
    console.log('btn enviar medico');

    var consultorio = document.getElementById('selectConsultorio');
    var prioridade = document.getElementById('selectPrioridade');
    var bodyModal = document.getElementById('body-modal');
    var id = bodyModal.children[5];
    console.log(id);

    $.post("/enviarAoMedico", {
        consultorio: consultorio.value,
        prioridade: prioridade.value,
        id: id.value
    });

    window.location.reload();
};

socket.on('triagemLogOut', (data) => {

    let msg = "Alguém fez log in na Triagem!"
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

});