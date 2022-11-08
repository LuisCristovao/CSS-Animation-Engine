let real_time = 0;
let time = new Date().getTime();
let dt = 0;

let player=new Object()
let speed=4
let up=false,down=false,right=false,left=false

let projectile_up=false


let ghost_colliders=[]

let colliders=[]

let projectiles=[]


ghost_colliders.push(new Object().append(createSquare(100, 100, 100, 100, "rgb(100,100,100,1)")))

ghost_colliders.push(new Object().append(createSquare(500, 500, 100, 100, "rgb(100,100,100,1)")))

colliders.push(new Object().append(createSquare(300, 200, 100, 100, "rgb(0,0,0,1)")))

player.append(createSquare(100, 100, 100, 100, "rgb(255,0,0,1)"))

player.appendAnimation((self)=>{
  let new_x=self.x;
  let new_y=self.y;

  self.up=false
  self.down=false
  self.left=false
  self.right=false

  if(up){
    self.up=true
  }
  if(down){
    self.down=true
  }
  if(right){
    self.right=true
  }
  if(left){
    self.left=true
  }
  for(let i=0;i<ghost_colliders.length;i++){
    let c=ghost_colliders[i]
    if((self.x+self.width>=c.x && self.x<=c.x+c.width) && (self.y+self.height>=c.y && self.y<=c.y+c.height) ){
      c.shape.style["background-color"]="rgba(0,255,0,1)"
      setTimeout(()=>{
        c.shape.style["background-color"]="rgba(100,100,100,1)"
      },100)
    }
  }
  for(let i=0;i<colliders.length;i++){
    let c=colliders[i]
    if( (self.x+self.width>=c.x && self.x<=c.x+c.width) && (self.y+self.height>=c.y && self.y<=c.y+c.height) ){
      c.shape.style["background-color"]="rgba(0,255,0,1)"
      setTimeout(()=>{
        c.shape.style["background-color"]="rgba(0,0,0,1)"
      },100)
      if(self.x-c.x<0){
        self.right = false;
      }
      if(self.x-c.x>0){
        self.left=false
      }
      if(self.y-c.y>0){
        self.up=false
      }
      if(self.y-c.y<0){
        self.down=false
      }
      
    }
  }
  if(projectile_up){
    let p=new Object().append(createSquare(self.x, self.y, 10, 10, "rgb(255,200,0,1)"))
    p.appendAnimation((self)=>{
      for(let i=0;i<ghost_colliders.length;i++){
        let c=ghost_colliders[i]
        if((self.x+self.width>=c.x && self.x<=c.x+c.width) && (self.y+self.height>=c.y && self.y<=c.y+c.height) ){
          c.shape.style["background-color"]="rgba(0,255,0,1)"
          setTimeout(()=>{
            p.destroy()
            c.shape.style["background-color"]="rgba(100,100,100,1)"
          },100)
        }
      }
      self.move(self.x,self.y-4)
    })
    projectiles.push(p)
  }
  if(self.up){
    new_y=self.y-speed
  }
  if(self.down){
    new_y=self.y+speed
  }
  if(self.right){
    new_x=self.x+speed
  }
  if(self.left){
    new_x=self.x-speed
  }
  self.move(new_x,new_y)
  
  //self.move(new_x,new_y)
  
})
document.addEventListener("keydown", press);
function press(e) {
  if ( e.keyCode === 87 /* w */) {
    up = true;
  }
  if ( e.keyCode === 68 /* d */) {
    right = true;
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
    down = true;
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
    left = true;
  }
  if (e.keyCode === 75 /*k key*/) {
    dodge = true;
    setTimeout(() => {
      dodge = false;
    }, 100);
  }
  if (e.keyCode === 38 /* up */ ) {
    projectile_up=true
  }
  if(e.keyCode === 39 /* right */ ){

  }
}
document.addEventListener("keyup", release);
function release(e) {
  if ( e.keyCode === 87 /* w */) {
    up = false;
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
    right = false;
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
    down = false;
  }
  if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */) {
    left = false;
  }
  if(e.keyCode === 75/*k key*/){
    dodge = false
  }
  if (e.keyCode === 38 /* up */ ) {
    projectile_up=false
  }
}



function cleanUnusedProjectiles(){
  let new_projectiles_array=[]
  projectiles.forEach(p=>{
    if(p.is_destroyed==false){
      new_projectiles_array.push(p)
    }
  })  
  return new_projectiles_array
}

function init(){
    

}

function main(){
  dt = (new Date().getTime() - time) * 1e-3;
  real_time += dt;
  player.play()
  projectiles.forEach(p=>{
    p.play()
  }) 
  if(real_time%10<0.3){
    projectiles=cleanUnusedProjectiles()
  }  
  time = new Date().getTime();
  requestAnimationFrame(main)
}
//Main ---
init()
main()