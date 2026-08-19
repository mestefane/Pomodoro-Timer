const Tempo = document.getElementById("tempo");
const  fase  = document.getElementById("fase");
const btiniciar = document.getElementById("btiniciar");
const btresetar = document.getElementById("btresetar");

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
//botao iniciar

function iniciarTime(){
    if(rodando) return; 

    rodando =  true;

    intervalo = setInterval(function(){
        temporestante = temporestante - 1;
        mostrarTempo();
    },1000);
}
btiniciar.addEventListener("click", iniciarTime);

//botao resetar

function resetarTime(){
    clearInterval(intervalo);
    rodando = false;
    temporestante = 25 * 60;
    mostrarTempo();
}
btresetar.addEventListener("click", resetarTime);