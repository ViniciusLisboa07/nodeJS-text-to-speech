"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var socket = io();
var rowFila = document.getElementsByClassName("linha");
var tblPacientesTriagem = document.getElementById('tblPacientesTriagem');
var btnPostToDoctor = document.getElementById('btnEnviarMedico');
var tableRow = Array.from(rowFila);

function setInput(x) {
  // melhorar isso depois
  var bodyModal = document.getElementById('body-modal');
  var idInput = x.parentNode.parentNode.children[2].value;
  var newInput = document.createElement('input');
  newInput.type = 'hidden';
  newInput.value = idInput;
  newInput.className = 'hiddenInputId';
  var listOfInput = document.getElementsByClassName('hiddenInputId'); // idInput.id = "idCallInput";

  console.log(newInput);
  bodyModal.appendChild(newInput);
  console.log(listOfInput);

  if (listOfInput.length > 1) {
    listOfInput[0].remove();
  }
}

function aplicandoEstilo(tabelaBody) {
  var btns = document.getElementsByClassName("chamar");

  var _loop = function _loop(i) {
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
      console.log(i);

      btns[i].onclick = function (x) {
        var id = btns[i].parentNode.parentNode.children[3].value;
        console.log(id);
        btns[i].parentNode.parentNode.remove();

        _jquery["default"].post("/triagem", {
          id: id
        }, function () {
          location.reload();
        });
      };
    }
  };

  for (var i = 0; i < tabelaBody[0].children.length; i++) {
    _loop(i);
  }

  ;
}

