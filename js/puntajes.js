//SELECCIONO ELEMENTOS DEL HTML
const puntajesCartas = document.querySelector("#puntajesCartas");
const puntajesDados = document.querySelector("#puntajesDados");
const puntajesPreguntas = document.querySelector("#puntajesPreguntas");
const botonBorrar = document.querySelector("#borrarPuntajes");

//MOSTRAR PUNTAJES
function mostrarPuntajes() {

//PUNTAJES DE CARTAS
    let resultadosCartas = localStorage.getItem("cartas");

    if (resultadosCartas != null) {

        resultadosCartas = JSON.parse(resultadosCartas);

        puntajesCartas.innerText = "";

        for (let i = 0; i < resultadosCartas.length; i++) {

            let resultado = document.createElement("p");

            resultado.innerText = "Partida " + (i + 1) + ": " + resultadosCartas[i] + " puntos";

            puntajesCartas.append(resultado);
        }

    }

//PUNTAJES DE DADOS
    let resultadosDados = localStorage.getItem("carreraDados");

    if (resultadosDados != null) {

        resultadosDados = JSON.parse(resultadosDados);

        puntajesDados.innerText = "";

        for (let i = 0; i < resultadosDados.length; i++) {

            let resultado = document.createElement("p");

            resultado.innerText = resultadosDados[i].jugador + " - " + resultadosDados[i].turnos + " turnos";

            puntajesDados.append(resultado);
        }

    }

//PUNTAJES DE PREGUNTAS
    let resultadosPreguntas = localStorage.getItem("preguntas");

    if (resultadosPreguntas != null) {

        resultadosPreguntas = JSON.parse(resultadosPreguntas);

        puntajesPreguntas.innerText = "";

        for (let i = 0; i < resultadosPreguntas.length; i++) {

            let resultado = document.createElement("p");

            resultado.innerText = "Partida " + (i + 1) + ": " + resultadosPreguntas[i] + " de 18 correctas";

            puntajesPreguntas.append(resultado);
        }

    }

}

//BORRAR TODOS LOS PUNTAJES
function borrarPuntajes() {

    localStorage.removeItem("cartas");
    localStorage.removeItem("carreraDados");
    localStorage.removeItem("preguntas");

    mostrarPuntajes();
}

//MOSTRAR LOS PUNTAJES AL ENTRAR
mostrarPuntajes();