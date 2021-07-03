//State Machine Class
class StateMachine {
  constructor(state_machine, initial_state) {
    this.state = initial_state;
    this.state_machine = state_machine;
  }
  execute = (state) => {
    state_machine[state].play();
    this.state = state_machine[state].next();
  };
  start = () => {
    requestAnimationFrame(this.run);
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
