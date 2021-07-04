let state="start game"
let ninja1 = new Object();
let ninja2 = new Object();
ninja1.append(
      createSquare("300px", "100px", "100", "200", "rgb(12,100,200)", "ninja")
    ).show()
    .appendChild(createSquare("60", "30", "30", "30", "lightgreen", "left eye"));
ninja2
.append(
  createSquare("300px", "500px", "100", "200", "rgb(220,100,100)", "ninja2")
).show()
.appendChild(createSquare("60", "30", "30", "30", "yellow", "left eye2"));
let state_machine = {
  "start game": new State(
    "start game",
    () => {
      console.log("Game sStarts!!!!\n Qait 3 sec\nrealtime="+game.real_time);
     ninja1.shape.style.height=`${
       step(game.real_time % 3, 0, 1.5)*linear_motion(200,190,game.real_time,1.5)
      +step(game.real_time % 3, 1.5, 3)*linear_motion(190,200,game.real_time,1.5)
    }px`
    ninja1.shape.style.top=`${
      step(game.real_time % 3, 0, 1.5)*linear_motion(100,110,game.real_time,1.5)
     +step(game.real_time % 3, 1.5, 3)*linear_motion(110,100,game.real_time,1.5)
   }px`

   

  ninja2.shape.style.height=`${
    step(game.real_time % 3, 0, 1.5)*linear_motion(200,180,game.real_time,1.5)
   +step(game.real_time % 3, 1.5, 3)*linear_motion(180,200,game.real_time,1.5)
  }px`
 ninja2.shape.style.top=`${
   step(game.real_time % 3, 0, 1.5)*linear_motion(500,520,game.real_time,1.5)
  +step(game.real_time % 3, 1.5, 3)*linear_motion(520,500,game.real_time,1.5)
  }px`
    },
    () => {
      setTimeout(() => {
        state="2";
      }, 6000);
      return "wait";
    }
  ),
  2: new State(
    "2",
    () => {
      console.log("STATE 222222222 !!!!\n Wait 3 sec\nrealtime="+game.real_time);
      
    },
    () => {
      setTimeout(() => {
        state="start game";
      }, 3000);
      return "wait";
    }
  ),
  3: new State(
    "3",
    () => {
    },
    () => {
      setTimeout(() => {
        state="4";
      }, 3000);
      return "wait";
    }
  ),
  4: new State(
    "4",
    () => {
     
    },
    () => {
      setTimeout(() => {
        state="start game";
      }, 3000);
      return "wait";
    }
  ),
  wait: new State(
    "wait",
    () => {
      //does nothing
    },
    () => {
      //does nothing
      return state;
    }
  ),
};

//Main-----
let game = new StateMachine(state_machine, "start game");
game.start();
