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
}
function collisionDetection(speed){
  let top_left_corner=false
  let top_right_corner=false
  let bot_right_corner=false
  let bot_left_corner=false
  //top left corner collision
  if(player.y<=floor.y + floor.height && player.x<=floor.x + floor.width && player.x>=floor.x && player.y>=floor.y ){
    top_left_corner=true

  }
  //top right
  if(player.x+player.width>=floor.x && player.x+player.width<=floor.x +floor.width && player.y<=floor.y + floor.height && player.y>=floor.y){
    top_right_corner=true
  }
  //bottom left
  if(player.y+player.height>=floor.y && player.y+player.height<=floor.y+floor.height && player.x<=floor.x + floor.width && player.x>=floor.x  ){
    bot_left_corner=true
  }
  //bottom right
  if(player.y+player.height>=floor.y && player.y+player.height<=floor.y+floor.height && player.x+player.width>=floor.x && player.x+player.width<=floor.x +floor.width ){
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

  //just top left and object is above
  if(top_left_corner && player.y+1>=floor.y+floor.height && !top_right_corner && !bot_left_corner){
    player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)+speed)
  }
  //just top left with object on the left
  if(top_left_corner && player.x+1 >=floor.x+floor.width && !bot_left_corner && !top_right_corner){
    player.move(parseInt(player.shape.style.left)+speed,parseInt(player.shape.style.top))
  }
  //just top right and  object is above
  if(top_right_corner && player.y+1>=floor.y+floor.height && !top_left_corner && !bot_right_corner){
    player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)+speed)
  }
  //just top right and going right
  if(top_right_corner && player.x+player.width-1 <=floor.x && !bot_right_corner && !top_left_corner){
    player.move(parseInt(player.shape.style.left)-speed,parseInt(player.shape.style.top))
  }
  //just bot right and object is under 
  if(bot_right_corner && player.y+player.height-1<=floor.y   && !top_right_corner && !bot_left_corner){
    player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)-speed)
  }
  //just bot right and object is right 
  if(bot_right_corner && player.x+player.width-1<=floor.x  && !bot_left_corner && !top_right_corner){
    player.move(parseInt(player.shape.style.left)-speed,parseInt(player.shape.style.top))
  }
  //just bot left and going down
  if(bot_left_corner && down && !top_left_corner && !bot_right_corner){
    player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)-speed)
  }
  //just bot left and going left
  if(bot_left_corner && left && !bot_right_corner && !top_left_corner){
    player.move(parseInt(player.shape.style.left)+speed,parseInt(player.shape.style.top))
  }


}
function init(){
    player.append(createSquare("300px","300px","50","70","rgb(255,0,0)","player")).show()
    floor.append(createSquare("300px","500px","300","300","rgb(100,100,100)","floor")).show()
}
function main(){
    let dt = (new Date().getTime() - time) * 1e-3;
    time= new Date().getTime() 
    real_time+=dt
    //code here
    move_player(2)
    collisionDetection(2)
    requestAnimationFrame(main)
}
//Main ---
init()
main()