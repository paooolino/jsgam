import * as PIXI from 'pixi.js';
window.PIXI=PIXI; //Solution to use dragonbones with PIXI v5
const dragonBones=require('pixi5-dragonbones');
const dbfactory=dragonBones.PixiFactory.factory;

import {checkPath} from '../collisions.js'

/*
log.trace(msg)
log.debug(msg)
log.info(msg)
log.warn(msg)
log.error(msg)
*/
import log from 'loglevel';
log.setLevel('trace');

class Character{
  constructor(){
    this.game=null;
    this.state=null;
    this.lock=false;
    this.endAction=null;
    this.event=dragonBones.EventObject;
  }

  setup(config){
    //log.trace('setup character...', config);
    if (this.game.files.resources[config.Name+"Skeleton"])
      dbfactory.parseDragonBonesData(this.game.files.resources[config.Name+"Skeleton"].data);
    if (
      this.game.files.resources[config.Name+"Json"]
      && this.game.files.resources[config.Name+"Tex"]
    )
      dbfactory.parseTextureAtlasData(this.game.files.resources[config.Name+"Json"].data,this.game.files.resources[config.Name+"Tex"].texture);
    
    if (config.Armature)
      this.sprite = dbfactory.buildArmatureDisplay(config.Armature);
    if(config.Size!==undefined){
      this.size=config.Size;
      if (this.sprite)
        this.sprite.scale.set(this.size);
    }else{
      this.size=1;
    }
    this.tween=null;
    if(config.Animations!=undefined)
      this.animations=config.Animations;
    else
      this.animations={
        Stand:"stand",
        Walk:"walk",
        Take:"take",
        Use:"use",
        Say:"speak"
      };
    this.animate(this.animations.Stand);
    this.state="stand";
    if(this.sprite && config.Position){
      this.sprite.x=config.Position[0];
      this.sprite.y=config.Position[1];
    }
    if (this.sprite)
      this.sprite.parentLayer = this.game.layer;//Z-order*/
    this.config=config;
  }

  hide(){
    if (!this.sprite)
      return;
    
    this.sprite.visible=false;
  }

  show(){
    if (!this.sprite)
      return;
    
    this.sprite.visible=true;
  }

  width(){
    if (!this.sprite)
      return;
    
    return this.sprite.getBounds().width;
  }

  position(coords){
    if (!this.sprite)
      return;
    
    this.sprite.x=coords[0];
    this.sprite.y=coords[1];
  }

  move(coords){
    if (!this.sprite)
      return;
    
    let obstacles=this.game.activeScene.config.Obstacles;
    let walkingArea=this.game.activeScene.config.WalkArea;
    let newPosition=coords;
    let closestPosition=checkPath(coords,obstacles,walkingArea);

    if(closestPosition){
      newPosition=closestPosition;
    }

    let findPath=this.game.activeScene.walkable.findPath(this.sprite.x,this.sprite.y,newPosition.x,newPosition.y,0);
    let i;
    let finalPath=[];
    for(i=0;i<findPath.length;i++){
      finalPath.push({x:findPath[i],y:findPath[i+1]})
      i++;
    }

    if(finalPath.length>0){
      let animationTime=Math.abs(this.sprite.x-newPosition.x)+Math.abs(this.sprite.y-newPosition.y);
      animationTime=animationTime/(this.game.width+this.game.height);
      animationTime*=10;
      if(this.config.Speed!==undefined) animationTime/=this.config.Speed;

      this.animate(this.animations.Walk);
      if(this.sprite.x<newPosition.x) this.sprite.armature.flipX=false;
      else this.sprite.armature.flipX=true;

      this.game.activeState=this;

      if(this.tween!==null) this.tween.kill();
      this.tween=TweenMax.to(this.sprite, animationTime, {bezier:finalPath, ease:Linear.easeNone,onComplete:this.stop.bind(this)});
    }
  }

  update(){
    this.scale();
  }

  scale(){
    if (!this.sprite)
      return;
    let scaleChar=this.sprite.y/this.game.height*this.size;
    if(scaleChar<this.game.activeScene.config.Depth) scaleChar=this.game.activeScene.config.Depth;
    this.sprite.scale.set(scaleChar);
  }

  stop(){
    this.animate(this.animations.Stand);
    this.game.activeState=null;
    this.lock=false;
    if(this.endAction!==null){
      if(this.endAction==="Look") this.look();
      else if(this.endAction==="Take") this.take();
      else if(this.endAction==="Use") this.use();
      else if(this.endAction==="Talk") this.talk();
      this.endAction=null;
    }
  }

  say(text,voice){
    this.game.textField.talker=this;
    //Setup the text to show
    if(this.config.Color!==undefined) this.game.textField.setColor(Number(this.config.Color));
    if(this.config.Font!==undefined) this.game.textField.setFont(this.config.Font.font);
    else this.game.textField.setFont(this.game.settings.Text.Style.font)
    this.game.textField.setText(text);
    this.game.textField.setAvatar(this.config.Avatar);

    //Play voice if it's defined
    if(voice!==undefined && this.config.VoiceSet!=undefined){
      this.game.activeVoice=this.config.VoiceSet;
      this.game.voices[this.config.VoiceSet].play(null,voice);
    }

    this.game.textField.show();
    //Animate the character
    this.animate(this.animations.Say);
    if(this.timeoutID) clearTimeout(this.timeoutID);
    this.timeoutID=setTimeout(this.game.textField.end.bind(this.game.textField), this.game.textField.timeOut());
  }

  shutup(){
    if(this.game.activeVoice!=null){
      this.game.voices[this.config.VoiceSet].stop();
      this.game.activeVoice=null
    }
    this.animate(this.animations.Stand);
  }

  animate(animation,times){
    if (!this.sprite)
      return;
    if(this.sprite.animation.lastAnimationName!==animation)
      this.sprite.animation.fadeIn(animation,0.25,times);
  }
}

export default Character;
