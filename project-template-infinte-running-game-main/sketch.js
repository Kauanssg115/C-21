var esqueleto, heman, greiscow;
var esqueletoImg, hemanImg, greiscowImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var gameOverImg, gameOver, restartImg, restart;
var invisibleGround, ground, groundImg
var cloudsGroup, cloudImage;
function preload(){
esqueletoImg = loadImage("esqueleto.jpg");
hemanImg = loadImage("he man.png");
greiscowImg = loadImage("greiscow.jpg");
gameOverImg = loadImage("game-over.jpg");
restartImg = loadImage("restart.jpg");
groundImg = loadImage("ground2.png")
cloudImage = loadImage("clouds.png");
}

function setup() {
 createCanvas(windowWidth, windowHeight);
 ground = createSprite(200,180,400,20);
  ground.addImage(groundImg);
  ground.x = ground.width /2;
 var heman = createSprite(50,160,20,50);
 heman.addImage(hemanImg);
var gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);
var restart = createSprite(300,140);
restart.addImage(restartImg);
gameOver.scale = 0.5;
restart.scale = 0.5;
invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  heman.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = true
  cloudsGroup = createGroup();

  score = 0;
}

function draw() {
    text("Pontuação: "+ score, 500,50);
    if(gameState === PLAY){

      gameOver.visible = false;
      restart.visible = false;
      
      ground.velocityX = -(4 + 3* score/100)
      score = score + Math.round(getFrameRate()/60);
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      if(keyDown("space")&& heman.y >= 100) {
        heman.velocityY = -12;
    }
    heman.velocityY = heman.velocityY + 0.8
    spawnClouds();
    if(esqueleto).isTouching(heman)){
    gameState = END;
    }

 else if (gameState === END) {
 gameOver.visible = true;
 restart.visible = true;
 ground.velocityX = 0;
 heman.velocityY = 0
 cloudsGroup.setLifetimeEach(-1);
 cloudsGroup.setVelocityXEach(0);
 }
 heman.collide(invisibleGround);
 if(mousePressedOver(restart)) {
  reset();
 }
 drawSprites();
}
function reset(){
  gameState = PLAY;
  esqueleto.destroyEach();
  cloudsGroup.destroyEach();
}
function spawnClouds() {
  if (frameCount % 60 === 0) {
    var clouds = createSprite(600,120,40,10);
    clouds.y = Math.round(random(80,120));
    clouds.addImage(cloudImage);
    clouds.scale = 0.5;
    clouds.velocityX = -3;
    clouds.lifetime = 200;
    clouds.depth = heman.depth;
    heman.depth = heman.depth + 1;
    cloudsGroup.add(clouds);
  }
}