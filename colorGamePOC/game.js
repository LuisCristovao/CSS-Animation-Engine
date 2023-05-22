let real_time = 0;
let time = new Date().getTime();
let dt = 0;
let offset = 100000;
let player = new Object();
let speed = 4;
let ball_size = 33;
let contact_balls = [];
let colliders = [];
let mouse = [0, 0];
let mouse_obj = new Object();
let up = false,
  down = false,
  right = false,
  left = false,
  jump = false,
  red_key = false,
  green_key = false,
  blue_key = false;

document.body.addEventListener("touchmove", touchMove, false);
document.body.addEventListener("touchstart", touchStart, false);
document.body.addEventListener("touchend", touchEnd, false);

player.append(createCircle(offset, offset, 33, "rgb(0,0,0)", "player"));
player.appendAnimation((self) => {
  self.up = false;
  self.down = false;
  self.left = false;
  self.right = false;
  self.options.on_ground = false;
  self.gravity = 300;
  self.jump_force = -15000;
  self.ground_speed = 900;
  self.air_speed = 150;
  self.friction = 0.07;

  if (up) {
    self.up = true;
  }
  if (down) {
    self.down = true;
  }
  if (right) {
    self.right = true;
  }
  if (left) {
    self.left = true;
  }
  if (red_key) {
    for (let i = 0; i < 80; i++) {
      let b = new Object().append(
        createCircle(player.x, player.y, 25, "rgb(255,0,0)", "contact_ball")
      );
      // b.real_time=0
      b.appendAnimation((self) => {
        let new_x = self.x + 200 * self.dt * Math.cos(20 * i);
        let new_y = self.y + 200 * self.dt * Math.sin(20 * i);
        self.move(new_x, new_y);
        if (self.real_time >= 1) {
          self.destroy();
        }
        //on contact....
        for (let i = 0; i < colliders.length; i++) {
          let c = colliders[i];

          collisionDetection(
            self,
            c,
            (self, other_ball) => {
              let x_direction = other_ball.x - player.x;
              let y_direction = other_ball.y - player.y;
              //poiting vector.......
              for (let i = 0; i < 3; i++) {
                let b_tmp = new Object().append(
                  createCircle(
                    player.x + x_direction / (8 - i * 2),
                    player.y + y_direction / (8 - i * 2),
                    20,
                    "rgb(255,0,255)",
                    "contact_ball"
                  )
                );
                setTimeout(() => {
                  b_tmp.destroy();
                });
              }
              if (other_ball.shape.id == "red_ball") {
                player.speedx = (x_direction / Math.abs(x_direction)) * 100;
                player.speedy = (y_direction / Math.abs(y_direction)) * 100;
              } else {
                player.speedx = -(x_direction / Math.abs(x_direction)) * 100;
                player.speedy = -(y_direction / Math.abs(y_direction)) * 100;
              }
              
              for (let j = 0; j < contact_balls.length; j++) {
                contact_balls[j].destroy();
              }
            },
            (solid = false)
          );
        }
      });
      contact_balls.push(b);
    }
  }
  if (green_key) {
    for (let i = 0; i < 80; i++) {
      let b = new Object().append(
        createCircle(player.x, player.y, 25, "rgb(0,255,0)", "contact_ball")
      );
      // b.real_time=0
      b.appendAnimation((self) => {
        let new_x = self.x + 200 * self.dt * Math.cos(20 * i);
        let new_y = self.y + 200 * self.dt * Math.sin(20 * i);
        self.move(new_x, new_y);
        if (self.real_time >= 1) {
          self.destroy();
        }
        //on contact....
        for (let i = 0; i < colliders.length; i++) {
          let c = colliders[i];

          collisionDetection(
            self,
            c,
            (self, other_ball) => {
              let x_direction = other_ball.x - player.x;
              let y_direction = other_ball.y - player.y;
              //poiting vector.......
              for (let i = 0; i < 3; i++) {
                let b_tmp = new Object().append(
                  createCircle(
                    player.x + x_direction / (8 - i * 2),
                    player.y + y_direction / (8 - i * 2),
                    20,
                    "rgb(255,0,255)",
                    "contact_ball"
                  )
                );
                setTimeout(() => {
                  b_tmp.destroy();
                });
              }
              if (other_ball.shape.id == "green_ball") {
                player.speedx = (x_direction / Math.abs(x_direction)) * 100;
                player.speedy = (y_direction / Math.abs(y_direction)) * 100;
              } else {
                player.speedx = -(x_direction / Math.abs(x_direction)) * 100;
                player.speedy = -(y_direction / Math.abs(y_direction)) * 100;
              }
              for (let j = 0; j < contact_balls.length; j++) {
                contact_balls[j].destroy();
              }
            },
            (solid = false)
          );
        }
      });
      contact_balls.push(b);
    }
  }
  let ifs = {
    green_ball: (self, c) => {
      collisionDetection(
        self,
        c,
        (player, solid_block) => {
          player.shape.style["background-color"] = "rgb(0,255,0)";
          solid_block.destroy();
        },
        (solid = false)
      );
    },
    red_ball: (self, c) => {
      collisionDetection(
        self,
        c,
        (player, solid_block) => {
          player.shape.style["background-color"] = "rgb(255,0,0)";
          solid_block.destroy();
        },
        (solid = false)
      );
    },
    blue_ball: (self, c) => {
      collisionDetection(self, c, (player, solid_block) => {}, (solid = true));
    },
  };
  for (let i = 0; i < colliders.length; i++) {
    let c = colliders[i];
    ifs[c.shape.id](self, c);
  }

  if (self.down) {
    self.speedy = self.speedy + self.dt * 10;
  }
  if (self.right) {
    self.speedx = self.speedx + self.dt * 10;
  }
  if (self.left) {
    self.speedx = self.speedx + self.dt * -10;
  }
  //on the air (gravity)
  if (self.up) {
    self.speedy = self.speedy + self.dt * -10;
  }

  //console.log(self.speedy)

  self.move(self.x + self.dt * self.speedx, self.y + self.dt * self.speedy);

  //self.move(new_x,new_y)
});

