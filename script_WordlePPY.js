let intentos = 6;
const palabrasBackup = ["APPLE", "CRASH", "SMILE", "OCEAN", "DANCE", "PIZZA"];
const ERROR =document.getElementById("error");
ERROR.style.display = "none";
let palabra;
const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);
const API = "https://random-word-api.herokuapp.com/word?length=5&lang=es";

fetch(API)
  .then((response) => {
    response.json().then((body) => {
      palabra = body[0].toUpperCase();
      console.log('palabra', palabra);
      button.disabled = false;
      button.classList.remove("disabled");
      
    })
  })
  .catch(() => {
    palabra = palabrasBackup[Math.round(Math.random() * 5)];
    console.log('Error palabra', palabra);
  });

  function intentar() {
    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";
  
    const INTENTO = leerIntento();
  
    for (let i in palabra) {
      const SPAN = document.createElement("span");
      SPAN.className = "letter";
  
      if (INTENTO[i] === palabra[i]) {
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "#79b851"; // VERDE
      } else if (palabra.includes(INTENTO[i])) {
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "#f3c237"; // AMARILLO
      } else {
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "#a4aec4"; // GRIS
      }
      ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
  
    if (INTENTO === palabra) {
      terminar("GANASTE!");
      return;
    }
  
    intentos--;
  
    if (intentos == 0) {
      terminar("PERDISTE!");
    }
  }
  
  function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase();
  
    return intento;
  }


function terminar(mensaje) {
  const INPUT = document.getElementById("guess-input");
  INPUT.disabled = true;
  button.disabled = true;
  button.classList.add('disabled');
  let contenedor = document.getElementById("guesses");
  contenedor.innerHTML = mensaje;
}



/////////////////////////////////////////////////////////////////////////


// BOTON REINICIAR
function reiniciar() {
  console.log("reiniciar", palabra);
}



