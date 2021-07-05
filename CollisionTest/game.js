var time= new Date().getTime() ;
var real_time=0
var player=new Object()
var floor=new Object()
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
    if(up && !collisionDetection()){
       player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)-speed) 
    }
    if(down && !collisionDetection()){
        player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)+speed)
    }
    if(left && !collisionDetection()){
        player.move(parseInt(player.shape.style.left)-speed,parseInt(player.shape.style.top))
    }
    if(right && !collisionDetection()){
        player.move(parseInt(player.shape.style.left)+speed,parseInt(player.shape.style.top))
    }
}
function collisionDetection(){
    if(player.y+player.height>=floor.y && (player.x>=floor.x && player.x<=floor.x+floor.width) ){
        player.move(player.x,player.y-1)
        return true
    }
}
function init(){
    player.append(createSquare("300px","300px","50","70","rgb(255,0,0)","player")).show()
    floor.append(createSquare("0px","500px","1500","300","rgb(100,100,100)","floor")).show()
}
function main(){
    let dt = (new Date().getTime() - time) * 1e-3;
    time= new Date().getTime() 
    real_time+=dt
    //code here
    move_player(20)
    requestAnimationFrame(main)
}
//Main ---
init()
main()