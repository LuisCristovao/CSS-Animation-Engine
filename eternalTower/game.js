var time= new Date().getTime() ;
var real_time=0
var player=new Object()
var objects=[] 
var enemy=null,speed=10
var up = false,
  right = false,
  down = false,
  left = false,
  dodge = false,
  block_down=false,
  block_up=false,
  block_right=false,
  block_left=false;

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
   if(e.keyCode === 75/*k key*/){
    dodge = false
  } 
}
function move_player(speed){
  
    if(up && !block_up ){
       player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)-speed) 
    }
    if(down && !block_down){
        player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)+speed)
    }
    if(left && !block_left){
        player.move(parseInt(player.shape.style.left)-speed,parseInt(player.shape.style.top))
    }
    if(right && !block_right){
        player.move(parseInt(player.shape.style.left)+speed,parseInt(player.shape.style.top))
    }
    if(dodge){
      player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)-speed*10) 
    }
    
}
function gravity(force){
  if(!block_down){
    player.move(player.x,player.y+force*2)
  }
}

function collisionDetection(speed){
  block_down=false,
  block_up=false,
  block_right=false,
  block_left=false;
  let object_id=null
  let step=20

  objects.forEach(object=>{
    let top_left_corner=false
    let top_right_corner=false
    let bot_right_corner=false
    let bot_left_corner=false
    
    let top_left_corner_up=false
    let top_left_corner_left=false
    let top_right_corner_up=false
    let top_right_corner_right=false
    let bot_right_corner_down=false
    let bot_right_corner_right=false
    let bot_left_corner_down=false
    let bot_left_corner_left=false

    //top left corner collision
    if(player.y<=object.y + object.height && player.x<=object.x + object.width && player.x>=object.x && player.y>=object.y ){
      top_left_corner=true
      object_id=object.id
    }
    //top right
    if(player.x+player.width>=object.x && player.x+player.width<=object.x +object.width && player.y<=object.y + object.height && player.y>=object.y){
      top_right_corner=true
      object_id=object.id
    }
    //bottom left
    if(player.y+player.height>=object.y && player.y+player.height<=object.y+object.height && player.x<=object.x + object.width && player.x>=object.x  ){
      bot_left_corner=true
      object_id=object.id
    }
    //bottom right
    if(player.y+player.height>=object.y && player.y+player.height<=object.y+object.height && player.x+player.width>=object.x && player.x+player.width<=object.x +object.width ){
      bot_right_corner=true
      object_id=object.id
    }
    //--------------------
    //top left up corner collision
    if(player.y<=object.y + object.height && player.x+step<=object.x + object.width && player.x+step>=object.x && player.y>=object.y ){
      top_left_corner_up=true
      object_id=object.id
    }
    //top left left corner collision
    if(player.y+step<=object.y + object.height && player.x<=object.x + object.width && player.x>=object.x && player.y+step>=object.y ){
      top_left_corner_left=true
      object_id=object.id
    }
    //top right up corner collision
    if(player.x+player.width-step>=object.x && player.x+player.width-step<=object.x +object.width && player.y<=object.y + object.height && player.y>=object.y){
      top_right_corner_up=true
      object_id=object.id
    }
    //top right right
    if(player.x+player.width>=object.x && player.x+player.width<=object.x +object.width && player.y+step<=object.y + object.height && player.y+step>=object.y){
      top_right_corner_right=true
      object_id=object.id
    }
    
    //bottom left down
    if(player.y+player.height>=object.y && player.y+player.height<=object.y+object.height && player.x+step<=object.x + object.width && player.x+step>=object.x  ){
      bot_left_corner_down=true
      object_id=object.id
    }
    //bottom left left
    if(player.y+player.height-step>=object.y && player.y+player.height-step<=object.y+object.height && player.x<=object.x + object.width && player.x>=object.x  ){
      bot_left_corner_left=true
      object_id=object.id
    }
     //bottom right down
     if(player.y+player.height>=object.y && player.y+player.height<=object.y+object.height && player.x+player.width-step>=object.x && player.x+player.width-step<=object.x +object.width ){
      bot_right_corner_down=true
      object_id=object.id
    }
     //bottom right right
     if(player.y+player.height-step>=object.y && player.y+player.height-step<=object.y+object.height && player.x+player.width>=object.x && player.x+player.width<=object.x +object.width ){
      bot_right_corner_right=true
      object_id=object.id
    }
    //----------------


    //both left
    if(top_left_corner && bot_left_corner){
      block_left=true
      player.shape.style.left=object.x+object.width
      //player.move(parseInt(player.shape.style.left)+speed,parseInt(player.shape.style.top))
    }
    //both right
    if(top_right_corner && bot_right_corner){
      block_right=true
      player.shape.style.left=object.x-player.width
    }
    //top corners
    if(top_right_corner && top_left_corner){
      
      block_up=true
      player.shape.style.top=object.y+object.height
      //player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)+speed)
    }
    //bottom corners
    if(bot_left_corner && bot_right_corner){
      block_down=true
      player.shape.style.top=object.y-player.height
      //player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)-speed)
    }
  //----------------------

    //only top left up
    if(top_left_corner_up ){
      
      block_up=true
      player.shape.style.top=object.y+object.height
      //player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)+speed)
    }
    //only top left left
    if(top_left_corner_left ){
      block_left=true
      player.shape.style.left=object.x+object.width
      //player.move(parseInt(player.shape.style.left)+speed,parseInt(player.shape.style.top))
    }
    //only bottom left down
    if(bot_left_corner_down ){
      block_down=true
      player.shape.style.top=object.y-player.height
      //player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)-speed)
    }
    //only bottom left left
    if( bot_left_corner_left ){
      block_left=true
      player.shape.style.left=object.x+object.width
      //player.move(parseInt(player.shape.style.left)+speed,parseInt(player.shape.style.top))
    }
    //only top right up
    if(top_right_corner_up ){
      
      block_up=true
      player.shape.style.top=object.y+object.height
      //player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)+speed)
    }
    //only top right right
    if(top_right_corner_right && !bot_right_corner && !bot_right_corner_right){
      block_right=true
      player.shape.style.left=object.x-player.width
    }
    //only bottom right down
    if(bot_right_corner_down  ){
      block_down=true
      player.shape.style.top=object.y-player.height
      //player.move(parseInt(player.shape.style.left),parseInt(player.shape.style.top)-speed)
    }
    //only bottom right right
    if(bot_right_corner_right  ){
      block_right=true
      player.shape.style.left=object.x-player.width
    }
  })
  return object_id


}

