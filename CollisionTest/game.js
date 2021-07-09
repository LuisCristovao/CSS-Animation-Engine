var time= new Date().getTime() ;
var real_time=0
var player=new Object()
var objects=[] 
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
  
    //just top left and object is above
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
    }
  })



}
function init(){
    player.append(createSquare("300px","300px","50","70","rgb(255,0,0)","player")).show()
    objects.push(new Object().append(createSquare("300px","500px","300","300","rgb(100,100,100)","floor")).show())
    objects.push(new Object().append(createSquare("100px","600px","100","300","rgb(100,100,100)")).show())
    objects.push(new Object().append(createSquare("2500px","300px","100","300","rgb(100,100,100)")).show())
    objects.push(new Object().append(createSquare("2800px","300px","300","300","rgb(100,100,100)")).show())
    document.body.style.width=3000
    document.body.style.height=3000

}

function main(){
    let speed=5
    let dt = (new Date().getTime() - time) * 1e-3;
    time= new Date().getTime() 
    real_time+=dt
    //code here
    move_player(speed)
    collisionDetection(speed)
    requestAnimationFrame(main)
}
//Main ---
init()
main()