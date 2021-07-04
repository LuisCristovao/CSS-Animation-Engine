let state="start game"
let ball=new Object()
ball.append(createSquare(100, 100, 200, 200, "rgb(100,255,100)","x")).show()
let ball2=new Object()
ball2.append(createText("Ola Pedro!","position:absolute;left:100px;top:100px;font-size:2em;color:rgb(0,0,255)")).show()
let state_machine = {
  "start game": new State(
    "start game",
    () => {
      console.log("Game sStarts!!!!\n Qait 3 sec\nrealtime="+game.real_time);
     let new_width=ball.velocity(600,parseInt(ball.shape.style.width),game.real_time,3) 
     let new_height=ball.velocity(600,parseInt(ball.shape.style.height),game.real_time,3) 
     ball.shape.style.width=new_width
     ball.shape.style.height=new_height
     ball.rotateAcc(180,game.real_time,3)
     ball2.accelarationMove(900,100,game.real_time,3)
     let new_size=ball2.velocity(2,parseInt(ball2.shape.style["font-size"].split("em")[0]),game.real_time,3)
      ball2.shape.style["font-size"]=`${new_size}em`
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
      let new_width=ball.velocity(200,parseInt(ball.shape.style.width),game.real_time,3) 
      let new_height=ball.velocity(200,parseInt(ball.shape.style.width),game.real_time,3) 
      ball.shape.style.width=new_width
      ball.shape.style.height=new_height
      ball.rotateAcc(0,game.real_time,3)
      let new_size=ball2.velocity(6,parseInt(ball2.shape.style["font-size"].split("em")[0]),game.real_time,3)
      ball2.shape.style["font-size"]=`${new_size}em`
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
