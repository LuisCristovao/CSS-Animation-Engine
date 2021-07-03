let state="start game"

let state_machine = {
  "start game": new State(
    "start game",
    () => {
      console.log("Game sStarts!!!!\n Qait 3 sec");
    },
    () => {
      setTimeout(() => {
        state="2";
      }, 3000);
      return "wait";
    }
  ),
  2: new State(
    "2",
    () => {
      console.log("STATE 222222222 !!!!\n Wait 3 sec");
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
