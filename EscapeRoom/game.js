var time= new Date().getTime() ;
var real_time=0
var square_size=100
const matrix_size=100
let step_time=false
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
    this.nextx=0
    this.nexty=0
    
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
    
    let speed=1
    if((Math.ceil(time))-(time)<0.02){
      console.log(time)
      if(deltax!=0){
        if(deltax>0){
          if(level_objects[x+1][y].identity!="1")
          this.object.shape.style.left=(x*square_size)+((deltax>0)?square_size:-square_size) //parseInt(this.object.shape.style.width)*(this.nextx)
        }else{
          if(level_objects[x-1][y].identity!="1")
          this.object.shape.style.left=(x*square_size)+((deltax>0)?square_size:-square_size) //parseInt(this.object.shape.style.width)*(this.nextx)
        }
      }
      if(deltay!=0){
        if(deltay>0){
          if(level_objects[x][y+1].identity!="1")
          this.object.shape.style.top=(y*square_size)+((deltay>0)?square_size:-square_size)
        }else{
          if(level_objects[x][y-1].identity!="1")
          this.object.shape.style.top=(y*square_size)+((deltay>0)?square_size:-square_size)
        }
      }
      //this.object.shape.style.top=speed*delta_time*deltay+y//parseInt(this.object.shape.style.height)*(this.nexty)
      
    }
    window.scroll({
      top: (y*square_size)-300,
      left: (x*square_size)-1000
      

    }); 
  }
}
var player=new Player(new Object().append(createSquare(0,0,square_size,square_size,"rgb(0,255,0)","player")).show())
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
function move_player(speed){
  
    if(up ){
       player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)-speed) 
    }
    if(down ){
        player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)+speed)
    }
    if(left ){
        player.move(parseInt(player.shape.style.left)-speed,parseInt(player.shape.style.top))
    }
    if(right){
        player.move(parseInt(player.shape.style.left)+speed,parseInt(player.shape.style.top))
    }
     window.scroll({
      top: player.y-300,
      left: player.x-300
      

    }); 
}
function collisionDetection(speed){
  let top_left_corner=false
  let top_right_corner=false
  let bot_right_corner=false
  let bot_left_corner=false

  objects.forEach(object=>{

    //top left corner collision
    if(player.y<=object.y + object.height && player.x<=object.x + object.width && player.x>=object.x && player.y>=object.y ){
      top_left_corner=true
  
    }
    //top right
    if(player.x+player.width>=object.x && player.x+player.width<=object.x +object.width && player.y<=object.y + object.height && player.y>=object.y){
      top_right_corner=true
    }
    //bottom left
    if(player.y+player.height>=object.y && player.y+player.height<=object.y+object.height && player.x<=object.x + object.width && player.x>=object.x  ){
      bot_left_corner=true
    }
    //bottom right
    if(player.y+player.height>=object.y && player.y+player.height<=object.y+object.height && player.x+player.width>=object.x && player.x+player.width<=object.x +object.width ){
      bot_right_corner=true
    }
  
    //both left
    if(top_left_corner && bot_left_corner){
      player.move(parseInt(player.shape.style.left)+speed,parseInt(player.shape.style.top))
    }
    //both right
    if(top_right_corner && bot_right_corner){
      player.move(parseInt(player.shape.style.left)-speed,parseInt(player.shape.style.top))
    }
    //top corners
    if(top_right_corner && top_left_corner){
      player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)+speed)
    }
    //bottom corners
    if(bot_left_corner && bot_right_corner){
      player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)-speed)
    }
  
    /* //just top left and object is above
    if(top_left_corner && player.y+1>=object.y+object.height && !top_right_corner && !bot_left_corner){
      player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)+speed)
    }
    //just top left with object on the left
    if(top_left_corner && player.x+1 >=object.x+object.width && !bot_left_corner && !top_right_corner){
      player.move(parseInt(player.shape.style.left)+speed,parseInt(player.shape.style.top))
    }
    //just top right and  object is above
    if(top_right_corner && player.y+1>=object.y+object.height && !top_left_corner && !bot_right_corner){
      player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)+speed)
    }
    //just top right and going right
    if(top_right_corner && player.x+player.width-1 <=object.x && !bot_right_corner && !top_left_corner){
      player.move(parseInt(player.shape.style.left)-speed,parseInt(player.shape.style.top))
    }
    //just bot right and object is under 
    if(bot_right_corner && player.y+player.height-1<=object.y   && !top_right_corner && !bot_left_corner){
      player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)-speed)
    }
    //just bot right and object is right 
    if(bot_right_corner && player.x+player.width-1<=object.x  && !bot_left_corner && !top_right_corner){
      player.move(parseInt(player.shape.style.left)-speed,parseInt(player.shape.style.top))
    }
    //just bot left with object is under
    if(bot_left_corner && player.y+player.height-1<=object.y && !top_left_corner && !bot_right_corner){
      player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)-speed)
    }
    //just bot left with object is left
    if(bot_left_corner && player.x+1>=object.x+object.width && !bot_right_corner && !top_left_corner){
      player.move(parseInt(player.shape.style.left)+speed,parseInt(player.shape.style.top))
    } */
  })



}
function createLevel(){
  for(let row=0;row<level_objects.length;row++){
    for(let col=0;col<level_objects[row].length;col++){
      if(Math.random()>0.5){
        level_objects[row][col]=new Level("1")
      }else{
        level_objects[row][col]=new Level("0")
      }
    }
  }
}
function showLevel(){
  
  for(let row=0;row<level_objects.length;row++){
    for(let col=0;col<level_objects[row].length;col++){
      if(level_objects[row][col].identity=="1"){
        level_objects[row][col].object=new Object()
        .append(createSquare(row*square_size, col*square_size, square_size, square_size, "rgb(0,0,0)"))
        .show()
        .shape.onclick=()=>{player.setDestiny(row,col)}
      }
      else{
        level_objects[row][col].object=new Object()
        .append(createSquare(row*square_size, col*square_size, square_size, square_size, "rgb(255,255,255)"))
        .show()
        .shape.onclick=()=>{player.setDestiny(row,col)}
      }
    }
  }
}
function init(){
    createLevel()

    showLevel()
    document.body.style.width=3000
    document.body.style.height=3000

}

function main(){
    let speed=2
    let dt = (new Date().getTime() - time) * 1e-3;
    time= new Date().getTime() 
    real_time+=dt
    //code here
    player.move(real_time)
    requestAnimationFrame(main)
}
//Main ---
init()
main()