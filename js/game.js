var game = {

    data:{
        score:0
    },

    "onload": function(){
        
        if(!me.video.init("juego", 480, 320, true, "auto")){
            
            alert("El navegador no soporta canvas html5");
            return;

        }

        if(document.location.hash === "#debug"){
   
            window.onReady(function(){
                me.plugin.register.defer(debugPanel, "debug");
            });           
   
        }
        

        me.debug.renderHitBox = true;

        me.audio.init("mp3,ogg");
        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(game.resources);
        me.state.change(me.state.LOADING);
    
    },


    "loaded": function(){
        //me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        me.entityPool.add("player", game.Player);
        me.entityPool.add("box", game.Enemy);

        me.input.bindKey(me.input.KEY.X, "jump", true);
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.X);

        me.input.bindKey(me.input.KEY.Z, "roll", true);
        me.input.bindMouse(me.input.mouse.RIGHT, me.input.KEY.Z);

        me.state.change(me.state.PLAY);
    
    }


}
