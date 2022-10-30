let real_time = 0;
let time = new Date().getTime();
let dt = 0;
let n_particules=500
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let fires = [];
let tmp = null;
function arrayRemove(arr, index) {
  return arr.filter((ele, i) => {
    return i !== index;
  });
}
for (i = 0; i <= n_particules; i++) {
  fires[i] = new Object();
  fires[i].append(
    createDiffCircle(500, 300, 10, 10, "rgba(255,200,0,1)", "fire")
  );
  fires[i].appendAnimation(() => {
    fires[i].move(fires[i].x-0.5*Math.sin(1*(100*(fires[i].real_time/i)-0.1*i)),fires[i].y-0.5*Math.cos((1)*(100*(fires[i].real_time/i)-0.1*i)))
    fires[i].setColor([fires[i].color[0]-10*Math.sin(0.2*(2*fires[i].real_time)-i),fires[i].color[1],fires[i].color[2],1]);
  });
  
}

//Main-----
document.body.style.backgroundColor = "hsl(0,50%,5%)";
function Main() {
  dt = (new Date().getTime() - time) * 1e-3;
  real_time += dt;
  // Do stuff here -----
  for (i = 0; i <= n_particules; i++) {
    fires[i].play();
    
  }

  //----------------------
  time = new Date().getTime();
  requestAnimationFrame(Main);
}
requestAnimationFrame(Main);
