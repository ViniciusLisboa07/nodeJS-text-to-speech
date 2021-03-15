import $ from 'jquery';
console.log('098098')


var rowFila = document.getElementsByClassName("linha");
var btns = document.getElementsByTagName('button'); 

console.log(rowFila)
console.log(rowFila[1].children[1])
  
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
        x = btns[i];
        let id = x.parentNode.parentNode.children[3].value;

        $.post("/eletro", { id: id });
    } 

};  
