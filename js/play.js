game.PlayScreen = me.ScreenObject.extend({

    onResetEvent: function(){
    
        me.levelDirector.loadLevel("level01");
        //me.audio.playTrack("overworld");

        game.data.score = 0;

        this.HUD = new game.HUD.Container();

        me.game.world.addChild(this.HUD);
    },

    onDestroyEvent: function(){
        
        me.audio.stopTrack();
        me.game.world.removeChild(this.HUD);
    
    }


});
