const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var blinking_rabbit;
var depressed_rabbit;
var eating_rabbit;

var button;
var bunny;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  blinking_rabbit = loadAnimation('blink_1.png','blink_2.png','blink_3.png');
  depressed_rabbit = loadAnimation('sad_1.png','sad_2.png','sad_3.png');
  eating_rabbit = loadAnimation('eat_1.png','eat_2.png','eat_3.png','eat_4.png');
  
  
 blinking_rabbit.playing = true;
 eating_rabbit.playing = true;
 eating_rabbit.looping = false;
 blinking_rabbit.looping  = false;
 blinking_rabbit.frameDelay = 5;
 eating_rabbit.frameDelay = 5;
 depressed_rabbit.frameDelay = 5;

}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);


  bunny = createSprite(230,620,100,100);
  bunny.addAnimation('blinking',blinking_rabbit);
  bunny.addAnimation('eating',eating_rabbit);
  bunny.addAnimation('chronic depression',depressed_rabbit);
  bunny.changeAnimation('blinking');
  
  bunny.scale = 0.2;
  

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  image(food,fruit.position.x,fruit.position.y,70,70);

  rope.show();
  Engine.update(engine);
  ground.show();

  

    if(fruit!==null){

      image(fruit,fruit.position.x,fruit.position.y,50,50)
    }
  
  if(detect_collision(bunny,fruit) == true) {

    bunny.changeAnimation('eating');

  

  }

  if(detect_collision(fruit,ground) == true){

    bunny.changeAnimation('chronic depression');
  }

  drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function detect_collision (body,sprite){

  if(body != null){

    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d < 80){
      World.remove(engine.world,fruit);
      fruit = null;

      return true;

      
    }

    else{
return false;
    }
  }
}

// distance  = 80 here
//true removes fruit from world and false will keep fruit
//return is responsible for event
//computer only knows true false 