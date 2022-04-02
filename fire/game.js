let real_time=0
let time=new Date().getTime()
let dt=0
let ground=new Object()
let fire=new Object()
let fire_light=new Object()

fire.append(createCircle(500 ,300, 100, "hsl(46,100%,50%,1)", "fire"))
fire_light.append(createDiffCircle(300 ,500, 500,300, "hsl(46,100%,50%,0.3)", "light"))
ground.append(createSquare(0,500,1800,500,"hsl(129,100%,17%)","ground"))
//Main-----
ground.show()
fire.show()
fire_light.show()
document.body.style.backgroundColor="hsl(0,50%,5%)"
function Main(){
  dt = (new Date().getTime() - time) * 1e-3;
  real_time+=dt
  // Do stuff here -----
  fire.setColor([(fire.color[0]-Math.sin(3*real_time))%360,fire.color[1],fire.color[2]])
  fire_light.setColor([(fire_light.color[0]-Math.sin(3*real_time))%360,fire_light.color[1],fire_light.color[2]])
  //console.log("Math.sin(20*real_time)*2")


  //----------------------
  time= new Date().getTime() 
  requestAnimationFrame(Main)
}
requestAnimationFrame(Main)