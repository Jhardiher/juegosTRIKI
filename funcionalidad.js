
let jugador = document.getElementById('jugador');
let reiniciarBTON = document.getElementById('reiniciarBTON');
let contenedores = Array.from(document.getElementsByClassName('box'));

const colorGanador = getComputedStyle(document.body).getPropertyValue('--bloques-ganadores');

const ficha_O = "O";
const ficha_X = "X";

let jugadorActual = ficha_X;
let juegoTerminado = false;

let casillas = Array(9).fill(null);

let partidasGanadasX = 0;
let partidasGanadasO = 0;
let partidasEmpate = 0;

const puntajeJugador1 = document.getElementById('puntaje-jugador1');
const puntajeJugador2 = document.getElementById('puntaje-jugador2');
const puntajeEmpates = document.getElementById('puntaje-empates');

const iniciar = () => {
    contenedores.forEach((box, index) => {
        box.id = index; 
        box.addEventListener('click', contenedorClick);
    });
    actualizarConteoPartidas();
}

function contenedorClick(e) {
    const id = parseInt(e.target.id);

    if (!casillas[id] && !juegoTerminado) {
        casillas[id] = jugadorActual;
        e.target.innerText = jugadorActual;

        const resultadoGanador = verificarGanador();
        if (resultadoGanador !== false) {
            jugador.innerHTML = jugadorActual + " ha ganado";
            resultadoGanador.forEach(index => contenedores[index].style.backgroundColor = colorGanador);
            juegoTerminado = true;
            actualizarConteoGanadas(jugadorActual);
            return;
        }   
        if (!casillas.includes(null)) {
            jugador.innerHTML = "Empate";
            juegoTerminado = true;
            actualizarConteoEmpate();
            return;
        }

        jugadorActual = jugadorActual === ficha_X ? ficha_O : ficha_X;
    }
}

const jugadas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    [0, 4, 8],
    [2, 4, 6]
];

function verificarGanador() {
    for (const condicion of jugadas) {
        let [a, b, c] = condicion;
        if (casillas[a] && casillas[a] === casillas[b] && casillas[a] === casillas[c]) {
            return [a, b, c];
        }
    }
    return false;
}

reiniciarBTON.addEventListener('click', reiniciar);

function reiniciar() {
    casillas.fill(null);
    juegoTerminado = false;

    contenedores.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    jugador.innerHTML = 'TRIKI';
    jugadorActual = ficha_X;
}

// lógica del marcador
function actualizarConteoGanadas(jugador) {
    if (jugador === ficha_X) {
        partidasGanadasX++;
    } else if (jugador === ficha_O) {
        partidasGanadasO++;
    }
    actualizarConteoPartidas();
}

function actualizarConteoEmpate() {
    partidasEmpate++;
    actualizarConteoPartidas();
}

function actualizarConteoPartidas() {
    puntajeJugador1.innerText = partidasGanadasX;
    puntajeJugador2.innerText = partidasGanadasO;
    puntajeEmpates.innerText = partidasEmpate;
}

iniciar();
