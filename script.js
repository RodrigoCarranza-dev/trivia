//Definición de variables y objetos a utilizar
const headerBox = document.getElementById('toptext')
const optionA = document.getElementById('a-btn')
const optionB = document.getElementById('b-btn')
const optionC = document.getElementById('c-btn')
const optionD = document.getElementById('d-btn')
const botones = document.getElementsByClassName('btn')
const band = document.getElementsByClassName('right')
const card = document.getElementById('card')
const cuerpo = document.getElementsByTagName('body')
let cont = 1
let topText
let time
let rightOptions = 0
//Define la lista que almacena las respuestas correctas
rightAnswers = ['is','My / surname', 'I am', 'Her / She\'s', 'is / He\'s', 'Where', 'are / from', 'I\'m']

//Llamar a la funcion capture si detecta un clic en el documento.
document.onclick = capture

//Función que cambia la visibilidad del formulario. 
 function cardLoad(){
    card.classList.toggle('vis')
 }

 //Ejecución al detectar un clic
function capture(e){
  //Lista que sirve para identificar si el botón tiene una viñeta
  list = ['A', 'B', 'C', 'D']

    if(e !== null){
      //Define variables booleanas que servirán para los if
      //Identifican a qué parte del botón se le dio click
      let literal = list.includes(e.target.innerText) && e.target.childNodes.length === 1 && e.srcElement.tagName === 'LABEL'
      let divCircular = e.target.tagName.toUpperCase() === 'DIV'  && e.target.classList.contains('rt')
      let boton = e.target.classList.contains('btn') && e.target.childNodes.length === 2
      let respuesta = e.target.classList.contains('as') && e.target.childNodes.length === 1
      
        if (literal){
          texto = e.target.parentNode.nextSibling.innerText
        } //Si se dio click en el literal (label)
        else if (divCircular){
          texto = e.target.parentNode.lastChild.innerText
        } // si se dio click en el div circular
        else if (boton) {
          texto = e.target.lastChild.innerText
        } // si se dio click en el boton entero
        else if (respuesta){
          texto = e.target.innerText} //Se dio click en el label que contiene la respuesta
        else{texto = e.target.parentNode.innerHTML} //Se deja porque en caso de que haya un error se podría imprimir esto en la consola
        //para ver en qué se dio click. No tiene uso en el código funcional, pero no se considera de más dejarlo.

        //Si el texto dentro del botón se encuentra en las respuestas correctas
        if (rightAnswers.includes(texto)){
          let index
          index = rightAnswers.indexOf(texto) //obtener su index
          rightAnswers.splice(index,1)// y eliminarlo
          rightOptions +=1 //Contar que hubo una respuesta correcta

          //A continuación se les añade la clase right y se guarda en el navegador id del elemento al que se le cambia la clase, para luego quitarla en la siguiente pregunta
          if (literal){
            e.target.parentNode.parentNode.classList.add('right')
            localStorage.setItem('correcto', e.target.parentNode.parentNode.id)
          }
          else if (divCircular){
            e.target.parentNode.classList.add('right')
            localStorage.setItem('correcto', e.target.parentNode.id)
          }
          else if (boton){
            e.target.classList.add('right')
            localStorage.setItem('correcto', e.target.id)
          }
          else if(respuesta){
            e.target.parentNode.classList.add('right')
            localStorage.setItem('correcto', e.target.parentNode.id)
          }
        }
        else{
          //Lo mismo que con las correctas pero por si se equivocan
          if (literal){
            e.target.parentNode.parentNode.classList.add('wrong')
            localStorage.setItem('malo', e.target.parentNode.parentNode.id)
          }
          else if (divCircular){
            e.target.parentNode.classList.add('wrong')
            localStorage.setItem('malo', e.target.parentNode.id)
          }
          else if (boton){
            e.target.classList.add('wrong')
            localStorage.setItem('malo', e.target.id)
          }
          else if(respuesta){
            e.target.parentNode.classList.add('wrong')
            localStorage.setItem('malo', e.target.parentNode.id)
          }
        }
        }
        //Volver a cargar la pagina cuando le den try Again
        let tryAgain = e.target.classList.contains('try')
        if(tryAgain){location.reload()}
    }


