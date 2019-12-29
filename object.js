class Object {
    /*
    This object has two elements
    - shape
    - animtion
    - id
    */
    constructor(id){
        
        this.id = id
        //this.shape=createElement("div")
    }
    
    show() {
        document.body.appendChild(this.shape)
    }
    appendChild(element){
        this.shape.appendChild(element)
        return this
    }
    append(element){
        this.shape=element
        return this
    }
    destroy(){
        this.shape.parentNode.removeChild(this.shape);
    }
    
}
