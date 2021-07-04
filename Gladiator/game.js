let state="start game"
let ball=new Object()
ball.append(createCircle("100px","100px","100px","rgb(50,50,50)")).show()

let state_machine = {
  "start game": new State(
    "start game",
    () => {
      console.log("Game sStarts!!!!\n Qait 3 sec\nrealtime="+game.real_time);
      //ball.velocity(100,100,1000,300,game.real_time,3)
     ball.accelaration(1000,100,game.real_time,3)
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
      //ball.velocity(1000,300,100,100,game.real_time,3)
      ball.accelaration(100,100,game.real_time,3)
    },
    () => {
      setTimeout(() => {
        state="3";
      }, 3000);
      return "wait";
    }
  ),
  3: new State(
    "3",
    () => {
      ball.accelaration(100,700,game.real_time,3)
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
      ball.accelaration(900,700,game.real_time,3)
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
