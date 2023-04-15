let real_time = 0;
let time = new Date().getTime();
let dt = 0;
let offset = 100000;
let player = new Object();
let speed = 4;
let up = false,
  down = false,
  right = false,
  left = false,
  jump = false;

let colliders = [];
let mouse = [0, 0];
let mouse_obj = new Object();

player.append(createHotDog(offset, offset, 100, 100, "rgb(230,0,0,1)"));
player.appendChild(
  createHotDog(60, 17, 20, 20, "rgb(255,255,0,1)", "player_eye")
);
player.shape.style["z-index"]=500
//player.appendChild(createHotDog(20, 17, 20, 20, "rgb(255,255,0,1)"))
//player.append(createSquare(offset, offset, 100, 100, "rgb(255,0,0,1)"));

//player.appendChild(createSquare(player.x-1000, player.y-1000, 1000, 1000, "rgb(255,255,255,0.1)","window"))
document.body.addEventListener("touchmove", touchMove, false);
document.body.addEventListener("touchstart", touchStart, false);
document.body.addEventListener("touchend", touchEnd, false);

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

player.appendAnimation((self) => {
  

  self.up = false;
  self.down = false;
  self.left = false;
  self.right = false;
  self.options.on_ground = false;
  self.gravity =300
  self.jump_force=-15000
  self.ground_speed=900
  self.air_speed=150
  self.friction=0.07 

  if (up) {
    self.up = true;
  }
  if (down) {
    self.down = true;
  }
  if (right) {
    self.right = true;
    document.getElementById("player_eye").style.left = "60px";
  }
  if (left) {
    self.left = true;
    document.getElementById("player_eye").style.left = "20px";
  }
  let ifs = {
    green_block: (self,c) => {
      collisionDetection(
        self,
        c,
        (player, solid_block) => {
          player.options.on_ground = true;
          player.options.double_jump = false;
          player.real_time = 0;
        },
        (solid = true)
      );
    },
    solid_stone_block: (self,c) => {
      collisionDetection(
        self,
        c,
        (player, solid_block) => {
          player.options.on_ground = true;
          player.options.double_jump = false;
          player.real_time = 0;
        },
        (solid = true)
      );
    },
    water: (self,c) => {
      collisionDetection(
        self,
        c,
        (player, solid_block) => {
          player.gravity=100
          player.options.on_ground = false;
          player.options.double_jump = false;
          player.real_time = 0;
        },
        (solid = false)
        
      );
    },
    sand: (self,c) => {
      collisionDetection(
        self,
        c,
        (player, solid_block) => {
          player.options.on_ground = true;
          player.options.double_jump = false;
          player.real_time = 0;
        },
        (solid = true)
      );
    },
    cloud: (self,c) => {
      collisionDetection(
        self,
        c,
        (player, solid_block) => {
          player.options.on_ground = true;
          player.options.double_jump = false;
          player.real_time = 0;
          if (player.y - solid_block.y < 0) {
            player.speedy = (player.y - solid_block.y) * 7;
          }
        },
        (solid = false)
        
      );
    },
    ice: (self,c) => {
      collisionDetection(
        self,
        c,
        (player, solid_block) => {
          player.options.on_ground = true;
          player.options.double_jump = false;
          player.real_time = 0;
          player.friction=0
        },
        (solid = true)
      );
    }
  };
  for (let i = 0; i < colliders.length; i++) {
    let c = colliders[i];
    ifs[c.shape.id](self,c)
  }

  if (
    (self.up && self.options.on_ground) ||
    (self.up && !self.options.double_jump && !self.options.on_ground)
  ) {
    self.speedy = self.dt * self.jump_force;
    if (self.up && !self.options.double_jump && !self.options.on_ground) {
      self.options.double_jump = true;
    }
  }
  if (self.down) {
    //new_y = self.y + speed;
  }
  if (self.right) {
    self.speedx = self.speedx + self.dt * (self.options.on_ground ? self.ground_speed : self.air_speed);
  }
  if (self.left) {
    self.speedx =
      self.speedx + self.dt * (self.options.on_ground ? -self.ground_speed : -self.air_speed);
  }
  //on the air (gravity)
  if (!self.options.on_ground) {
    self.speedy = self.speedy + self.dt * self.gravity;
  } else {
    //x-axis drag on floor
    self.speedx = self.speedx + -self.speedx * self.friction;
  }

  //console.log(self.speedy)

  self.move(self.x + self.dt * self.speedx, self.y + self.dt * self.speedy);
  document.getElementById("player_eye").style.height = `${
    20 * (1 - Math.sin(real_time) ** 100)
  }px`;
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
//blocks------------
function createGreenBlock(x, y) {
  let block = new Object().append(
    createSquare(x, y, 100, 100, "rgb(0,255,0,1)", "green_block")
  );
  //block.shape.style.border = "2px solid white";
  //block.appendChild(new createHotDog(-10, -10, 120, 20, "rgb(255,255,255,1)"));
  colliders.push(block);
  return block;
}
function createSolidStone(x, y) {
  let block = new Object().append(
    createSquare(x, y, 100, 100, "hsl(0, 0%, 79%)", "solid_stone_block")
  );
  //block.shape.style.border = "2px solid white";
  //block.appendChild(new createHotDog(-10, -10, 120, 20, "rgb(255,255,255,1)"));
  colliders.push(block);
  return block;
}
function createWaterBlock(x, y) {
  let block = new Object().append(
    createSquare(x, y, 100, 100, "hsl(194, 100%, 50%)", "water")
  );
  //block.shape.style.border = "2px solid white";
  //block.appendChild(new createHotDog(-10, -10, 120, 20, "rgb(255,255,255,1)"));
  colliders.push(block);
  return block;
}
function createSandBlock(x, y) {
  let block = new Object().append(
    createSquare(x, y, 100, 100, "hsl(49, 100%, 50%)", "sand")
  );
  //block.shape.style.border = "2px solid white";
  //block.appendChild(new createHotDog(-10, -10, 120, 20, "rgb(255,255,255,1)"));
  colliders.push(block);
  return block;
}
function createCloudBlock(x, y) {
  let block = new Object().append(
    createSquare(x, y, 100, 100, "hsl(194, 100%, 98%)", "cloud")
  );
  //block.shape.style.border = "2px solid white";
  //block.appendChild(new createHotDog(-10, -10, 120, 20, "rgb(255,255,255,1)"));
  colliders.push(block);
  return block;
}
function createIceBlock(x, y) {
  let block = new Object().append(
    createSquare(x, y, 100, 100, "hsl(178, 100%, 74%)", "ice")
  );
  block.shape.style.border = "2px solid white";
  let ice_reflection=new createHotDog(20, 40, 70, 20, "rgb(255,255,255,1)")
  ice_reflection.style.transform=`rotate(${-45}deg)`
  block.appendChild(ice_reflection);
  colliders.push(block);
  return block;
}
function createTextBlock(x, y) {
  let block = new Object().append(
    createSquare(x, y, 100, 100, "hsl(0, 0%, 79%)", "solid_stone_block")
  );
  block.shape.style.border = "2px solid white";
  //block.appendChild(new createHotDog(-10, -10, 120, 20, "rgb(255,255,255,1)"));
  colliders.push(block);
  return block;
}
function handleMapCreation() {
  let map = JSON.parse(localStorage["platform game"]);

  let ifs = {
    green_block: (x, y) => {
      createGreenBlock(x, y);
    },
    solid_stone_block: (x, y) => {
      createSolidStone(x, y);
    },
    water: (x, y) => {
      createWaterBlock(x, y);
    },
    sand: (x, y) => {
      createSandBlock(x, y);
    },
    cloud: (x, y) => {
      createCloudBlock(x, y);
    },
    ice:(x,y)=>{
      createIceBlock(x,y)
    }
  };
  for (key in map) {
    ifs[map[key].object_code](map[key].x, map[key].y);
  }
}
function init() {
  document.body.style.background =
    "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,241,255,1) 100%) fixed";
  document.body.style.overflow = "hidden";
  document.body.style.height = "200000px";
  document.body.style.width = "2000000px";

  let length = 100;
  let box_size = 20;
  let c;
  let direction = Math.random() > 0.5;
  let challenges = {
    normal: {
      0: (c, right) => {
        let next_x_position_block = 0;
        if (right) {
          next_x_position_block = 200;
        } else {
          next_x_position_block = -200;
        }
        let nc = createGreenBlock(c.x + next_x_position_block, c.y - 100);
        colliders.push(nc);
        return nc;
      },
      1: (c, right) => {
        let next_x_position_block = 0;
        if (right) {
          next_x_position_block = 400;
        } else {
          next_x_position_block = -400;
        }
        let nc = new Object().append(
          createSquare(
            c.x + next_x_position_block,
            c.y - 100,
            length,
            length,
            "rgb(0,0,0,1)"
          )
        );
        nc.shape.style.border = "2px solid white";
        colliders.push(nc);
        return nc;
      },
      2: (c, right) => {
        let next_x_position_block = 0;
        if (right) {
          next_x_position_block = 300;
        } else {
          next_x_position_block = -300;
        }
        let nc = new Object().append(
          createSquare(
            c.x + next_x_position_block,
            c.y,
            length,
            length,
            "rgb(0,0,0,1)"
          )
        );
        nc.shape.style.border = "2px solid white";
        colliders.push(nc);
        return nc;
      },
    },
    change_direction: {
      0: (c, right) => {
        let nc;
        if (right) {
          nc = new Object().append(
            createSquare(c.x - 200, c.y - 100, length, length, "rgb(0,0,0,1)")
          );
          nc.shape.style.border = "2px solid white";
          colliders.push(nc);
          nc = new Object().append(
            createSquare(c.x + 200, c.y - 100, length, length, "rgb(0,0,0,1)")
          );
          nc.shape.style.border = "2px solid white";
          colliders.push(nc);
        } else {
          nc = new Object().append(
            createSquare(c.x + 200, c.y - 100, length, length, "rgb(0,0,0,1)")
          );
          nc.shape.style.border = "2px solid white";
          colliders.push(nc);
          nc = new Object().append(
            createSquare(c.x - 200, c.y - 100, length, length, "rgb(0,0,0,1)")
          );
          nc.shape.style.border = "2px solid white";
          colliders.push(nc);
        }

        return nc;
      },
    },
  };
  if(localStorage["platform game"]!=undefined){
    handleMapCreation()
  }else{
    //make ground
    for (i = -50; i < 50; i++) {
      c = createGreenBlock(player.x + i * length, player.y + player.height);
      colliders.push(c);
    }
  
    c = new Object().append(
      createSquare(player.x + 200, player.y - 100, length, length, "rgb(0,0,0,1)")
    );
    c.shape.style.border = "2px solid white";
    colliders.push(c);
  
    for (i = 0; i < 100; i++) {
      let random = Math.floor(Math.random() * 3);
      let change_direction = Math.random() > 0.8;
      if (change_direction) {
        direction = !direction;
        let nc = challenges["change_direction"][0](c, direction);
        c = nc;
      } else {
        let nc = challenges["normal"][random](c, direction);
        c = nc;
      }
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
