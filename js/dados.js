//VARIABLES
let posicionJugador1 = 0;
let posicionJugador2 = 0;

let jugadorActual = 1;

let dado1;
let dado2;
let suma;

let tiempo = 15;
let timer;

let juegoTerminado = false;

let cantidadTurnos = 0;

//SELECCIONO ELEMENTOS DEL HTML
const turno = document.querySelector("#turno");
const tiempo = document.querySelector("#tiempo");
const imagenDado1 = document.querySelector("#dado1");
const imagenDado2 = document.querySelector("#dado2");
const botonTirar = document.querySelector("#tirar");
const botonNuevaPartida = document.querySelector("#nuevaPartida");
const resultado = document.querySelector("#resultado");
const mensaje = document.querySelector("#mensaje");
const tablero = document.querySelector("#tablero");
const posicion1 = document.querySelector("#posicion1");
const posicion2 = document.querySelector("#posicion2");

//CREO EL TABLERO
function crearTablero() {
    for (let i = 0; i <= 30; i++) {

        let casillero = document.createElement("div");

        casillero.classList.add("casillero");

        let numero = document.createElement("span");

        numero.classList.add("numero");
        numero.innerText = i;

        let fichas = document.createElement("div");

        fichas.classList.add("fichas");

        casillero.append(numero);
        casillero.append(fichas);
        tablero.append(casillero);
    }
}

//TIRAR LOS DADOS
function tirarDados() {

    if (juegoTerminado == true) {
        return;
    }

    dado1 = Math.floor(Math.random() * 6) + 1;
    dado2 = Math.floor(Math.random() * 6) + 1;

    suma = dado1 + dado2;

    imagenDado1.src = "img/dado" + dado1 + ".jpg";

    imagenDado2.src = "img/dado" + dado2 + ".jpg";

    resultado.innerText = "Salió " + dado1 + " y " + dado2 + ". La suma es " + suma;

    cantidadTurnos++;
    
