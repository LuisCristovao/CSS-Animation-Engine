/*var objects=[]
//functions ------------------
function createElement(type){
    return document.createElement(type)
}
function addIntem(item){
    document.body.appendChild(item)
}
function createCircle(x,y,radius,color,id){
    var circle=createElement("div")
    circle.setAttribute("style",`left:${x};top:${y};width:${radius};height:${radius};background-color:${color};position:absolute;border-radius:50%`)
    circle.setAttribute("id",id)
    addIntem(circle)
    return circle
    
}

function appendToObject(parent,child){
    child.style.position="inherit"
    parent.appendChild(child)
    return parent
}
function init(){
    //createSquare("500px","500px","100px","100px","rgb(100,0,0,0.5)","first")
    
    var c1=createCircle("50%","50%","100px","rgb(100,100,255,1)","first")
    var leye=createCircle("30%","20%","13px","rgb(0,200,100,1)","leye")
    var reye=createCircle("60%","20%","13px","rgb(0,200,100,1)","reye")
    var lip=createSmile("16%","15%","50px","rgb(255,0,0,1)","lip")
    var obj=appendToObject(c1,leye)
    obj=appendToObject(obj,reye)
    obj=appendToObject(obj,lip)
    objects.push(obj)
    
}

const main = func => {
	let time = new Date().getTime(); 
    const recurse = t => {
        const dt = (new Date().getTime()-time) * 1e-3;
		time = new Date().getTime();
		func(dt, time * 1e-3)
        requestAnimationFrame(recurse)
    }
	requestAnimationFrame(recurse)
}

//Main---------------
init()
main((dt,time)=>{
    var height=window.innerHeight
    var width=window.innerWidth
    var new_pos=(width/3)*sin(time)+(width/2)
    moveObj(objects[0],`${new_pos}px`,`${(height/3)*cos(time)+(height/2)}px`)
    //stretchObj(objects[0].children[0],"13px",`${Math.round(sin(time)*6+13)}px`)
    time=time%1000
})*/

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
function createSmile(x,y,radius,color,id){
    var circle=createElement("div")
    circle.setAttribute("style",`left:${x};top:${y};width:${radius};height:${radius};border:solid 8px ${color};border-color:transparent transparent ${color} transparent;border-radius:50%;position:absolute;`)
    circle.setAttribute("id",id)
    
    return circle
    
}
function createHotDog(x,y,width,height,color,id){
    var square=createElement("div")
    square.setAttribute("style",`left:${x};top:${y};width:${width};height:${height};background-color:${color};position:absolute;border-radius:25px`)
    if (id != "" || id != null) {
        square.setAttribute("id", id)
    }
    
    return square
}
function createSquare(x,y,width,height,color,id){
    var square=createElement("div")
    square.setAttribute("style",`left:${x};top:${y};width:${width};height:${height};background-color:${color};position:absolute;z-index:100`)
    if (id != "" || id != null) {
        square.setAttribute("id", id)
    }
    
    return square
}
function createTriangle(x,y,leftw,rightw,height,color,id){
    var triangle=createElement("div")
    triangle.setAttribute("style",`left:${x};top:${y};width:0px;height:0px;position:absolute;border-left: ${leftw} solid transparent;border-right:${rightw} solid transparent;border-bottom:${height} solid ${color}`)
    if (id != "" || id != null) {
        triangle.setAttribute("id", id)
    }
    
    return triangle
}

function moveObj(obj,x,y){
    obj.style.left=x
    obj.style.top=y
    
}
function stretchObj(obj,width,height){
  
    obj.style.width=width
    obj.style.height=height
}
function changeColorInterpolation(){
    
}
function sin(x){
    return Math.sin(x)
}
function cos(x){
    return Math.cos(x)
}



var x=new Object()
x.append(createCircle("10%","10%","100px","rgb(0,0,255)")).appendChild(createCircle("20%","20%","20px","rgb(255,255,0)")).appendChild(createCircle("60%","20%","20px","rgb(255,255,0)")).appendChild(createSmile("15%","20%","50px","rgb(255,0,0)")).show()
x.appendChild(createTriangle("45%","45%","5px","5px","10px","rgb(255,30,170)"))