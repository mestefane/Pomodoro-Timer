const Tempo = document.getElementById("tempo");
const  fase  = document.getElementById("fase");
const btiniciar = document.getElementById("btiniciar");
const btresetar = document.getElementById("btresetar");
const btpausar = document.getElementById("btpausar");

const tempoFoco = 25 *  60;
const tempoPausa = 5 * 60;


let temporestante = tempoFoco;
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

function  trocarFase(){
    if(faseAtual === 'foco'){
        faseAtual= 'pausa';
        fase.textContent = 'Pausa';
        temporestante = tempoPausa;
    } else {
        faseAtual = 'foco';
        fase.textContent = 'Foco';
        temporestante = tempoFoco;
    }
    mostrarTempo();
}

//botao iniciar

function iniciarTime(){
    if(rodando) return; 

    rodando =  true;

    intervalo = setInterval(function(){
        temporestante = temporestante - 1;

        if(temporestante <= 0 ){
            clearInterval(intervalo);
            rodando ='false';
            trocarFase();
            iniciarTime();
            return;
        }
        mostrarTempo();
    },1000);
}
btiniciar.addEventListener("click", iniciarTime);

//pausar
function pausarTime(){
    clearInterval(intervalo);
    rodando = false;

}
btpausar.addEventListener('click', pausarTime);

//botao resetar

function resetarTime(){
    clearInterval(intervalo);
    rodando = false;
    faseAtual = 'foco';
    fase.textContent = 'foco';
    temporestante = tempoFoco;
    mostrarTempo();
}
btresetar.addEventListener("click", resetarTime);