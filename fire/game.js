let real_time=0
let time=new Date().getTime()
let dt=0
let ground=new Object()
//let fire=new Object()
//let fire_light=new Object()
let objects=[]
let tmp=null
function arrayRemove(arr, index) { 
    
  return arr.filter((ele,i)=>{ 
      return i !== index; 
  });
}
//fire.append(createCircle(100 ,300, 100, "hsl(46,100%,50%,1)", "fire"))

//fire_light.append(createDiffCircle(300 ,500, 500,300, "hsl(46,100%,50%,0.3)", "light"))
ground.append(createSquare(0,500,1800,500,"hsl(129,100%,17%)","ground"))
//Main-----
//ground.show()
//fire.show()

document.body.style.backgroundColor="hsl(0,50%,5%)"
function Main(){
  dt = (new Date().getTime() - time) * 1e-3;
  real_time+=dt
  // Do stuff here -----
  if(real_time>=1 && real_time<=1.1){
    tmp=new Object()
    objects.push(tmp.append(createCircle(100 ,300, 100, "hsl(46,100%,50%,1)", "fire")).show())
    
  }
  if(real_time>=5 && real_time<=5.1){
    objects.forEach((object,index)=>{
      object.destroy()
      objects=arrayRemove(objects,index)
      
    })
    
  }
  if(real_time>1.1){

    objects[0].goToPosition(100,300,1000,100,5)
    objects[1].velocityMove(3,0)
    objects[2].velocityMove(4,0)
    objects[3].goToPosition(100,300,1000,500,5)
  }
  /* if(real_time>=3 && real_time<=3.2){
    tmp=new Object()
    objects.push(tmp.append(createCircle(0 ,300, 100, "hsl(46,100%,50%,1)", "fire")).show())
    objects[0].velocityMove(2,0)
  } */
  //fire.velocityMove(2,0)
  //fire_light.velocityMove(2,0)
  //fire.move(fire.x+Math.cos(2*real_time)*10,fire.y-Math.cos(4*real_time)*2.5)

  //fire_light.move(fire_light.x+Math.cos(2*real_time)*10)

  //----------------------
  time= new Date().getTime() 
  requestAnimationFrame(Main)
}
requestAnimationFrame(Main)