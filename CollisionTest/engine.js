

var objects = []
//functions-----------------------------
function getElement(id){
    return document.getElementById(id)
}
function createElement(type) {
    return document.createElement(type)
}

function createCircle(x, y, radius, color, id) {
    var circle = createElement("div")
    if (id != "" || id != null) {
        circle.setAttribute("id", id)
    }
    circle.setAttribute("style", `left:${x};top:${y};width:${radius};height:${radius};background-color:${color};position:absolute;border-radius:50%`)
    return circle
}

function createSmile(x, y, radius, color, id) {
    var circle = createElement("div")
    circle.setAttribute("style", `left:${x};top:${y};width:${radius};height:${radius};border:solid 8px ${color};border-color:transparent transparent ${color} transparent;border-radius:50%;position:absolute;`)
    circle.setAttribute("id", id)

    return circle

}

function createHotDog(x, y, width, height, color, id) {
    var square = createElement("div")
    square.setAttribute("style", `left:${x};top:${y};width:${width};height:${height};background-color:${color};position:absolute;border-radius:25px`)
    if (id != "" || id != null) {
        square.setAttribute("id", id)
    }

    return square
}

function createSquare(x, y, width, height, color, id) {
    var square = createElement("div")
    square.setAttribute("style", `left:${x};top:${y};width:${width};height:${height};background-color:${color};position:absolute;z-index:100`)
    if (id != "" || id != null) {
        square.setAttribute("id", id)
    }

    return square
}

function createTriangle(x, y, leftw, rightw, height, color, id) {
    var triangle = createElement("div")
    triangle.setAttribute("style", `left:${x};top:${y};width:0px;height:0px;position:absolute;border-left: ${leftw} solid transparent;border-right:${rightw} solid transparent;border-bottom:${height} solid ${color}`)
    if (id != "" || id != null) {
        triangle.setAttribute("id", id)
    }

    return triangle
}

function moveObj(obj, x, y) {
    obj.style.left = x
    obj.style.top = y

}

function stretchObj(obj, width, height) {

    obj.style.width = width
    obj.style.height = height
}

function changeColorInterpolation() {

}

function sin(x) {
    return Math.sin(x)
}

function cos(x) {
    return Math.cos(x)
}





const main = func => {
    let time = new Date().getTime();
    const recurse = t => {
        const dt = (new Date().getTime() - time) * 1e-3;
        time = new Date().getTime();
        func(dt, time * 1e-3)
        requestAnimationFrame(recurse)
    }
    requestAnimationFrame(recurse)
}
function init() {
    let ninja = new Object()
    let x=new Object
    x.append(createSquare("100", "100", "100","100","rgb(0,0,255)","block")).show()
    //x.appendChild(createTriangle("45%", "45%", "5px", "5px", "10px", "rgb(255,30,170)"))
    ninja.append(createSquare("300", "100","100","200","rgb(220,100,0)","ninja")).show()
    
    
}
//main------------------------------
var up = false,
    right = false,
    down = false,
    left = false,
    dodge= false
document.addEventListener('keydown',press)
function press(e){
    
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ ){
    up = true
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
    right = true
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
    down = true
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ ){
    left = true
  }
  if(e.keyCode === 75/*k key*/){
    dodge = true
    setTimeout(()=>{dodge=false},100)
  }
}
document.addEventListener('keyup',release)
function release(e){
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ ){
    up = false
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
    right = false
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
    down = false
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ ){
    left = false
  }
  /* if(e.keyCode === 75/*k key){
    dodge = false
  } */
}
init()
main((dt,time)=>{
   let ninja = getElement("ninja")
   let x=parseInt(ninja.style.left.replace("xp",''))
   let y=parseInt(ninja.style.top.replace("xp",''))
   let speed=(dodge)?50:10
   
    if (up){
        y = y - speed
    }
  if (right){
    x = x + speed
  }
  if (down){
    y = y + speed
  }
  if (left){
    x = x - speed
  }
  console.log(x+","+y)
  if(x>=-10  && x+100<getElement("html").offsetWidth ){

      ninja.style.left = x
  }
  if(y>=-10  && y+210<getElement("html").offsetHeight){
    ninja.style.top = y
    }  
})