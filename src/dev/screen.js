var pacienteTela = document.getElementById('pacienteTela');
var consultorioTela = document.getElementById('consultorioTela');

window.onload = () => {

    var audio = document.getElementById('audioChamada');
    if (audio.children[0].src) {
        console.log(audio.children[0].src)
        audio.play();
    }

};