class Food {
    constructor(x,y){
       

        this.foodStock = 0;
        this.image = loadImage("images/Milk.png");
        this.bedroom_img = loadImage("images/Bed Room.png");
        this.garden_img = loadImage("images/Garden.png");
        this.washroom_img = loadImage("images/Wash Room.png");
        this.sadDog_img = loadImage("images/Lazy.png");
    }

    display(){
        
       var x = 80, y = 100;

       imageMode(CENTER);

       if(this.foodStock!=0){
            for(var i = 0; i < this.foodStock; i++){
                if(i%10 === 0){
                    x=80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
       }
    }


    updateFoodStock(foodS){
        this.foodStock = foodS;
    }
        bedroom(){
            imageMode(CENTER);
       image(this.bedroom_img,400,350,800,700);
       resetPosition.hide();
       feed.hide();
       addFood.hide();
       dog.visible = false;
      }
      
       washroom(){
        imageMode(CENTER);
       image(this.washroom_img,400,350,800,700);
       resetPosition.hide();
       feed.hide();
       addFood.hide();
       dog.visible = false;
      }
      
      garden(){
        imageMode(CENTER);  
        image(this.garden_img,400,350,800,700);
        resetPosition.hide();
        feed.hide();
        addFood.hide();
        dog.visible = false;
        
      }

}