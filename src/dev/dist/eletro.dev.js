"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var socket = io();
var rowFila = document.getElementsByClassName("linha");
var btns = document.getElementsByTagName("button");
var tblPacientesEletro = document.getElementById('tblPacientesEletro');
var tableRow = Array.from(rowFila);

function aplicandoEstilo() {
  var _loop = function _loop(i) {
    if (rowFila[i].children[1].outerText == '1') {
      rowFila[i].children[1].innerHTML = "Normal";
      rowFila[i].children[1].className = 'bg-info';
    } else if (rowFila[i].children[1].outerText == '2') {
      rowFila[i].children[1].innerHTML = "Alta";
      rowFila[i].children[1].className = 'bg-warning';
    } else if (rowFila[i].children[1].outerText == '3') {
      rowFila[i].children[1].innerHTML = "Muito Alta";
      rowFila[i].children[1].className = 'bg-danger';
    }
    btns[i].onclick = function (x) {
      var id = btns[i].parentNode.parentNode.children[3].value;
      btns[i].parentNode.parentNode.remove();

      _jquery["default"].post("/eletro", {
        id: id
      });
    };
  };

  for (var i = 0; i < rowFila.length; i++) {
    _loop(i);
  }

  ;
}

aplicandoEstilo();
console.log(socket);
socket.on("eletroCall", function (data) {
  console.log(data);
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
  novaLinha.className = "linha"; // Se a prioridade da nova linha for Normal

  if (novaPrioridade.innerHTML == '1') {
    (0, _jquery["default"])('#tblPacientesEletro > tbody').append(novaLinha); // Se ela for Alta
  } else if (novaPrioridade.innerHTML == '2') {
    // Se já houver alguma linha com prioridade Alta
    console.log(tableRow);

    if (tableRow.find(function (a) {
      return a.children[1].outerText == "Alta";
    })) {
      // Index da ultima linha "Alta" encontrada [utlizei o metodo slice() para criar uma copia do array e o metodo reverse em conjunto com o indexOf e find para pegar o ultimo elemento com prioridade "Alta" na tabela]
      var i = tableRow.slice().reverse().indexOf(tableRow.find(function (a) {
        return a.children[1].outerText == "Alta";
      }));
      console.log(i);
      (0, _jquery["default"])('#tblPacientesEletro > tbody > tr').eq(i - 1).after(novaLinha); // Adicionando após
      // Se houver alguma linha com prioridade Muito Alta 
    } else if (tableRow.find(function (a) {
      return a.children[1].outerText == "Muito Alta";
    })) {
      var i = tableRow.slice().reverse().indexOf(tableRow.find(function (a) {
        return a.children[1].outerText == "Muito Alta";
      }));
      console.log(i); // Adicionando após

      (0, _jquery["default"])('#tblPacientesEletro > tbody > tr').eq(i - 1).after(novaLinha);
      console.log('muito alta'); // Se nao houver nenhuma linha com prioridade "Alta" nem "Muito Alta"
    } else {
      console.log('nada. WARNING');
      (0, _jquery["default"])('#tblPacientesEletro > tbody').prepend(novaLinha);
    }
  } else {
    if (tableRow.find(function (a) {
      return a.children[1].outerText == "Muito Alta";
    })) {
      var i = tableRow.indexOf(tableRow.slice().reverse().find(function (a) {
        return a.children[1].outerText == "Muito Alta";
      }));
      (0, _jquery["default"])('#tblPacientesEletro > tbody > tr').eq(i).after(novaLinha); // Adicionando após

      console.log('algum muito alta');
    } else {
      (0, _jquery["default"])('#tblPacientesEletro > tbody').prepend(novaLinha);
      console.log('nenhum muito alta');
    }
  }

  aplicandoEstilo();
});