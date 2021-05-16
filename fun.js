var r=document.querySelector('.r')
var b=document.querySelector('.b')
var y=document.querySelector('.y')
var g=document.querySelector('.g')

var start=document.querySelector('.start')

var stext=document.getElementById('head-text')
var etext=document.getElementById('end-text')

//Object
var game={
  level:0,
  in:[],
  out:[]
}

//Flag is 0 whenevr start is hidden or GAme is not running
var flag=1
//Clear Old games

start.addEventListener('click',function(){
  game.level=0
  game.in=[]
  game.out=[]
  start.classList.add('hidden')
  flag=0
  addlevel()
})

var color=r;

//Start New game or Add levels
function addlevel(){
  game.level++;
  stext.innerText="LEVEL "+game.level+" of 20"
  etext.innerText="Wait for Computer"
  game.out.push(Math.floor(Math.random()*4))
  
  var i=0;
  var z= setInterval(outputlevel, 600);
  function outputlevel(){
    
    
    // console.log(game.out[i])
    switch(game.out[i]){
      case 0: color=r;
        break;
      case 1:color=b;
        break;
      case 2: color=y;
        break;
      case 3: color=g;
        break;
    }
    // console.log(color)
    color.classList.add('animate')
    setTimeout(() => {
      color.classList.remove('animate')
    }, 400);
    i++;
    if(i>=game.level){
      clearInterval(z)
      takeinput()
    }
  }
}

var ti,to
//Taking INput
function takeinput(){
  etext.innerText=""+game.out.length+" Taps"
  r.addEventListener('click',revent)
  b.addEventListener('click',bevent)
  y.addEventListener('click',yevent)
  g.addEventListener('click',gevent)
  var i=-1
   ti=setInterval(function(){
    // console.log('Function reached tillinput Acceptance')
    i++
    if(i>0){
      clearInterval(ti)
      validateinput()
    }
  },6000)
  // console.log('ti is :'+ti)
  
}

function revent(){
  game.in.push(0)
  if(game.out.length>game.in.length){
    etext.innerText=""+game.out.length-game.in.length+" Taps"
  }
  else etext.innerText=""
  // console.log('r')
  validateinput()
}

function bevent(){
  game.in.push(1)
  if(game.out.length>game.in.length){
    etext.innerText=""+game.out.length-game.in.length+" Taps"
  }
  else etext.innerText=""
  // console.log('b')
  validateinput()
}

function yevent(){
  game.in.push(2)
  if(game.out.length>game.in.length){
    etext.innerText=""+game.out.length-game.in.length+" Taps"
  }
  else etext.innerText=""
  // console.log('y')
  validateinput()
}

function gevent(){
  game.in.push(3)
  if(game.out.length>game.in.length){
    etext.innerText=""+game.out.length-game.in.length+" Taps"
  }
  else etext.innerText=""
  // console.log('g')
  validateinput()
}

function validateinput(){
  if(game.in.length==0||game.in.length>game.out.length||game.in[game.in.length-1]!=game.out[game.in.length-1]){
    clearInterval(ti)
    game.in=[]
    game.out=[]
    game.level=0
    start.classList.remove('hidden')
    etext.innerText=""
    flag=1
    r.removeEventListener('click',revent)
    b.removeEventListener('click',bevent)
    y.removeEventListener('click',yevent)
    g.removeEventListener('click',gevent)
    stext.innerText="Oops... Try New Game"
    setTimeout(function(){
      if(flag==1){
        stext.innerText="Welcome to Simon Game"
      }
      
    },6000)
    
    
  }
  else if(game.in.length==game.out.length){

    clearInterval(ti)
    game.in=[]
    if(game.level==20){
      stext.innerText="Wow You won the game"
      start.classList.remove('hidden')
    }
    else{
      stext.innerText="Proceeding to Next Level.."
      setTimeout(function(){
        
      addlevel()
      },400)
      
    } 
  }
}