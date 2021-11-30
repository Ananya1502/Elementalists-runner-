var PLAY=1
var END =0
var gameState=PLAY;
var score = 0;

//defining variables
var path, pathImg
var BGM
var boy, boyImg
var spell1, spellImg1,spell2,spellImg2,spell3,spellImg3,spell4,spellImg4
var spellGrp,ObsGrp
var invisibleBoundary1, invisibleBoundary2
var gameOver, gameOverImg
var sword, swordImg
var restart,restartImg
var warning, warningImg


function preload(){
    pathImg = loadImage("path.png");
    BGM = loadSound("xyz.mp3");
    boyImg = loadAnimation("Runner1-main.png","runner2-main.png");
    
    spellImg1 = loadImage("spell1.png");
    spellImg2 = loadImage("spell2.png");
    spellImg3 = loadImage("spell3.png");
    spellImg4 = loadImage("spell4.png");

    swordImg = loadImage("knife.png");
    gameOverImg = loadImage("GAMEOVER.png");
    restartImg = loadImage("restart.png");
    

}

function setup() {
    createCanvas(400,400);
                  //
                  //create sprites here
                  path = createSprite(200,200,15,20)
                  path.addImage("road",pathImg);
                  
                  //creating boy sprite
                  boy = createSprite(200,350,10,10);
                  boy.addAnimation("running",boyImg);
                  boy.scale=0.05
                  boy.setCollider("circle",0,0,40);

                  //creating invisible boundaries & making them invisible
                  invisibleBoundary1 = createSprite(40,200,15,400);
                  invisibleBoundary2 = createSprite(360,200,15,400);

                  invisibleBoundary1.visible=false;
                  invisibleBoundary2.visible=false;

                  //gameOver & restart sprites
                  gameOver = createSprite(200,150,10,10);
                  gameOver.addImage(gameOverImg);
                  gameOver.scale=0.5

                  restart = createSprite(200,240,10,10);
                  restart.addImage(restartImg);
                  restart.scale=0.3


                  //create spells group and ObsGrp
                  ObsGrp=createGroup();
                  spellGrp1=createGroup();
                  spellGrp2=createGroup();
                  spellGrp3=createGroup();
                  spellGrp4=createGroup();

    
}

function draw() {
    background("gray");

  
                if(path.y > 400){
                path.y=height/2
                }

      boy.x=mouseX;

     //gamestates.
     if(gameState===PLAY){
         gameOver.visible=false;
         restart.visible=false;
         boy.visible=true
         path.velocityY=4
        
         //BGM.play();
         spawnSpell1();
         spawnSpell2();
         spawnspell3();
         spawnspells4();
         spawnSword();

         if(spellGrp1.isTouching(boy)){
             spellGrp1.destroyEach();
             score=score+10
         }
         else if(spellGrp2.isTouching(boy)){
             spellGrp2.destroyEach();
             score=score+15
         }
         else if(spellGrp3.isTouching(boy)){
            spellGrp3.destroyEach();
            score=score+20
        }
        else if(spellGrp4.isTouching(boy)){
            spellGrp4.destroyEach();
            score=score+25
        }
        else if(boy.isTouching(ObsGrp)){
            gameState = END; 
        }
        

     }

     if(gameState===END){
         gameOver.visible=true;
         restart.visible = true;
         path.velocityY=0

         boy.visible=false
         spellGrp1.destroyEach();
         spellGrp2.destroyEach();
         spellGrp3.destroyEach();
         spellGrp4.destroyEach();
         ObsGrp.destroyEach();
     }

     if(boy.isTouching(invisibleBoundary1)){
         boy.x=200;
         boy.y=350
     }
     else if(boy.isTouching(invisibleBoundary2)){
         boy.x=200;
         boy.y=350;
     }

     if(mousePressedOver(restart)){
         score=0
         gameState=PLAY;
     }

      

    drawSprites();
    text("MagicalAbility:"+score,100,20);
    textSize(25);

 
}

function spawnSpell1(){
    if(frameCount%200===0){
        spell1 = createSprite(Math.round(random(80,325),40,10,10));
        spell1.addImage(spellImg1);
        spell1.scale=0.3
        spell1.velocityY=2
        spellGrp1.add(spell1);
    }
}
function spawnSpell2(){
    if(frameCount%350===0){
        spell2 = createSprite(Math.round(random(80,325),40,10,10));
        spell2.addImage(spellImg2);
        spell2.scale=0.3
        spell2.velocityY=4
        spellGrp2.add(spell2);
    }
}
function spawnspell3(){
    if(frameCount%410===0){
        spell3 = createSprite(Math.round(random(80,325),40,10,10));
        spell3.addImage(spellImg3);
        spell3.scale=0.5
        spell3.velocityY=4.5
        spellGrp3.add(spell3);
    }
}
function spawnspells4(){
    if(frameCount%500===0){
        spell4 = createSprite(Math.round(random(80,325),40,10,10));
        spell4.addImage(spellImg3);
        spell4.scale=0.5
        spell4.velocityY=5
        spellGrp4.add(spell4);
    }
}
function spawnSword(){
    if(frameCount%495===0){
        sword = createSprite(Math.round(random(80,325),40,10,10));
        sword.addImage(swordImg);
        sword.scale=0.25
        sword.velocityY=4
        ObsGrp.add(sword);
    }
}
