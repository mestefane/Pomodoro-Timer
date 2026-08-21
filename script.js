const Tempo = document.getElementById("tempo");
const fase  = document.getElementById("fase");
const btiniciar = document.getElementById("btiniciar");
const btresetar = document.getElementById("btresetar");
const abafoco = document.getElementById("abafoco");
const abapausa = document.getElementById("abapausa");

let temporestante =25 * 60;
let rodando = false;
let faseAtual = "foco";
let intervalo = null;

function mostrarTempo(){
    const minutos = Math.floor(temporestante / 60);
    const segundos = temporestante % 60;
    const minformt = String(minutos).padStart(2, "0");
    const segformt = String(segundos).padStart(2,"0");

    Tempo.textContent = `${minformt}:${segformt}`;

}
mostrarTempo();

function tocarBipe(){
    const contextoAudio = new (window.AudioContext || window.webkitAudioContext)();
    const oscilador = contextoAudio.createOscillator();
    const volume = contextoAudio.createGain();

    oscilador.connect(volume);
    volume.connect(contextoAudio.destination);

    oscilador.type = "sine";
    oscilador.frequency.value = 880;
    volume.gain.value = 0.2;

    oscilador.start();
    oscilador.stop(contextoAudio.currentTime + 0.15);
}

function iniciarPausar(){
    if(rodando){
     
        clearInterval(intervalo);
        rodando = false;
        btiniciar.textContent = "START";
        return;
    }
   
    rodando = true;
    btiniciar.textContent = "PAUSE";
    tocarBipe();

    intervalo = setInterval(function(){
        temporestante = temporestante - 1;
        mostrarTempo();

        if(temporestante <= 0){
            clearInterval(intervalo);
            rodando = false;
            btiniciar.textContent = "START";
        }
    },1000);
}
btiniciar.addEventListener("click", iniciarPausar);

function mudartela(novafase){
    clearInterval(intervalo);
    rodando = false;
    btiniciar.textContent = "START";

    faseAtual = novafase;
    if(faseAtual === "foco"){
        temporestante= 25 * 60;
        abafoco.classList.add("ativa");
        abapausa.classList.remove("ativa");
    }else  {
        temporestante  =  5 * 60;
        abapausa.classList.add("ativa");
        abafoco.classList.remove("ativa");
    }
    mostrarTempo();
}


function resetar(){
    clearInterval(intervalo);
    rodando = false;
    temporestante = (faseAtual === "foco") ? 25 * 60 : 5 * 60;
    btiniciar.textContent = "START";
    mostrarTempo();
}
btresetar.addEventListener("click", resetar);

abafoco.addEventListener("click", function(){ mudartela("foco"); });
abapausa.addEventListener("click", function(){ mudartela("pausa"); });