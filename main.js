//MUSIC SECTION
const evilStorm = new Audio('sounds/mixkit-evil-storm-atmosphere-2404.wav')
const morningBirds = new Audio('sounds/mixkit-morning-birds-2472.wav')
const nightForestWinds = new Audio('sounds/mixkit-night-forest-with-insects-2414.wav')

// GET CHECKBOX ELEMENTS 
const evilStormCheckbox = document.getElementById('evil-storm')
const morningBirdsCheckbox = document.getElementById('morning-birds')
const nightForestWindsCheckbox = document.getElementById('night-forest-winds')


const display = document.getElementById('timer')
const startButton = document.getElementById('startBtn')


// TIMER   
let minutes = 0
let seconds = 0
let timer = 0

function updateDisplay() {
    let text = "Time: " + minutes + "minute"
    if (minutes !== 1) {
        text += 's'
    }
    text += ' ' + seconds + 'second'
    if (seconds !== 1) {
        text += 's'

    }
    display.innerText = text
}
//START
startButton.addEventListener('click', function () {
    if (timer === 0) {
        timer = setInterval(function () {
            seconds++
            if (seconds === 60) {
                seconds = 0
                minutes++
            }
            updateDisplay()
        }, 1000)
    }
})


// //MUSIC
function update() {
    if (evilStormCheckbox.checked) {
        evilStorm.play()
    }
    if (morningBirdsCheckbox.checked) {
        morningBirds.play()
    }
    if (nightForestWindsCheckbox.checked) {
        nightForestWinds.play()
    }
}



//QUOTE
//API
// const url = "https://programming-quotes-api.herokuapp.com/quotes/random"
// fetch(url)
//   .then((rawResponse)=>{
//     return rawResponse.json()
//   })
//   .then((response)=>{
//     console.log(response)
//   })