let real_time = 0;
let time = new Date().getTime();
let dt = 0;

let player = new Object();
let speed = 4;
let up = false,
  down = false,
  right = false,
  left = false;

let projectile_up = false;
let projectile_down = false;
let projectile_right = false;
let projectile_left = false;

let ghost_colliders = [];

let colliders = [];

let projectiles = [];
let enemy_projectiles = [];

//projectiles-----------
function createProjectile2(player, options) {
  if (options.frequency_function()) {
    let p = options.create_projectile_function()
    p.options.x_move_function = options.x_move_function;
    p.options.y_move_function = options.y_move_function;
    p.appendAnimation(projectileBehaviour2);
    projectiles.push(p);
  }
}
function createProjectile(player, options) {
  if (options.up) {
    if (step(player.real_time % options.prepeat, 0, options.pfrequency)) {
      let p = new Object().append(
        createCircle(
          player.x + player.width / 2,
          player.y,
          options.size,
          "rgb(255,200,0,1)"
        )
      );
      p.options.up = true;
      p.options.speed = options.speed;
      p.appendAnimation(projectileBehaviour);
      projectiles.push(p);
    }
  }
  if (options.down) {
    if (step(player.real_time % 0.2, 0, 0.1)) {
      let p = new Object().append(
        createCircle(
          player.x + player.width / 2,
          player.y + player.height,
          10,
          "rgb(255,200,0,1)"
        )
      );
      p.options.down = true;
      p.appendAnimation(projectileBehaviour);
      projectiles.push(p);
    }
  }
  if (options.right) {
    if (step(player.real_time % options.prepeat, 0, options.pfrequency)) {
      let p1 = new Object().append(
        createCircle(
          player.x + player.width,
          player.y,
          options.size,
          "rgb(255,200,0,1)"
        )
      );
      let p2 = new Object().append(
        createCircle(
          player.x + player.width,
          player.y + player.height / 2,
          options.size,
          "rgb(255,200,0,1)"
        )
      );
      let p3 = new Object().append(
        createCircle(
          player.x + player.width,
          player.y + player.height,
          options.size,
          "rgb(255,200,0,1)"
        )
      );
      p1.options.right = true;
      p2.options.right = true;
      p3.options.right = true;
      p1.options.speed = options.speed;
      p2.options.speed = options.speed;
      p3.options.speed = options.speed;
      p1.appendAnimation(projectileBehaviour);
      p2.appendAnimation(projectileBehaviour);
      p3.appendAnimation(projectileBehaviour);
      projectiles.push(p1);
      projectiles.push(p2);
      projectiles.push(p3);
    }
  }
  if (options.left) {
    if (step(player.real_time % 0.2, 0, 0.1)) {
      let p = new Object().append(
        createSquare(
          player.x,
          player.y + player.height / 2,
          10,
          10,
          "rgb(255,200,0,1)"
        )
      );
      p.options.left = true;
      p.appendAnimation(projectileBehaviour);
      projectiles.push(p);
    }
  }
}
function projectileBehaviour2(self) {
  let speed = self.options.speed != undefined ? self.options.speed : 4;
  for (let i = 0; i < ghost_colliders.length; i++) {
    let c = ghost_colliders[i];
    collisionDetection(self, c, (projectile, ghost) => {
      ghost.shape.style["background-color"] = "rgba(0,255,0,1)";
      setTimeout(() => {
        projectile.destroy();
        ghost.shape.style["background-color"] = "rgba(100,100,100,1)";
      }, 100);
    });
  }
  for (let i = 0; i < colliders.length; i++) {
    let c = colliders[i];
    collisionDetection(self, c, (projectile, ghost) => {
      ghost.shape.style["background-color"] = "rgba(0,255,0,1)";
      setTimeout(() => {
        projectile.destroy();
        ghost.shape.style["background-color"] = "rgba(0,0,0,1)";
      }, 100);
    });
  }

  let new_x = self.options.x_move_function(self);
  let new_y = self.options.y_move_function(self);
  self.move(new_x, new_y);

  // if (self.options.down) {
  //   self.move(self.x, self.y + speed);
  // }
  // if (self.options.left) {
  //   self.move(self.x - speed, self.y);
  // }
  // if (self.options.right) {
  //   self.move(self.x + speed, self.y);
  // }
}
function projectileBehaviour(self) {
  let speed = self.options.speed != undefined ? self.options.speed : 4;
  for (let i = 0; i < ghost_colliders.length; i++) {
    let c = ghost_colliders[i];
    collisionDetection(self, c, (projectile, ghost) => {
      ghost.shape.style["background-color"] = "rgba(0,255,0,1)";
      setTimeout(() => {
        projectile.destroy();
        ghost.shape.style["background-color"] = "rgba(100,100,100,1)";
      }, 100);
    });
  }
  for (let i = 0; i < colliders.length; i++) {
    let c = colliders[i];
    collisionDetection(self, c, (projectile, ghost) => {
      ghost.shape.style["background-color"] = "rgba(0,255,0,1)";
      setTimeout(() => {
        projectile.destroy();
        ghost.shape.style["background-color"] = "rgba(0,0,0,1)";
      }, 100);
    });
  }

  if (self.options.up) {
    self.move(self.x, self.y - speed);
  }
  if (self.options.down) {
    self.move(self.x, self.y + speed);
  }
  if (self.options.left) {
    self.move(self.x - speed, self.y);
  }
  if (self.options.right) {
    self.move(self.x + speed, self.y);
  }
}
//----------------
//collision detection function------
function collisionDetection(object1, object2, action, solid = false) {
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



player.append(createHotDog(300, 300, 100, 100, "rgb(230,0,0,1)"));
player.appendChild(createHotDog(60, 17, 20, 20, "rgb(255,255,0,1)"))
player.appendChild(createHotDog(20, 17, 20, 20, "rgb(255,255,0,1)"))

player.appendAnimation((self) => {
  let new_x = self.x;
  let new_y = self.y;

  self.up = false;
  self.down = false;
  self.left = false;
  self.right = false;
  self.moving= false

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
  for (let i = 0; i < ghost_colliders.length; i++) {
    let c = ghost_colliders[i];
    collisionDetection(self, c, (player, ghost) => {
      ghost.shape.style["background-color"] = "rgba(0,255,0,1)";
      setTimeout(() => {
        ghost.shape.style["background-color"] = "rgba(100,100,100,1)";
      }, 100);
    });
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

  if (projectile_up) {
    createProjectile(player, {
      up: true,
      speed: 1,
      size: 100,
      pfrequency: 0.1,
      prepeat: 1,
    });
  }
  if (projectile_down) {
    createProjectile(player, { down: true });
  }
  if (projectile_right) {
    createProjectile(player, {
      right: true,
      speed: 10,
      size: 10,
      pfrequency: 0.1,
      prepeat: 1,
    });
  }
  if (projectile_left) {
    createProjectile2(player, {
      left: true,
      frequency_function: () => {
        return step(player.real_time % 0.1, 0, 0.02);
      },
      x_move_function: (self) => {
        return self.x - self.real_time*self.real_time-self.real_time*2;
      },
      y_move_function:(Math.random()>0.5?(self) => {
        return self.y -1;
      }:(self) => {
        return self.y +1;
      }) ,
      create_projectile_function: () => {
        return new Object().append(
          createCircle(
            player.x,
            player.y + player.height /3,
            40,
            "rgb(100,100,255,1)"
          )
        );
      },
    });
  }
  if (self.up) {
    new_y = self.y - speed;
    self.moving=true
  }
  if (self.down) {
    new_y = self.y + speed;
    self.moving=true
  }
  if (self.right) {
    new_x = self.x + speed;
    self.moving=true
  }
  if (self.left) {
    new_x = self.x - speed;
    self.moving=true
  }
  self.move(new_x, new_y);
  if(self.moving){
    self.move(new_x,new_y+Math.sin(20*self.real_time)*1.2)
    if(Math.sin(20*self.real_time)<=0.2 && Math.sin(20*self.real_time)>=0){
      let smoke=new Object()
      .append(
          createHotDog(player.x, player.y+80, 70, 70, "rgb(200,200,200,1)")
        )
      smoke.appendAnimation((self)=>{
        self.setColor([0,0,50,Math.cos(self.real_time)*2])
        self.move(self.x,self.y-1)
        if(self.real_time>2){
          self.destroy()
        }
      })
      projectiles.push(smoke)
    }
  }
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
  for (let x = 0; x < box_size; x++) {
    for (let y = 0; y < box_size; y++) {
      if (x == 0 || x == box_size - 1 || y == 0 || y == box_size - 1) {
        let c = new Object().append(
          createSquare(x * length, y * length, length, length, "rgb(0,0,0,1)")
        );
        c.shape.style.border = "2px solid white";
        colliders.push(c);
      }
      if (x == Math.floor(box_size / 2) && y == Math.floor(box_size / 2)) {
        let c = new Object().append(
          createSquare(x * length, y * length, length, length, "rgb(0,0,0,1)")
        );
        c.shape.style.border = "2px solid white";
        colliders.push(c);
        let c1 = new Object().append(
          createSquare(
            x * length,
            (y + 1) * length,
            length,
            length,
            "rgb(0,0,0,1)"
          )
        );
        c1.shape.style.border = "2px solid white";
        colliders.push(c1);
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
  
  projectiles.forEach((p) => {
    p.play();
  });
  if (real_time % 1 < 0.3) {
    projectiles = cleanUnusedProjectiles();
  }
  time = new Date().getTime();
  requestAnimationFrame(main);
}
//Main ---
init();
main();
