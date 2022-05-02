let real_time=0
let time=new Date().getTime()
let dt=0
let ground=new Object()
let fire=new Object()
let fire2=new Object()
let fire3=new Object()
let fire_light=new Object()

fire.append(createCircle(100 ,300, 100, "hsl(46,100%,50%,1)", "fire"))
fire2.append(createCircle(100 ,300, 100, "hsl(46,100%,50%,1)", "fire2"))
fire3.append(createCircle(100 ,300, 100, "hsl(46,100%,50%,1)", "fire3"))
fire_light.append(createDiffCircle(300 ,500, 500,300, "hsl(46,100%,50%,0.3)", "light"))
ground.append(createSquare(0,500,1800,500,"hsl(129,100%,17%)","ground"))
//Main-----
ground.show()
fire.show()
fire2.show()
fire3.show()
fire_light.show()
document.body.style.backgroundColor="hsl(0,50%,5%)"
function Main(){
  dt = (new Date().getTime() - time) * 1e-3;
  real_time+=dt
  // Do stuff here -----
  fire.setColor([(fire.color[0]-Math.sin(3*real_time))%360,fire.color[1],fire.color[2],1])
  fire2.setColor([(fire.color[0]-Math.sin(3*real_time))%360,fire.color[1],fire.color[2],1])
  fire3.setColor([(fire.color[0]-Math.sin(3*real_time))%360,fire.color[1],fire.color[2],1])
  fire_light.setColor([(fire_light.color[0]-Math.sin(3*real_time))%360,fire_light.color[1],fire_light.color[2],0.5])
  //console.log("Math.sin(20*real_time)*2")
  fire.goToPosition(100,300,1500,300,real_time,4)
  fire2.goToPosition(100,300,1500,300,real_time,4.1)
  fire3.goToPosition(100,300,1500,300,real_time,4.2)
  //fire.velocityMove(2,0)
  //fire_light.velocityMove(2,0)
  //fire.move(fire.x+Math.cos(2*real_time)*10,fire.y-Math.cos(4*real_time)*2.5)

  //fire_light.move(fire_light.x+Math.cos(2*real_time)*10)

  //----------------------
  time= new Date().getTime() 
  requestAnimationFrame(Main)
}
requestAnimationFrame(Main)