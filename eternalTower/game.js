

let player=new Character()
let speed=10
let up,down,right,left=false
player.append(createSquare(100, 100, 100, 100, "rgb(255,0,0,1)"))
player.appendAnimation(()=>{
  let new_x;
  let new_y;
  if(up){
    new_y=this.y-speed
  }
  if(down){
    new_y=this.y+speed
  }
  if(right){
    new_x=this.x+speed
  }
  if(left){
    new_x=this.x-speed
  }
  this.move(new_x,new_y)
})
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





function init(){
    

}

function main(){
  player.play()    
  requestAnimationFrame(main)
}
//Main ---
init()
main()