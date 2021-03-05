import $ from 'jquery';

var btnFalar = document.getElementById("btnFalar");

btnFalar.onclick = function () {
    
    $().post('/screen');
}