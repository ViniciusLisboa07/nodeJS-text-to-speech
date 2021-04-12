"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  for (var i = 0; i < (0, _jquery["default"])('#tblFilaRecepcao > tbody')[0].children.length; i++) {
    if ((0, _jquery["default"])('#tblFilaRecepcao > tbody')[0].children[i].children[1].outerText == '1') {
      (0, _jquery["default"])('#tblFilaRecepcao > tbody')[0].children[i].children[1].innerHTML = "Normal";
      (0, _jquery["default"])('#tblFilaRecepcao > tbody')[0].children[i].children[1].className = 'bg-info';
    } else if ((0, _jquery["default"])('#tblFilaRecepcao > tbody')[0].children[i].children[1].outerText == '2') {
      (0, _jquery["default"])('#tblFilaRecepcao > tbody')[0].children[i].children[1].innerHTML = "Alta";
      (0, _jquery["default"])('#tblFilaRecepcao > tbody')[0].children[i].children[1].className = 'bg-warning';
    } else if ((0, _jquery["default"])('#tblFilaRecepcao > tbody')[0].children[i].children[1].outerText == '3') {
      (0, _jquery["default"])('#tblFilaRecepcao > tbody')[0].children[i].children[1].innerHTML = "Muito Alta";
      (0, _jquery["default"])('#tblFilaRecepcao > tbody')[0].children[i].children[1].className = 'bg-danger';
    }
  }

  ;
  console.log((0, _jquery["default"])('#tblFilaRecepcao > tbody')[0].children.length);
}

aplicandoEstilo();
socket.on('call', function (data) {
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
  novaLinha.className = "linha"; // Se a prioridade da nova linha for Normal

  if (novaPrioridade.innerHTML == '1') {
    (0, _jquery["default"])('#tblFilaRecepcao > tbody').append(novaLinha); // Se ela for Alta
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
      console.log(tableRow.slice().reverse());
      console.log(i);
      (0, _jquery["default"])('#tblFilaRecepcao > tbody > tr').eq(i - 1).after(novaLinha); // Adicionando após
      // Se houver alguma linha com prioridade Muito Alta 
    } else if (tableRow.find(function (a) {
      return a.children[1].outerText == "Muito Alta";
    })) {
      var i = tableRow.slice().reverse().indexOf(tableRow.find(function (a) {
        return a.children[1].outerText == "Muito Alta";
      }));
      console.log(i); // Adicionando após

      (0, _jquery["default"])('#tblFilaRecepcao > tbody > tr').eq(i - 1).after(novaLinha);
      console.log('muito alta'); // Se nao houver nenhuma linha com prioridade "Alta" nem "Muito Alta"
    } else {
      (0, _jquery["default"])('#tblFilaRecepcao > tbody').prepend(novaLinha);
    }
  } else {
    if (tableRow.find(function (a) {
      return a.children[1].outerText == "Muito Alta";
    })) {
      var i = tableRow.indexOf(tableRow.slice().reverse().find(function (a) {
        return a.children[1].outerText == "Muito Alta";
      }));
      (0, _jquery["default"])('#tblFilaRecepcao > tbody > tr').eq(i).after(novaLinha); // Adicionando após

      console.log('algum muito alta');
    } else {
      (0, _jquery["default"])('#tblFilaRecepcao > tbody').eq(0).prepend(novaLinha);
      console.log('nenhum muito alta');
    }
  }

  aplicandoEstilo();
});
console.log((0, _jquery["default"])('#tblFilaRecepcao > tbody')[0].children);
var form = null;

btnChamar.onclick = function (x) {
  rowFila = document.getElementsByClassName("linha");
  tableRow = Array.from(rowFila);
  console.log((0, _jquery["default"])('#tblFilaRecepcao')[0].children[1].children[0].children[2]);

  if (tableRow.length > 0) {
    console.log((0, _jquery["default"])('#tblFilaRecepcao')[0].children[1]);
    console.log((0, _jquery["default"])('#tblFilaRecepcao')[0].children[1].children[0].children[2].value);
    var id = (0, _jquery["default"])('#tblFilaRecepcao')[0].children[1].children[0].children[2].value;
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
      (0, _jquery["default"])('body').append(form);
    } else {
      (0, _jquery["default"])("#id").val(id);
      console.log("alterou");
    }

    tblFilaRecepcao.children[1].children[0].remove();
    console.log((0, _jquery["default"])("#chamarForm"));
    (0, _jquery["default"])("#chamarForm").submit();
  } else {
    console.log("A fila está vazia");
  }
};