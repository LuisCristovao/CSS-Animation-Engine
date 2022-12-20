let real_time = 0;
let time = new Date().getTime();
let dt = 0;
let offset = 100000
let player = new Object();
let speed = 4;
let up = false,
  down = false,
  right = false,
  left = false,
  jump = false;

let colliders = [];
let mouse=[0,0]
let mouse_obj=new Object()


player.append(createSquare(offset, offset, 100, 100, "rgb(255,0,0,1)"));
//player.appendChild(createSquare(player.x-1000, player.y-1000, 1000, 1000, "rgb(255,255,255,0.1)","window"))
document.body.addEventListener("touchmove", touchMove,false);
document.body.addEventListener("touchstart", touchStart,false);
document.body.addEventListener("touchend", touchEnd,false);

function touchEnd(e){
  mouse_obj.destroy()
}
function touchStart(e){
  mouse_obj.append(createCircle(e.touches[0].clientX+offset-window.innerWidth/2,e.touches[0].clientY+offset-window.innerHeight/2,100,"rgb(0,0,255,1)"))
}

function touchMove(e) {
	
mouse[0]=e.touches[0].clientX;
mouse[1]=e.touches[0].clientY;
console.log(mouse)
//alert(mouse)
}


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
      let collision_margin_error = 10
      if (
        object1.x - object2.x < 0
      ) {
        left_of = true;
        aux_orientation++;
      }
      if (object1.x - object2.x > 0) {
        right_of = true;
        //console.log("right of " + (object1.x - object2.x))
        aux_orientation++;
      }
      if (
        object1.y - object2.y > 0
      ) {
        below = true;
        aux_orientation++;
      }
      if (
        object1.y - object2.y < 0
      ) {
        //console.log('above ' + (object1.y - object2.y))
        above = true;
        aux_orientation++;
      }

      if (aux_orientation > 1) {
        if (Math.abs(object1.y - object2.y) > Math.abs(object1.x - object2.x)) {
          left_of = false; right_of = false
        } else {
          above = false; below = false
        }
      }



      if (below) {
        object1.up = false;
        object1.speedy = (object1.y - object2.y) * 0.05
        object1.options.on_ground = false
      }
      if (above) {
        object1.down = false;
        object1.speedy = (object1.y - object2.y) * 0.05

      }
      if (right_of) {
        object1.left = false;
        object1.speedx = (object1.x - object2.x) * 0.05
        object1.options.on_ground = false
      }
      if (left_of) {
        object1.right = false;
        object1.speedx = (object1.x - object2.x) * 0.05
        object1.options.on_ground = false
      }
    }
  }
}


player.appendAnimation((self) => {
  let new_x = self.x;
  let new_y = self.y;
  let accx = 0;
  let accy = 0;

  self.up = false;
  self.down = false;
  self.left = false;
  self.right = false;
  self.options.on_ground = false;



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
        player.options.on_ground = true;
        player.options.double_jump = false
        player.real_time = 0;
      },
      (solid = true)
    );
  }

  if ((self.up && self.options.on_ground) || (self.up && !self.options.double_jump && !self.options.on_ground)) {
    self.speedy = self.dt * -15000;
    if (self.up && !self.options.double_jump && !self.options.on_ground) {
      self.options.double_jump = true
    }

  }
  if (self.down) {
    //new_y = self.y + speed;
  }
  if (self.right) {
    self.speedx = self.speedx + self.dt * 200;
  }
  if (self.left) {
    self.speedx = self.speedx + self.dt * -200;
  }
  //on the air
  if (!self.options.on_ground) {
    self.speedy = self.speedy + self.dt * 300;
  }
  self.move(self.x + self.dt * self.speedx, self.y + self.dt * self.speedy);

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
  document.body.style.height="200000px"
  document.body.style.width="2000000px"
  let length = 100;
  let box_size = 20;
  let c = new Object().append(
    createSquare(player.x, player.y + player.height, length, length, "rgb(0,0,0,1)")
  );
  c.shape.style.border = "2px solid white";
  colliders.push(c);
  c = new Object().append(
    createSquare(player.x + 200, player.y, length, length, "rgb(0,0,0,1)")
  );
  c.shape.style.border = "2px solid white";
  colliders.push(c);
  for (i = 0; i < 100; i++) {
    let random = Math.random()
    let next_x_position_block = 0
    let next_y_position_block = 0
    if (random > 0.5) {
      next_x_position_block = 400
    } else {
      next_x_position_block = -400
    }
    if (Math.random() > 0.5) {
      next_y_position_block = 200
    } else {
      next_x_position_block = 100
    }

    let nc = new Object().append(
      createSquare(c.x + next_x_position_block, c.y - 100, length, length, "rgb(0,0,0,1)")
    );
    nc.shape.style.border = "2px solid white";
    colliders.push(nc);
    c = nc
  }

  // for (let y = 0; y < box_size; y++) {
  //   for (let x = 0; x < box_size; x++) {
  //     if ((x == 3) & (y == 4)) {
  //       let c = new Object().append(
  //         createSquare(offset+x * length, offset+y * length, length, length, "rgb(0,0,0,1)")
  //       );
  //       c.shape.style.border = "2px solid white";
  //       colliders.push(c);
  //     }
  //     if ((x == 6) & (y == 7)) {
  //       let c = new Object().append(
  //         createSquare(offset+x * length, offset+y * length, length, length, "rgb(0,0,0,1)")
  //       );
  //       c.shape.style.border = "2px solid white";
  //       colliders.push(c);
  //     }
  //     if ((y == 8)) {
  //       let c = new Object().append(
  //         createSquare(offset+x * length, offset+y * length, length, length, "rgb(0,0,0,1)")
  //       );
  //       c.shape.style.border = "2px solid white";
  //       colliders.push(c);
  //     }
  //     if ((x == 10)) {
  //       let c = new Object().append(
  //         createSquare(offset+x * length, offset+y * length, length, length, "rgb(0,0,0,1)")
  //       );
  //       c.shape.style.border = "2px solid white";
  //       colliders.push(c);
  //     }
  //   }
  // }
  c = new Object().append(
    createSquare(offset + 10000, offset + 1000, length, length, "rgb(0,0,0,1)")
  );
  c.shape.style.border = "2px solid white";
  colliders.push(c);
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
