class Object {
    /*
    This object has two elements
    - shape
    - animtion
    - id
    */
    constructor(id) {

        this.id = id
        this.animation_seq = []
        this.animatiom_index=0
        //this.shape=createElement("div")
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
    moveObj(xi,yi,xf,yf,speed,real_time,animation_time){
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
        this.animation_seq.push(animation)
        return this
    }
    Play(time){
        if(!this.animation_seq[this.animatiom_index](time)){
            
        }else{
            this.animatiom_index=(this.animatiom_index+1)%this.animation_seq.length
        }
    }

}