function touchEnd(e) {
  mouse_obj.destroy();
  up = false;
  down = false;
  right = false;
  left = false;
  jump = false;
}
function touchStart(e) {
  mouse[0] = e.touches[0].clientX;
  mouse[1] = e.touches[0].clientY;
  mouse_obj.append(
    createCircle(
      e.touches[0].clientX + player.x - window.innerWidth / 2,
      e.touches[0].clientY + player.y - window.innerHeight / 2,
      100,
      "rgb(0,0,255,0.4)"
    )
  );
}

function touchMove(e) {
  mouse_obj.move(
    e.touches[0].clientX + player.x - window.innerWidth / 2,
    e.touches[0].clientY + player.y - window.innerHeight / 2
  );
  if (mouse[1] - e.touches[0].clientY > 200) {
    up = true;
  }
  if (mouse[0] - e.touches[0].clientX < 0) {
    right = true;
  }
  if (mouse[0] - e.touches[0].clientX > 0) {
    left = true;
  }
  //console.log(mouse[1] - e.touches[0].clientY)
  //alert(mouse)
}

//----------------
//collision detection function------
function collisionDetection(
  object1,
  object2,
  action,
  solid = true,
  bounce = 0.05
) {
  if (!solid) {
    if (
      object1.x + object1.width >= object2.x &&
      object1.x <= object2.x + object2.width &&
      object1.y + object1.height >= object2.y &&
      object1.y <= object2.y + object2.height
    ) {
      action(object1, object2);
    }
  } else {
    let aux_orientation = 0;
    let below = false,
      above = false,
      left_of = false,
      right_of = false;
    if (
      object1.x + object1.width >= object2.x &&
      object1.x <= object2.x + object2.width &&
      object1.y + object1.height >= object2.y &&
      object1.y <= object2.y + object2.height
    ) {
      action(object1, object2);
      let collision_margin_error = 10;
      if (object1.x - object2.x < 0) {
        left_of = true;
        aux_orientation++;
      }
      if (object1.x - object2.x > 0) {
        right_of = true;
        //console.log("right of " + (object1.x - object2.x))
        aux_orientation++;
      }
      if (object1.y - object2.y > 0) {
        below = true;
        aux_orientation++;
      }
      if (object1.y - object2.y < 0) {
        //console.log('above ' + (object1.y - object2.y))
        above = true;
        aux_orientation++;
      }

      if (aux_orientation > 1) {
        if (Math.abs(object1.y - object2.y) > Math.abs(object1.x - object2.x)) {
          left_of = false;
          right_of = false;
        } else {
          above = false;
          below = false;
        }
      }

      if (below) {
        object1.up = false;
        object1.speedy = (object1.y - object2.y) * 0.05;
        object1.options.on_ground = false;
      }
      if (above) {
        object1.down = false;
        object1.speedy = (object1.y - object2.y) * bounce;
        //console.log((object1.y - object2.y))
      }
      if (right_of) {
        if (
          object1.height - Math.abs(object1.y - object2.y) >
          object1.height * 0.1
        ) {
          object1.left = false;
          object1.speedx = (object1.x - object2.x) * 0.05;
          object1.options.on_ground = false;
        }
      }
      if (left_of) {
        if (
          object1.height - Math.abs(object1.y - object2.y) >
          object1.height * 0.1
        ) {
          object1.right = false;
          object1.speedx = (object1.x - object2.x) * 0.05;
          object1.options.on_ground = false;
        }
      }
    }
  }
}

