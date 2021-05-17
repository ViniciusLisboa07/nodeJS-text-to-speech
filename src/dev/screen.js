var pacienteTela = document.getElementById('pacienteTela');
var consultorioTela = document.getElementById('consultorioTela');

window.onload = () => {

    var audio = document.getElementById('audioChamada');
    if (audio) {

        var audioEffect = new Audio("audios/bellEffect.wav");
        audioEffect.load();
        audioEffect.play();

        audio.load();
        setTimeout(() => {
            audio.play();
        }, 3000);

    }

}