

let player=new Character()
player.append(createSquare(100, 100, 100, 100, "rgb(255,0,0,1)"))

document.addEventListener("keydown", press);
function press(e) {
  if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */) {
    up = true;
    player.move(player.x,player.y-1)
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
    right = true;
    player.move(player.x+1,player.y)
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
    down = true;
    player.move(player.x,player.y-1)
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
    left = true;
    player.move(player.x-1,player.y)
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
      
  requestAnimationFrame(main)
}
//Main ---
init()
main()