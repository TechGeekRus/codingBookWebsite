//MUSIC SECTION
const evilStorm = new Audio('sounds/mixkit-evil-storm-atmosphere-2404.wav')
const morningBirds = new Audio('sounds/mixkit-morning-birds-2472.wav')
const nightForestWinds = new Audio('sounds/mixkit-night-forest-with-insects-2414.wav')

// GET CHECKBOX ELEMENTS 
const evilStormCheckbox = document.getElementById('evil-storm')
const morningBirdsCheckbox = document.getElementById('morning-birds')
const nightForestWindsCheckbox = document.getElementById('night-forest-winds')

//TIMER ELEMENTS
const display = document.getElementById('timer')
const startButton = document.getElementById('startBtn')



// TIMER   
let minutes = 0
let seconds = 0
let timer = 0

function updateDisplay() {
    let text = 'Time: ' + minutes + 'minute'
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
        morningBirds.pause()
        nightForestWinds.pause()
    } else if (morningBirdsCheckbox.checked) {
        morningBirds.play()
        evilStorm.pause()
        nightForestWinds.pause()
    } else if (nightForestWindsCheckbox.checked) {
        nightForestWinds.play()
        evilStorm.pause()
        morningBirds.pause()
    } else {
        evilStorm.pause()
        morningBirds.pause()
        nightForestWinds.pause()
    }
}

function setupUpdate() {
    setInterval(update, 600)
}

setTimeout(setupUpdate, 300)



//QUOTE
// const url = 'https://api.api-ninjas.com/v1/quotes'
// fetch(url)
//   .then((rawResponse)=>{
//     return rawResponse.json()
//   })
//   .then((response)=>{
//     console.log(response)
//   })

// CANVAS 
var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),
    
    opts = {
      
      len: 20,
      count: 50,
      baseTime: 10,
      addedTime: 10,
      dieChance: .05,
      spawnChance: 1,
      sparkChance: .1,
      sparkDist: 10,
      sparkSize: 2,
      
      color: 'hsl(hue,100%,light%)',
      baseLight: 50,
      addedLight: 10, // [50-10,50+10]
      shadowToTimePropMult: 6,
      baseLightInputMultiplier: .01,
      addedLightInputMultiplier: .02,
      
      cx: w / 2,
      cy: h / 2,
      repaintAlpha: .04,
      hueChange: .1
    },
    
    tick = 0,
    lines = [],
    dieX = w / 2 / opts.len,
    dieY = h / 2 / opts.len,
    
    baseRad = Math.PI * 2 / 6;
    
ctx.fillStyle = 'black';
ctx.fillRect( 0, 0, w, h );

function loop() {
  
  window.requestAnimationFrame( loop );
  
  ++tick;
  
  ctx.globalCompositeOperation = 'source-over';
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(0,0,0,alp)'.replace( 'alp', opts.repaintAlpha );
  ctx.fillRect( 0, 0, w, h );
  ctx.globalCompositeOperation = 'lighter';
  
  if( lines.length < opts.count && Math.random() < opts.spawnChance )
    lines.push( new Line );
  
  lines.map( function( line ){ line.step(); } );
}
function Line(){
  
  this.reset();
}
Line.prototype.reset = function(){
  
  this.x = 0;
  this.y = 0;
  this.addedX = 0;
  this.addedY = 0;
  
  this.rad = 0;
  
  this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();
  
  this.color = opts.color.replace( 'hue', tick * opts.hueChange );
  this.cumulativeTime = 0;
  
  this.beginPhase();
}
Line.prototype.beginPhase = function(){
  
  this.x += this.addedX;
  this.y += this.addedY;
  
  this.time = 0;
  this.targetTime = ( opts.baseTime + opts.addedTime * Math.random() ) |0;
  
  this.rad += baseRad * ( Math.random() < .5 ? 1 : -1 );
  this.addedX = Math.cos( this.rad );
  this.addedY = Math.sin( this.rad );
  
  if( Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY )
    this.reset();
}
Line.prototype.step = function(){
  
  ++this.time;
  ++this.cumulativeTime;
  
  if( this.time >= this.targetTime )
    this.beginPhase();
  
  var prop = this.time / this.targetTime,
      wave = Math.sin( prop * Math.PI / 2  ),
      x = this.addedX * wave,
      y = this.addedY * wave;
  
  ctx.shadowBlur = prop * opts.shadowToTimePropMult;
  ctx.fillStyle = ctx.shadowColor = this.color.replace( 'light', opts.baseLight + opts.addedLight * Math.sin( this.cumulativeTime * this.lightInputMultiplier ) );
  ctx.fillRect( opts.cx + ( this.x + x ) * opts.len, opts.cy + ( this.y + y ) * opts.len, 2, 2 );
  
  if( Math.random() < opts.sparkChance )
    ctx.fillRect( opts.cx + ( this.x + x ) * opts.len + Math.random() * opts.sparkDist * ( Math.random() < .5 ? 1 : -1 ) - opts.sparkSize / 2, opts.cy + ( this.y + y ) * opts.len + Math.random() * opts.sparkDist * ( Math.random() < .5 ? 1 : -1 ) - opts.sparkSize / 2, opts.sparkSize, opts.sparkSize )
}
loop();

window.addEventListener( 'resize', function(){
  
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  ctx.fillStyle = 'black';
  ctx.fillRect( 0, 0, w, h );
  
  opts.cx = w / 2;
  opts.cy = h / 2;
  
  dieX = w / 2 / opts.len;
  dieY = h / 2 / opts.len;
});