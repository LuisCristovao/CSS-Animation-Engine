let timer=0
let ninja1 = new Object();
let ninja2 = new Object();
let power=new Object()

power.append(createSquare("400px","135px","100","100","red","power"))
ninja1.append(
      createSquare("300px", "100px", "100", "200", "rgb(12,100,200)", "ninja")
    ).show()
    .appendChild(createSquare("60", "30", "30", "30", "lightgreen", "eye1"));
ninja2
.append(
  createSquare("300px", "500px", "100", "200", "rgb(220,100,100)", "ninja2")
).show()
.appendChild(createSquare("60", "30", "30", "30", "yellow", "eye2"));
let state_machine = {
  "start game": new State(
    "start game",
    () => {
      
      //clearTimeout(timer_id)
      console.log("start game");
     ninja1.shape.style.height=
       step(game.real_time % 3, 0, 1.5)*linear_motion(200,190,game.real_time,1.5)
      +step(game.real_time % 3, 1.5, 3)*linear_motion(190,200,game.real_time,1.5)
    
    ninja1.shape.style.top=`${
      step(game.real_time % 3, 0, 1.5)*linear_motion(100,110,game.real_time,1.5)
     +step(game.real_time % 3, 1.5, 3)*linear_motion(110,100,game.real_time,1.5)
   }px`
  
  /* eye1.style.height=step(game.real_time % 3,0,1)*30 +
  step(game.real_time % 3,1,1.25)*linear_motion(30,0,game.real_time,3) +
  step(game.real_time % 3,1.25,1.5)*linear_motion(0,30,game.real_time,3)+
  step(game.real_time % 3,1.5,3)*30 */



  ninja2.shape.style.height=`${
    step(game.real_time % 3, 0, 1.5)*linear_motion(200,190,game.real_time,1.5)
   +step(game.real_time % 3, 1.5, 3)*linear_motion(190,200,game.real_time,1.5)
  }px`
 ninja2.shape.style.top=`${
   step(game.real_time % 3, 0, 1.5)*linear_motion(500,510,game.real_time,1.5)
  +step(game.real_time % 3, 1.5, 3)*linear_motion(510,500,game.real_time,1.5)
  }px`
    },
    () => {
      
      if(game.real_time>timer+3){
        return "2"
      }
      return "start game";
    }
  ),
  2: new State(
    "2",
    () => {
      
      console.log("2");
      power.destroy()
      power.append(createSquare("400px","135px","100","100","red","power")).show()
      //clearTimeout(timer_id)
      //power.shape.style.border="darkblue solid 10px"
      
    },
    () => {
      timer=game.real_time
      return "3"
    }
  ),
  3: new State(
    "3",
    () => {
      
      console.log("3");
      ninja1.shape.style.height=
       step(game.real_time % 3, 0, 1.5)*linear_motion(200,190,game.real_time,1.5)
      +step(game.real_time % 3, 1.5, 3)*linear_motion(190,200,game.real_time,1.5)
    
    ninja1.shape.style.top=
      step(game.real_time % 3, 0, 1.5)*linear_motion(100,110,game.real_time,1.5)
     +step(game.real_time % 3, 1.5, 3)*linear_motion(110,100,game.real_time,1.5)

     ninja2.shape.style.height=
      step(game.real_time % 3, 0, 1.5)*linear_motion(200,190,game.real_time,1.5)
     +step(game.real_time % 3, 1.5, 3)*linear_motion(190,200,game.real_time,1.5)
    
   ninja2.shape.style.top=
     step(game.real_time % 3, 0, 1.5)*linear_motion(500,510,game.real_time,1.5)
    +step(game.real_time % 3, 1.5, 3)*linear_motion(510,500,game.real_time,1.5)
    
      power.rotateVel(0,1080,game.real_time,3)
      power.shape.style.left=step(game.real_time % 3, 0, 1)*400+
      step(game.real_time % 3, 1, 3)*linear_motion(400,900,game.real_time,2)

      power.shape.style.top=step(game.real_time % 3, 0, 1)*135+
      step(game.real_time % 3, 1, 3)*linear_motion(135,700,game.real_time,2)
    },
    () => {
      if(game.real_time>timer+2.9){
        return "4"
      }
      return "3";
    }
  ),
  4: new State(
    "4",
    () => {
    
      timer=game.real_time
      console.log("4");
      power.destroy()
    },
    () => {
      
      
      return "start game";
    }
  ),
  wait: new State(
    "wait",
    () => {
      //does nothing
      console.log("wait")
    },
    () => {
      //does nothing
      if(game.real_time>5){
        return "2"
      }
      return "wait";
    }
  ),
};

//Main-----
let game = new StateMachine(state_machine, "start game");
game.start();
