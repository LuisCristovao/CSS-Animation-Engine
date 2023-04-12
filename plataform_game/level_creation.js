let real_time = 0;
let time = new Date().getTime();
let dt = 0;
let offset = 100000;
let mouse_click = false;
let object_code = "";
let level_map = {}; //each with "x:y":{x:1,y:2,obkect_code:green_block}
let colliders = [];
let mouse = [0, 0];
let mouse_obj = new Object();

document.body.addEventListener("touchmove", touchMove, false);
document.body.addEventListener("touchstart", touchStart, false);
document.body.addEventListener("touchend", touchEnd, false);
document.body.addEventListener("mousemove", mouseMove, false);
document.body.addEventListener("mousedown", mouseDown, false);
document.body.addEventListener("mouseup", mouseUp, false);

function mouseUp(e) {
  mouse_click = false;
}
function mouseDown(e) {
  mouse[0] = e.clientX;
  mouse[1] = e.clientY;
  mouse_click = true;
}

function mouseMove(e) {
  mouse[0] = e.clientX;
  mouse[1] = e.clientY;
}

function touchEnd(e) {
  mouse_click = false;
}
function touchStart(e) {
  mouse[0] = e.touches[0].clientX;
  mouse[1] = e.touches[0].clientY;
  mouse_click = true;
}

function touchMove(e) {
  mouse[0] = e.touches[0].clientX;
  mouse[1] = e.touches[0].clientY;
}

document.addEventListener("keydown", press);
function press(e) {
  if (e.keyCode === 48 /* 0 */) {
    object_code = "delete";
  }
  if (e.keyCode === 49 /* 1 */) {
    object_code = "green_block";
    console.log("1");
  }

  if (e.keyCode === 83 /* s */) {
    down = true;
  }
  if (e.keyCode === 65 /* a */) {
    left = true;
  }
  if (e.keyCode === 75 /*k key*/) {
    dodge = true;
    setTimeout(() => {
      dodge = false;
    }, 100);
  }
  if (e.keyCode === 38 /* up */) {
    projectile_up = true;
  }
  if (e.keyCode === 39 /* right */) {
    projectile_right = true;
  }
  if (e.keyCode === 40 /* down */) {
    projectile_down = true;
  }
  if (e.keyCode === 37 /* left */) {
    projectile_left = true;
  }
}
document.addEventListener("keyup", release);
function release(e) {}

function cleanUnusedProjectiles() {
  let new_projectiles_array = [];
  colliders.forEach((p) => {
    if (p.is_destroyed == false) {
      new_projectiles_array.push(p);
    }
  });
  return new_projectiles_array;
}
function createGreenBlock(x, y) {
  let block = new Object().append(
    createSquare(x, y, 100, 100, "rgb(0,255,0,1)", "green_block")
  );
  block.shape.style.border = "2px solid white";
  block.appendChild(new createHotDog(-10, -10, 120, 20, "rgb(255,255,255,1)"));
  colliders.push(block);
  return block;
}

function init() {
  document.body.style.background =
    "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,241,255,1) 100%) fixed";
  document.body.style.overflow = "hidden";
  document.body.style.height = "200000px";
  document.body.style.width = "2000000px";

  c = new Object().append(
    createSquare(offset + 10000, offset + 1000, length, length, "rgb(0,0,0,1)")
  );
  c.shape.style.border = "2px solid white";
  colliders.push(c);
}
function handleMouseClick() {
  let cell_width = 100;
  let x = Math.floor(mouse[0] / cell_width) * cell_width;
  let y = Math.floor(mouse[1] / cell_width) * cell_width;
  if(level_map[`${x}:${y}`]==undefined){

    if (object_code == "delete") {
      level_map[`${x}:${y}`].object.destroy()
      delete level_map[`${x}:${y}`]
    }
    if (object_code == "green_block") {
      let object = createGreenBlock(x, y);
      level_map[`${x}:${y}`] = {
        x: x,
        y: y,
        object_code: object_code,
        object: object,
      };
    }
  }
}
function main() {
  dt = (new Date().getTime() - time) * 1e-3;
  real_time += dt;

  if (mouse_click) {
    handleMouseClick();
  }
  colliders=cleanUnusedProjectiles();
  time = new Date().getTime();
  requestAnimationFrame(main);
}
//Main ---
init();
main();
