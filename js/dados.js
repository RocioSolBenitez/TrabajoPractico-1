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


