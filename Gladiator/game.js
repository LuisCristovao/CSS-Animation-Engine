let state="start game"
let ball=new Object()
ball.append(createCircle("100px","100px","100px","rgb(50,50,50)")).show()
let state_machine = {
  "start game": new State(
    "start game",
    () => {
      console.log("Game sStarts!!!!\n Qait 3 sec\nrealtime="+game.real_time);
      ball.move(100,100,300,300,game.real_time,3)
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
      console.log("STATE 222222222 !!!!\n Wait 3 sec\nrealtime="+game.real_time);
      ball.move(300,300,100,100,game.real_time,3)
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
