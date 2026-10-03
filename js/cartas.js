let cartas = 
document.getElementById("cartas");
let ronda =
document.getElementById("ronda");
let puntaje =
document.getElementById("puntaje");
let reiniciar =
document.getElementById("reiniciar");
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

function actualizarPantalla() {
    ronda.textContent = rondaActual;
    puntaje.textContent = puntos;
    cartas.textContent = cartaActual;
    imagenCarta.src = "img/cartas/carta" + cartaActual + ".png";
}

mayor.addEventListener("click",function(){
    if (cartaSiguiente > cartaActual){
        puntos++;
    }
    posicion++;

    cartaActual =
    cartasDisponibles[posicion];
    cartaSiguiente =
    cartasDisponibles[posicion + 1];
    rondaActual++;
    actualizarPantalla();
});

menor.addEventListener("click",function(){
    if (cartaSiguiente < cartaActual){
        puntos++;
    }
    cartaActual =
    cartasDisponibles[posicion];
    cartaSiguiente;
    cartasDisponibles[posicion + 1];
    rondaActual++;
    actualizarPantalla();
});
reiniciar.addEventListener("click",function(){
    posicion = 0;
    cartaActual =
    cartasDisponibles[posicion]; 
    cartaSiguiente =
    cartasDisponibles[posicion + 1];
    rondaActual = 0;
    puntos = 0;
    actualizarPantalla();

});
actualizarPantalla();
