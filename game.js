// define variables
var game;
var player;
var platforms;
//var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var poisonMessage;
var won = false;
var currentScore = 0;
var winningScore = 285;

// wait function comes in handy when something needs to be depicted for a couple of seconds only. It stops the algorhythm for given miliseconds
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  /*createItem(375, 400, 'coin');
  createItem(575, 500, 'coin');
  createItem(225, 500, 'coin');
  createItem(100, 250, 'coin');
  createItem(575, 150, 'coin');
  createItem(525, 300, 'coin');
  createItem(650, 250, 'coin');
  createItem(225, 200, 'coin');
  createItem(375, 100, 'poison');
  createItem(370,500,'poison');
  createItem(100, 375, 'poison');
  createItem(125, 50, 'star');*/

  createItem(100, 590-32, 'poison');
  createItem(192*3.8, 660, 'poison');//platform 9
  createItem(192*4.2, 660, 'poison');//platform 9
  createItem(192*7.2, 460, 'poison');
  createItem(192*3.5, 540-310, 'poison');//7
  createItem(192*1.3, 540-185, 'poison');//6
  createItem(192*1.55, 540-185, 'poison');//6


  createItem(100+100, 590-32+100, 'coin');
  createItem(192*2.6, 600, 'coin');

createItem(192*4, 540, 'coin');//platform 9

createItem(192*1.5, 500, 'coin');//platform 2
createItem(192*2.5, 490, 'coin');//platform 3

createItem(192*5.2, 660, 'coin');
createItem(192*6.2, 660, 'coin');
createItem(192*7.2, 660, 'coin');

createItem(192*5.8, 440, 'coin'); //platform 10

createItem(192*6.8, 250, 'coin'); //platform 11
createItem(192*7.2, 160, 'coin'); //platform 11

createItem(192*2.5, 540-180, 'coin');//7
createItem(192*3.5, 540-240, 'coin');//8
createItem(192*0.5, 540-185, 'coin');//5

createItem(192*6, 100, 'coin'); //platform 12
createItem(192*5, 45, 'coin'); //platform 12

createItem(192*4.1, 105, 'coin'); //platform 13
createItem(192*3.1, 45, 'coin'); //platform 13

createItem(192*2.15, 125, 'coin'); //platform 14
createItem(192*1.25, 47, 'coin'); //platform 14

createItem(192*0.35, 125, 'coin'); //platform 15


}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(0, 590, 'platform');// 1
  platforms.create(192, 550, 'platform');// 2
  platforms.create(192*2, 540, 'platform'); //3
  platforms.create(192*2.1, 700-17, 'platform');//4

  platforms.create(0, 550-125, 'platform');//5
  platforms.create(192, 550-132, 'platform');//6
  platforms.create(192*2, 540-132, 'platform');//7
  platforms.create(192*3, 540-149, 'platform');//8

  platforms.create(192*3.5, 590, 'platform');//9

  platforms.create(192*5.5, 500, 'platform');//10
  platforms.create(192*6.5, 500-(670-500), 'platform');//11
  platforms.create(192*5.75, 500-(670-500)*2, 'platform');//12

  platforms.create(192*3.75, 500-(670-500)*1.95, 'platform');//13

  platforms.create(0, 200, 'platform');//14

  platforms.create(192*2, 200, 'platform');//15

/*
192*32
platforms.create(1000, 650, 'platform');
  platforms.create(1000, 450, 'platform');
  platforms.create(1000, 400, 'platform');
  platforms.create(200, 300, 'platform');
  platforms.create(200, 250, 'platform');
  platforms.create(200, 300, 'platform');
  platforms.create(200, 200, 'platform2');
  platforms.create(600, 450, 'platform2');
  platforms.create(600, 350, 'platform2');
  platforms.create(600, 100, 'platform2');*/
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
//function createBadge() {
//  badges = game.add.physicsGroup();
//  var badge = badges.create(750, 400, 'badge');
//  badge.animations.add('spin');
//}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  if (item.key === 'coin') {
     currentScore = currentScore + 15;
     poisonMessage.text = "";
   }

     else if (item.key === 'beer') {
        currentScore = currentScore + 25;
        poisonMessage.text = "";
          }
  else if (item.key === 'poison') {
     currentScore = currentScore - 25;
     // TEMPORARILY depicting this text!
      poisonMessage.text = "POISONED BY TÖRK x_x";
      wait(444);

  } else if (item.key === 'star') {
     currentScore = currentScore + 50;
     poisonMessage.text = "";
  }
  //if (currentScore >= 120) {
  //    createBadge();
  //}
  if (currentScore >= winningScore) {
    won = true;
  }
}

// when the player collects the badge at the end of the game
//function badgeHandler(player, badge) {
  //badge.kill();
  //currentScore = currentScore + 50;
//}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(1500, 700, Phaser.AUTO, 'gamecontainer', { preload: preload, create: create, update: update, render: render });

  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#5db1ad';

    //Load images
    game.load.image('platform', 'platform_1.png');
    game.load.image('platform2', 'platform_2.png');
    game.load.image('beer', 'beer.png');

    //Load spritesheets
    game.load.spritesheet('player', 'chalkers.png', 48, 77);
    game.load.spritesheet('coin', 'coin.png', 36, 44);
    //game.load.spritesheet('badge', 'badge.png', 42, 54);
    game.load.spritesheet('poison', 'poison.png', 32, 32);
    game.load.spritesheet('star', 'star.png', 32, 32);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 5000;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    poisonMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
    poisonMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    //game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -800;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 800;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -1400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "NOXON WINS!!!";

    }
  }

  function render() {

  }

};
