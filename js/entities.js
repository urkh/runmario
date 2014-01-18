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



    update: function(){


        this.handleInput();


        this.updateMovement();
        var col = me.game.collide(this);

        if(col){

            if(col.obj.type == me.game.ACTION_OBJECT){
                
                //console.log("col");
                //me.audio.stopTrack();
                me.game.remove(this);
                //me.audio.play("lost");

            }
        
        }

        this.parent();
        return true;
        
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
        
        this.updateColRect(10, 48, 34, 28);
        this.vel.x = 200;
        
        this.renderable.setCurrentAnimation("roll", (
            function () {

                this.run();

            }).bind(this));

 
    },

    run: function(){
        
        this.vel.x = 200;   
        this.updateColRect(10, 48, 2, 60);
        this.renderable.setCurrentAnimation("run");
        
    },

    jump: function(){
        
        if(!this.jumping && !this.falling){
            

            //me.audio.play("jump");
            this.renderable.setCurrentAnimation("jump","run");
            this.vel.y = -400;
            this.jumping = true;
                
        }
        
        this.updateColRect(10, 48, 2, 60);
    
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
    
        this.updateColRect(10, 10, 20, 10);
    }


});



game.Coin = me.CollectableEntity.extend({
    
    init: function(x, y, settings){
        
        this.parent(x, y, settings);
    
    },

    onCollision: function(){

        //me.audio.play("coin");

        this.collidable = false;
        me.game.remove(this);
    }

});


