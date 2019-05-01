import{Application as t,display as i,Text as e}from"pixi.js";import"pixi-layers";import s from"pixi-multistyle-text";import"pixi-sound";import n from"walkable";import{ContainsPoint as a,ClosestEdge as o}from"polyk";import"k8w-pixi-tween";import h from"dragonbones-pixi";var r=function(t){function i(){t.call(this),this.game=null,this.onLoad.add(this.update.bind(this)),this.onError.add(this.error.bind(this))}return t&&(i.__proto__=t),(i.prototype=Object.create(t&&t.prototype)).constructor=i,i.prototype.addJSON=function(t){var i,e=t.length;for(i=0;i<e;i++){var s=t[i].slice(t[i].lastIndexOf("/")+1,t[i].lastIndexOf("."));this.add(s,t[i])}},i.prototype.addFiles=function(t){var i,e=t.length;for(i=0;i<e;i++){if(t[i].data.Settings&&(this.game.settings=t[i].data.Settings),t[i].data.Scenes&&(this.game.data.scenes=t[i].data.Scenes),t[i].data.Cutscenes&&(this.game.data.cutscenes=t[i].data.Cutscenes),t[i].data.Objects&&(this.game.data.objects=t[i].data.Objects),t[i].data.Dialogues&&(this.game.data.dialogues=t[i].data.Dialogues),t[i].data.Puzzles&&(this.game.data.puzzles=t[i].data.Puzzles),t[i].data.Credits&&(this.game.data.credits=t[i].data.Credits),t[i].data.Texts&&(this.game.data.texts=t[i].data.Texts),t[i].data.Sounds)for(var s=t[i].data.Sounds,n=0;n<s.length;n++){var a=s[n].Src;null!==a&&this.add(s[n].Name,a)}if(t[i].data.Vids){this.fixVidLoad();for(var o=t[i].data.Vids,h=0;h<o.length;h++){var r=o[h].Src;null!==r&&this.add(o[h].Name,r)}}if(t[i].data.Animations)for(var c=t[i].data.Animations,p=0;p<c.length;p++){var d=c[p].Src;null!==d&&this.add(c[p].Name,d)}if(t[i].data.Backgrounds)for(var g=t[i].data.Animations,u=0;u<g.length;u++){var l=g[u].Src;null!==l&&this.add(g[u].Name,l)}if(t[i].data.Player&&(this.add("playerTex",t[i].data.Player.Texture).add("playerJson",t[i].data.Player.Json).add("playerSkeleton",t[i].data.Player.Skeleton),this.game.data.player=t[i].data.Player),t[i].data.Characters){for(var m=t[i].data.Characters,y=0;y<m.length;y++)this.add(m[y].Name+"Tex",m[y].Texture).add(m[y].Name+"Json",m[y].Json).add(m[y].Name+"Skeleton",m[y].Skeleton);this.game.data.npc=t[i].data.Characters}}},i.prototype.fixVidLoad=function(){PIXI.sound.utils.extensions.splice(PIXI.sound.utils.extensions.indexOf("mp4"),1),PIXI.loaders.Resource.setExtensionXhrType("mp4",void 0),PIXI.loaders.Resource.setExtensionLoadType("mp4",PIXI.loaders.Resource.LOAD_TYPE.VIDEO)},i.prototype.update=function(){var t=Math.floor(this.progress);this.game.loadinProgress.text=t+"%"},i.prototype.error=function(t){console.log(t)},i}(PIXI.loaders.Loader),c=function(){this.container=new PIXI.Container,this.game=null};c.prototype.setup=function(t){this.background=new PIXI.Sprite(PIXI.Texture.from(t.Background)),this.background.anchor.set(0),this.container.addChild(this.background),this.music=t.Music,this.config=t},c.prototype.update=function(t){};var p=function(t){function i(i,e){t.call(this,i,e),this.interactive=!0,this.buttonMode=!0}return t&&(i.__proto__=t),(i.prototype=Object.create(t&&t.prototype)).constructor=i,i}(PIXI.Text),d=function(){this.container=new PIXI.Container,this.Background=null,this.Text=null,this.container.visible=!1};d.prototype.build=function(){this.container.parentLayer=this.game.layerUI,this.Background=new PIXI.Sprite(PIXI.Texture.WHITE);var t=4;void 0!==this.game.settings.Text.Size&&("fourth"===this.game.settings.Text.Size?t=4:"half"===this.game.settings.Text.Size&&(t=2)),this.Background.width=this.game.width,this.Background.height=this.game.height/t,this.Background.tint="black",this.Background.alpha=.5,this.Text=new p("",this.game.settings.Text.Style),this.Text.anchor.set(.5,0),this.Text.x=this.game.width/2,this.Text.y=0,this.Text.on("pointertap",this.skip.bind(this)),this.container.addChild(this.Background),this.container.addChild(this.Text),void 0!==this.game.settings.Text.Position&&this.setPosition(this.game.settings.Text.Position)},d.prototype.show=function(){this.container.visible=!0},d.prototype.hide=function(){this.container.visible=!1},d.prototype.skip=function(){this.setText(""),this.hide(),this.game.player.stop()},d.prototype.setPosition=function(t){"top"===t?(this.container.x=0,this.container.y=0):"bottom"===t&&(this.container.x=0,this.container.y=this.game.height-this.container.height)},d.prototype.setText=function(t){this.Text.text=t,(this.Text.width>this.container.width||this.Text.height>this.container.height)&&this.adjustText()},d.prototype.adjustText=function(){var t=Math.min(this.container.width/this.Text.width,this.container.height/this.Text.height);this.container.scale.set(.95*t)},d.prototype.countWords=function(t){return t.split(" ").length},d.prototype.timeOut=function(){return 1e3*(void 0!==this.game.settings.Text.Speed?this.game.settings.Text.Speed:this.countWords(this.Text.text)/3)},d.prototype.setColor=function(t){this.Text.tint=t};var g=function(){this.container=new PIXI.Container,this.game=null,this.buttons={}};g.prototype.addButton=function(t,i){this.buttons[t]=new p(i[this.game.activeLanguage],this.game.settings.Text.ButtonStyle),this.container.addChild(this.buttons[t])},g.prototype.modify=function(t,i){this.buttons[t].text=i[this.game.activeLanguage]},g.prototype.disable=function(t){this.buttons[t].alpha=.5,this.buttons[t].interactive=!1},g.prototype.enable=function(t){this.buttons[t].alpha=1,this.buttons[t].interactive=!0},g.prototype.sortMenu=function(){var t,i=Object.values(this.buttons),e=i.length;for(i[0].y=0,t=1;t<e;t++)i[t].y=i[t-1].y+1.5*i[t-1].height,i[t].x=this.container.width/2-i[t].width/2;this.center()},g.prototype.resize=function(){var t=Math.min(this.game.width/this.container.width,this.game.height/this.container.height);console.log(t),this.container.scale.set(.95*t)},g.prototype.hide=function(){this.container.visible=!1},g.prototype.show=function(){this.container.visible=!0},g.prototype.center=function(){this.container.x=this.game.width/2,this.container.y=this.game.height/2,this.container.pivot.x=this.container.width/2,this.container.pivot.y=this.container.height/2};var u=function(t){function i(){t.apply(this,arguments)}return t&&(i.__proto__=t),(i.prototype=Object.create(t&&t.prototype)).constructor=i,i.prototype.create=function(){var t=this.game.data.texts;this.addButton("New",t.NewGame),this.addButton("Continue",t.Continue),this.addButton("Options",t.Options),this.addButton("Help",t.Help),this.addButton("Credits",t.Credits),this.disable("Continue"),this.sortMenu()},i.prototype.changeLanguage=function(){this.modify("New",this.game.data.texts.NewGame),this.modify("Continue",this.game.data.texts.Continue),this.modify("Options",this.game.data.texts.Options),this.modify("Credits",this.game.data.texts.Credits),this.sortMenu()},i}(g),l=function(t){function i(){t.apply(this,arguments)}return t&&(i.__proto__=t),(i.prototype=Object.create(t&&t.prototype)).constructor=i,i.prototype.create=function(){this.container.visible=!1;for(var t=this.game.settings.Languages,i=0;i<t.length;i++)this.addLanguage(t[i]),this.buttons[t[i]].on("pointerup",this.setLanguage);Object.values(this.buttons)[this.game.activeLanguage].tint="0xFF0000",this.addButton("Back",this.game.data.texts.Back),this.sortMenu()},i.prototype.addLanguage=function(t){this.buttons[t]=new p(t,this.game.settings.Text.ButtonStyle),this.buttons[t].father=this,this.container.addChild(this.buttons[t])},i.prototype.setLanguage=function(){this.father.change(this.text)},i.prototype.change=function(t){var i=this.game.settings.Languages;this.buttons[i[this.game.activeLanguage]].tint="0xFFFFFF",this.game.activeLanguage=this.game.settings.Languages.indexOf(t),this.buttons[i[this.game.activeLanguage]].tint="0xFF0000",this.modify("Back",this.game.data.texts.Back),this.sortMenu()},i}(g),m=function(){this.container=new PIXI.Container,this.container.visible=!1,this.container.interactive=!0,this.container.buttonMode=!0};m.prototype.create=function(){var t=this.game.data.credits;void 0!==t.Background&&(this.background=new PIXI.Sprite(PIXI.Texture.from(t.Background))),this.buildText(),this.structuredText=new s(this.text,t.Style),this.container.addChild(this.structuredText),this.container.x=this.game.width/2,this.container.pivot.x=this.container.width/2,this.container.y=this.game.height,this.tween=PIXI.tweenManager.createTween(this.container),this.tween.from({y:this.game.height}).to({y:0-this.container.height}),this.tween.time=2e4,this.tween.expire=!0,this.tween.delay=500,this.tween.on("end",this.mainMenu.bind(this)),this.container.on("pointerup",this.mainMenu.bind(this))},m.prototype.show=function(){this.container.visible=!0,this.tween.start()},m.prototype.hide=function(){this.tween.stop().reset(),this.container.visible=!1},m.prototype.buildText=function(){var t,i=this.game.data.credits;for(this.text="",t=0;t<i.Lines.length;t++){this.text+="<title>",this.text+=i.Lines[t].Title[this.game.activeLanguage],this.text+="</title>",this.text+="\n";var e=void 0;for(e=0;e<i.Lines[t].Text.length;e++)this.text+=i.Lines[t].Text[e],this.text+="\n";this.text+="\n"}},m.prototype.update=function(){PIXI.tweenManager.update()},m.prototype.changeLanguage=function(){this.buildText(),this.structuredText.text=this.text},m.prototype.mainMenu=function(){this.game.scenes.Title.mainMenu()};var y=function(t){function i(){t.apply(this,arguments)}return t&&(i.__proto__=t),(i.prototype=Object.create(t&&t.prototype)).constructor=i,i.prototype.build=function(){this.states={},this.addState("MainMenu",new u),this.addState("Options",new l),this.addState("Credits",new m),this.addAction("MainMenu","Options",this.showOptions.bind(this)),this.addAction("MainMenu","Credits",this.showCredits.bind(this)),this.addAction("MainMenu","New",this.newAdventure.bind(this)),this.addAction("Options","Back",this.mainMenu.bind(this))},i.prototype.addAction=function(t,i,e){this.states[t].buttons[i].on("pointerup",e)},i.prototype.addState=function(t,i,e){this.states[t]=i,i.game=this.game,i.create(),this.container.addChild(this.states[t].container)},i.prototype.showOptions=function(){this.states.MainMenu.hide(),this.states.Options.show()},i.prototype.showCredits=function(){this.states.MainMenu.hide(),this.states.Credits.show(),this.game.activeState=this.states.Credits},i.prototype.mainMenu=function(){this.game.activeState=null,this.states.Credits.hide(),this.states.Options.hide(),this.changeLanguage(),this.states.MainMenu.show()},i.prototype.changeLanguage=function(){this.states.MainMenu.changeLanguage(),this.states.Credits.changeLanguage()},i.prototype.newAdventure=function(){this.game.start()},i}(c),f=function(t){function i(){t.apply(this,arguments)}return t&&(i.__proto__=t),(i.prototype=Object.create(t&&t.prototype)).constructor=i,i.prototype.build=function(){if(this.background.parentLayer=this.game.layer,this.background.interactive=!0,this.background.buttonMode=!0,this.background.on("pointertap",this.getPosition.bind(this)),this.walkable=new n(this.game.width,this.game.height),void 0!==this.config.WalkArea&&this.walkable.addPolygon(this.config.WalkArea),void 0!==this.config.Obstacles){var t=Object.values(this.config.Obstacles);this.config.Obstacles=t;for(var i=0;i<this.config.Obstacles.length;i++)this.walkable.addPolygon(this.config.Obstacles[i])}var e=this.config.Objects;if(e)for(var s=0;s<e.length;s++)void 0!==this.game.objects[e[s]]?this.container.addChild(this.game.objects[e[s]].sprite):console.log("Error:Game object "+e[s]+" not found")},i.prototype.getPosition=function(t){var i=t.data.getLocalPosition(this.game.app.stage);this.game.player.lock||(null!==this.game.activeObject&&this.game.activeObject.cancel(),this.game.player.move(i))},i.prototype.getPath=function(t,i,e,s){return this.walkable.findPath(t,i,e,s,0)},i}(c);function v(t,i){var e=t.getBounds(),s=i.getBounds();return e.x+e.width>s.x&&e.x<s.x+s.width&&e.y+e.height>s.y&&e.y<s.y+s.height}function b(t,i){var e;return null!=t&&null!=i&&(e=i.hitArea?a(i.hitArea.points,t.x,t.y):v(t,i)),e}var x=function(){this.sprite=null,this.game=null,this.action=null};x.prototype.build=function(){if(this.config.Texture)this.sprite=new PIXI.Sprite.from(PIXI.Texture.from(this.config.Texture));else if(this.config.Area)this.sprite=new PIXI.Sprite.from(PIXI.Texture.EMPTY),this.sprite.hitArea=new PIXI.Polygon(this.config.Area);else if(this.config.Animation){for(var t=this.game.files.resources[this.config.Animation.Name].spritesheet,i=[],e=0;e<t._frameKeys.length;e++)i.push(PIXI.Texture.from(t._frameKeys[e]));this.sprite=new PIXI.extras.AnimatedSprite(i),this.animationSpeed=this.config.Animation.Speed,this.play()}this.config.Position&&(this.sprite.x=this.config.Position[0],this.sprite.y=this.config.Position[1]),this.config.Size&&this.sprite.scale.set(this.config.Size),this.config.Area||this.sprite.anchor.set(.5,1),this.sprite.parentLayer="Front"==this.config.Layer?this.game.layeronTop:this.game.layer,this.sprite.interactive=!0,this.sprite.buttonMode=!0,this.sprite.on("pointertap",this.look.bind(this)),(this.config.Take||this.config.Use)&&this.sprite.on("pointerdown",this.touch.bind(this)).on("pointermove",this.move.bind(this)).on("pointerup",this.release.bind(this)).on("pointerupoutside",this.release.bind(this))},x.prototype.hide=function(){this.sprite.visible=!1},x.prototype.show=function(){this.sprite.visible=!0},x.prototype.touch=function(t){this.game.activeObject=this,this.posX=this.sprite.x,this.posY=this.sprite.y,this.interaction=t.data,this.sprite.alpha=.5,this.dragging=!0,this.moved=!1,this.oldParent=this.sprite.parent,this.sprite.parentLayer=this.game.layerUI},x.prototype.move=function(){if(this.dragging){this.moved=!0,this.sprite.setParent(this.game.app.stage);var t=this.interaction.getLocalPosition(this.sprite.parent),i=this.sprite.getBounds();t.x>i.width/2&&t.x<this.game.width-i.width/2&&(this.sprite.x=t.x),t.y>i.height&&t.y<this.game.height&&(this.sprite.y=t.y)}},x.prototype.release=function(){this.interaction&&(b(this.sprite,this.game.inventory.icon)&&this.config.Take&&this.take(),this.sprite.x=this.posX,this.sprite.y=this.posY,this.sprite.alpha=1,this.sprite.parentLayer=this.game.layer,this.sprite.setParent(this.oldParent),this.interaction=null,this.dragging=!1,this.moved=!1)},x.prototype.look=function(t){if(!this.game.player.lock){this.game.activeObject=this,this.action=this.game.player.look.bind(this.game.player),this.game.player.tween.once("end",this.action);var i={x:this.sprite.x,y:this.sprite.y};this.config.Area&&(i=t.data.getLocalPosition(this.game.app.stage)),this.game.player.move(i)}},x.prototype.take=function(){this.game.player.lock||(this.game.activeObject=this,this.action=this.game.player.take.bind(this.game.player),this.game.player.tween.once("end",this.action),this.game.player.move({x:this.posX,y:this.posY}))},x.prototype.use=function(){},x.prototype.cancel=function(){this.game.activeObject.action=null,this.game.activeObject=null};var w=function(){this.container=new PIXI.Container,this.container.visible=!1,this.game=null,this.objects=[]};w.prototype.build=function(){this.background=new PIXI.Sprite(PIXI.Texture.from(this.game.settings.Inventory.Background)),this.background.width=this.game.width/2,this.background.height=this.game.height/2,this.background.parentLayer=this.game.layerUI,this.container.x=(this.game.width-this.background.width)/2,this.container.y=(this.game.height-this.background.height)/2,this.border=10,this.icon=new PIXI.Sprite(PIXI.Texture.from(this.game.settings.Inventory.Icon)),this.icon.on("pointertap",this.click.bind(this)),this.icon.interactive=!0,this.icon.buttonMode=!0,this.setIcon(this.game.settings.Inventory.Position),this.container.addChild(this.background),this.icon.parentLayer=this.game.layerUI},w.prototype.show=function(){this.update(),this.container.visible=!0},w.prototype.hide=function(){this.container.visible=!1},w.prototype.setIcon=function(t){"bottom-right"==t?(this.icon.x=this.game.width-this.icon.width,this.icon.y=this.game.height-this.icon.height):"top-right"==t?(this.icon.x=this.game.width-this.icon.width,this.icon.y=0):"top-left"==t?(this.icon.x=0,this.icon.y=this.game.height-this.icon.height):"bottom-top"==t&&(this.icon.x=this.game.width-this.icon.width,this.icon.y=0)},w.prototype.click=function(){this.container.visible?this.hide():this.game.player.lock||this.show()},w.prototype.add=function(t){this.objects.push(t),this.game.objects[t].sprite.setParent(this.container),this.game.objects[t].sprite.removeAllListeners(),this.game.objects[t].sprite.parentLayer=this.game.layerUI,this.game.objects[t].sprite.on("pointertap",this.look.bind(this.game.objects[t])).on("pointerdown",this.touch.bind(this.game.objects[t])).on("pointermove",this.move.bind(this.game.objects[t])).on("pointerup",this.release.bind(this.game.objects[t])).on("pointerupoutside",this.release.bind(this.game.objects[t])),this.update()},w.prototype.remove=function(t){this.objects.includes(t)&&(this.objects.splice(this.objects.indexOf(t),1),this.update())},w.prototype.update=function(){var t,i=this.objects.length;for(t=0;t<i;t++){var e=this.game.objects[this.objects[t]].sprite;e.width=this.container.width/5-.05*this.container.width,e.height=this.container.height/5-.05*this.container.height,e.x=t%5*this.container.width/5+this.border-t+e.width/2,e.y=Math.floor(t/5)*this.container.height/5+this.border-t+e.height,this.container.width=this.background.width,this.container.height=this.background.height}},w.prototype.look=function(){this.moved||this.game.player.say(this.config.Description[this.game.activeLanguage])},w.prototype.touch=function(t){this.posX=this.sprite.x,this.posY=this.sprite.y,this.interaction=t.data,this.sprite.alpha=.5,this.dragging=!0,this.moved=!1},w.prototype.move=function(){if(this.dragging){this.moved=!0,this.sprite.setParent(this.game.app.stage);var t=this.interaction.getLocalPosition(this.sprite.parent),i=this.sprite.getBounds();t.x>i.width/2&&t.x<this.game.width-i.width/2&&(this.sprite.x=t.x),t.y>i.height&&t.y<this.game.height&&(this.sprite.y=t.y),v(this.sprite,this.game.inventory.container)||(this.game.inventory.container.visible=!1)}},w.prototype.release=function(){if(this.interaction){this.interaction=null,this.dragging=!1;var t=this.game.getPuzzle(this.config.Name);t>=0&&this.game.puzzles[t].resolvePuzzle(),this.sprite.setParent(this.game.inventory.container),this.sprite.x=this.posX,this.sprite.y=this.posY,this.sprite.alpha=1}};var k=function(){this.solved=!1};function P(t){if(!game.player.lock){game.player.action="use";var i={x:this.x,y:this.y};this.config.Area&&(i=t.data.getLocalPosition(game.app.stage)),game.player.lock=!0,game.selectedObject=game.searchObject(this.config.Name),game.player.move(i)}}function I(){game.changeScene(this.newScene,this.playerPos)}k.prototype.checkCollision=function(){var t,i=!1;return this.config.Combine||this.config.Give?(this.config.Combine&&(t=this.game.objects[this.config.Combine].sprite),i=b(t,this.game.objects[this.config.Target].sprite)):i=!0,i},k.prototype.resolvePuzzle=function(){var t=this.game.objects[this.config.Target];this.config.Modify&&(this.config.Modify.Description&&(t.config.Description=this.config.Modify.Description),this.config.Modify.Door&&this.createDoor(t)),this.config.Say&&!this.game.silentMode&&this.game.player.sprite.visible&&this.game.player.say(this.config.Say[this.game.activeLanguage]),this.solved=!0},k.prototype.createDoor=function(t){t.door=!0,t.newScene=this.config.Modify.Door.To,t.playerPos=this.config.Modify.Door.Player,t.sprite.removeAllListeners(),t.sprite.on("pointertap",P),t.use=I},k.prototype.createInventoryObject=function(t){this.game.objects[t].take()};var T=h.dragonBones.PixiFactory.factory,S=function(){this.game=null,this.state=null,this.lock=!1};S.prototype.setup=function(t){T.parseDragonBonesData(t.Skeleton),T.parseTextureAtlasData(t.Json,t.Texture),this.sprite=T.buildArmatureDisplay(t.Armature),this.tween=PIXI.tweenManager.createTween(this.sprite),this.tween.on("end",this.stop.bind(this)),this.animations=null!=t.Animations?t.Animations:{Stand:"stand",Walk:"walk",Take:"take",Use:"use",Say:"speak"},this.animate(this.animations.Stand),this.state="stand",this.sprite.parentLayer=this.game.layer,this.sprite.x=500,this.sprite.y=600,this.config=t.data},S.prototype.move=function(t){var i=t,e=function(t,i,e){var s,n,h=Math.round(t.x),r=Math.round(t.y);if(a(e,h,r)){if(void 0!==i)for(var c=0;c<i.length;c++)if(a(i[c],h,r)){s=o(e,h,r).point,n={x:Math.round(s.x)+1,y:Math.round(s.y)+1};break}}else s=o(e,h,r).point,n={x:Math.round(s.x)+1,y:Math.round(s.y)+1};return n}(t,this.game.activeScene.config.Obstacles,this.game.activeScene.config.WalkArea);e&&(i=e);var s=new PIXI.tween.TweenPath,n=this.game.activeScene.walkable.findPath(this.sprite.x,this.sprite.y,i.x,i.y,0);if(n.length>0){this.tween.stop().clear(),this.animate(this.animations.Walk),this.sprite.armature.flipX=!(this.sprite.x<i.x),s.drawShape(new PIXI.Polygon(n)),this.tween.path=s;var h=5*Math.abs(this.sprite.x-i.x)+5*Math.abs(this.sprite.y-i.y)+100*n.length;this.tween.time=h,this.tween.speed=1,this.tween.delay=10,this.tween.start()}},S.prototype.update=function(){PIXI.tweenManager.update()},S.prototype.stop=function(){this.animate(this.animations.Stand),this.game.activeState=null},S.prototype.say=function(t){this.lock=!0,this.game.textField.setText(t),this.game.textField.setColor(this.config.Color),this.game.textField.show(),this.animate(this.animations.Say),setTimeout(this.game.textField.skip.bind(this.game.textField),this.game.textField.timeOut())},S.prototype.animate=function(t,i){this.sprite.animation.lastAnimationName!==t&&this.sprite.animation.fadeIn(t,.25,i)};var j=h.dragonBones.EventObject,O=function(t){function i(){t.apply(this,arguments)}return t&&(i.__proto__=t),(i.prototype=Object.create(t&&t.prototype)).constructor=i,i.prototype.move=function(i){t.prototype.move.call(this,i),this.game.activeState=this},i.prototype.stop=function(){t.prototype.stop.call(this),this.lock&&(this.lock=!1)},i.prototype.look=function(){this.game.activeObject&&(this.say(this.game.activeObject.config.Description[this.game.activeLanguage]),this.game.activeObject.cancel())},i.prototype.take=function(){this.game.activeObject&&(this.lock=!0,this.animate(this.animations.Take,1),this.sprite.once(j.COMPLETE,this.takeEnd,this))},i.prototype.takeEnd=function(){this.stop(),this.game.activeObject&&(this.game.inventory.add(this.game.activeObject.config.Name,this),this.game.activeObject.cancel()),this.lock=!1},i}(S),C=function(e){this.settings={},this.data={},this.width=e.width,this.height=e.height,this.playSounds=!0,this.app=new t(e.width,e.height,{autoResize:!0,resolution:devicePixelRatio}),this.app.renderer.autoResize=!0,this.app.stage=new i.Stage,void 0!==e.autoResize?this.app.renderer.autoResize=e.autoResize:window.addEventListener("resize",this.resize.bind(this)),e.parent?document.getElementById(e.parent).appendChild(this.app.view):document.body.appendChild(this.app.view),this.preload(e.files)};C.prototype.preload=function(t){this.loadinProgress=new e("0 %",{fill:"white",fontSize:50}),this.loadinProgress.anchor.set(.5),this.loadinProgress.x=this.width/2,this.loadinProgress.y=this.height/2,this.app.stage.addChild(this.loadinProgress),this.jsons=new r,this.jsons.game=this,this.jsons.addJSON(t),this.jsons.load(this.load.bind(this))},C.prototype.load=function(){this.files=new r,this.files.game=this,this.files.addFiles(Object.values(this.jsons.resources)),this.files.load(this.setup.bind(this))},C.prototype.setup=function(){var t;this.app.stage.removeChild(this.loadinProgress),this.addZOrder(),this.resize(),this.scenes={},this.objects={},this.puzzles=[],this.activeLanguage=0,this.activeScene=null,this.activeObject=null,this.activeState=null,this.addScene("Title",new y,this.settings.TitleScreen);var i=this.data.objects.length;for(t=0;t<i;t++)this.addObject(this.data.objects[t].Name,new x,this.data.objects[t]);for(i=this.data.scenes.length,t=0;t<i;t++)this.addScene(this.data.scenes[t].Name,new f,this.data.scenes[t]);for(this.setScene("Title"),i=this.data.puzzles.length,t=0;t<i;t++)this.addPuzzle(this.data.puzzles[t].Name,new k,this.data.puzzles[t]);this.addInventory(),this.addTextField(),this.addPlayer(),this.app.ticker.add(this.loop.bind(this))},C.prototype.loop=function(t){null!=this.activeState&&this.activeState.update(t)},C.prototype.addObject=function(t,i,e){this.objects[t]=i,i.config=e,i.game=this,i.build()},C.prototype.addScene=function(t,i,e){this.scenes[t]=i,i.setup(e),i.game=this,i.build()},C.prototype.addPuzzle=function(t,i,e){this.puzzles.push(i),i.config=e,i.game=this},C.prototype.getPuzzle=function(t){for(var i,e=0;e<this.puzzles.length;e++)if(t==this.puzzles[e].config.Combine||t==this.puzzles[e].config.Target||t==this.puzzles[e].config.Give){this.puzzles[e].checkCollision()&&(i=e);break}return i},C.prototype.setScene=function(t){null!=this.activeScene&&this.app.stage.removeChild(this.activeScene.container),this.activeScene=this.scenes[t],this.app.stage.addChild(this.activeScene.container)},C.prototype.addZOrder=function(){this.sortGroup=new i.Group(0,!0),this.sortGroup.on("sort",function(t){t.zOrder=-t.y}),this.onTopGroup=new i.Group(1,!1),this.UIGroup=new i.Group(2,!1),this.layer=new i.Layer(this.sortGroup),this.layeronTop=new i.Layer(this.onTopGroup),this.layerUI=new i.Layer(this.UIGroup),this.app.stage.group.enableSort=!0,this.app.stage.addChild(this.layer),this.app.stage.addChild(this.layeronTop),this.app.stage.addChild(this.layerUI)},C.prototype.addInventory=function(){this.inventory=new w,this.inventory.game=this,this.inventory.build()},C.prototype.addPlayer=function(){var t={Skeleton:this.files.resources.playerSkeleton.data,Json:this.files.resources.playerJson.data,Texture:this.files.resources.playerTex.texture,Armature:this.data.player.Armature,Animations:this.data.player.Animations,data:this.data.player};this.player=new O,this.player.game=this,this.player.setup(t)},C.prototype.addTextField=function(){this.textField=new d,this.textField.game=this,this.textField.build()},C.prototype.resize=function(){var t=window.innerWidth*window.devicePixelRatio,i=window.innerHeight*window.devicePixelRatio,e=Math.min(t/this.width,i/this.height);this.app.renderer.resize(this.width*e,this.height*e),this.app.stage.scale.set(e)},C.prototype.start=function(){this.setScene(this.settings.FirstScene),this.app.stage.addChild(this.inventory.container),this.app.stage.addChild(this.inventory.icon),this.app.stage.addChild(this.player.sprite),this.app.stage.addChild(this.textField.container)},console.log("JSGAM 5.0.0 https://github.com/kreezii/jsgam");export default C;
//# sourceMappingURL=jsgam.mjs.map
