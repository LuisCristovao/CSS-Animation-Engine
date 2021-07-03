

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

    moveObjXY(x, y) {
        this.shape.style.left = x
        this.shape.style.top = y

    }
    move(xi,yi,xf,yf,speed,real_time,animation_time){
        var deltax=Math.abs(xf-xi)*speed
        var deltay=Math.abs(yf-yi)*speed
        if(real_time%animation_time==0){
            moveObjXY(`${deltax}px`,`${deltay}px`)
            return true
        }else{
            return false
        }
        return this
    }
    appendAnimation(animation){
        this.animation=animation
        return this
    }
    play(time){
        this.animation(time)
    }

}