function moveEnemy(time){
  //enemy.move(1000,500+300*Math.cos(time))
  let deltax=player.x-enemy.x
  let deltay=player.y-enemy.y
  //enemy.move(1500+500*Math.cos(time/2),300)
  enemy.move(enemy.x+deltax/100,enemy.y+deltay/100)
}
function init(){
    player.append(createSquare("300px","300px","50","70","rgb(255,0,0)","player")).show()
    objects.push(new Object("bha").append(createSquare("520px","500px","300","300","rgb(100,100,100)","floor")).show())
    objects.push(new Object().append(createSquare("300px","600px","100","300","rgb(100,100,100)")).show())
    objects.push(new Object().append(createSquare("2500px","300px","100","300","rgb(100,100,100)")).show())
    objects.push(new Object().append(createSquare("2800px","555px","300","300","rgb(100,100,100)")).show()) 
    objects.push(new Object().append(createSquare("0px","2000px","3500","300","rgb(100,100,100)")).show()) 
    objects.push(new Object("enemy").append(createSquare("1000px","100px","100","100","rgb(200,100,100)")).show())
    objects.push(new Object("bha").append(createSquare("1200px","500px","300","300","rgb(100,100,100)","floor")).show())
    objects.push(new Object("bha").append(createSquare("2000px","500px","300","300","rgb(100,100,100)","floor")).show())
    enemy=objects[5]
    document.body.style.width=3000
    document.body.style.height=3000

}

function main(){
    
    let object_id=null
    let dt = (new Date().getTime() - time) * 1e-3;
    time= new Date().getTime() 
    real_time+=dt
    //code here
    player.x=parseInt(player.shape.style.left)
    player.y=parseInt(player.shape.style.top)
    enemy.x=parseInt(enemy.shape.style.left)
    enemy.y=parseInt(enemy.shape.style.top)
    
    moveEnemy(real_time)
    //gravity(10)
    move_player(speed)
    object_id=collisionDetection(speed)
    window.scroll({
      top: player.y-300,
      left: player.x-300
    }); 
    
    if(object_id=="bha" || object_id=="enemy"){
      player.shape.style["background-color"]="rgb(0,255,0)"
    }else{
      player.shape.style["background-color"]="rgb(255,0,0)"
    }
    if(object_id=="enemy"){
      player.shape.style.height=parseInt(player.shape.style.height)-1
    }
    
    requestAnimationFrame(main)
}
//Main ---
init()
main()