document.addEventListener("keydown", press);
function press(e) {
  if (e.keyCode === 87 /* w */) {
    up = true;
  }
  if (e.keyCode === 68 /* d */) {
    right = true;
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
  if (e.keyCode === 82 /* r */) {
    red_key = true;
  }
  if (e.keyCode === 71 /* g */) {
    green_key = true;
  }
  if (e.keyCode === 66 /* b */) {
    blue_key = true;
  }
  if (e.keyCode === 37 /* left */) {
    projectile_left = true;
  }
}
document.addEventListener("keyup", release);
function release(e) {
  if (e.keyCode === 87 /* w */) {
    up = false;
  }
  if (e.keyCode === 68 /* d */) {
    right = false;
  }
  if (e.keyCode === 83 /* s */) {
    down = false;
  }
  if (e.keyCode === 65 /* a */) {
    left = false;
  }
  if (e.keyCode === 75 /*k key*/) {
    dodge = false;
  }
  if (e.keyCode === 82 /* r */) {
    red_key = false;
  }
  if (e.keyCode === 71 /* g */) {
    green_key = false;
  }
  if (e.keyCode === 66 /* b */) {
    blue_key = false;
  }
  if (e.keyCode === 37 /* left */) {
    projectile_left = false;
  }
}

function cleanUnusedProjectiles() {
  let new_projectiles_array = [];
  colliders.forEach((p) => {
    if (p.is_destroyed == false) {
      new_projectiles_array.push(p);
    }
  });
  colliders = new_projectiles_array;
  let new_projectiles_array2 = [];
  contact_balls.forEach((p) => {
    if (p.is_destroyed == false) {
      new_projectiles_array2.push(p);
    }
  });
  contact_balls = new_projectiles_array2;
}
//blocks------------
//color balls------------
function createRedBall(x, y) {
  let ball = new Object().append(
    createCircle(x, y, ball_size, "rgb(255,0,0,1)", "red_ball")
  );
  ball.appendAnimation((self) => {
    //nothing
  });
  colliders.push(ball);
  return ball;
}
function createGreenBall(x, y) {
  let ball = new Object().append(
    createCircle(x, y, ball_size, "rgb(0,255,0,1)", "green_ball")
  );
  ball.appendAnimation((self) => {
    //nothing
  });
  colliders.push(ball);
  return ball;
}
function createBlueBall(x, y) {
  let ball = new Object().append(
    createCircle(x, y, ball_size, "rgb(0,50,255,1)", "blue_ball")
  );
  ball.appendAnimation((self) => {
    //nothing
  });
  colliders.push(ball);
  return ball;
}

function handleMapCreation() {
  let map = JSON.parse(localStorage["color game"]);
  let block = null;
  let ifs = {
    red_ball: (x, y) => {
      block = createRedBall(x, y);
    },
    green_ball: (x, y) => {
      block = createGreenBall(x, y);
    },
    blue_ball: (x, y) => {
      block = createBlueBall(x, y);
    },
  };
  for (key in map) {
    ifs[map[key].object_code](map[key].x, map[key].y);
  }
}
function init() {
  document.body.style.overflow = "hidden";
  document.body.style.height = "200000px";
  document.body.style.width = "2000000px";

  let length = 100;
  let box_size = 20;
  let c;
  setTimeout(() => {
    window.scroll({
      top: offset,
      left: offset,
    });
  }, 1000);

  if (localStorage["color game"] != undefined) {
    handleMapCreation();
  }
  c = new Object().append(
    createSquare(offset + 10000, offset + 1000, length, length, "rgb(0,0,0,1)")
  );
  c.shape.style.border = "2px solid white";
}

function main() {
  dt = (new Date().getTime() - time) * 1e-3;
  real_time += dt;

  window.scroll({
    top: player.y - window.innerHeight / 2,
    left: player.x - window.innerWidth / 2,
  });

  player.play();

  for (c in colliders) {
    colliders[c].play();
  }
  for (c in contact_balls) {
    contact_balls[c].play();
  }
  

  cleanUnusedProjectiles();
  time = new Date().getTime();
  requestAnimationFrame(main);
}
//Main ---
init();
main();
