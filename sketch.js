var playerImage,player;
var enemysGroup,enemy1,enemy2;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, restart;


function preload(){

playerImage = loadImage("player.png")
enemy1 = loadImage("enemy1.png")
enemy2 = loadImage("enemy4.png")

backgroundImage = loadImage("background1.jpg")

}


function setup() {
  createCanvas(displayHeight,displayWidth);
  player = createSprite(400, 750);
  player.addImage(playerImage);
  player.scale = 0.5

 

 enemysGroup = new Group();

}

function draw() {
  background(backgroundImage);  
  text("Score: "+ score, 500,50);

    
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
  
    if(keyDown("LEFT_ARROW") ) {
      player.velocityX = -5;
    }
  
    if(keyDown("RIGHT_ARROW") ) {
      player.velocityX = +5;
    }
  
   spawnenemys();
  
    if(enemysGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    
    
    player.velocityX = 0;
    enemysGroup.setVelocityXEach(0);
    
    
    //set lifetime of the game objects so that they are never destroyed
    enemysGroup.setLifetimeEach(-1);
    
    
  }

  drawSprites();
}

function spawnenemys() {
  if(frameCount % 60 === 0) {
    enemy = createSprite(random(100, 1000), 0, 100, 100);
   
    enemy.velocityY = (6 + 3*score/100);
    
    //generate random enemys
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: enemy.addImage(enemy1);
              break;
      case 2: enemy.addImage(enemy2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the enemy           
    enemy.scale = 0.4;
    enemy.lifetime = 300;
    //add each enemy to the group
    enemysGroup.add(enemy);
  }
}