//Listas que colocarán la pregunta y las opciones con base en la ronda en que vaya
function topSet(round){
    switch (round){
        case 1:
            topText = ['Hello, what ______ your name?', 'is','are', 'am', 'be']
            break
        case 2:
            topText = ['_______ name is John. And my ______ is Johnson.', 'Your / surname', 'My / surname', 'I / surname', 'I / name']
            break
        case 3:
            topText = ['My name is Lisa. _______ Lisa Peterson.', 'My am', 'I is', 'I am', 'I']
            break
        case 4:
            topText = ['________ name is Apple. ______ Ann Apple', 'His / She', 'His / He\'s', 'Her / She\'s', 'His / His']
            break
        case 5:
            topText = ['Where _____ John from? ______ from the US.', 'is / He\'s', 'is / His', 'am / He\'s', 'is / She\'s']
            break
        case 6:
            topText = ['_______ are you from? Japan.', 'What', 'Who', 'Where', 'When']
            break
        case 7:
            topText = ['where _____ you ____?', 'is / from', 'are / in', 'are / is', 'are / from']
            break
        case 8:
            topText = ['____ from Spain. I\'m Rodriguez', 'I\'m', 'He\'s', 'You\'re', 'She\'s']
            break
    }
    return topText
}

//Código Timer mezclado a código propio
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};
const TIME_LIMIT = 15;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let counter = 0 //Cuenta la ronda mostrada
document.getElementById("app").innerHTML = `
<div class="base-timer" id="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;
//Inicia el timer llamando a la función
startTimer(); 

//Detiene el temporizador
function onTimesUp() {
  clearInterval(timerInterval);
}
//Quita la clase right o wrong de los botones cuando pasa a una nueva ronda. 
function removerClase(){
 if (localStorage.getItem('correcto') !== null){
   document.getElementById(localStorage.getItem('correcto')).classList.remove('right')
 }
 if (localStorage.getItem('malo') !== null){
   document.getElementById(localStorage.getItem('malo')).classList.remove('wrong')
 }
 localStorage.clear()
 }
 //Setea el tiempo faltante en 0 cuando detecta que se ha respondido para pasar al otro round
function verificarAunNoResponde(tiempoFalta){
  if(localStorage.getItem('correcto') !== null || localStorage.getItem('malo') !== null){
    tiempoFalta = 0
    removerClase()
    localStorage.clear()
  }
  else{tiempoFalta = tiempoFalta}
  return tiempoFalta
}

function startTimer() { //Primera función llamada
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      //Coloca el texto en la pregunta y las opciones
      headerBox.innerText = topSet(counter + 1)[0]
      optionA.innerText = topSet(counter + 1)[1]
      optionB.innerText = topSet(counter + 1)[2]
      optionC.innerText = topSet(counter + 1)[3]
      optionD.innerText = topSet(counter + 1)[4]

      timeLeft = TIME_LIMIT - timePassed;
      timeLeft = verificarAunNoResponde(timeLeft) //Por cada segundo que pasa, verifica si aún no se ha respondido
      document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft); //Coloca el tiempo en el label del timer
      //Estilo en el timer
      setCircleDasharray();
      setRemainingPathColor(timeLeft);
      if (timeLeft === 0) {
        onTimesUp()
        removerClase()
        timePassed = 0
        timeLeft = TIME_LIMIT - timePassed
        counter +=1
        setRemainingPathColor(timeLeft);
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        cardLoad()
        startTimer()
        if (counter === 8){
          onTimesUp();
          resultados(rightOptions)
        }
      }
      if (timeLeft === 14 && counter != 0){cardLoad()}
    }, 1000);}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}
function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
  else{
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(alert.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(info.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
function resultados(totalGot){
  card.innerHTML =  `
 <div class="contenedor">
        <div class="resultado">
            <h1 id="puntuacion">
                PUNTUACIÓN
            </h1>
            <h1 id = "nota">${totalGot}</h1>
            <button class='try'>
                TRY AGAIN
            </button>
        </div>
    </div>
    `
  card.classList.remove("vis")
}
//El código del TIMER fue extraído de https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
//Por lo cual se le dan créditos a Mateusz Rybczonec
//Se añade el enlace del código original del timer, ya que este ha sido modificado para adaptarse a las necesidades de este ejercicio
