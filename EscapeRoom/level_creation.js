//global var------
var square_size=100
var left_down=false
var right_down=false
const matrix_size=100
const level_objects = new Array(matrix_size).fill(0).map(() => new Array(matrix_size).fill(0));
var player=new Object().append(createSquare(50*square_size,50*square_size,square_size,square_size,"rgb(0,255,0)","player")).show()
player.shape.style["z-index"]=500
//classes ----
class Level{
    constructor(identity,object=null){
      this.object=object
      this.identity=identity
    } 
}

//functions---

function mouseDown(e) {
    if(e.button === 0){
        left_down = true;
    }
    if(e.button === 2){
        right_down = true;
    }
}

function mouseUp(e) {
    if(e.button === 0){
        left_down = false;
    }
    if(e.button === 2){
        right_down = false;
    }
}
function createLevel(){
    for(let row=0;row<level_objects.length;row++){
      for(let col=0;col<level_objects[row].length;col++){
        
          level_objects[row][col]=new Level("0")
        
      }
    }
  }

function showLevel(){
    
    for(let row=0;row<level_objects.length;row++){
      for(let col=0;col<level_objects[row].length;col++){
        if(level_objects[row][col].identity=="1"){
            let map_block=new Object()
            map_block.append(createSquare(row*square_size, col*square_size, square_size, square_size, "rgb(0,0,0)"))
            .show()
            map_block.shape.onclick=()=>{draw(row,col)}
            map_block.shape.onmouseover=()=>{draw(row,col)}
            level_objects[row][col].object=map_block
        }
        else{
          let map_block=new Object()
          map_block.append(createSquare(row*square_size, col*square_size, square_size, square_size, "rgb(255,255,255)"))
          .show()
          map_block.shape.onclick=()=>{draw(row,col)}
          map_block.shape.onmouseover=()=>{draw(row,col)}
          level_objects[row][col].object=map_block
        }
      }
    }
}
function draw(x,y){
    let block=level_objects[x][y]
    if(left_down){
        
        block.identity="1"
        block.object.shape.style["background-color"]="rgb(0,0,0)"
    }
    if(right_down){
        block.identity="0"
        block.object.shape.style["background-color"]="rgb(255,255,255)"
    }

}
function init(){
    document.addEventListener("mousedown", mouseDown, false);
    document.addEventListener("mouseup", mouseUp, false);
    createLevel()
    showLevel()
    document.body.style.width=3000
    document.body.style.height=3000
    setTimeout (()=>{
        window.scroll({
        top: (50*square_size)-300,
        left: (50*square_size)-1000   
      })},200) 

}
function draw_level(){
    let dt = (new Date().getTime() - time) * 1e-3;
    time= new Date().getTime() 
    real_time+=dt
    //code here
    
    requestAnimationFrame(draw_level)
}
//Main --------------
window.onload=init()
//draw_level()