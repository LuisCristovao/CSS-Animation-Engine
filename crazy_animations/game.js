let real_time = 0;
let time = new Date().getTime();
let dt = 0;
let n_particles=300
let x_equation=`x-2*sin(1*(100*(t/(i*0.2))-0.3*i))`
let y_equation=`y-2*cos(1*(100*(t/(i*0.2))-0.3*i))`
let color_equation=`color-10*sin(0.2*(2*t)-i)`
let particles = [];
let animtion_id=0
let menu_on=false
function initSite(){
  if(window.location.search!=''){
    
  }
  document.body.style.backgroundColor = "hsl(0,50%,5%)";
  exitMenu()
  RunAnimation()
}
function Menu(){
  menu_on=true
  //cancelAnimation()
  let html=`<pre style="color:white">x = x position \ny = y position \nt = time\ncolor = particle color(hue) \ni = particle number</pre>`
  html+=`<input oninput="changeXequation(this.value)" type="text" placeholder="Input X Equation"  value="${x_equation}"><br>`
  html+=`<input oninput="changeYequation(this.value)" type="text" placeholder="Input Y Equation"  value="${y_equation}"><br>`
  html+=`<input oninput="changeColorequation(this.value)" type="text" placeholder="Input Color Equation"  value="${color_equation}"><br>`
  html+=`<input oninput="changeNumberOfParticles(this.value)" type="number" placeholder="Number of Particles" value="${n_particles}"><br>`
  html+=`<button onclick="exitMenu()">Exit Menu</button>`
  document.body.innerHTML=html
  createParticles()

}
function exitMenu(){
  document.body.innerHTML=`<p style="color:white;cursor:pointer" onclick="Menu()">Menu</p>`
  createParticles()
}
function changeNumberOfParticles(new_n_particles){
  deleteParticles()
  n_particles=new_n_particles
  createParticles()
}
function changeXequation(new_equation){
  deleteParticles()
  x_equation=new_equation
  createParticles()
}
function changeYequation(new_equation){
  deleteParticles()
  y_equation=new_equation
  createParticles() 
}
function changeColorequation(new_equation){
  deleteParticles()
  color_equation=new_equation
  createParticles() 
}
function transformEquation(equation){
  return equation
  .replaceAll("t","particles[i].real_time")
  .replaceAll("x","particles[i].x")
  .replaceAll("y","particles[i].y")
  .replaceAll("sin","Math.sin")
  .replaceAll("cos","Math.cos")
  .replaceAll("color","particles[i].color[0]")
}
function createParticles(){
  for (i = 0; i <n_particles; i++) {
    particles[i] = new Object();
    particles[i].append(
      createDiffCircle(Math.floor(window.innerWidth/2), Math.floor(window.innerHeight/2), 10, 10, "rgba(255,200,0,1)", "fire")
    );
    particles[i].appendAnimation(() => {
      try{
        eval(`particles[i].move(${transformEquation(x_equation)},${transformEquation(y_equation)})`)
      }catch(error){
        console.log(error)
      }
      try{
        eval(`particles[i].setColor([${transformEquation(color_equation)},particles[i].color[1],particles[i].color[2],1])`)
      }catch(error){
        console.log(error)
      }
      //particles[i].move(particles[i].x-2*Math.sin(1*(100*(particles[i].real_time/(i*0.2))-0.3*i)),particles[i].y-2*Math.cos((1)*(100*(particles[i].real_time/(i*0.2))-0.3*i)))
      //particles[i].setColor([particles[i].color[0]-10*Math.sin(0.2*(2*particles[i].real_time)-i),particles[i].color[1],particles[i].color[2],1]);
    });
    
  }
}
function deleteParticles(){
  for (i = 0; i <n_particles; i++){
    particles[i].destroy()
  }
  particles = []
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


function arrayRemove(arr, index) {
  return arr.filter((ele, i) => {
    return i !== index;
  });
}

function RunAnimation(){
  menu_on=false
  animtion_id=window.requestAnimationFrame(Main);
}
function cancelAnimation(){
  window.cancelAnimationFrame(animtion_id)
}
//Main-----

function Main() {
  //if (menu_on==false){

    dt = (new Date().getTime() - time) * 1e-3;
    real_time += dt;
    // Do stuff here -----
    for (i = 0; i < n_particles; i++) {
      particles[i].play();
      
    }
  
    //----------------------
    time = new Date().getTime();
    animation_id=window.requestAnimationFrame(Main);
  //}
}
initSite()
//requestAnimationFrame(Main);