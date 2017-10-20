var game;
var wheel; 
var canSpin;
var slices = 8;
var slicePrizes = ["This is intended behaviour.", "It's WNF", "Our QA team is addind it right now.", "Re-check QADB for 100500 times and BUG IT!", "This issue is too minor and not worth submiting.", "We have a general bug for this issue.", "Our tester are investigating your issue.", "Don't submit it, probably NAB."];
var prize;
var prizeText;

window.onload = function() {	
	game = new Phaser.Game(458, 528, Phaser.AUTO, "");
     game.state.add("PlayGame",playGame);
     game.state.start("PlayGame");
}
var playGame = function(game){};
playGame.prototype = {
     preload: function(){
          // preloading graphic assets
          game.load.image("wheel", "wheel.png");
	  game.load.image("pin", "pin.png");     
     },
  	create: function(){
  		game.stage.backgroundColor = "#ffffff";
  		wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
          wheel.anchor.set(0.5);
          var pin = game.add.sprite(game.width / 2, game.width / 2, "pin");
          pin.anchor.set(0.5);
	  var style = { font: 'bold 20pt Arial', fill: 'black', align: 'center', wordWrap: true, wordWrapWidth: 450 };
          prizeText = game.add.text(game.world.centerX, 480, "", style);
          prizeText.anchor.set(0.5);
          prizeText.align = "center";
          canSpin = true;
          game.input.onDown.add(this.spin, this);		
	},
     spin(){
          if(canSpin){  
               prizeText.text = "";
               var rounds = game.rnd.between(2, 4);
               var degrees = game.rnd.between(0, 360);
               prize = slices - 1 - Math.floor(degrees / (360 / slices));
               canSpin = false;
               var spinTween = game.add.tween(wheel).to({
                    angle: 360 * rounds + degrees
               }, 3000, Phaser.Easing.Quadratic.Out, true);
               spinTween.onComplete.add(this.winPrize, this);
          }
     },
     winPrize(){
          canSpin = true;
          prizeText.text = slicePrizes[prize];
     }
}
