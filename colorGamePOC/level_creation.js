let real_time = 0;
let time = new Date().getTime();
let dt = 0;
let offset = 100000;
let mouse_click = false;
let object_code = "red_ball";
let level_map = {}; //each with "x:y":{x:1,y:2,obkect_code:green_block}
let colliders = [];
let mouse = [0, 0];
let mouse_obj = new Object();
let ball_size=33
let player=null

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
    object_code = "red_ball";
    console.log("1");
  }
  if (e.keyCode === 50 /* 2 */) {
    object_code = "green_ball";
  }
  if (e.keyCode === 51 /* 3 */) {
    object_code = "blue_ball";
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
//color balls------------
function createRedBall(x, y) {
  let ball = new Object().append(
    createCircle(x, y,  ball_size, "rgb(255,0,0,1)", "red_ball")
  );
  colliders.push(ball);
  return ball;
}
function createGreenBall(x, y) {
  let ball = new Object().append(
    createCircle(x, y,  ball_size, "rgb(0,255,0,1)", "green_ball")
  );
  colliders.push(ball);
  return ball;
}
function createBlueBall(x, y) {
  let ball = new Object().append(
    createCircle(x, y,  ball_size, "rgb(0,50,255,1)", "blue_ball")
  );
  colliders.push(ball);
  return ball;
}

//----------------------
function init() {
  // document.body.style.background =
  //   "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,241,255,1) 100%) fixed";
  //document.body.style.overflow = "hidden";
  document.body.style.height = "200000px";
  document.body.style.width = "2000000px";
  setTimeout(() => {
    window.scroll({
      top: offset,
      left: offset,
    });
  }, 1000);
  if (localStorage["color game"] != undefined) {
    handleMapCreation();
  }
  player = new Object().append(createCircle(Math.floor(( offset) / ball_size) * ball_size,Math.floor((offset) / ball_size) * ball_size,ball_size,"rgb(0,0,0,1)","player"))
  player.appendAnimation(()=>{
    player.setColor([(player.real_time*200)%360,100,50,1])
  })
  c = new Object().append(
    createSquare(
      offset + 10000,
      offset + 1000,
      length,
      length,
      "rgb(0,0,0,1)",
      "level_limit"
    )
  );
  c.shape.style.border = "2px solid white";
  colliders.push(c);
}
function saveToLevelMap(x, y, object_code, object) {
  let local_store_level_map = {};
  if (localStorage["color game"] != undefined) {
    local_store_level_map = JSON.parse(localStorage["color game"]);
  }
  level_map[`${x}:${y}`] = {
    x: x,
    y: y,
    object_code: object_code,
    object: object,
  };
  for (key in level_map) {
    let value = level_map[key];
    local_store_level_map[key] = {
      x: value.x,
      y: value.y,
      object_code: value.object_code,
    };
  }
  localStorage["color game"] = JSON.stringify(local_store_level_map);
}
function handleMapCreation() {
  let map = JSON.parse(localStorage["color game"]);
  let block = null;
  let ifs = {
    red_ball: (x, y) => {
      block = createRedBall(x, y);
      saveToLevelMap(x, y, "red_ball", block);
    },
    green_ball: (x, y) => {
      block = createGreenBall(x, y);
      saveToLevelMap(x, y, "green_ball", block);
    },
    blue_ball: (x, y) => {
      block = createBlueBall(x, y);
      saveToLevelMap(x, y, "blue_ball", block);

    }
  };
  for (key in map) {
    ifs[map[key].object_code](map[key].x, map[key].y);
  }
}
function handleMouseClick() {
  let cell_width = ball_size;
  let x = Math.floor((window.scrollX + mouse[0]) / cell_width) * cell_width;
  let y = Math.floor((window.scrollY + mouse[1]) / cell_width) * cell_width;
  let ifs = {
    red_ball: (x, y) => {
      block = createRedBall(x, y);
      saveToLevelMap(x, y, "red_ball", block);
    },
    green_ball: (x, y) => {
      block = createGreenBall(x, y);
      saveToLevelMap(x, y, "green_ball", block);
    },
    blue_ball: (x, y) => {
      block = createBlueBall(x, y);
      saveToLevelMap(x, y, "blue_ball", block);

    }
  };

  if (object_code == "delete") {
    try {
      level_map[`${x}:${y}`].object.destroy();
      delete level_map[`${x}:${y}`];
      let new_storage_data=JSON.parse(localStorage["color game"])
      delete new_storage_data[`${x}:${y}`]
      localStorage["color game"]=JSON.stringify(new_storage_data)
    } catch {
      //pass
    }
  } else {
    if (level_map[`${x}:${y}`] == undefined) {
      ifs[object_code](x,y);
    }
  }
}
function main() {
  dt = (new Date().getTime() - time) * 1e-3;
  real_time += dt;

  if (mouse_click) {
    handleMouseClick();
  }
  player.play()
  colliders = cleanUnusedProjectiles();
  time = new Date().getTime();
  requestAnimationFrame(main);
}
//Main ---
init();
main();
