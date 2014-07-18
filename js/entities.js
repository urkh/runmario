game.Mario = me.ObjectEntity.extend({
    
    init: function(x, y, settings){

        this.parent(x,y,settings);

        this.setVelocity(4,13);
        
        this.renderable.addAnimation("run", [0,1,2], 90);
        this.renderable.addAnimation("jump", [3],450);
        this.renderable.addAnimation("roll",[8,9,10,11,12,13,14,15], 70);
        
        this.run();


        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },


    update: function(dt){


        this.updateMovement();

        this.handleInput();

        /*
        var col = me.game.world.collide(this);

        if(col){

            if(col.obj.type == me.game.ACTION_OBJECT){
                
                //console.log("col");
                me.audio.stopTrack();
                me.game.world.removeChild(this);
                me.audio.play("lost");

            }
        
        }*/

        //this.parent(); 
        //return true;
        return this.parent(dt);
        
    },



    handleInput: function(){
 
        if(me.input.isKeyPressed('jump')){
           
            this.jump();
        }


        if(me.input.isKeyPressed('roll')){
            
            this.roll();
        
        }
    
    },



    roll: function(){
        
        //this.updateColRect(10, 48, 34, 28);
        var shape = this.getShape();
        //shape.pos.x = -10;
        //shape.pos.y = -10
        shape.resize(10, 48, 34, 28);
        
        this.renderable.setCurrentAnimation("roll", (
            function () {

                this.run();

            }
        ).bind(this));

 
    },

    

    run: function(){
        
        this.vel.x = 200;   
        
        //this.updateColRect(10, 48, 2, 60);
        var shape = this.getShape();
        //shape.pos.x = 10;
        shape.resize(10, 48, 2, 60);

        this.renderable.setCurrentAnimation("run");
        
    },



    jump: function(){
        
        if(!this.jumping && !this.falling){
            

            me.audio.play("jump");
            this.renderable.setCurrentAnimation("jump","run");
            this.jumping = true;
            this.vel.y = -400;
                
        }
        
        //this.updateColRect(10, 48, 2, 60);
        var shape = this.getShape();
        shape.pos.x = 10;
        shape.resize(48, shape.height);
    
    }





});

/*
game.Enemy = me.ObjectEntity.extend({

    init: function(x,y,settings){

        this.parent(x, y, settings);
        this.type = me.game.ACTION_OBJECT;
        this.collidable = true;
    
        this.updateColRect(10, 10, 20, 10);
    }


});

*/

game.Bowser = me.ObjectEntity.extend({

    init: function(x,y,settings){

        this.parent(x, y, settings);
        this.type = me.game.ACTION_OBJECT;
        this.collidable = true;
    
        //this.updateColRect(10, 10, 20, 10);
        var shape = this.getShape();
        shape.pos.x = 10;
        shape.resize(10, shape.height);
    }


});



game.Coin = me.CollectableEntity.extend({
    
    init: function(x, y, settings){
        
        this.parent(x, y, settings);
    
    },

    onCollision: function(){

        me.audio.play("coin");
        game.data.score += 50;
        this.collidable = false;
        me.game.world.removeChild(this);
    }

});


