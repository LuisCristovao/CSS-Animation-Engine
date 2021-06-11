

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
    circle.setAttribute("style", `left:${x};top:${y};width:${radius};height:${radius};background-color:${color};position:absolute;border-radius:50%;z-index:100`)
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
    square.setAttribute("style", `left:${x};top:${y};width:${width};height:${height};background:${color};position:absolute;z-index:100`)
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

function linear_motion(starty,finaly,duration){
  return ((finaly-starty)/duration)
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
var flores=[]
function init() {
    let ninja = new Object()
    let ground=new Object()
    let street=new Object()
    let sky=new Object()

    let points=[]
    for(let i=0;i<30;i++){
      points.push([i*100,500])
    } 
    for(let i=0;i<30;i++){
      points.push([i*100,650])
    }
      
    ground.append(createSquare("-10px", "500px","2000","2000","rgb(0,255,0)","ground")).show()
    street.append(createSquare("-10px", "550px","2000","100","rgb(230,200,88)","street")).show()
    sky.append(createSquare("-10px", "-1500px","1000","3000","linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,229,251,1) 56%, rgba(245,248,249,1) 100%)","sky")).show()
    points.forEach((point,i)=>{
      let color_=[Math.random()*255,Math.random()*255,Math.random()*255]
      flores.push(new Object().append(createCircle(`${point[0]}px`, `${point[1]}px`,"20",color_)).show())  
      for(let j=0;j<10;j++){
        flores.push(new Object().append(createCircle(`${point[0]+Math.random()*(20-(-20))-20}px`, `${point[1]+Math.random()*(20-(-20))-20}px`,"20",`rgb(${color_[0]+Math.random()*(20-(-20))-20},${color_[1]+Math.random()*(20-(-20))-20},${color_[2]+Math.random()*(20-(-20))-20})`)).show())  
      }
    })
      
      
    //flores.push(new Object().append(createCircle("100px", "600px","20","rgb(255,0,0)")).show())
    //flores.push(new Object().append(createCircle("200px", "600px","20","rgb(255,0,0)")).show())
    //flores.push(new Object().append(createCircle("300px", "600px","20","rgb(255,0,0)")).show())
    getElement("sky").style["z-index"]="50"
    getElement("sky").style.transform="rotate(90deg)"
    //x.append(createCircle("10%", "10%", "100px", "rgb(0,0,255)")).appendChild(createCircle("20%", "20%", "20px", "rgb(255,255,0)")).appendChild(createCircle("60%", "20%", "20px", "rgb(255,255,0)")).appendChild(createSmile("15%", "20%", "50px", "rgb(255,0,0)")).show()
    //x.appendChild(createTriangle("45%", "45%", "5px", "5px", "10px", "rgb(255,30,170)"))
    //ninja.append(createSquare("300px", "100px","100","200","rgb(220,100,0)","ninja")).show()
    //ninja
    //.appendChild(createSquare("60","30","30","30","green","left eye"))
    
    
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
function rect(t,placement,size){
    
    if(t>=placement && t<=placement+size){
        return 1
    }else{
        return 0
    }
}
function inverse(num){
    if (num==0){
        return 1
    }if(num==1){
        return 0
    }
}

init()
let real_time=0


main((dt,time)=>{
  real_time+=dt
  flores.forEach((flor,i)=>{
    flor.shape.style.left=flor.x+5*Math.cos(2*(real_time-i*0.2))
  })
  //flores[0].getElement().style.left=5*Math.cos(2*real_time) 
  //left_eye.style.height=Math.ceil((Math.abs(30*Math.abs(Math.sin(2*time)))+30*Math.abs(Math.sin(2*time)))/2)
  //left_eye.style.height=30*(rect(real_time%3,0,2))+(rect(real_time%3,2,0.5)*(30-((30*2)*((real_time-2)%3))))+(rect(real_time%3,2.5,0.5)*(30-((30*2)*((real_time-2.5)%3))))
  /* left_eye.style.height=30*(rect(real_time%3,0,2))+(rect(real_time%3,2,0.25)*(30-((30*4)*((real_time-2)%3))))+(rect(real_time%3,2.25,0.25)*(((30*4)*((real_time-2.25)%3))))+(rect(real_time%3,2.5,0.25)*(30-((30*4)*((real_time-2.5)%3))))+(rect(real_time%3,2.75,0.25)*(((30*4)*((real_time-2.75)%3))))
  left_eye.style.top=30+5*Math.abs(Math.cos(2*real_time))
  ninja.style.left=((300+linear_motion(300,500,3)*(real_time%6))*rect(real_time%6,0,3))+((500+linear_motion(500,300,3)*((real_time%6)-3))*rect(real_time%6,3,3))
  ninja.style.top=((100+linear_motion(100,500,3)*(real_time%6))*rect(real_time%6,0,3))+((500+linear_motion(500,100,3)*((real_time%6)-3))*rect(real_time%6,3,3))
  console.log(ninja.style.left) */
  /*if(x>0  && x+110<getElement("html").offsetWidth ){

      ninja.style.left = x
  }
  if(y>0  && y+230<getElement("html").offsetHeight){
    ninja.style.top = y
    }  */
})