game.Player = me.ObjectEntity.extend({
    
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
                this.vel.x = 0;
                me.audio.stopTrack();
                me.audio.play("lost", false);

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

        this.updateColRect(10, 48, 1, 60);
//        this.run();   
    
    },



    roll: function(){
        
        this.updateColRect(10, 48, 32, 28);
        this.vel.x = 200;
        this.renderable.setCurrentAnimation("roll","run");

 
    },

    run: function(){
        
        this.updateColRect(10, 48, 1, 60);
        this.vel.x = 200;   
        this.renderable.setCurrentAnimation("run");



    },

    jump: function(){
        
        if(!this.jumping && !this.falling){
            
            me.audio.play("jump");
            this.renderable.setCurrentAnimation("jump","run");

            this.vel.y = -400;
            this.jumping = true;
                
        }

    
    }





});


game.Enemy = me.ObjectEntity.extend({

    init: function(x,y,settings){

        this.parent(x, y, settings);
        this.type = me.game.ACTION_OBJECT;
        this.collidable = true;
    
    }


});
