let real_time = 0;
let time = new Date().getTime();
let dt = 0;
let ground = new Object();
//let fire=new Object()
//let fire_light=new Object()
let objects = [];
let objects2 = [];
let tmp = null;
function arrayRemove(arr, index) {
  return arr.filter((ele, i) => {
    return i !== index;
  });
}
let state_machine = {};

state_machine["creation_phase"] = new State(
  "creation_phase",
  () => {
    console.log(state_machine["creation_phase"].id() + ":" + state_machine["creation_phase"].real_time);
    tmp = new Object();
    objects.push(
      tmp
        .append(
          createCircle(
            100,
            300,
            100,
            `hsl(${10 + parseInt(Math.random() * 30)},100%,50%,1)`,
            "fire"
          )
        )
        .show()
    );
    tmp = new Object();
    objects2.push(
      tmp
        .append(
          createCircle(
            100,
            300,
            100,
            `hsl(${10 + parseInt(Math.random() * 30)},100%,50%,1)`,
            "fire"
          )
        )
        .show()
    );
  },
  () => {
    if (state_machine["creation_phase"].real_time > 1 ) {
      state_machine["creation_phase"].real_time=0
      state_machine["animation"].time=new Date()
      return "animation";
    }
    return "creation_phase";
  }
);
state_machine["animation"] = new State(
  "animation",
  () => {
    console.log(state_machine["animation"].id() + ":" + state_machine["animation"].real_time);
    objects.forEach((object, index) => {
      setTimeout(() => {
        object.velocityMove(10, 0);
        let y = parseInt(object.shape.style.top);
        object.shape.style.top =
          y + Math.cos(10 * real_time - index * 0.5) * 100;
      }, 100 * index);
    });
    objects2.forEach((object, index) => {
      setTimeout(() => {
        object.velocityMove(10, 0);
        let y = parseInt(object.shape.style.top);
        object.shape.style.top =
          y + Math.cos(10 * real_time - index * 0.5 - 2.3) * 100;
      }, 100 * index);
    });
  },
  () => {
    if (state_machine["animation"].real_time > 5 ) {
      state_machine["animation"].real_time=0
      state_machine["delete_phase"].time=new Date()
      return "delete_phase";
    }
    return "animation";
  }
);
state_machine["delete_phase"] = new State(
  "delete_phase",
  () => {
    console.log(state_machine["delete_phase"].id() + ":" + state_machine["delete_phase"].real_time);
    objects.forEach((object, index) => {
      object.destroy();
      objects = arrayRemove(objects, index);
    });
    objects2.forEach((object, index) => {
      object.destroy();
      objects = arrayRemove(objects, index);
    });
  },
  () => {
    if (state_machine["delete_phase"].real_time > 5) {
      state_machine["delete_phase"].real_time=0
      state_machine["creation_phase"].time=new Date()
      return "creation_phase";
    }
    return "delete_phase";
  }
);
let game=new StateMachine(state_machine,"creation_phase")
//Main-----
document.body.style.backgroundColor = "hsl(0,50%,5%)";
function Main() {
  dt = (new Date().getTime() - time) * 1e-3;
  real_time += dt;
  // Do stuff here -----

  /* if (real_time >= 1 && real_time <= 1.5) {
    tmp = new Object();
    objects.push(
      tmp
        .append(
          createCircle(
            100,
            300,
            100,
            `hsl(${10 + parseInt(Math.random() * 30)},100%,50%,1)`,
            "fire"
          )
        )
        .show()
    );
    tmp = new Object();
    objects2.push(
      tmp
        .append(
          createCircle(
            100,
            300,
            100,
            `hsl(${10 + parseInt(Math.random() * 30)},100%,50%,1)`,
            "fire"
          )
        )
        .show()
    );
  }
  if (real_time >= 5 && real_time <= 5.1) {
    objects.forEach((object, index) => {
      object.destroy();
      objects = arrayRemove(objects, index);
    });
    objects2.forEach((object, index) => {
      object.destroy();
      objects = arrayRemove(objects, index);
    });
  }
  if (real_time > 1.5) {
    objects.forEach((object, index) => {
      setTimeout(() => {
        object.velocityMove(10, 0);
        let y = parseInt(object.shape.style.top);
        object.shape.style.top =
          y + Math.cos(10 * real_time - index * 0.5) * 100;
      }, 100 * index);
    });
    objects2.forEach((object, index) => {
      setTimeout(() => {
        object.velocityMove(10, 0);
        let y = parseInt(object.shape.style.top);
        object.shape.style.top =
          y + Math.cos(10 * real_time - index * 0.5 - 2.3) * 100;
      }, 100 * index);
    });
  } */

  //----------------------
  time = new Date().getTime();
  requestAnimationFrame(Main);
}
//requestAnimationFrame(Main);
game.start()
/* state_machine["1"]=new State(
    "1",
    () => {
      console.log("ola:"+state_machine["1"].real_time);
    },
    () => {
      if(state_machine["1"].real_time<3){
        return "1"
      }
      state_machine["1"].real_time=0
      return "2";
    }
  )
  state_machine["2"]=new State(
    "2",
    ()=>{
      console.log("ssss")
    },
    ()=>{
      return "1"
    }
  )
let game=new StateMachine(state_machine,"1")
game.start() */

