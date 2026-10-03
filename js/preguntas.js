// ==========================================
// CONFIGURACIÓN Y SELECCIÓN DEL DOM
// ==========================================

const estado = document.querySelector("#estado");
const juego = document.querySelector("#juego");
const final = document.querySelector("#final");
const progreso = document.querySelector("#progreso");
const elementoPregunta = document.querySelector("#pregunta");
const opciones = document.querySelector("#opciones");
const resultado = document.querySelector("#resultado");
const siguiente = document.querySelector("#siguiente");
const puntaje = document.querySelector("#puntaje");
const reiniciar = document.querySelector("#reiniciar");
const reintentar = document.querySelector("#reintentar");
const imagenRonda = document.querySelector("#imagenRonda");
const temporizador = document.querySelector("#temporizador");
const empezar = document.querySelector("#empezar");


// ==========================================
// CONFIGURACIÓN DE LAS RONDAS
// ==========================================

const rondas = [
    {
        nombre: "Música",
        categoria: 12,
        dificultad: "easy",
        tiempo: 30,
        imagen: "img/musica.gif",
        preguntas: []
    },
    {
        nombre: "Cine",
        categoria: 11,
        dificultad: "medium",
        tiempo: 25,
        imagen: "img/cine.gif",
        preguntas: []
    },
    {
        nombre: "Geografía",
        categoria: 22,
        dificultad: "hard",
        tiempo: 20,
        imagen: "img/geografia.gif",
        preguntas: []
    }
];
// ==========================================
// VARIABLES
// ==========================================

let preguntas = [];
let indice = 0;
let correctas = 0;

// indica la ronda
let rondaActual = 0;

let tiempoRestante = 0;
let intervaloTemporizador = null;

// sirve para evitar el HTTP 429.
let ultimaSolicitud = 0;


// ==========================================
// FUNCIONES
// ==========================================

function decodificar(texto) {
    return decodeURIComponent(texto);
}


function mezclar(arreglo) {
    return [...arreglo].sort(() => Math.random() - 0.5);
}


function mostrarError(mensaje) {

    detenerTemporizador();

    estado.textContent = mensaje;
    estado.className = "lila";

    juego.classList.add("oculto");
    final.classList.add("oculto");

    reintentar.hidden = false;
}


// ==========================================
// ESPERAR ENTRE SOLICITUDES A LA API
// ==========================================

async function esperarEntreSolicitudes() {

    const ahora = Date.now();

    const tiempoPasado = ahora - ultimaSolicitud;

    const tiempoEsperar = 5000 - tiempoPasado;

    if (tiempoEsperar > 0) {

        await new Promise((resolver) => {
            setTimeout(resolver, tiempoEsperar);
        });
    }

    ultimaSolicitud = Date.now();
}


// ==========================================
// CARGAR PREGUNTAS
// ==========================================

async function cargarPreguntas() {

    imagenRonda.classList.add("oculto");

    estado.classList.remove("oculto");

    estado.className = "lila";

    estado.textContent = "Cargando preguntas...";

    juego.classList.add("oculto");
    final.classList.add("oculto");
    reintentar.hidden = true;
    siguiente.hidden = true;

    // Obtiene la información de la ronda actual.

    const ronda = rondas[rondaActual];


    // Esperar antes de hacer otra consulta.

    await esperarEntreSolicitudes();

    // Armado del endpoint según la ronda.

    const endpoint =
        `https://opentdb.com/api.php?amount=6` +
        `&category=${ronda.categoria}` +
        `&difficulty=${ronda.dificultad}` +
        `&type=multiple` +
        `&encode=url3986`;


    try {

        const respuesta = await fetch(endpoint);

        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();


        if (datos.response_code !== 0 || datos.results.length < 6) {

            throw new Error(
                "La API no devolvió seis preguntas"
            );
        }


        // preguntas obtenidas de la API.

        preguntas = datos.results.map((pregunta) => {

            return {
                texto: decodificar(pregunta.question),

                correcta: decodificar(
                    pregunta.correct_answer
                ),

                opciones: mezclar([
                    decodificar(pregunta.correct_answer),

                    ...pregunta.incorrect_answers.map(
                        decodificar
                    )
                ])
            };
        });


        // Se guarda dentro de la ronda

        ronda.preguntas = preguntas;


        indice = 0;


        estado.textContent =
            `Ronda ${rondaActual + 1}: ${ronda.nombre}`;


        juego.classList.remove("oculto");
        iniciarTemporizador(ronda.tiempo);

        mostrarPregunta();


    } catch (error) {

        mostrarError(
            `No se pudo cargar el quiz: ${error.message}`
        );
    }
}


// ==========================================
// MOSTRAR PREGUNTA
// ==========================================

