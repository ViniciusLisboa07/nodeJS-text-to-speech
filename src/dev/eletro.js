import $ from 'jquery';

var socket = io();

var rowFila = document.getElementsByClassName("linha");
var tblPacientesEletro = document.getElementById('tblPacientesEletro');
var tableRow = Array.from(rowFila);

function aplicandoEstilo(tabelaBody) {
    var btns = document.getElementsByTagName("button");

    for(let i = 0; i < tabelaBody[0].children.length; i++) {

        if (tabelaBody[0].children[i].children[1].outerText == '1') {
            console.log('normal');
            tabelaBody[0].children[i].children[1].innerHTML = "Normal";
            tabelaBody[0].children[i].children[1].className = 'bg-info';

        } else if (tabelaBody[0].children[i].children[1].outerText == '2') {
            console.log('alta')
            tabelaBody[0].children[i].children[1].innerHTML = "Alta";
            tabelaBody[0].children[i].children[1].className = 'bg-warning';

        } else if (tabelaBody[0].children[i].children[1].outerText == '3') {
            console.log('muito alta')
            tabelaBody[0].children[i].children[1].innerHTML = "Muito Alta";
            tabelaBody[0].children[i].children[1].className = 'bg-danger';
        }

        btns[i].onclick = (x) => {
            let id =  btns[i].parentNode.parentNode.children[3].value;
            
            btns[i].parentNode.parentNode.remove();

            $.post("/eletro", { id: id }, function() {
                location.reload();
            });
        }

    };
}



aplicandoEstilo($('#tblPacientesEletro > tbody'));

console.log(socket);

socket.on("eletroCall", (data) => {   
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
        $('#tblPacientesEletro > tbody').append(novaLinha);

        // Se ela for Alta
    } else if (novaPrioridade.innerHTML == '2') {
        // Se já houver alguma linha com prioridade Alta
        if (tableRow.find(a => a.children[1].outerText == "Alta")) {

            // Index da ultima linha "Alta" encontrada [utlizei o metodo slice() para criar uma copia do array e o metodo reverse em conjunto com o indexOf e find para pegar o ultimo elemento com prioridade "Alta" na tabela]
            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Alta"));
            console.log(i);
            $('#tblPacientesEletro > tbody > tr').eq(i - 1).after(novaLinha); // Adicionando após

        // Se houver alguma linha com prioridade Muito Alta 
        } else if (tableRow.find(a => a.children[1].outerText == "Muito Alta")) {

            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Muito Alta"));
            console.log(i);
            // Adicionando após
            $('#tblPacientesEletro > tbody > tr').eq(i - 1).after(novaLinha);
            console.log('muito alta');

        // Se nao houver nenhuma linha com prioridade "Alta" nem "Muito Alta"
        } else {
            console.log('nada. WARNING')
            $('#tblPacientesEletro > tbody').prepend(novaLinha);
        }

    } else {

        if(tableRow.find(a => a.children[1].outerText == "Muito Alta")){

            var i = tableRow.indexOf(tableRow.slice().reverse().find(a => a.children[1].outerText == "Muito Alta"));

            $('#tblPacientesEletro > tbody > tr').eq(i).after(novaLinha);// Adicionando após
            console.log('algum muito alta');
            
        } else {

            $('#tblPacientesEletro > tbody').prepend(novaLinha);
            console.log('nenhum muito alta');
        
        }

    }

    aplicandoEstilo($('#tblPacientesEletro > tbody'));

});

socket.on('eletroLogOut', (data) => {
   
    let msg = "Alguém fez log in na Eletro!"
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