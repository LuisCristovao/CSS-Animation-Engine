

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
        this.shape.parentNode.removeChild(this.shape);
    }
    linear_motion(starty,finaly,duration){
        return ((finaly-starty)/duration)
    }
    step(t,placement,size){
    
        if(t>=placement && t<=placement+size){
            return 1
        }else{
            return 0
        }
    }
    move(x, y) {
        this.shape.style.left = x
        this.shape.style.top = y

    }
    rotate(angle){
        this.shape.style.transform=`rotate(${angle}deg)`
        this.angle=angle
    }
    getAngle(){
        return this.angle
    }
    accelaration(xf,yf,real_time,animation_time){
        var deltax=((xf-parseInt(this.shape.style.left))/animation_time)
        var deltay=((yf-parseInt(this.shape.style.top))/animation_time)
        let new_x=deltax*(real_time%animation_time)+parseInt(this.shape.style.left)
        let new_y=deltay*(real_time%animation_time)+parseInt(this.shape.style.top)
        return {"x":new_x,"y":new_y}
    }
    velocity(xi,yi,xf,yf,real_time,animation_time){
        var deltax=((xf-xi)/animation_time)
        var deltay=((yf-yi)/animation_time)
        let new_x=deltax*(real_time%animation_time)+xi
        let new_y=deltay*(real_time%animation_time)+yi
        return {"x":new_x,"y":new_y}
    }
    velocityMove(xi,yi,xf,yf,real_time,animation_time){
        let velocity=this.velocity(xi,yi,xf,yf,real_time,animation_time)
        this.move(velocity.x,velocity.y)
    }
    rotateVel(init_angle,final_angle,real_time,animation_time){
        var delta=((final_angle-init_angle)/animation_time)
        let new_angle=delta*(real_time%animation_time)+init_angle
        this.rotate(new_angle)
    }
    rotateAcc(final_angle,real_time,animation_time){
        var delta=((final_angle-this.angle)/animation_time)
        let new_angle=delta*(real_time%animation_time)+this.angle
        this.rotate(new_angle)
    }
    accelarationMove(xf,yf,real_time,animation_time){
        let acc=this.accelaration(xf,yf,real_time,animation_time)
        this.move(acc.x,acc.y)
    }
    appendAnimation(animation){
        this.animation=animation
        return this
    }
    play(time){
        this.animation(time)
    }

}