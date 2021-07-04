

function getElement(id){
    return document.getElementById(id)
}
function createElement(type) {
    return document.createElement(type)
}
function createText(text_in="",style=""){
    var text=createElement("p")
    text.innerText=text_in
    text.setAttribute("style",style)
    return text
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
function linear_motion(start_pos,final_pos,real_time,duration){
    let delta =((final_pos-start_pos)/duration)
    return delta *(real_time%duration)+start_pos
}
function step(t,placement,size){

    if(t>=placement && t<=placement+size){
        return 1
    }else{
        return 0
    }
}
class Object {
    /*
    This object has two elements
    - shape
    - animtion
    */
    constructor(id) {

       
        //this.shape=createElement("div")
        //this.animation=some_lambda
        //this.x=style.left
        //this.y=style.top
        this.angle=0
    }
    getElement(){
        return this.shape
    }
    show() {
        document.body.appendChild(this.shape)
        return this
    }
    appendChild(element) {
        this.shape.appendChild(element)
        return this
    }
    append(element) {
        this.shape = element
        this.x=parseInt(element.style.left)
        this.y=parseInt(element.style.top)
        return this
    }
    destroy() {
        this.shape.remove()
    }
    
    move(x, y) {
        this.shape.style.left = x
        this.shape.style.top = y
        this.x=x
        this.y=y
    }
    rotate(angle){
        this.shape.style.transform=`rotate(${angle}deg)`
        this.angle=angle
    }
    getAngle(){
        return this.angle
    }
    velocity(end_value,actual_value,real_time,animation_time){
        var delta=((end_value-actual_value)/animation_time)
        let new_pos=delta*(real_time%animation_time)+actual_value
        
        return new_pos
    }
    
    velocityMove(xi,yi,xf,yf,real_time,animation_time){
        let new_x=this.velocity(xf,xi,real_time,animation_time)
        let new_y=this.velocity(yf,yi,real_time,animation_time)
        //this.move(new_x,new_y)
        return {"x":new_x,"y":new_y}
    }
    rotateVel(init_angle,final_angle,real_time,animation_time){
        
        let new_angle=this.velocity(final_angle,init_angle,real_time,animation_time)
        this.rotate(new_angle)
    }
    rotateAcc(final_angle,real_time,animation_time){
        let new_angle=this.velocity(final_angle,this.angle,real_time,animation_time)
        this.rotate(new_angle)
    }
    accelarationMove(xf,yf,real_time,animation_time){
        let new_x=this.velocity(xf,parseInt(this.shape.style.left),real_time,animation_time)
        let new_y=this.velocity(yf,parseInt(this.shape.style.top),real_time,animation_time)
        this.move(new_x,new_y)
    }
    appendAnimation(animation){
        this.animation=animation
        return this
    }
    play(time){
        this.animation(time)
    }

}