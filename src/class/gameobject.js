import {boxesIntersect,collision} from '../collisions.js';

class GameObject{
  constructor(){
    this.sprite=null;
    this.game=null;
    this.action=null;
  }

  build(){
    if(this.config.Texture){
      //Generate a static object from a texture
      this.sprite=new PIXI.Sprite.from(PIXI.Texture.from(this.config.Texture));

    }else if(this.config.Area){

      //For invisible objects
      this.sprite=new PIXI.Sprite.from(PIXI.Texture.EMPTY);
      this.sprite.hitArea=new PIXI.Polygon(this.config.Area);

    }else if(this.config.Animation){

      //Animated objects
      let spritesheet=this.game.files.resources[this.config.Animation.Name].spritesheet;

      let frames = [];
      for (var i = 0; i < spritesheet._frameKeys.length; i++) {
          frames.push(PIXI.Texture.from(spritesheet._frameKeys[i]));
      }

      this.sprite=new PIXI.extras.AnimatedSprite(frames);
      this.animationSpeed=this.config.Animation.Speed;
      this.play();
    }

    //Position of the object in the screen
    if(this.config.Position){
      this.sprite.x=this.config.Position[0];
      this.sprite.y=this.config.Position[1];
    }

    if(this.config.Size){
      this.sprite.scale.set(this.config.Size)
    }

    if(!this.config.Area)this.sprite.anchor.set(0.5,1);
    if(this.config.Layer=="Front") this.sprite.parentLayer=this.game.layeronTop;
    else this.sprite.parentLayer = this.game.layer;

  //  if(this.config.Decoration!=undefined){
      this.sprite.interactive=true;
      this.sprite.buttonMode=true;

      //On touch examine the item
      this.sprite.on('pointertap',this.look.bind(this));
/*
      if(this.config.Door){
        this.door=true;
        this.newScene=this.config.Door.To;
        this.playerPos=this.config.Door.Player;
        this.use=ChangeRoom;
        this.sprite.on('pointerup',onDoorTouch);
      }
*/
      if(this.config.Take || this.config.Use){
        this.sprite.on('pointerdown', this.touch.bind(this))
            .on('pointermove', this.move.bind(this))
            .on('pointerup', this.release.bind(this))
            .on('pointerupoutside', this.release.bind(this));
      }
  //  }
  }

  hide(){
    this.sprite.visible=false;
  }

  show(){
    this.sprite.visible=true;
  }

  touch(event){
    this.game.activeObject=this;
    this.posX = this.sprite.x;
    this.posY = this.sprite.y;
    this.interaction = event.data;
    this.sprite.alpha = 0.5;
    this.dragging = true;
    this.moved = false;
    this.oldParent=this.sprite.parent;
    this.sprite.parentLayer = this.game.layerUI;
  }

  move(){
    if (this.dragging) {
    //  this.game.player.lock=true;
      this.moved=true;
      this.sprite.setParent(this.game.app.stage);
      var newPosition = this.interaction.getLocalPosition(this.sprite.parent);
      let bounds=this.sprite.getBounds();
      //We can only move the object inside the stage
      if(newPosition.x>bounds.width/2 && newPosition.x<this.game.width-bounds.width/2) this.sprite.x = newPosition.x;
      if(newPosition.y>bounds.height && newPosition.y<this.game.height) this.sprite.y = newPosition.y;
    }
  }

  release(){
    if(this.interaction){
      if(collision(this.sprite,this.game.inventory.icon) && this.config.Take){
        this.take();
      }

      this.sprite.x = this.posX;
      this.sprite.y = this.posY;
      this.sprite.alpha = 1;
      this.sprite.parentLayer = this.game.layer;
      this.sprite.setParent(this.oldParent);
      // set the interaction data to null
      this.interaction = null;
      this.dragging = false;
      this.moved=false;
    //  this.cancel();
    //  setTimeout(this.game.player.stop())
    }
  }

  look(event){
    if(!this.game.player.lock){
      this.game.activeObject=this;
      this.action=this.game.player.look.bind(this.game.player);
      this.game.player.tween.once('end',this.action);
      let moveTo={x:this.sprite.x,y:this.sprite.y};
      if(this.config.Area) moveTo=event.data.getLocalPosition(this.game.app.stage);
      this.game.player.move(moveTo);
    }
  }

  take(){
    if(!this.game.player.lock){
      this.game.activeObject=this;
      this.action=this.game.player.take.bind(this.game.player);
      this.game.player.tween.once('end',this.action);
      this.game.player.move({x:this.posX,y:this.posY});
    }
  }

  use(){

  }

  cancel(){
    this.game.activeObject.action=null;
    this.game.activeObject=null;

  }
}

export default GameObject;
