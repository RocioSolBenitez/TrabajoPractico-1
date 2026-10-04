let tiempo = 10;
let intervaloTimer;
let juegoTerminado = false;

let timer =
document.getElementById("timer");
let mensaje =
document.getElementById("mensaje");

let cartas = 
document.getElementById("cartas");
let ronda =
document.getElementById("ronda");
let puntaje =
document.getElementById("puntaje");
let reiniciar =
document.getElementById("reiniciar");
let final = 
document.getElementById("final");
let imagenCarta = document.getElementById("imagenCarta");


let mayor =
document.getElementById("mayor");
let menor =
document.getElementById("menor");

let cartasDisponibles = [1,2,3,4,5,6,7,8,9,10];

let posicion = 0;

let cartaActual = 
cartasDisponibles [posicion];
let cartaSiguiente = 
cartasDisponibles [posicion + 1];

let rondaActual = 0;
let puntos = 0;

//carta aleatoria 
function iniciarTimer() {
    clearInterval(intervaloTimer);
    tiempo = 10;
    timer.textContent = "tiempo" + tiempo;

    intervaloTimer = setInterval(function()
{
    tiempo--;
    timer.textContent = "tiempo" + tiempo;

    if (tiempo <= 0){
        clearInterval(intervaloTimer);

        mensaje.textContent= "¡Se termino el juego!";
        avanzarRonda();
    }
},1000);
}
function sacarCarta() {
    let posicionRandom = Math.floor( Math.random()*
cartasDisponibles.length);
return cartasDisponibles[posicionRandom];
}

function avanzarRonda(){
    if (rondaActual >= 10){
        juegoTerminado = true;
        clearInterval(intervaloTimer);

        tiempo = 0;
        timer.textContent =
        "tiempo: 0"

        mensaje.textContent = "¡Terminaste las 10 rondas!";
        mayor.disabled = true;
        menor.disabled = true;

        //GUARDAR RESULTADOS
    let registros = localStorage.getItem("cartas");
        if (registros == null) {
        registros = [];
        } else {
        registros = JSON.parse(registros);
        }

        registros.push(puntos);

        localStorage.setItem("cartas", JSON.stringify(registros));

        return;
    }
    cartaActual = cartaSiguiente;
    cartaSiguiente = sacarCarta ();

    rondaActual++;

    actualizarPantalla();
    iniciarTimer();
}
function mostrarDorso(){
    imagenCarta.src = "img/cartas/dorso.png"
}

function actualizarPantalla() {
    ronda.textContent = rondaActual;
    puntaje.textContent = puntos;
    cartas.textContent = cartaActual;
    imagenCarta.src = "img/cartas/carta" + cartaActual + ".png";
}

mayor.addEventListener("click",function(){
    if (juegoTerminado) return; 
    clearInterval(intervaloTimer);

    if(cartaSiguiente > cartaActual){
        puntos++;
        mensaje.textContent = "¡correcto!";
    }else{
        mensaje.textContent = "¡Incorrecto!";
    }
    avanzarRonda();
});

menor.addEventListener("click",function(){
    if (juegoTerminado) return;
    clearInterval(intervaloTimer);

    if(cartaSiguiente < cartaActual){
        puntos++;
        mensaje.textContent = "¡Correcto!";
    }else{
        mensaje.textContent = "¡Incorrecto!";
    }
    avanzarRonda();

});
reiniciar.addEventListener("click",function(){
    final.classList.add("oculto");

    clearInterval(intervaloTimer);
    tiempo = 10;
    timer.textContent =
    "tiempo" + tiempo;



    posicion = 0;
    cartaActual =
    cartasDisponibles[posicion]; 
    cartaSiguiente =
    cartasDisponibles[posicion + 1];
    rondaActual = 0;
    puntos = 0;

    juegoTerminado = false;

    mayor.disabled = false;
    menor.disabled = false;

    cartaActual = sacarCarta();
    cartaSiguiente = sacarCarta();

    mensaje.textContent ="";


    ronda.textContent = rondaActual;
    puntaje.textContent = puntos;

    actualizarPantalla();
    iniciarTimer();
    mostrarDorso();

});
actualizarPantalla();
mostrarDorso();
