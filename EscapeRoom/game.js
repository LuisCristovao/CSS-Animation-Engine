var time= new Date().getTime() ;
var real_time=0
var square_size=100
const matrix_size=100
let step_time=false
var global_block_type="1"
var global_block_color_map={
  "0":"rgb(255,255,255)",
  "1":"rgb(0,0,0)",
  "portal_start":"rgb(100,111,0)",
  "portal_end":"rgb(0,111,200)"
}
let portal_locations={
  "portal_start":{"x":0,"y":0},
  "portal_end":{"x":0,"y":0}
}
var objects=[] 
class Level{
  constructor(identity,object=null){
    this.object=object
    this.identity=identity
  }

}

class Player{
  constructor(object){
    this.object=object
    this.nextx=Math.round(parseFloat(this.object.shape.style.left)/matrix_size)
    this.nexty=Math.round(parseFloat(this.object.shape.style.top)/matrix_size)
    
  }
  setDestiny(x,y){
    this.nextx=x
    this.nexty=y
  }
  move(time){
    let x=Math.round(parseFloat(this.object.shape.style.left)/matrix_size)
    let y=Math.round(parseFloat(this.object.shape.style.top)/matrix_size)
    this.x=x
    this.y=y
    let deltax=-(x-this.nextx)
    let deltay=-(y-this.nexty)
    let stepx=deltax/Math.abs(deltax)
    let stepy=deltay/Math.abs(deltay)
    stepx=isNaN(stepx)?0:stepx
    stepy=isNaN(stepy)?0:stepy
    let speed=1
    if((Math.ceil(time))-(time)<0.02){
      console.log(time)
      if(level_objects[x+stepx][y+stepy].identity=="1"){
        //dont move
        if(level_objects[x+stepx][y].identity!="1"){
          this.object.shape.style.left=(x*square_size)+square_size*stepx 
        }
        else if(level_objects[x][y+stepy].identity!="1"){
          this.object.shape.style.top=(y*square_size)+square_size*stepy
        }
      }
      else{
          if(level_objects[x+stepx][y].identity!="1"){
            this.object.shape.style.left=(x*square_size)+square_size*stepx 
          }
          if(level_objects[x][y+stepy].identity!="1"){
            this.object.shape.style.top=(y*square_size)+square_size*stepy
          }
      }
    }
    window.scroll({
      top: (y*square_size)-300,
      left: (x*square_size)-500   
    }); 
  }
}
var player=new Player(new Object().append(createSquare(50*square_size,50*square_size,square_size,square_size,"rgb(0,255,0)","player")).show())
player.object.shape.style["z-index"]=500

//const level = new Array(matrix_size).fill(0).map(() => new Array(matrix_size).fill(0));
const level_objects = new Array(matrix_size).fill(0).map(() => new Array(matrix_size).fill(0));
var up = false,
  right = false,
  down = false,
  left = false,
  dodge = false;
document.addEventListener("keydown", press);
function press(e) {
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */) {
    up = true;
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
    right = true;
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
    down = true;
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
    left = true;
  }
  if (e.keyCode === 75 /*k key*/) {
    dodge = true;
    setTimeout(() => {
      dodge = false;
    }, 100);
  }
}
document.addEventListener("keyup", release);
function release(e) {
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */) {
    up = false;
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
    right = false;
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
    down = false;
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
    left = false;
  }
  /* if(e.keyCode === 75/*k key){
    dodge = false
  } */
}


function createLevel(){
  let map=JSON.parse(JSON.parse(localStorage["EscapeRoom"]).map)
  for(let row=0;row<level_objects.length;row++){
    for(let col=0;col<level_objects[row].length;col++){
      let identity=map[row][col]
      if(portal_locations[identity]!=null){
        portal_locations[identity]={"x":row,"y":col}
      }
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
      
      level_objects[row][col].object=new Object()
      .append(createSquare(row*square_size, col*square_size, square_size, square_size, global_block_color_map[block_identity]))
      .show()
      .shape.onclick=()=>{player.setDestiny(row,col)}
      
      
    }
  }
}
function init(){
    createLevel()
    showLevel()
    document.body.style.width=3000
    document.body.style.height=3000

}
function portalMove(){

}
const playerEvents={
  "portal_start":()=>{
    let pos=portal_locations["portal_end"]
    player.object.shape.style.left=(pos.x*square_size)+square_size
    player.object.shape.style.top=(pos.y*square_size)+square_size
    player.x=pos.x
    player.y=pos.y
    player.setDestiny(pos.x,pos.y)
  },
  "portal_end":()=>{
    let pos=portal_locations["portal_start"]
    player.object.shape.style.left=(pos.x*square_size)+square_size
    player.object.shape.style.top=(pos.y*square_size)+square_size
    player.x=pos.x
    player.y=pos.y
    player.setDestiny(pos.x,pos.y)
  },
  "0":()=>{}


}
function main(){
    let speed=2
    let dt = (new Date().getTime() - time) * 1e-3;
    time= new Date().getTime() 
    real_time+=dt
    //code here
    player.move(real_time)
    playerEvents[level_objects[player.x][player.y].identity]()
    requestAnimationFrame(main)
}
//Main ---
init()
main()