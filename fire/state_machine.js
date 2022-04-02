//State Machine Class
class StateMachine {
  constructor(state_machine, initial_state) {
    this.state = initial_state;
    this.state_machine = state_machine;
    this.time= new Date().getTime() ;
    this.real_time=0
  }
  execute = (state) => {
    this.dt = (new Date().getTime() - this.time) * 1e-3;
    this.real_time+=this.dt
    state_machine[state].play();
    this.state = state_machine[state].next();
    this.time= new Date().getTime()  
  };
  start = () => {
    this.run()
  };
  run = () => {
    this.execute(this.state);
    requestAnimationFrame(this.run);
  };
}
//State class
class State {
  constructor(state_id, action, next_state) {
    this.state_id = state_id;
    this.action = action;
    this.next_state = next_state;
  }

  id = () => {
    return this.state_id;
  };
  play = () => {
    this.action();
  };
  next = () => {
    return this.next_state();
  };
}
