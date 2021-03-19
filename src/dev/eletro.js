import $ from 'jquery';

var socket = io();
 
var rowFila = document.getElementsByClassName("linha");
var btns = document.getElementsByTagName("button");
  
for(let i = 0; i < rowFila.length; i++) {
    if(rowFila[i].children[1].outerText == '1'){
        rowFila[i].children[1].innerHTML =  "Normal";
        rowFila[i].children[1].className = 'bg-info'

    } else if(rowFila[i].children[1].outerText == '2') {
        rowFila[i].children[1].innerHTML =  "Alta";
        rowFila[i].children[1].className = 'bg-warning'
        
    } else if(rowFila[i].children[1].outerText == '3') {
        rowFila[i].children[1].innerHTML =  "Muito Alta";
        rowFila[i].children[1].className = 'bg-danger'

    } 

    btns[i].onclick = (x) => {
        let id =  btns[i].parentNode.parentNode.children[3].value;
        
        x.preventDefault();    
        $.post("/eletro", { id: id });
    }

};

console.log(socket);

// socket.on("call", (data) => {


// });