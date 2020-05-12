var jsgam = window.jsgam.default;

//Basic game configuration
var config = {
  width: 800, //Must be the same the image backgrounds
  height: 450, //Must be the same the image backgrounds
  //autoResize:false
  //parent:'layerInMyWebpage';
  files:[
    //Add the path to the atlas JSONs files, the fonts and the JSON generated with the JSGAM Editor
    //For example:

    /*
    'data/imgs/spritesheet.json',
    'data/backgrounds/backgrounds.json',
    'data/fonts/courgette.fnt',
    'data/fonts/courgette-regular-blue.fnt',
    */

    /*
    'test/backgrounds/backgrounds.json',
    'test/sprites/spritesheet.json',
    'test/fonts/m5x7.fnt',
    'test/game.json'
    */
    
    'data/backgrounds/backgrounds.json',
    'data/sprites/sprites.json',
    //'data/fonts/m5x7.fnt',
    'data/fonts/PermanentMarker-Regular.fnt',
    'data/game.json'
  ]
};

new jsgam(config); //This command makes all the magic