aplicandoEstilo((0, _jquery["default"])('#tblPacientesTriagem > tbody'));
socket.on("triagem_call", function (data) {
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
  novoTD.appendChild(newBtn);
  novaLinha.appendChild(novoNome);
  novaLinha.appendChild(novaPrioridade);
  novaLinha.appendChild(novoTD);
  novaLinha.appendChild(inputID);
  novaLinha.className = "linha"; // Se a prioridade da nova linha for Normal

  if (novaPrioridade.innerHTML == '1') {
    (0, _jquery["default"])('#tblPacientesTriagem > tbody').append(novaLinha); // Se ela for Alta
  } else if (novaPrioridade.innerHTML == '2') {
    // Se j?? houver alguma linha com prioridade Alta
    if (tableRow.find(function (a) {
      return a.children[1].outerText == "Alta";
    })) {
      // Index da ultima linha "Alta" encontrada [utlizei o metodo slice() para criar uma copia do array e o metodo reverse em conjunto com o indexOf e find para pegar o ultimo elemento com prioridade "Alta" na tabela]
      var i = tableRow.slice().reverse().indexOf(tableRow.find(function (a) {
        return a.children[1].outerText == "Alta";
      }));
      (0, _jquery["default"])('#tblPacientesTriagem > tbody > tr').eq(i - 1).after(novaLinha); // Adicionando ap??s
      // Se houver alguma linha com prioridade Muito Alta 
    } else if (tableRow.find(function (a) {
      return a.children[1].outerText == "Muito Alta";
    })) {
      var i = tableRow.slice().reverse().indexOf(tableRow.find(function (a) {
        return a.children[1].outerText == "Muito Alta";
      })); // Adicionando ap??s

      (0, _jquery["default"])('#tblPacientesTriagem > tbody > tr').eq(i - 1).after(novaLinha); // console.log('muito alta');
      // Se nao houver nenhuma linha com prioridade "Alta" nem "Muito Alta"
    } else {
      // console.log('nada. WARNING')
      (0, _jquery["default"])('#tblPacientesTriagem > tbody').prepend(novaLinha);
    }
  } else {
    if (tableRow.find(function (a) {
      return a.children[1].outerText == "Muito Alta";
    })) {
      var i = tableRow.indexOf(tableRow.slice().reverse().find(function (a) {
        return a.children[1].outerText == "Muito Alta";
      }));
      (0, _jquery["default"])('#tblPacientesTriagem > tbody > tr').eq(i).after(novaLinha); // Adicionando ap??s
      // console.log('algum muito alta');
    } else {
      (0, _jquery["default"])('#tblPacientesTriagem > tbody').prepend(novaLinha); // console.log('nenhum muito alta');
    }
  }

  aplicandoEstilo((0, _jquery["default"])('#tblPacientesTriagem > tbody'));
});
socket.on('triagemTela_call', function (data) {
  var novaLinha = createLine(data); // Se a prioridade da nova linha for Normal

  if (novaLinha.children[1].innerHTML == '1') {
    (0, _jquery["default"])('#tblPacientesTelaTriagem > tbody').append(novaLinha); // Se ela for Alta
  } else if (novaLinha.children[1].innerHTML == '2') {
    // Se j?? houver alguma linha com prioridade Alta
    if (tableRow.find(function (a) {
      return a.children[1].outerText == "Alta";
    })) {
      // Index da ultima linha "Alta" encontrada [utlizei o metodo slice() para criar uma copia do array e o metodo reverse em conjunto com o indexOf e find para pegar o ultimo elemento com prioridade "Alta" na tabela]
      var i = tableRow.slice().reverse().indexOf(tableRow.find(function (a) {
        return a.children[1].outerText == "Alta";
      }));
      (0, _jquery["default"])('#tblPacientesTelaTriagem > tbody > tr').eq(i - 1).after(novaLinha); // Adicionando ap??s
      // Se houver alguma linha com prioridade Muito Alta 
    } else if (tableRow.find(function (a) {
      return a.children[1].outerText == "Muito Alta";
    })) {
      var i = tableRow.slice().reverse().indexOf(tableRow.find(function (a) {
        return a.children[1].outerText == "Muito Alta";
      })); // Adicionando ap??s

      (0, _jquery["default"])('#tblPacientesTelaTriagem > tbody > tr').eq(i - 1).after(novaLinha); // console.log('muito alta');
      // Se nao houver nenhuma linha com prioridade "Alta" nem "Muito Alta"
    } else {
      // console.log('nada. WARNING')
      (0, _jquery["default"])('#tblPacientesTelaTriagem > tbody').prepend(novaLinha);
    }
  } else {
    if (tableRow.find(function (a) {
      return a.children[1].outerText == "Muito Alta";
    })) {
      var i = tableRow.indexOf(tableRow.slice().reverse().find(function (a) {
        return a.children[1].outerText == "Muito Alta";
      }));
      (0, _jquery["default"])('#tblPacientesTelaTriagem > tbody > tr').eq(i).after(novaLinha); // Adicionando ap??s
      // console.log('algum muito alta');
    } else {
      (0, _jquery["default"])('#tblPacientesTelaTriagem > tbody').prepend(novaLinha); // console.log('nenhum muito alta');
    }
  }

  aplicandoEstilo((0, _jquery["default"])('#tblPacientesTelaTriagem > tbody'));
});
aplicandoEstilo((0, _jquery["default"])('#tblPacientesTelaTriagem > tbody'));

function dismiss() {
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
  btnDispensar.innerHTML = "Dispensar";
  btnDispensar.className = "btn btn-danger btn-sm";
  btnDispensar.onclick = dismiss();
  TdBtnDispensar.appendChild(btnDispensar);
  btnEnviarMedico.innerHTML = "Enviar";
  btnEnviarMedico.className = "btn btn-success btn-sm";
  btnEnviarMedico.dataset.toggle = "modal";
  btnEnviarMedico.dataset.target = "#enviarModal";
  TdBtnEnviar.appendChild(btnEnviarMedico);
  novaLinha.className = "linha";
  novaLinha.appendChild(novoNome);
  novaLinha.appendChild(novaPrioridade);
  novaLinha.appendChild(TdBtnDispensar);
  novaLinha.appendChild(TdBtnEnviar);
  novaLinha.appendChild(inputID);
  btnEnviarMedico.onclick = setInput(btnEnviarMedico);
  return novaLinha;
} // console.log("yuikjhkh" + btnPostToDoctor);


btnPostToDoctor.onclick = function () {
  console.log('btn enviar medico');
  var consultorio = document.getElementById('selectConsultorio');
  var prioridade = document.getElementById('selectPrioridade');
  var bodyModal = document.getElementById('body-modal');
  var id = bodyModal.children[5];

  _jquery["default"].post("/enviarAoMedico", {
    consultorio: consultorio.value,
    prioridade: prioridade.value,
    id: id.value
  });

  window.location.href = '/triagem';
};