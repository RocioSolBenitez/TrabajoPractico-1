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
const tiempoHTML = document.querySelector("#tiempo");
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

//ESTO ES PARA QUE SE VEAN LAS FICHAS
function mostrarFichas() {

    let fichasAnteriores = document.querySelectorAll(".ficha1, .ficha2");

    for (let i = 0; i < fichasAnteriores.length; i++) {
        fichasAnteriores[i].remove();
    }

    let casilleros = document.querySelectorAll(".casillero");
    let ficha1 = document.createElement("span");

    ficha1.classList.add("ficha1");

    casilleros[posicionJugador1]
        .querySelector(".fichas")
        .append(ficha1);

    let ficha2 = document.createElement("span");

    ficha2.classList.add("ficha2");

    casilleros[posicionJugador2]
        .querySelector(".fichas")
        .append(ficha2);
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

//SI LOS DOS DADOS SON IGUALES
    if (dado1 == dado2) {

        mensaje.innerText = "¡Salieron iguales! No avanzas";

        cambiarJugador();
        return;
    }

//SE GUARDA LA POSICIÓN DEL JUGADOR
    let posicionActual;

    if (jugadorActual == 1) {
        posicionActual = posicionJugador1;
    } else {
        posicionActual = posicionJugador2;
    }

    let nuevaPosicion = posicionActual + suma;


//CUANDO LLEGUE AL CASILLERO 30
    if (nuevaPosicion == 30) {

        if (jugadorActual == 1) {
            posicionJugador1 = 30;
        } else {
            posicionJugador2 = 30;
        }

        mostrarPosiciones();
        mostrarFichas();

        ganar();
        return;
    }

//SI SE PASA DE 30, VUELVE PARA ATRAS
    if (nuevaPosicion > 30) {

        let pasado = nuevaPosicion - 30;

        nuevaPosicion = 30 - pasado;

        mensaje.innerText = "¡Te pasaste! Volves " + pasado + " casilleros hacia atrás";
    } 
    else {
        mensaje.innerText = "Avanzás " + suma + " casilleros";
    }

//SE GUARDA LA NUEVA POSICIÓN DEL JUGADOR
    if (jugadorActual == 1) {
        posicionJugador1 = nuevaPosicion;
    } else {
        posicionJugador2 = nuevaPosicion;
    }

    mostrarPosiciones();
    mostrarFichas();
    cambiarJugador();
}

//MOSTRAR POSICIONES
function mostrarPosiciones() {

    posicion1.innerText = posicionJugador1;
    posicion2.innerText = posicionJugador2;
}

//CAMBIAR JUGADOR
function cambiarJugador() {

    if (juegoTerminado == true) {
        return;
    }

    if (jugadorActual == 1) {
        jugadorActual = 2;
    } else {
        jugadorActual = 1;
    }

    turno.innerText = "Turno del Jugador " + jugadorActual;

    iniciarTimer();
}

//PARA QUE INICIE EL TIEMPO
function iniciarTimer() {

    clearInterval(timer);

    tiempo = 15;

    tiempoHTML.innerText = tiempo;

    timer = setInterval(function() {
        tiempo--;
        tiempoHTML.innerText = tiempo;

        if (tiempo == 0) {

            clearInterval(timer);

            mensaje.innerText = "Se terminó el tiempo. Perdés el turno.";

            cambiarJugador();
        }

    }, 1000);
}

//GANADOR
function ganar() {

    juegoTerminado = true;

    clearInterval(timer);

    turno.innerText = "¡Ganó el Jugador " + jugadorActual + "!";

    mensaje.innerText = "Llegaste al casillero 30";

    resultado.innerText = "Cantidad de turnos: " + cantidadTurnos;

    botonTirar.disabled = true;
    botonNuevaPartida.disabled = false;

    guardarResultado();
}

//GUARDAR LOS RESULTADOS
function guardarResultado() {

    let registros = localStorage.getItem("carreraDados");

    if (registros == null) {
        registros = [];
    } else {
        registros = JSON.parse(registros);
    }

    let nuevoRegistro = {
        jugador: "Jugador " + jugadorActual,
        turnos: cantidadTurnos
    };

    registros.push(nuevoRegistro);

    localStorage.setItem(
        "carreraDados", JSON.stringify(registros)
    );
}

//NUEVA PARTIDA
function nuevaPartida() {
    botonNuevaPartida.disabled = true;

    clearInterval(timer);
    posicionJugador1 = 0;
    posicionJugador2 = 0;
    jugadorActual = 1;
    tiempo = 15;
    cantidadTurnos = 0;
    juegoTerminado = false;
    imagenDado1.src = "img/dado1.jpg";
    imagenDado2.src = "img/dado1.jpg";

    resultado.innerText = "Presione el botón para comenzar";
    mensaje.innerText = "";

    mostrarPosiciones();
    mostrarFichas();

    turno.innerText = "Turno del Jugador 1";
    botonTirar.disabled = false;

    iniciarTimer();
}

//EVENTOS
botonTirar.addEventListener("click", tirarDados);
botonNuevaPartida.addEventListener("click", nuevaPartida);

//COMENZAR JUEGO
crearTablero();
mostrarFichas();

botonNuevaPartida.disabled = true;