function mostrarPregunta() {

    const actual = preguntas[indice];

    const ronda = rondas[rondaActual];


    progreso.textContent =
        `Pregunta ${indice + 1} de ${preguntas.length}`;


    elementoPregunta.textContent = actual.texto;
    
    imagenRonda.src = ronda.imagen;
    imagenRonda.alt = ronda.nombre;
    imagenRonda.classList.remove("oculto");

    opciones.innerHTML = "";

    resultado.textContent = "";

    siguiente.hidden = true;


    actual.opciones.forEach((opcion) => {

        const boton = document.createElement("button");

        boton.type = "button";

        boton.textContent = opcion;

        boton.addEventListener("click", () => {
            responder(opcion);
        });

        opciones.append(boton);
    });
}


// ==========================================
// RESPONDER
// ==========================================

function responder(eleccion) {


    const actual = preguntas[indice];

    const botones =
        document.querySelectorAll("#opciones button");


    botones.forEach((boton) => {
        boton.disabled = true;
    });


    if (eleccion === actual.correcta) {

        correctas += 1;

        resultado.textContent = "Correcto";

    } else {

        resultado.textContent =
            `Incorrecto. La respuesta era: ${actual.correcta}`;
    }


    siguiente.textContent =
        indice === preguntas.length - 1
            ? "Siguiente ronda"           
            : "Siguiente pregunta";    


    // Si estamos en la última pregunta
    // de la última ronda, se muestra el resultado.

    if (
        indice === preguntas.length - 1 &&  
        rondaActual === rondas.length - 1
    ) {

        siguiente.textContent = "Ver resultado";
    }


    siguiente.hidden = false;
}


// ==========================================
// AVANZAR
// ==========================================

async function avanzar() {

    indice += 1;


    // ==========================================
    // TODAVÍA QUEDAN PREGUNTAS EN LA RONDA
    // ==========================================

    if (indice < preguntas.length) {

        mostrarPregunta();

        return;
    }


    // ==========================================
    // TERMINÓ LA RONDA
    // ==========================================

    if (rondaActual < rondas.length - 1) {

        rondaActual += 1;

        // Se vuelve a llamar a la API
        // para obtener las preguntas de la siguiente ronda.

        await cargarPreguntas();

        return;
    }


    // ==========================================
    // Fin
    // ==========================================

    detenerTemporizador();

    juego.classList.add("oculto");

    imagenRonda.classList.add("oculto");
    estado.classList.add("oculto");

    puntaje.textContent =
        `Respuestas correctas: ${correctas} de 18`;

    final.classList.remove("oculto");
}


// ==========================================
// TEMPORIZADOR
// ==========================================
function iniciarTemporizador(segundos) {

    detenerTemporizador();

    tiempoRestante = segundos;

    actualizarTemporizador();


    intervaloTemporizador = setInterval(() => {

        tiempoRestante--;

        actualizarTemporizador();


        if (tiempoRestante <= 0) {

            detenerTemporizador();

            tiempoAgotado();
        }

    }, 1000);
}


function actualizarTemporizador() {

    if (temporizador) {

        temporizador.textContent =
            `Tiempo: ${tiempoRestante}s`;
    }
}


function detenerTemporizador() {

    if (intervaloTemporizador !== null) {

        clearInterval(intervaloTemporizador);

        intervaloTemporizador = null;
    }
}


// ==========================================
// TIEMPO AGOTADO
// ==========================================

function tiempoAgotado() {

   resultado.textContent = "Se terminó el tiempo de la ronda.";

    siguiente.hidden = true;

    rondaActual += 1;

    if (rondaActual < rondas.length) {

        cargarPreguntas();

    } else {

        juego.classList.add("oculto");

        imagenRonda.classList.add("oculto");
        estado.classList.add("oculto");

        puntaje.textContent =
            `Respuestas correctas: ${correctas} de 18`;

        final.classList.remove("oculto");
    }
}


// ==========================================
// REINICIAR
// ==========================================

reiniciar.addEventListener("click", () => {

    detenerTemporizador();

    indice = 0;

    correctas = 0;

    rondaActual = 0;

    preguntas = [];

    rondas.forEach((ronda) => {
        ronda.preguntas = [];
    });

    final.classList.add("oculto");

    cargarPreguntas();
});


// ==========================================
// REINTENTAR
// ==========================================

reintentar.addEventListener("click", () => {

    detenerTemporizador();

    indice = 0;

    correctas = 0;

    rondaActual = 0;

    preguntas = [];

    rondas.forEach((ronda) => {
        ronda.preguntas = [];
    });

    cargarPreguntas();
});


siguiente.addEventListener("click", avanzar);

empezar.addEventListener("click", () => {
    empezar.classList.add("oculto");
    cargarPreguntas();
});

