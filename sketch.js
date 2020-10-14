//Create variables here
var dog;
var database;
var foodS;
var foodStock;
var dog_img;
var happyDog_img;
var addFood;
var feed;
var fedTime;
var lastFed;
var foodObj;
var fed;
var resetPosition
var changeState;
var readState;
var bedroom_img;
var garden_img;
var washroom_img;
var sadDog_img;
var gameState = "Hungry";

function preload()
{
  //load images here
  dog_img = loadImage("images/dogImg.png");
  happyDog_img = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(800, 700);
  dog = createSprite(650,600);
  dog.addImage(dog_img);
  dog.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock)

  foodObj = new Food();
  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  resetPosition = createButton("Get him back");
  resetPosition.position(600,95);
  resetPosition.mousePressed(resetPos);

  readState = database.ref("gameState");
  readState.on("value",function(data){
    gamestate = data.val();
  })
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function draw() {  
  background(46,139,87);
  textSize(35);
  fill("white");

  foodObj.display();
  drawSprites();

  

  fill(255,255,254);
  textSize(15);


fed = database.ref("fedTime");
fed.on("value",function time(data){
  lastFed = data.val();
})

  if(lastFed>=12){
    text("Last Fed : " + lastFed%12 + "PM",350,30);
  }

  else if(lastFed ==0){
    text("Last Fed : 12AM",3350,30);
  }
  else{
    text("Last Fed" + lastFed + "AM",350,30);
  }

  

  present = hour();
  if(present ==(lastFed + 1 )){
    update("Playing");
    foodObj.garden();
  }else if(present ==(lastFed +2 )){
    update("Sleeping");
    foodObj.bedroom();
  }else if(present >(lastFed + 2) && present<=(lastFed + 4)){
    update("Bathing");
    foodObj.washroom();
  }

  
  else{
    update("Hungry");
    foodObj.display();
    resetPosition.show();
        feed.show();
        addFood.show();
        dog.visible = true;
  
}
}

function feedDog(){
  dog.addImage(happyDog_img);
  dog.x = 400;
  dog.y = 150;
  if(foodS <= 0){
    foodS = 0;
  }
  else{
    foodS--;
  }
  foodObj.updateFoodStock(foodS);
  database.ref("/").update({
    food:foodS,
    fedTime:hour()
  });
} 

function addFoods(){
  
  if( foodS >= 20){
    foodS = 20;
  }
  else{
    foodS++
  }
  foodObj.updateFoodStock(foodS);
  database.ref("/").update({
      food:foodS
  });
}

function resetPos(){
  dog.x = 650;
  dog.y = 600;
  dog.addImage(dog_img);
}

function update(state){
  database.ref("/").update({
    gamestate:state
  });
}

