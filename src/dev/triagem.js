import $ from 'jquery';

var socket = io();
 
var rowFila = document.getElementsByClassName("linha");
var btns = document.getElementsByClassName("chamar");
var tblPacientesTriagem = document.getElementById('tblPacientesTriagem');
var tableRow = Array.from(rowFila);
console.log(btns.length);
function aplicandoEstilo(tabelaBody) {
    for(let i = 0; i < tabelaBody[0].children.length; i++) {
        
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
 
        if(tabelaBody == $('#tblPacientesTriagem > tbody')) {
            btns[i].onclick = (x) => {
                let id =  btns[i].parentNode.parentNode.children[3].value;
                console.log(id);
    
                x.preventDefault();
    
                btns[i].parentNode.parentNode.remove();
    
                $.post("/triagem", { id: id });
            }
        }
 
    };
} 
 
aplicandoEstilo($('#tblPacientesTriagem > tbody'));

console.log(socket);

socket.on("triagem_call", (data) => {   
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
        $('#tblPacientesTriagem > tbody').append(novaLinha);

        // Se ela for Alta
    } else if (novaPrioridade.innerHTML == '2') {
        // Se já houver alguma linha com prioridade Alta
        console.log(tableRow);
        if (tableRow.find(a => a.children[1].outerText == "Alta")) {

            // Index da ultima linha "Alta" encontrada [utlizei o metodo slice() para criar uma copia do array e o metodo reverse em conjunto com o indexOf e find para pegar o ultimo elemento com prioridade "Alta" na tabela]
            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Alta"));
            console.log(i);
            $('#tblPacientesTriagem > tbody > tr').eq(i - 1).after(novaLinha); // Adicionando após

        // Se houver alguma linha com prioridade Muito Alta 
        } else if (tableRow.find(a => a.children[1].outerText == "Muito Alta")) {

            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Muito Alta"));
            console.log(i);
            // Adicionando após
            $('#tblPacientesTriagem > tbody > tr').eq(i - 1).after(novaLinha);
            console.log('muito alta');

        // Se nao houver nenhuma linha com prioridade "Alta" nem "Muito Alta"
        } else {
            console.log('nada. WARNING')
            $('#tblPacientesTriagem > tbody').prepend(novaLinha);
        }

    } else {

        if(tableRow.find(a => a.children[1].outerText == "Muito Alta")){

            var i = tableRow.indexOf(tableRow.slice().reverse().find(a => a.children[1].outerText == "Muito Alta"));

            $('#tblPacientesTriagem > tbody > tr').eq(i).after(novaLinha);// Adicionando após
            console.log('algum muito alta');
            
        } else {

            $('#tblPacientesTriagem > tbody').prepend(novaLinha);
            console.log('nenhum muito alta');
        }
    }
    aplicandoEstilo($('#tblPacientesTriagem > tbody'));


});

socket.on('triagemTela_call', (data) => {
   
    console.log(data);

    let novaLinha = createLineDispensar(data);
    console.log(novaLinha);
    // Se a prioridade da nova linha for Normal
    if (novaLinha.children[1].innerHTML == '1') {
        $('#tblPacientesTelaTriagem > tbody').append(novaLinha);

        // Se ela for Alta
    } else if (novaLinha.children[1].innerHTML == '2') {
        // Se já houver alguma linha com prioridade Alta
        console.log(tableRow);
        if (tableRow.find(a => a.children[1].outerText == "Alta")) {

            // Index da ultima linha "Alta" encontrada [utlizei o metodo slice() para criar uma copia do array e o metodo reverse em conjunto com o indexOf e find para pegar o ultimo elemento com prioridade "Alta" na tabela]
            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Alta"));
            console.log(i);
            $('#tblPacientesTelaTriagem > tbody > tr').eq(i - 1).after(novaLinha); // Adicionando após

        // Se houver alguma linha com prioridade Muito Alta 
        } else if (tableRow.find(a => a.children[1].outerText == "Muito Alta")) {

            var i = tableRow.slice().reverse().indexOf(tableRow.find(a => a.children[1].outerText == "Muito Alta"));
            console.log(i);
            // Adicionando após
            $('#tblPacientesTelaTriagem > tbody > tr').eq(i - 1).after(novaLinha);
            console.log('muito alta');

        // Se nao houver nenhuma linha com prioridade "Alta" nem "Muito Alta"
        } else {
            console.log('nada. WARNING')
            $('#tblPacientesTelaTriagem > tbody').prepend(novaLinha);
        }

    } else {

        if(tableRow.find(a => a.children[1].outerText == "Muito Alta")){

            var i = tableRow.indexOf(tableRow.slice().reverse().find(a => a.children[1].outerText == "Muito Alta"));

            $('#tblPacientesTelaTriagem > tbody > tr').eq(i).after(novaLinha);// Adicionando após
            console.log('algum muito alta');
            
        } else {

            $('#tblPacientesTelaTriagem > tbody').prepend(novaLinha);
            console.log('nenhum muito alta');
        }
    }

    aplicandoEstilo($('#tblPacientesTelaTriagem > tbody'));

});

aplicandoEstilo($('#tblPacientesTelaTriagem > tbody'));

function dismiss() {
    console.log('dismisss');
}
 
function createLineDispensar(data) {
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
    
    btnDispensar.innerHTML = "Dispensar";
    btnDispensar.className = "btn btn-danger btn-sm";
    btnDispensar.onclick = dismiss();

    TdBtnDispensar.appendChild(btnDispensar);
  
    btnEnviarMedico.innerHTML = "Enviar";
    btnEnviarMedico.className = "btn btn-success btn-sm";
    btnEnviarMedico.dataset.toggle = "modal";
    btnEnviarMedico.dataset.target = "#enviarModal";
    TdBtnEnviar.appendChild(btnEnviarMedico);

    novaLinha.appendChild(novoNome);
    novaLinha.appendChild(novaPrioridade);
    novaLinha.appendChild(TdBtnDispensar);
    novaLinha.appendChild(TdBtnEnviar);
    novaLinha.appendChild(inputID);
    novaLinha.className = "linha";

    return novaLinha;
};