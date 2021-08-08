//global var------
var square_size=100
var left_down=false
var right_down=false
var global_block_type="1"
var global_block_color_map={
  "0":"rgb(255,255,255)",
  "1":"rgb(0,0,0)",
  "portal_start":"rgb(100,111,0)",
  "portal_end":"rgb(0,111,200)"
}
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
// listeners ----
document.addEventListener("keydown", press);
function press(e) {
  if (e.keyCode === 48 /* 0 */ ) {
    global_block_type="0"
  }
  if (e.keyCode === 49 /* 1 */ ) {
    global_block_type="1"
  }
  if (e.keyCode === 50 /* 2 */ ) {
    global_block_type="portal_start"
  }
  if (e.keyCode === 51 /* 3 */ ) {
    global_block_type="portal_end"
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
    let map=JSON.parse(JSON.parse(localStorage["EscapeRoom"]).map)
    for(let row=0;row<level_objects.length;row++){
      for(let col=0;col<level_objects[row].length;col++){
        let identity=map[row][col]
        level_objects[row][col]=new Level(identity)
        /* if(map[row][col]=="1"){
          level_objects[row][col]=new Level("1")
        }
        if(map[row][col]=="0"){
          level_objects[row][col]=new Level("0")
        } */
        /* if(Math.random()>0.5){
          level_objects[row][col]=new Level("1")
        }else{
          level_objects[row][col]=new Level("0")
        } */
      }
    }
  }

function showLevel(){
    
    for(let row=0;row<level_objects.length;row++){
      for(let col=0;col<level_objects[row].length;col++){
        let block_identity=level_objects[row][col].identity
        
            let map_block=new Object()
            map_block.append(createSquare(row*square_size, col*square_size, square_size, square_size, global_block_color_map[block_identity]))
            .show()
            map_block.shape.onclick=()=>{draw(row,col)}
            map_block.shape.onmouseover=()=>{draw(row,col)}
            level_objects[row][col].object=map_block
        
      }
    }
}
function draw(x,y){
    let block=level_objects[x][y]
    if(left_down){
        
        block.identity=global_block_type
        block.object.shape.style["background-color"]=global_block_color_map[global_block_type]
        
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
function saveLevel(){
    let map=[]
    let blocks=[]
    for(let row=0;row<level_objects.length;row++){
        for(let col=0;col<level_objects[row].length;col++){
            blocks.push(level_objects[row][col].identity)
        }
        map.push(blocks)
        blocks=[]
    }
    return JSON.stringify(map)
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
setInterval(()=>{
    localStorage["EscapeRoom"]=JSON.stringify({"map":saveLevel()})
},1*1000)
//draw_level()