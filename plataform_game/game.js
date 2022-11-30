let real_time = 0;
let time = new Date().getTime();
let dt = 0;

let player = new Object();
let speed=4
let up = false,
  down = false,
  right = false,
  left = false,
  jump=false;


let colliders = [];



//----------------
//collision detection function------
function collisionDetection(object1, object2, action, solid = true) {
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
      if (
        object1.x - object2.x < 0 &&
        Math.abs(object1.x - object2.x) == object1.width
      ) {
        left_of = true;
        aux_orientation++;
      }
      if (
        object1.x - object2.x > 0 &&
        Math.abs(object1.x - object2.x) == object2.width
      ) {
        right_of = true;
        aux_orientation++;
      }
      if (
        object1.y - object2.y > 0 &&
        Math.abs(object1.y - object2.y) == object2.height
      ) {
        below = true;
        aux_orientation++;
      }
      if (
        object1.y - object2.y < 0 &&
        Math.abs(object1.y - object2.y) == object1.height
      ) {
        above = true;
        aux_orientation++;
      }
      if (aux_orientation == 1) {
        if (below) {
          object1.up = false;
        }
        if (above) {
          object1.down = false;
        }
        if (right_of) {
          object1.left = false;
        }
        if (left_of) {
          object1.right = false;
        }
      }
    }
  }
}


player.append(createSquare(300, 300, 100, 100, "rgb(255,0,0,1)"));

player.appendAnimation((self) => {
  let new_x = self.x;
  let new_y = self.y;

  self.up = false;
  self.down = false;
  self.left = false;
  self.right = false;

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
 
  for (let i = 0; i < colliders.length; i++) {
    let c = colliders[i];
    collisionDetection(
      self,
      c,
      (player, solid_block) => {
        solid_block.shape.style["background-color"] = "rgba(0,0,255,1)";
        setTimeout(() => {
          solid_block.shape.style["background-color"] = "rgba(0,0,0,1)";
        }, 100);
      },
      (solid = true)
    );
  }

  
  if (self.up) {
    new_y = self.y - speed;
  }
  if (self.down) {
    new_y = self.y + speed;
  }
  if (self.right) {
    new_x = self.x + speed;
  }
  if (self.left) {
    new_x = self.x - speed;
  }
  self.move(new_x, new_y);

  //self.move(new_x,new_y)
});
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
  if (e.keyCode === 38 /* up */) {
    projectile_up = false;
  }
  if (e.keyCode === 39 /* right */) {
    projectile_right = false;
  }
  if (e.keyCode === 40 /* down */) {
    projectile_down = false;
  }
  if (e.keyCode === 37 /* left */) {
    projectile_left = false;
  }
}

function cleanUnusedProjectiles() {
  let new_projectiles_array = [];
  projectiles.forEach((p) => {
    if (p.is_destroyed == false) {
      new_projectiles_array.push(p);
    }
  });
  return new_projectiles_array;
}

function init() {
  document.body.style.background = "rgb(0,0,0)";
  document.body.style.overflow = "hidden";
  let length = 100;
  let box_size = 20;
  for (let y = 0; y < box_size; y++) {
    for (let x = 0; x < box_size; x++) {
      if (x == 3  & (y == 4) ) {
        let c = new Object().append(
          createSquare(x * length, y * length, length, length, "rgb(0,0,0,1)")
        );
        c.shape.style.border = "2px solid white";
        colliders.push(c);
      }
      if (x == 6 & (y == 7)) {
        let c = new Object().append(
          createSquare(x * length, y * length, length, length, "rgb(0,0,0,1)")
        );
        c.shape.style.border = "2px solid white";
        colliders.push(c);
      }
    }
  }
}

function main() {
  dt = (new Date().getTime() - time) * 1e-3;
  real_time += dt;
  window.scroll({
    top: player.y - window.innerHeight / 2,
    left: player.x - window.innerWidth / 2,
  });
  player.play();
  
  time = new Date().getTime();
  requestAnimationFrame(main);
}
//Main ---
init();
main();
