

let player=new Character()
let speed=4
let up=false,down=false,right=false,left=false
player.append(createSquare(100, 100, 100, 100, "rgb(255,0,0,1)"))
player.appendAnimation((self)=>{
  let new_x=self.x;
  let new_y=self.y;
  if(up){
    new_y=self.y-speed
  }
  if(down){
    new_y=self.y+speed
  }
  if(right){
    new_x=self.x+speed
  }
  if(left){
    new_x=self.x-speed
  }
  self.move(new_x,new_y)
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