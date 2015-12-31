 levelOne();



 function levelOne() {

     var game = new Phaser.Game(800, 600, Phaser.AUTO, 'cute-game', {
         preload: preload,
         create: create,
         update: update,
         render: render
     });
	console.log(parseInt(localStorage.currentGameScore));
     var s = localStorage.ship;
	 var score = 0;
     function preload() {


         game.load.image('movebutton', 'assets/movebutton.png');
         game.load.image('bullet', 'assets/bullet.png');
         game.load.image('enemyBullet', 'assets/enemy-bullet.png');
         game.load.spritesheet('invader1', 'assets/cute1.png', 32, 32);
         game.load.spritesheet('invader2', 'assets/cute2.png', 32, 32);
         game.load.spritesheet('invader3', 'assets/cute3.png', 32, 32);
         game.load.spritesheet('invader4', 'assets/cute4.png', 32, 32);
         game.load.image('ship', s);
         game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
         game.load.image('starfield', 'assets/starfield.png');



     }
     var blaster;
     var explo;
     var player;
     var aliens;
     var bullets;
     var bullet;
     var live;
     var bulletTime = 0;
     var cursors;
     var fireButton;
     var explosions;
     var starfield;
     
     var scoreString = '';
     var scoreText;
     var lives;
     var enemyBullet;
     var enemyBullets;
     var firingTimer = 0;
     var stateText;
     var livingEnemies = [];
     var butt;

     function create() {
         game.physics.startSystem(Phaser.Physics.ARCADE);
         explo = game.add.audio('explo');
         blaster = game.add.audio('blaster');
         starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
         bullets = game.add.group();
         bullets.enableBody = true;
         bullets.physicsBodyType = Phaser.Physics.ARCADE;
         bullets.createMultiple(30, 'bullet');
         bullets.setAll('anchor.x', 0.5);
         bullets.setAll('anchor.y', 1);
         bullets.setAll('outOfBoundsKill', true);
         bullets.setAll('checkWorldBounds', true);
         enemyBullets = game.add.group();
         enemyBullets.enableBody = true;
         enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
         enemyBullets.createMultiple(30, 'enemyBullet');
         enemyBullets.setAll('anchor.x', 0.5);
         enemyBullets.setAll('anchor.y', 1);
         enemyBullets.setAll('outOfBoundsKill', true);
         enemyBullets.setAll('checkWorldBounds', true);
         player = game.add.sprite(400, 500, 'ship');
         player.anchor.setTo(0.5, 0.5);
         player.scale.setTo(1, 1);
         game.physics.enable(player, Phaser.Physics.ARCADE);
         player.enableBody = true;
         player.physicsBodyType = Phaser.Physics.ARCADE;
         player.body.collideWorldBounds = true;
         player.body.bounce.set(1);

         aliens = game.add.group();
         aliens.enableBody = true;
         aliens.physicsBodyType = Phaser.Physics.ARCADE;
         //player.body.collideWorldBounds=true;
         //player.body.bounce.set(1);
         createAliens();
         scoreString = ' Level One \n Score : ';
         scoreText = game.add.text(10, 10, scoreString + score, {
             font: '34px Arial',
             fill: '#FF00FF'
         });
         lives = game.add.group();
         game.add.text(game.world.width - 100, 10, 'Lives : ', {
             font: '34px Arial',
             fill: '#FF00FF'
         });
         stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
             font: '84px Arial',
             fill: '#FF00FF',
			 align: 'center'
         });
         stateText.anchor.setTo(0.5, 0.5);
         stateText.visible = false;
         for (var i = 0; i < 3; i++) {
             var ship = lives.create(game.world.width - 100 + 30 * i, 60, 'ship');
             ship.anchor.setTo(0.5, 0.5);
             ship.scale.setTo(.5, .5);

             ship.alpha = 1;
         }
         explosions = game.add.group();
         explosions.createMultiple(30, 'kaboom');
         explosions.forEach(setupInvader, this);
         cursors = game.input.keyboard.createCursorKeys();
         fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
         butt = game.add.button(game.world.centerX - -275, 520, 'movebutton', actionOnClick, this, 2, 1, 0);
     }

     function createAliens() {
         
         for (var x = 0; x < 10; x++) {
             var alien = aliens.create(x * 48, 1, 'invader1');
             alien.scale.setTo(2, 2);
             alien.anchor.setTo(0.5, 0.5);
             //alien.body.moves = false;
         }
         for (var x = 0; x < 10; x++) {
             var alien = aliens.create(x * 48, 51, 'invader2');
             alien.scale.setTo(2, 2);
             alien.anchor.setTo(0.5, 0.5);
             //alien.body.moves = false;
         }
         for (var x = 0; x < 10; x++) {
             var alien = aliens.create(x * 48, 101, 'invader3');
             alien.scale.setTo(2, 2);
             alien.anchor.setTo(0.5, 0.5);
             //alien.body.moves = false;
         }
         for (var x = 0; x < 10; x++) {
             var alien = aliens.create(x * 48, 151, 'invader4');
             alien.scale.setTo(2, 2);
             alien.anchor.setTo(0.5, 0.5);
             //alien.body.moves = false;
         }
         aliens.x = 50;
         aliens.y = 50;
         var tween = game.add.tween(aliens).to({
             x: 300
         }, 5000, Phaser.Easing.Linear.None, true, 0, 4000, true);
         tween.onLoop.add(descend, this);
     }

     function setupInvader(invader) {
         invader.anchor.x = 0.5;
         invader.anchor.y = 0.5;
         invader.animations.add('kaboom');

     }

     function descend() {
         aliens.y += 2;
         aliens.x += 10;
     }

     function actionOnClick() {
         if (player.body.velocity.x === 200) {
             player.body.velocity.x = -200;
         } else {
             player.body.velocity.x = 200;
         }
     }

     function update() {

         starfield.tilePosition.y += 2;
         if (player.alive) {



             fireBullet();
             blaster.play();

             if (game.time.now > firingTimer) {
                 enemyFires();
             }
             game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
             game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
         }
     }

     function render() {}

     function collisionHandler(bullet, alien) {
         bullet.kill();
         alien.kill();
         explo.play();
         score += 20;
         scoreText.text = scoreString + score;
         var explosion = explosions.getFirstExists(false);
         explosion.reset(alien.body.x, alien.body.y);
         explosion.play('kaboom', 30, false, true);
         if (aliens.countLiving() == 0) {
             score += lives.countLiving()*1000;
			 
			 enemyBullets.callAll('kill');
             scoreText.text = scoreString + score;
			 
			 var SCORE = score.toString(); 
			 localStorage.currentGameScore = SCORE;
			 console.log(localStorage.currentGameScore);
             enemyBullets.callAll('kill', this);
             stateText.text = ' You Won, \n Click to start \n level 2';
             stateText.visible = true;
             if (score !== 0) {
                 // var game_session = Parse.Object.extend('game_session');
                 // var game_session = new game_session();
                 // game_session.set(' Level', 1);
                 // game_session.set('high_score', score);
                 // var currentUser = Parse.User.current();
                 // currentUser.fetch({
                 // success: function success(result) {
                 // game_session.set('playername', result.attributes.full_name);
                 // game_session.set('player_pic', result.attributes.profile_pic_url);
                 // game_session.save();
                 // }
                 // });
             }
             game.input.onTap.addOnce(stopOneStartTwo, this);
         }
     }

     function stopOneStartTwo() {
         levelTwo();
         game.destroy();
     }

     function enemyHitsPlayer(player, bullet) {
         bullet.kill();
         explo.play();
         live = lives.getFirstAlive();
         if (live) {
             live.kill();
         }
         var explosion = explosions.getFirstExists(false);
         explosion.reset(player.body.x, player.body.y);
         explosion.play('kaboom', 30, false, true);
         if (lives.countLiving() < 1) {
             player.kill();
             enemyBullets.callAll('kill');
             stateText.text = 'Cuties win \n Tap to restart \n this level';
             stateText.visible = true;
             if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 1);
                 HighScore.save();
                 
             }
             
			 score = 0;
             game.input.onTap.addOnce(restart, this);
         }
     }

     function enemyFires() {
         enemyBullet = enemyBullets.getFirstExists(false);
         livingEnemies.length = 0;
         aliens.forEachAlive(function(alien) {
             livingEnemies.push(alien);
         });
         if (enemyBullet && livingEnemies.length > 0) {
             var random = game.rnd.integerInRange(0, livingEnemies.length - 1);
             var shooter = livingEnemies[random];
             enemyBullet.reset(shooter.body.x, shooter.body.y);
             game.physics.arcade.moveToObject(enemyBullet, player, 120);
             firingTimer = game.time.now + 2000;
         }
     }

     function fireBullet() {
         if (game.time.now > bulletTime) {
             bullet = bullets.getFirstExists(false);
             if (bullet) {
                 bullet.reset(player.x, player.y + 8);
                 bullet.body.velocity.y = -400;
                 bulletTime = game.time.now + 200;
             }
         }
     }

     function resetBullet(bullet) {
         bullet.kill();
     }

     function restart() {
         lives.callAll('revive');
         aliens.removeAll();
         createAliens();
         player.revive();
         stateText.visible = false;
     }
 }

 function levelTwo() {
     //document.getElementById("cute-game").innerHTML="";

     var game = new Phaser.Game(800, 600, Phaser.AUTO, 'cute-game', {
         preload: preload,
         create: create,
         update: update,
         render: render
     });

     var s = localStorage.ship;
var score = parseInt(localStorage.currentGameScore);
     function preload() {
         game.load.image('movebutton', 'assets/movebutton.png');
         game.load.image('bullet', 'assets/bullet.png');
         game.load.image('enemyBullet', 'assets/enemy-bullet.png');
         game.load.image('movebutton', 'assets/movebutton.png');
         game.load.spritesheet('invader1', 'assets/cute5.png', 32, 32);
         game.load.spritesheet('invader2', 'assets/cute6.png', 32, 32);
         game.load.spritesheet('invader3', 'assets/cute7.png', 32, 32);
         game.load.spritesheet('invader4', 'assets/cute8.png', 32, 32);
         game.load.image('ship', s);
         game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
         game.load.image('starfield', 'assets/starfield.png');
         game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
         game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
         game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
     }
     var blaster;
     var explo;
     var player;
     var aliens;
     var bullets;
     var bullet;
     var live;
     var bulletTime = 0;
     var cursors;
     var fireButton;
     var explosions;
     var starfield;
     
     var scoreString = '';
     var scoreText;
     var lives;
     var enemyBullet;
     var enemyBullets;
     var firingTimer = 0;
     var stateText;
     var livingEnemies = [];
     var butt;

     function create() {
         game.physics.startSystem(Phaser.Physics.ARCADE);
         explo = game.add.audio('explo');
         blaster = game.add.audio('blaster');
         starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
         bullets = game.add.group();
         bullets.enableBody = true;
         bullets.physicsBodyType = Phaser.Physics.ARCADE;
         bullets.createMultiple(30, 'bullet');
         bullets.setAll('anchor.x', 0.5);
         bullets.setAll('anchor.y', 1);
         bullets.setAll('outOfBoundsKill', true);
         bullets.setAll('checkWorldBounds', true);
         enemyBullets = game.add.group();
         enemyBullets.enableBody = true;
         enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
         enemyBullets.createMultiple(30, 'enemyBullet');
         enemyBullets.setAll('anchor.x', 0.5);
         enemyBullets.setAll('anchor.y', 1);
         enemyBullets.setAll('outOfBoundsKill', true);
         enemyBullets.setAll('checkWorldBounds', true);
         player = game.add.sprite(400, 500, 'ship');
         player.anchor.setTo(0.5, 0.5);
         player.scale.setTo(1, 1);

         game.physics.enable(player, Phaser.Physics.ARCADE);
         player.enableBody = true;
         player.physicsBodyType = Phaser.Physics.ARCADE;
         player.body.collideWorldBounds = true;
         player.body.bounce.set(1);
         player.body.bounce.set(1);
         aliens = game.add.group();
         aliens.enableBody = true;
         aliens.physicsBodyType = Phaser.Physics.ARCADE;
         createAliens();
         scoreString = ' Level Two \n Score : ';
         scoreText = game.add.text(10, 10, scoreString + score, {
             font: '34px Arial',
             fill: '#FF00FF'
         });
         lives = game.add.group();
         game.add.text(game.world.width - 100, 10, 'Lives : ', {
             font: '34px Arial',
             fill: '#FF00FF'
         });
         stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
             font: '84px Arial',
             fill: '#FF00FF',
			 align: 'center'
         });
         stateText.anchor.setTo(0.5, 0.5);
         stateText.visible = false;
         for (var i = 0; i < 3; i++) {
             var ship = lives.create(game.world.width - 100 + 30 * i, 60, 'ship');
             ship.anchor.setTo(0.5, 0.5);
             ship.scale.setTo(.5, .5);

             ship.alpha = 1;
         }
         explosions = game.add.group();
         explosions.createMultiple(30, 'kaboom');
         explosions.forEach(setupInvader, this);
         cursors = game.input.keyboard.createCursorKeys();
         fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
         butt = game.add.button(game.world.centerX - -275, 520, 'movebutton', actionOnClick, this, 2, 1, 0);
     }

     function createAliens() {
         
         for (var x = 0; x < 10; x++) {
             var alien = aliens.create(x * 48, 1 * 50, 'invader1');
             alien.scale.setTo(2, 2);
             alien.anchor.setTo(1, 1);
             game.physics.enable(alien, Phaser.Physics.ARCADE);
             alien.body.velocity.setTo(200, 200);
             alien.body.collideWorldBounds = true;
             alien.body.bounce.setTo(1, 1);
         }
         for (var x = 0; x < 10; x++) {
             var alien = aliens.create(x * 48, 2 * 50, 'invader2');
             alien.scale.setTo(2, 2);
             alien.anchor.setTo(2, 2);
             game.physics.enable(alien, Phaser.Physics.ARCADE);
             alien.body.velocity.setTo(600, 600);
             alien.body.collideWorldBounds = true;
             alien.body.bounce.setTo(1, 1);
         }
         for (var x = 0; x < 10; x++) {
             var alien = aliens.create(x * 48, 3 * 50, 'invader3');
             alien.scale.setTo(2, 2);
             alien.anchor.setTo(2, 2);
             game.physics.enable(alien, Phaser.Physics.ARCADE);
             alien.body.velocity.setTo(1000, 1000);
             alien.body.collideWorldBounds = true;
             alien.body.bounce.setTo(.9, .9);
         }
         for (var x = 0; x < 10; x++) {
             var alien = aliens.create(x * 48, 4 * 50, 'invader4');
             alien.scale.setTo(2, 2);
             alien.anchor.setTo(2, 2);
             game.physics.enable(alien, Phaser.Physics.ARCADE);
             alien.body.velocity.setTo(400, 400);
             alien.body.collideWorldBounds = true;
             alien.body.bounce.setTo(1, 1);
         }
         aliens.x = 100;
         aliens.y = 50;
         var tween = game.add.tween(aliens).to({
             x: 200
         }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
         tween.onLoop.add(descend, this);
     }

     function setupInvader(invader) {
         invader.anchor.x = 0.5;
         invader.anchor.y = 0.5;
         invader.animations.add('kaboom');
     }

     function descend() {
         aliens.y += 10;
     }

     function update() {

         starfield.tilePosition.y += 2;
         if (player.alive) {



             fireBullet();
             blaster.play();

             if (game.time.now > firingTimer) {
                 enemyFires();
             }
             game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
             game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
             //game.physics.arcade.overlap(aliens, player, enemySpriteHitsPlayer, null, this);
         }
     }

     function actionOnClick() {
         if (player.body.velocity.x === 200) {
             player.body.velocity.x = -200;
         } else {
             player.body.velocity.x = 200;
         }
     }

     function enemySpriteHitsPlayer(player, alien) {
         alien.kill();
         live = lives.getFirstAlive();
         if (live) {
             live.kill();
         }
         var explosion = explosions.getFirstExists(false);
         explosion.reset(player.body.x, player.body.y);
         explosion.play('kaboom', 30, false, true);
         if (lives.countLiving() < 1) {
             player.kill();
             enemyBullets.callAll('kill');
             stateText.text = 'Cuties win \n Tap to restart \n this level';
             stateText.visible = true;
			 score = parseInt(localStorage.currentGameScore);
             game.input.onTap.addOnce(restart, this);
			 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
				 HighScore.set(' Level', 1);
                 
                 HighScore.save();
                 
             }
         }
     }

     function render() {}

     function collisionHandler(bullet, alien) {
         bullet.kill();
         alien.kill();
         explo.play();
         score += 20;
         scoreText.text = scoreString + score;
         var explosion = explosions.getFirstExists(false);
         explosion.reset(alien.body.x, alien.body.y);
         explosion.play('kaboom', 30, false, true);
         if (aliens.countLiving() == 0) {
             score += lives.countLiving()*2000;
			 enemyBullets.callAll('kill');
             scoreText.text = scoreString + score;
			 var SCORE = score.toString(); 
			 localStorage.currentGameScore = SCORE;
             enemyBullets.callAll('kill', this);
             stateText.text = ' You Won, \n Click to start \n level 3';
             stateText.visible = true;
             if (score !== 0) {
                 // var game_session = Parse.Object.extend('game_session');
                 // var game_session = new game_session();
                 // game_session.set(' Level', 1);
                 // game_session.set('high_score', score);
                 // var currentUser = Parse.User.current();
                 // currentUser.fetch({
                 // success: function success(result) {
                 // game_session.set('playername', result.attributes.full_name);
                 // game_session.set('player_pic', result.attributes.profile_pic_url);
                 // game_session.save();
                 // }
                 // });
             }
             game.input.onTap.addOnce(stopOneStartTwo, this);
         }
     }

     function stopOneStartTwo() {
         levelThree();
         game.destroy();
     }

     function enemyHitsPlayer(player, bullet) {
         bullet.kill();
         explo.play();
         live = lives.getFirstAlive();
         if (live) {
             live.kill();
         }
         var explosion = explosions.getFirstExists(false);
         explosion.reset(player.body.x, player.body.y);
         explosion.play('kaboom', 30, false, true);
         if (lives.countLiving() < 1) {
             player.kill();
             enemyBullets.callAll('kill');
             stateText.text = 'Cuties win \n Tap to restart \n this level';
             stateText.visible = true;
             
                 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 2);
                 HighScore.save();
                 
             }
             score = parseInt(localStorage.currentGameScore);
             game.input.onTap.addOnce(restart, this);
         }
     }

     function enemyFires() {
         enemyBullet = enemyBullets.getFirstExists(false);
         livingEnemies.length = 0;
         aliens.forEachAlive(function(alien) {
             livingEnemies.push(alien);
         });
         if (enemyBullet && livingEnemies.length > 0) {
             var random = game.rnd.integerInRange(0, livingEnemies.length - 1);
             var shooter = livingEnemies[random];
             enemyBullet.reset(shooter.body.x, shooter.body.y);
             game.physics.arcade.moveToObject(enemyBullet, player, 120);
             firingTimer = game.time.now + 1000;
         }
     }

     function fireBullet() {
         if (game.time.now > bulletTime) {
             bullet = bullets.getFirstExists(false);
             if (bullet) {
                 bullet.reset(player.x, player.y + 8);
                 bullet.body.velocity.y = -400;
                 bulletTime = game.time.now + 200;
             }
         }
     }

     function resetBullet(bullet) {
         bullet.kill();
     }

     function restart() {
         lives.callAll('revive');
         aliens.removeAll();
         createAliens();
         player.revive();
         stateText.visible = false;
     }

 }
     function levelThree() {

         var game = new Phaser.Game(800, 600, Phaser.AUTO, 'cute-game', {
             preload: preload,
             create: create,
             update: update,
             render: render
         });

         var s = localStorage.ship;

         function preload() {
             game.load.image('movebutton', 'assets/movebutton.png');
             game.load.image('bullet', 'assets/bullet.png');
             game.load.image('enemyBullet', 'assets/enemy-bullet.png');
             game.load.spritesheet('invader1', 'assets/cute9.png', 32, 32);
             game.load.spritesheet('invader2', 'assets/cute10.png', 32, 32);
             game.load.spritesheet('invader3', 'assets/cute11.png', 32, 32);
             game.load.spritesheet('invader4', 'assets/cute12.png', 32, 32);
             game.load.image('ship', s);
             game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
             game.load.image('starfield', 'assets/cute11.jpg');
             game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
             game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
             game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
         }
         var blaster;
         var explo;
         var player;
         var aliens;
         var bullets;
         var bullet;
         var live;
         var bulletTime = 0;
         var cursors;
         var fireButton;
         var explosions;
         var starfield;
          var score = parseInt(localStorage.currentGameScore);
         var scoreString = '';
         var scoreText;
         var lives;
         var enemyBullet;
         var enemyBullets;
         var firingTimer = 0;
         var stateText;
         var livingEnemies = [];
         var butt;

         function create() {
             game.physics.startSystem(Phaser.Physics.ARCADE);
             explo = game.add.audio('explo');
             blaster = game.add.audio('blaster');
             starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
             bullets = game.add.group();
             bullets.enableBody = true;
             bullets.physicsBodyType = Phaser.Physics.ARCADE;
             bullets.createMultiple(30, 'bullet');
             bullets.setAll('anchor.x', 0.5);
             bullets.setAll('anchor.y', 1);
             bullets.setAll('outOfBoundsKill', true);
             bullets.setAll('checkWorldBounds', true);
             enemyBullets = game.add.group();
             enemyBullets.enableBody = true;
             enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
             enemyBullets.createMultiple(30, 'enemyBullet');
             enemyBullets.setAll('anchor.x', 0.5);
             enemyBullets.setAll('anchor.y', 1);
             enemyBullets.setAll('outOfBoundsKill', true);
             enemyBullets.setAll('checkWorldBounds', true);
             player = game.add.sprite(400, 500, 'ship');
             player.anchor.setTo(0.5, 0.5);
             player.scale.setTo(1, 1);
             game.physics.enable(player, Phaser.Physics.ARCADE);
             player.enableBody = true;
             player.physicsBodyType = Phaser.Physics.ARCADE;
             player.body.collideWorldBounds = true;
             player.body.bounce.set(1);
             aliens = game.add.group();
             aliens.enableBody = true;
             aliens.physicsBodyType = Phaser.Physics.ARCADE;
             createAliens();
             scoreString = ' Level Three \n Score : ';
             scoreText = game.add.text(10, 10, scoreString + score, {
                 font: '34px Arial',
                 fill: '#FF00FF'
             });
             lives = game.add.group();
             game.add.text(game.world.width - 100, 10, 'Lives : ', {
                 font: '34px Arial',
                 fill: '#FF00FF'
             });
             stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
                 font: '84px Arial',
                 fill: '#FF00FF',
			 align: 'center'
             });
             stateText.anchor.setTo(0.5, 0.5);
             stateText.visible = false;
             for (var i = 0; i < 5; i++) {
                 var ship = lives.create(game.world.width - 100 + 30 * i, 60, 'ship');
                 ship.anchor.setTo(0.5, 0.5);
             ship.scale.setTo(.5, .5);

                 ship.alpha = 1;
             }
             explosions = game.add.group();
             explosions.createMultiple(30, 'kaboom');
             explosions.forEach(setupInvader, this);
             cursors = game.input.keyboard.createCursorKeys();
             fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
             butt = game.add.button(game.world.centerX - -275, 520, 'movebutton', actionOnClick, this, 2, 1, 0);
         }

         function createAliens() {
             
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 1 * 50, 'invader1');
                 alien.scale.setTo(1, 1);
                 alien.anchor.setTo(0.5, 0.5);
                 alien.body.moves = false;
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 2 * 50, 'invader2');
                 alien.scale.setTo(2, 2);
                 alien.anchor.setTo(0.5, 0.5);
                 alien.body.moves = false;
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 3 * 50, 'invader3');
                 alien.scale.setTo(3, 3);
                 alien.anchor.setTo(0.5, 0.5);
                 alien.body.moves = false;
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 4 * 50, 'invader4');
                 alien.scale.setTo(1, 1);
                 alien.anchor.setTo(0.5, 0.5);
                 alien.body.moves = false;
             }
             aliens.x = 50;
             aliens.y = 0;
             var tween = game.add.tween(aliens).to({
                 x: 400
             }, 2000, Phaser.Easing.Linear.None, true, 0, 2000, true);
             tween.onLoop.add(descend, this);
         }

         function setupInvader(invader) {
             invader.anchor.x = 0.5;
             invader.anchor.y = 0.5;
             invader.animations.add('kaboom');
         }

         function descend() {
             aliens.y += 5;
         }

         function update() {

             starfield.tilePosition.y += 2;
             if (player.alive) {



                 fireBullet();
                 blaster.play();

                 if (game.time.now > firingTimer) {
                     enemyFires();
                 }
                 game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
                 game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
                 game.physics.arcade.overlap(aliens, player, enemySpriteHitsPlayer, null, this);
             }
         }

         function actionOnClick() {
             if (player.body.velocity.x === 200) {
                 player.body.velocity.x = -200;
             } else {
                 player.body.velocity.x = 200;
             }
         }

         function enemySpriteHitsPlayer(player, alien) {
             alien.kill();
             live = lives.getFirstAlive();
             if (live) {
                 live.kill();
             }
             var explosion = explosions.getFirstExists(false);
             explosion.reset(player.body.x, player.body.y);
             explosion.play('kaboom', 30, false, true);
             if (lives.countLiving() < 1) {
                 player.kill();
                 enemyBullets.callAll('kill');
                 stateText.text = 'Cuties win \n Tap to restart \n this level';
                 stateText.visible = true;
				 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 2);
                 HighScore.save();
                 
             }
			 score = parseInt(localStorage.currentGameScore);
                 game.input.onTap.addOnce(restart, this);
             }
         }

         function render() {}

         function collisionHandler(bullet, alien) {
             bullet.kill();
             alien.kill();
             explo.play();
             score += 80;
             scoreText.text = scoreString + score;
			 
             var explosion = explosions.getFirstExists(false);
             explosion.reset(alien.body.x, alien.body.y);
             explosion.play('kaboom', 30, false, true);
             if (aliens.countLiving() == 0) {
                 score += lives.countLiving()*3000;
				 enemyBullets.callAll('kill');
                 scoreText.text = scoreString + score;
				 var SCORE = score.toString(); 
			 localStorage.currentGameScore = SCORE;
                 enemyBullets.callAll('kill', this);
                 stateText.text = ' You Won, \n Click for level four';
                 stateText.visible = true;
                 if (score !== 0) {
                     // var game_session = Parse.Object.extend('game_session');
                     // var game_session = new game_session();
                     // game_session.set(' Level', 3);
                     // game_session.set('high_score', score);
                     // var currentUser = Parse.User.current();
                     // currentUser.fetch({
                     // success: function success(result) {
                     // console.log('fetch worked');
                     // game_session.set('playername', result.attributes.full_name);
                     // game_session.set('user_id', result.attributes.profile_pic_url);
                     // game_session.save();
                     // }
                     // });
                 }
                 game.input.onTap.addOnce(stopOneStartTwo, this);
             }
         }

         function stopOneStartTwo() {
             levelFour();
             game.destroy();
         }

         function enemyHitsPlayer(player, bullet) {
             bullet.kill();
             explo.play();
             live = lives.getFirstAlive();
             if (live) {
                 live.kill();
             }
             var explosion = explosions.getFirstExists(false);
             explosion.reset(player.body.x, player.body.y);
             explosion.play('kaboom', 30, false, true);
             if (lives.countLiving() < 1) {
                 player.kill();
                 enemyBullets.callAll('kill');
                 stateText.text = 'Cuties win \n Tap to restart \n this level';
                 stateText.visible = true;
                 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 3);
                 HighScore.save();
                 
             }
			 score = parseInt(localStorage.currentGameScore);
                 game.input.onTap.addOnce(restart, this);
             }
         }

         function enemyFires() {
             enemyBullet = enemyBullets.getFirstExists(false);
             livingEnemies.length = 0;
             aliens.forEachAlive(function(alien) {
                 livingEnemies.push(alien);
             });
             if (enemyBullet && livingEnemies.length > 0) {
                 var random = game.rnd.integerInRange(0, livingEnemies.length - 1);
                 var shooter = livingEnemies[random];
                 enemyBullet.reset(shooter.body.x, shooter.body.y);
                 game.physics.arcade.moveToObject(enemyBullet, player, 150);
                 firingTimer = game.time.now + 700;
             }
         }

         function fireBullet() {
             if (game.time.now > bulletTime) {
                 bullet = bullets.getFirstExists(false);
                 if (bullet) {
                     bullet.reset(player.x, player.y + 8);
                     bullet.body.velocity.y = -400;
                     bulletTime = game.time.now + 200;
                 }
             }
         }

         function resetBullet(bullet) {
             bullet.kill();
         }

         function restart() {
             lives.callAll('revive');
             aliens.removeAll();
             createAliens();
             player.revive();
             stateText.visible = false;
         }
     }

     function levelFour() {

         var game = new Phaser.Game(800, 600, Phaser.AUTO, 'cute-game', {
             preload: preload,
             create: create,
             update: update,
             render: render
         });

         var s = localStorage.ship;

         function preload() {
             game.load.image('movebutton', 'assets/movebutton.png');
             game.load.image('bullet', 'assets/bullet.png');
             game.load.image('enemyBullet', 'assets/enemy-bullet.png');
             game.load.spritesheet('invader1', 'assets/cute13.png', 32, 32);
             game.load.spritesheet('invader2', 'assets/cute14.png', 32, 32);
             game.load.spritesheet('invader3', 'assets/cute15.png', 32, 32);
             game.load.spritesheet('invader4', 'assets/cute16.png', 32, 32);
             game.load.image('ship', s);
             game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
             game.load.image('starfield', 'assets/starfield.png');
             game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
             game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
             game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
         }
         var blaster;
         var explo;
         var player;
         var aliens;
         var bullets;
         var bullet;
         var live;
         var bulletTime = 0;
         var cursors;
         var fireButton;
         var explosions;
         var starfield;
         var score = parseInt(localStorage.currentGameScore);
         var scoreString = '';
         var scoreText;
         var lives;
         var enemyBullet;
         var enemyBullets;
         var firingTimer = 0;
         var stateText;
         var livingEnemies = [];
         var butt;

         function create() {
             game.physics.startSystem(Phaser.Physics.ARCADE);
             explo = game.add.audio('explo');
             blaster = game.add.audio('blaster');
             starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
             bullets = game.add.group();
             bullets.enableBody = true;
             bullets.physicsBodyType = Phaser.Physics.ARCADE;
             bullets.createMultiple(30, 'bullet');
             bullets.setAll('anchor.x', 0.5);
             bullets.setAll('anchor.y', 1);
             bullets.setAll('outOfBoundsKill', true);
             bullets.setAll('checkWorldBounds', true);
             enemyBullets = game.add.group();
             enemyBullets.enableBody = true;
             enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
             enemyBullets.createMultiple(30, 'enemyBullet');
             enemyBullets.setAll('anchor.x', 0.5);
             enemyBullets.setAll('anchor.y', 1);
             enemyBullets.setAll('outOfBoundsKill', true);
             enemyBullets.setAll('checkWorldBounds', true);
             player = game.add.sprite(400, 500, 'ship');
             player.anchor.setTo(0.5, 0.5);
             player.scale.setTo(1, 1);
             game.physics.enable(player, Phaser.Physics.ARCADE);
             player.enableBody = true;
             player.physicsBodyType = Phaser.Physics.ARCADE;
             player.body.collideWorldBounds = true;
             player.body.bounce.set(1);
             aliens = game.add.group();
             aliens.enableBody = true;
             aliens.physicsBodyType = Phaser.Physics.ARCADE;
             createAliens();
             scoreString = ' Level Four \n Score : ';
             scoreText = game.add.text(10, 10, scoreString + score, {
                 font: '34px Arial',
                 fill: '#FF00FF'
             });
             lives = game.add.group();
             game.add.text(game.world.width - 100, 10, 'Lives : ', {
                 font: '34px Arial',
                 fill: '#FF00FF'
             });
             stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
                 font: '84px Arial',
                 fill: '#FF00FF',
			 align: 'center'
             });
             stateText.anchor.setTo(0.5, 0.5);
             stateText.visible = false;
             for (var i = 0; i < 3; i++) {
                 var ship = lives.create(game.world.width - 100 + 30 * i, 60, 'ship');
                 ship.anchor.setTo(0.5, 0.5);
                 ship.scale.setTo(.5, .5);

                 ship.alpha = 1;
             }
             explosions = game.add.group();
             explosions.createMultiple(30, 'kaboom');
             explosions.forEach(setupInvader, this);
             cursors = game.input.keyboard.createCursorKeys();
             fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
             butt = game.add.button(game.world.centerX - -275, 520, 'movebutton', actionOnClick, this, 2, 1, 0);
         }

         function createAliens() {
             
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 1 * 50, 'invader1');
                 alien.scale.setTo(1, 1);
                 alien.anchor.setTo(0.5, 0.5);
                 alien.body.moves = false;
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 2 * 50, 'invader2');
                 alien.scale.setTo(1, 1);
                 alien.anchor.setTo(0.5, 0.5);
                 alien.body.moves = false;
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 3 * 50, 'invader3');
                 alien.scale.setTo(1, 1);
                 alien.anchor.setTo(0.5, 0.5);
                 alien.body.moves = false;
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 4 * 50, 'invader4');
                 alien.scale.setTo(1, 1);
                 alien.anchor.setTo(0.5, 0.5);
                 alien.body.moves = false;
             }
             aliens.x = 100;
             aliens.y = 50;
             var tween = game.add.tween(aliens).to({
                 x: 200
             }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
             tween.onLoop.add(descend, this);
         }

         function setupInvader(invader) {
             invader.anchor.x = 0.5;
             invader.anchor.y = 0.5;
             invader.animations.add('kaboom');
         }

         function descend() {
             aliens.y += 0;
         }

         function update() {
             aliens.angle += 1;
             starfield.tilePosition.y += 2;
             if (player.alive) {



                 fireBullet();
                 blaster.play();

                 if (game.time.now > firingTimer) {
                     enemyFires();
                 }
                 game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
                 game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
                 game.physics.arcade.overlap(aliens, player, enemySpriteHitsPlayer, null, this);
             }
         }

         function actionOnClick() {
             if (player.body.velocity.x === 200) {
                 player.body.velocity.x = -200;
             } else {
                 player.body.velocity.x = 200;
             }
         }

         function enemySpriteHitsPlayer(player, alien) {
             alien.kill();
             live = lives.getFirstAlive();
             if (live) {
                 live.kill();
             }
             var explosion = explosions.getFirstExists(false);
             explosion.reset(player.body.x, player.body.y);
             explosion.play('kaboom', 30, false, true);
             if (lives.countLiving() < 1) {
                 player.kill();
                 enemyBullets.callAll('kill');
                 stateText.text = 'Cuties win \n Tap to restart \n this level';
                 stateText.visible = true;
				 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 3);
                 HighScore.save();
                 
             }
			 score = parseInt(localStorage.currentGameScore);
                 game.input.onTap.addOnce(restart, this);
             }
         }

         function render() {}

         function collisionHandler(bullet, alien) {
             bullet.kill();
             alien.kill();
             explo.play();
             score += 160;
             scoreText.text = scoreString + score;
             var explosion = explosions.getFirstExists(false);
             explosion.reset(alien.body.x, alien.body.y);
             explosion.play('kaboom', 30, false, true);
             if (aliens.countLiving() == 0) {
                 score += lives.countLiving()*4000;
				 enemyBullets.callAll('kill');
                 scoreText.text = scoreString + score;
				var SCORE = score.toString(); 
			 localStorage.currentGameScore = SCORE;
				 console.log(localStorage.currentGameScore);
                 enemyBullets.callAll('kill', this);
                 stateText.text = ' You Won, \n Click for level five';
                 stateText.visible = true;
                 if (score !== 0) {
                     // var game_session = Parse.Object.extend('game_session');
                     // var game_session = new game_session();
                     // game_session.set(' Level', 4);
                     // game_session.set('high_score', score);
                     // var currentUser = Parse.User.current();
                     // currentUser.fetch({
                     // success: function success(result) {
                     // game_session.set('playername', result.attributes.full_name);
                     // game_session.set('player_pic', result.attributes.profile_pic_url);
                     // game_session.save();
                     // }
                     // });
                 }
                 game.input.onTap.addOnce(stopOneStartTwo, this);
             }
         }

         function stopOneStartTwo() {
             levelFive();
             game.destroy();
         }

         function enemyHitsPlayer(player, bullet) {
             bullet.kill();
             explo.play();
             live = lives.getFirstAlive();
             if (live) {
                 live.kill();
             }
             var explosion = explosions.getFirstExists(false);
             explosion.reset(player.body.x, player.body.y);
             explosion.play('kaboom', 30, false, true);
             if (lives.countLiving() < 1) {
                 player.kill();
                 enemyBullets.callAll('kill');
                 stateText.text = 'Cuties win \n Tap to restart \n this level';
                 stateText.visible = true;
                
                     if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 4);
                 HighScore.save();
                 
             }
                 score = parseInt(localStorage.currentGameScore);
                 game.input.onTap.addOnce(restart, this);
             }
         }

         function enemySpriteHitsPlayer(player, alien) {
             alien.kill();
             live = lives.getFirstAlive();
             if (live) {
                 live.kill();
             }
             var explosion = explosions.getFirstExists(false);
             explosion.reset(player.body.x, player.body.y);
             explosion.play('kaboom', 30, false, true);
             if (lives.countLiving() < 1) {
                 player.kill();
                 enemyBullets.callAll('kill');
                 stateText.text = 'Cuties win \n Tap to restart \n this level';
                 stateText.visible = true;
				 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 4);
                 HighScore.save();
                 
             }
			 score = parseInt(localStorage.currentGameScore);
                 game.input.onTap.addOnce(restart, this);
             }
         }

         function enemyFires() {
             enemyBullet = enemyBullets.getFirstExists(false);
             livingEnemies.length = 0;
             aliens.forEachAlive(function(alien) {
                 livingEnemies.push(alien);
             });
             if (enemyBullet && livingEnemies.length > 0) {
                 var random = game.rnd.integerInRange(0, livingEnemies.length - 1);
                 var shooter = livingEnemies[random];
                 enemyBullet.reset(shooter.body.x, shooter.body.y);
                 game.physics.arcade.moveToObject(enemyBullet, player, 120);
                 firingTimer = game.time.now + 2000;
             }
         }

         function fireBullet() {
             if (game.time.now > bulletTime) {
                 bullet = bullets.getFirstExists(false);
                 if (bullet) {
                     bullet.reset(player.x, player.y + 8);
                     bullet.body.velocity.y = -400;
                     bulletTime = game.time.now + 200;
                 }
             }
         }

         function resetBullet(bullet) {
             bullet.kill();
         }

         function restart() {
             lives.callAll('revive');
             aliens.removeAll();
             createAliens();
             player.revive();
             stateText.visible = false;
         }
     }

     function levelFive() {

         var game = new Phaser.Game(800, 600, Phaser.AUTO, 'cute-game', {
             preload: preload,
             create: create,
             update: update,
             render: render
         });

         var s = localStorage.ship;

         function preload() {
             game.load.image('movebutton', 'assets/movebutton.png');
             game.load.image('bullet', 'assets/bullet.png');
             game.load.image('enemyBullet', 'assets/enemy-bullet.png');
             game.load.spritesheet('invader1', 'assets/cute17.png', 32, 32);
             game.load.spritesheet('invader2', 'assets/cute18.png', 32, 32);
             game.load.spritesheet('invader3', 'assets/cute19.png', 32, 32);
             game.load.spritesheet('invader4', 'assets/cute20.png', 32, 32);
             game.load.image('ship', s);
             game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
             game.load.image('starfield', 'assets/starfield.png');
             game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
             game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
             game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
         }
         var blaster;
         var explo;
         var player;
         var aliens;
         var bullets;
         var bullet;
         var live;
         var bulletTime = 0;
         var cursors;
         var fireButton;
         var explosions;
         var starfield;
          var score = parseInt(localStorage.currentGameScore);
         var scoreString = '';
         var scoreText;
         var lives;
         var enemyBullet;
         var enemyBullets;
         var firingTimer = 0;
         var stateText;
         var livingEnemies = [];
         var butt;

         function create() {
             game.physics.startSystem(Phaser.Physics.ARCADE);
             explo = game.add.audio('explo');
             blaster = game.add.audio('blaster');
             starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
             bullets = game.add.group();
             bullets.enableBody = true;
             bullets.physicsBodyType = Phaser.Physics.ARCADE;
             bullets.createMultiple(30, 'bullet');
             bullets.setAll('anchor.x', 0.5);
             bullets.setAll('anchor.y', 1);
             bullets.setAll('outOfBoundsKill', true);
             bullets.setAll('checkWorldBounds', true);
             enemyBullets = game.add.group();
             enemyBullets.enableBody = true;
             enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
             enemyBullets.createMultiple(30, 'enemyBullet');
             enemyBullets.setAll('anchor.x', 0.5);
             enemyBullets.setAll('anchor.y', 1);
             enemyBullets.setAll('outOfBoundsKill', true);
             enemyBullets.setAll('checkWorldBounds', true);
             player = game.add.sprite(400, 500, 'ship');
             player.anchor.setTo(0.5, 0.5);
             player.scale.setTo(1, 1);
             game.physics.enable(player, Phaser.Physics.ARCADE);
             player.enableBody = true;
             player.physicsBodyType = Phaser.Physics.ARCADE;
             player.body.collideWorldBounds = true;
             player.body.bounce.set(1);
             aliens = game.add.group();
             aliens.enableBody = true;
             aliens.physicsBodyType = Phaser.Physics.ARCADE;
             createAliens();
             scoreString = ' Level Five \n Score : ';
             scoreText = game.add.text(10, 10, scoreString + score, {
                 font: '34px Arial',
                 fill: '#FF00FF'
             });
             lives = game.add.group();
             game.add.text(game.world.width - 100, 10, 'Lives : ', {
                 font: '34px Arial',
                 fill: '#FF00FF'
             });
             stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
                 font: '84px Arial',
                 fill: '#FF00FF',
			 align: 'center'
             });
             stateText.anchor.setTo(0.5, 0.5);
             stateText.visible = false;
             for (var i = 0; i < 3; i++) {
                 var ship = lives.create(game.world.width - 100 + 30 * i, 60, 'ship');
                 ship.anchor.setTo(0.5, 0.5);
                 ship.scale.setTo(.5, .5);

                 ship.alpha = 1;
             }
             explosions = game.add.group();
             explosions.createMultiple(30, 'kaboom');
             explosions.forEach(setupInvader, this);
             cursors = game.input.keyboard.createCursorKeys();
             fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
             butt = game.add.button(game.world.centerX - -275, 520, 'movebutton', actionOnClick, this, 2, 1, 0);
         }

         function createAliens() {
            
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 1 * 50, 'invader1');
                 alien.scale.setTo(.5, .5);
                 alien.anchor.setTo(0.5, 0.5);
                 alien.body.moves = false;
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 2 * 50, 'invader2');
                 alien.scale.setTo(.5, .5);
                 alien.anchor.setTo(0.5, 0.5);
                 alien.body.moves = false;
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 3 * 50, 'invader3');
                 alien.scale.setTo(.5, .5);
                 alien.anchor.setTo(0.5, 0.5);
                 alien.body.moves = false;
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 4 * 50, 'invader4');
                 alien.scale.setTo(.5, .5);
                 alien.anchor.setTo(0.5, 0.5);
                 alien.body.moves = false;
             }
             aliens.x = 30;
             aliens.y = -100;
             var tween = game.add.tween(aliens).to({
                 x: 300
             }, 3000, Phaser.Easing.Linear.None, true, 0, 3000, true);
             tween.onLoop.add(descend, this);
         }

         function setupInvader(invader) {
             invader.anchor.x = 0.5;
             invader.anchor.y = 0.5;
             invader.animations.add('kaboom');
         }

         function descend() {
             aliens.y += 10;
         }

         function update() {

             starfield.tilePosition.y += 2;
             if (player.alive) {



                 fireBullet();
                 blaster.play();

                 if (game.time.now > firingTimer) {
                     enemyFires();
                 }
                 game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
                 game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
             }
         }

         function actionOnClick() {
             if (player.body.velocity.x === 200) {
                 player.body.velocity.x = -200;
             } else {
                 player.body.velocity.x = 200;
             }
         }

         function render() {}

         function collisionHandler(bullet, alien) {
             bullet.kill();
             alien.kill();
             explo.play();
             score += 320;
             scoreText.text = scoreString + score;
             var explosion = explosions.getFirstExists(false);
             explosion.reset(alien.body.x, alien.body.y);
             explosion.play('kaboom', 30, false, true);
             if (aliens.countLiving() == 0) {
                 score += lives.countLiving()*5000;
				 enemyBullets.callAll('kill');
                 scoreText.text = scoreString + score;
				 var SCORE = score.toString(); 
			 localStorage.currentGameScore = SCORE;
                 enemyBullets.callAll('kill', this);
                 stateText.text = ' You Won, \n Click for level six';
                 stateText.visible = true;
                 if (score !== 0) {
                     // var game_session = Parse.Object.extend('game_session');
                     // var game_session = new game_session();
                     // game_session.set(' Level', 5);
                     // game_session.set('high_score', score);
                     // var currentUser = Parse.User.current();
                     // currentUser.fetch({
                     // success: function success(result) {
                     // game_session.set('playername', result.attributes.full_name);
                     // game_session.set('player_pic', result.attributes.profile_pic_url);
                     // game_session.save();
                     // }
                     // });
                 }
                 game.input.onTap.addOnce(stopOneStartTwo, this);
             }
         }

         function stopOneStartTwo() {
             levelSix();
             game.destroy();
         }

         function enemyHitsPlayer(player, bullet) {
             bullet.kill();
             explo.play();
             live = lives.getFirstAlive();
             if (live) {
                 live.kill();
             }
             var explosion = explosions.getFirstExists(false);
             explosion.reset(player.body.x, player.body.y);
             explosion.play('kaboom', 30, false, true);
             if (lives.countLiving() < 1) {
                 player.kill();
                 enemyBullets.callAll('kill');
                 stateText.text = 'Cuties win \n Tap to restart \n this level';
                 stateText.visible = true;
                 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 5);
                 HighScore.save();
                 
             }
			 score = parseInt(localStorage.currentGameScore);
                 game.input.onTap.addOnce(restart, this);
             }
         }

         function enemySpriteHitsPlayer(player, alien) {
             alien.kill();
             live = lives.getFirstAlive();
             if (live) {
                 live.kill();
             }
             var explosion = explosions.getFirstExists(false);
             explosion.reset(player.body.x, player.body.y);
             explosion.play('kaboom', 30, false, true);
             if (lives.countLiving() < 1) {
                 player.kill();
                 enemyBullets.callAll('kill');
                 stateText.text = 'Cuties win \n Tap to restart \n this level';
                 stateText.visible = true;
				 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 5);
                 HighScore.save();
                 
             }
			 score = parseInt(localStorage.currentGameScore);
                 game.input.onTap.addOnce(restart, this);
             }
         }

         function enemyFires() {
             enemyBullet = enemyBullets.getFirstExists(false);
             livingEnemies.length = 0;
             aliens.forEachAlive(function(alien) {
                 livingEnemies.push(alien);
             });
             if (enemyBullet && livingEnemies.length > 0) {
                 var random = game.rnd.integerInRange(0, livingEnemies.length - 1);
                 var shooter = livingEnemies[random];
                 enemyBullet.reset(shooter.body.x, shooter.body.y);
                 game.physics.arcade.moveToObject(enemyBullet, player, 200);
                 firingTimer = game.time.now + 1000;
             }
         }

         function fireBullet() {
             if (game.time.now > bulletTime) {
                 bullet = bullets.getFirstExists(false);
                 if (bullet) {
                     bullet.reset(player.x, player.y + 8);
                     bullet.body.velocity.y = -400;
                     bulletTime = game.time.now + 200;
                 }
             }
         }

         function resetBullet(bullet) {
             bullet.kill();
         }

         function restart() {
             lives.callAll('revive');
             aliens.removeAll();
             createAliens();
             player.revive();
             stateText.visible = false;
         }
     }

     function levelSix() {

         var game = new Phaser.Game(800, 600, Phaser.AUTO, 'cute-game', {
             preload: preload,
             create: create,
             update: update,
             render: render
         });
         var s = localStorage.ship;

         function preload() {
             game.load.image('movebutton', 'assets/movebutton.png');
             game.load.image('bullet', 'assets/bullet.png');
             game.load.image('enemyBullet', 'assets/enemy-bullet.png');
             game.load.spritesheet('invader1', 'assets/cute21.png', 32, 32);
             game.load.spritesheet('invader2', 'assets/cute22.png', 32, 32);
             game.load.spritesheet('invader3', 'assets/cute23.png', 32, 32);
             game.load.spritesheet('invader4', 'assets/cute24.png', 32, 32);
             game.load.image('ship', s);
             game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
             game.load.image('starfield', 'assets/starfield.png');
             game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
             game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
             game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
         }
         var sword;
         var blaster;
         var explo;
         var player;
         var aliens;
         var bullets;
         var bullet;
         var live;
         var bulletTime = 0;
         var cursors;
         var fireButton;
         var explosions;
         var starfield;
          var score = parseInt(localStorage.currentGameScore);
         var scoreString = '';
         var scoreText;
         var lives;
         var enemyBullet;
         var enemyBullets;
         var firingTimer = 0;
         var stateText;
         var livingEnemies = [];
         var butt;

         function create() {
             game.physics.startSystem(Phaser.Physics.ARCADE);
             starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
             explo = game.add.audio('explo');
             blaster = game.add.audio('sword');
             bullets = game.add.group();
             bullets.enableBody = true;
             bullets.physicsBodyType = Phaser.Physics.ARCADE;
             bullets.createMultiple(30, 'bullet');
             bullets.setAll('anchor.x', 0.5);
             bullets.setAll('anchor.y', 1);
             bullets.setAll('outOfBoundsKill', true);
             bullets.setAll('checkWorldBounds', true);
             enemyBullets = game.add.group();
             enemyBullets.enableBody = true;
             enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
             enemyBullets.createMultiple(30, 'enemyBullet');
             enemyBullets.setAll('anchor.x', 0.5);
             enemyBullets.setAll('anchor.y', 1);
             enemyBullets.setAll('outOfBoundsKill', true);
             enemyBullets.setAll('checkWorldBounds', true);
             player = game.add.sprite(400, 500, 'ship');
             player.anchor.setTo(0.5, 0.5);
             player.scale.setTo(1, 1);
             game.physics.enable(player, Phaser.Physics.ARCADE);
             player.enableBody = true;
             player.physicsBodyType = Phaser.Physics.ARCADE;
             player.body.collideWorldBounds = true;
             player.body.bounce.set(1);
             aliens = game.add.group();
             aliens.enableBody = true;
             aliens.physicsBodyType = Phaser.Physics.ARCADE;
             createAliens();
             scoreString = ' Level Six \n Score : ';
             scoreText = game.add.text(10, 10, scoreString + score, {
                 font: '34px Arial',
                 fill: '#FF00FF'
             });
             lives = game.add.group();
             game.add.text(game.world.width - 100, 10, 'Lives : ', {
                 font: '34px Arial',
                 fill: '#FF00FF'
             });
             stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
                 font: '84px Arial',
                 fill: '#FF00FF',
			 align: 'center'
             });
             stateText.anchor.setTo(0.5, 0.5);
             stateText.visible = false;
             for (var i = 0; i < 4; i++) {
                 var ship = lives.create(game.world.width - 100 + 30 * i, 60, 'ship');
                 ship.anchor.setTo(0.5, 0.5);
                 ship.scale.setTo(.5, .5);

                 ship.alpha = 1;
             }
             explosions = game.add.group();
             explosions.createMultiple(30, 'kaboom');
             explosions.forEach(setupInvader, this);
             cursors = game.input.keyboard.createCursorKeys();
             fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
             butt = game.add.button(game.world.centerX - -275, 520, 'movebutton', actionOnClick, this, 2, 1, 0);

         }

         function createAliens() {
             
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 1 * 50, 'invader1');
                 alien.scale.setTo(2, 2);
                 alien.anchor.setTo(0.5, 0.5);
                 game.physics.enable(alien, Phaser.Physics.ARCADE);
                 alien.body.velocity.setTo(100, 1);
                 alien.body.collideWorldBounds = true;
                 alien.body.bounce.setTo(1, 1);
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 2 * 50, 'invader2');
                 alien.scale.setTo(3, 3);
                 alien.anchor.setTo(0.5, 0.5);
                 game.physics.enable(alien, Phaser.Physics.ARCADE);
                 alien.body.velocity.setTo(200, 1);
                 alien.body.collideWorldBounds = true;
                 alien.body.bounce.setTo(1, 1);
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 3 * 50, 'invader3');
                 alien.scale.setTo(4, 4);
                 alien.anchor.setTo(0.5, 0.5);
                 game.physics.enable(alien, Phaser.Physics.ARCADE);
                 alien.body.velocity.setTo(200, 1);
                 alien.body.collideWorldBounds = true;
                 alien.body.bounce.setTo(1, 1);
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 4 * 50, 'invader4');
                 alien.scale.setTo(2, 2);
                 alien.anchor.setTo(0.5, 0.5);
                 game.physics.enable(alien, Phaser.Physics.ARCADE);
                 alien.body.velocity.setTo(200, 1);
                 alien.body.collideWorldBounds = true;
                 alien.body.bounce.setTo(1, 1);
             }
             aliens.x = 100;
             aliens.y = 50;
             var tween = game.add.tween(aliens).to({
                 x: 200
             }, 4000, Phaser.Easing.Linear.None, true, 0, 4000, true);
             tween.onLoop.add(descend, this);
         }

         function setupInvader(invader) {
             invader.anchor.x = 0.5;
             invader.anchor.y = 0.5;
             invader.animations.add('kaboom');
         }

         function descend() {
             aliens.y += 0;
         }

         function update() {

             starfield.tilePosition.y += 2;
             if (player.alive) {



                 fireBullet();
                 blaster.play();

                 if (game.time.now > firingTimer) {
                     enemyFires();
                 }
                 game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
                 game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
             }
         }

         function actionOnClick() {
             if (player.body.velocity.x === 400) {
                 player.body.velocity.x = -400;
             } else {
                 player.body.velocity.x = 400;
             }
         }

         function render() {}

         function collisionHandler(bullet, alien) {
             bullet.kill();
             alien.kill();
             explo.play();
             score += 640;
             scoreText.text = scoreString + score;
             var explosion = explosions.getFirstExists(false);
             explosion.reset(alien.body.x, alien.body.y);
             explosion.play('kaboom', 30, false, true);
             if (aliens.countLiving() == 0) {
                 score += lives.countLiving()*6000;
				 enemyBullets.callAll('kill');
                 scoreText.text = scoreString + score;
				 var SCORE = score.toString(); 
			 localStorage.currentGameScore = SCORE;
                 enemyBullets.callAll('kill', this);
                 stateText.text = ' You Won, \n Click for level seven';
                 stateText.visible = true;
                 if (score !== 0) {
                     // var game_session = Parse.Object.extend('game_session');
                     // var game_session = new game_session();
                     // game_session.set(' Level', 6);
                     // game_session.set('high_score', score);
                     // var currentUser = Parse.User.current();
                     // currentUser.fetch({
                     // success: function success(result) {
                     // game_session.set('playername', result.attributes.full_name);
                     // game_session.set('player_pic', result.attributes.profile_pic_url);
                     // game_session.save();
                     // }
                     // });
                 }
                 game.input.onTap.addOnce(stopOneStartTwo, this);
             }
         }

         function stopOneStartTwo() {
             levelSeven();
             game.destroy();
         }

         function enemyHitsPlayer(player, bullet) {
             bullet.kill();
             explo.play();
             live = lives.getFirstAlive();
             if (live) {
                 live.kill();
             }
             var explosion = explosions.getFirstExists(false);
             explosion.reset(player.body.x, player.body.y);
             explosion.play('kaboom', 30, false, true);
             if (lives.countLiving() < 1) {
                 player.kill();
                 enemyBullets.callAll('kill');
                 stateText.text = 'Cuties win \n Tap to restart \n this level';
                 stateText.visible = true;
                if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
				 HighScore.set(' Level', 6);
                 
                 HighScore.save();
                 
             }
			 score = parseInt(localStorage.currentGameScore);
                 game.input.onTap.addOnce(restart, this);
             }
         }

         function enemyFires() {
             enemyBullet = enemyBullets.getFirstExists(false);
             livingEnemies.length = 0;
             aliens.forEachAlive(function(alien) {
                 livingEnemies.push(alien);
             });
             if (enemyBullet && livingEnemies.length > 0) {
                 var random = game.rnd.integerInRange(0, livingEnemies.length - 1);
                 var shooter = livingEnemies[random];
                 enemyBullet.reset(shooter.body.x, shooter.body.y);
                 game.physics.arcade.moveToObject(enemyBullet, player, 400);
                 firingTimer = game.time.now + 800;
             }
         }

         function fireBullet() {
             if (game.time.now > bulletTime) {
                 bullet = bullets.getFirstExists(false);
                 if (bullet) {
                     bullet.reset(player.x, player.y + 8);
                     bullet.body.velocity.y = -400;
                     bulletTime = game.time.now + 1000;
                 }
             }
         }

         function resetBullet(bullet) {
             bullet.kill();
         }

         function restart() {
             lives.callAll('revive');
             aliens.removeAll();
             createAliens();
             player.revive();
             stateText.visible = false;
         }
     }

     function levelSeven() {

         var game = new Phaser.Game(800, 600, Phaser.AUTO, 'cute-game', {
             preload: preload,
             create: create,
             update: update,
             render: render
         });

         var s = localStorage.ship;

         function preload() {
             game.load.image('movebutton', 'assets/movebutton.png');
             game.load.image('bullet', 'assets/bullet.png');
             game.load.image('enemyBullet', 'assets/enemy-bullet.png');
             game.load.spritesheet('invader1', 'assets/cute25.png', 32, 32);
             game.load.spritesheet('invader2', 'assets/cute26.png', 32, 32);
             game.load.spritesheet('invader3', 'assets/cute27.png', 32, 32);
             game.load.spritesheet('invader4', 'assets/cute28.png', 32, 32);
             game.load.image('ship', s);
             game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
             game.load.image('starfield', 'assets/starfield.png');
             game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
             game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
             game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
         }
         var blaster;
         var explo;
         var player;
         var aliens;
         var bullets;
         var bullet;
         var live;
         var bulletTime = 0;
         var cursors;
         var fireButton;
         var explosions;
         var starfield;
          var score = parseInt(localStorage.currentGameScore);
         var scoreString = '';
         var scoreText;
         var lives;
         var enemyBullet;
         var enemyBullets;
         var firingTimer = 0;
         var stateText;
         var livingEnemies = [];
         var butt;

         function create() {
             game.physics.startSystem(Phaser.Physics.ARCADE);
             explo = game.add.audio('explo');
             blaster = game.add.audio('blaster');
             starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
             bullets = game.add.group();
             bullets.enableBody = true;
             bullets.physicsBodyType = Phaser.Physics.ARCADE;
             bullets.createMultiple(30, 'bullet');
             bullets.setAll('anchor.x', 0.5);
             bullets.setAll('anchor.y', 1);
             bullets.setAll('outOfBoundsKill', true);
             bullets.setAll('checkWorldBounds', true);
             enemyBullets = game.add.group();
             enemyBullets.enableBody = true;
             enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
             enemyBullets.createMultiple(30, 'enemyBullet');
             enemyBullets.setAll('anchor.x', 0.5);
             enemyBullets.setAll('anchor.y', 1);
             enemyBullets.setAll('outOfBoundsKill', true);
             enemyBullets.setAll('checkWorldBounds', true);
             player = game.add.sprite(400, 500, 'ship');
             player.anchor.setTo(0.5, 0.5);
             player.scale.setTo(1, 1);
             game.physics.enable(player, Phaser.Physics.ARCADE);
             player.enableBody = true;
             player.physicsBodyType = Phaser.Physics.ARCADE;
             player.body.collideWorldBounds = true;
             player.body.bounce.set(1);
             aliens = game.add.group();
             aliens.enableBody = true;
             aliens.physicsBodyType = Phaser.Physics.ARCADE;
             createAliens();
             scoreString = ' Level Seven \n Score : ';
             scoreText = game.add.text(10, 10, scoreString + score, {
                 font: '34px Arial',
                 fill: '#FF00FF'
             });
             lives = game.add.group();
             game.add.text(game.world.width - 100, 10, 'Lives : ', {
                 font: '34px Arial',
                 fill: '#FF00FF'
             });
             stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
                 font: '84px Arial',
                 fill: '#FF00FF',
			 align: 'center'
             });
             stateText.anchor.setTo(0.5, 0.5);
             stateText.visible = false;
             for (var i = 0; i < 3; i++) {
                 var ship = lives.create(game.world.width - 100 + 30 * i, 60, 'ship');
                 ship.anchor.setTo(0.5, 0.5);
                 ship.scale.setTo(.5, .5);

                 ship.alpha = 1;
             }
             explosions = game.add.group();
             explosions.createMultiple(30, 'kaboom');
             explosions.forEach(setupInvader, this);
             cursors = game.input.keyboard.createCursorKeys();
             fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
             butt = game.add.button(game.world.centerX - -275, 520, 'movebutton', actionOnClick, this, 2, 1, 0);
         }

         function createAliens() {
             
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 1 * 50, 'invader1');
                 alien.scale.setTo(2, 2);
                 alien.anchor.setTo(0.5, 0.5);
                 game.physics.enable(alien, Phaser.Physics.ARCADE);
                 alien.body.velocity.setTo(100, 21);
                 alien.body.collideWorldBounds = true;
                 alien.body.bounce.setTo(1, 1);
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 2 * 50, 'invader2');
                 alien.scale.setTo(2, 2);
                 alien.anchor.setTo(0.5, 0.5);
                 game.physics.enable(alien, Phaser.Physics.ARCADE);
                 alien.body.velocity.setTo(200, 1);
                 alien.body.collideWorldBounds = true;
                 alien.body.bounce.setTo(1, 1);
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 3 * 50, 'invader3');
                 alien.scale.setTo(2, 2);
                 alien.anchor.setTo(0.5, 0.5);
                 game.physics.enable(alien, Phaser.Physics.ARCADE);
                 alien.body.velocity.setTo(300, 1);
                 alien.body.collideWorldBounds = true;
                 alien.body.bounce.setTo(1, 1);
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, 4 * 50, 'invader4');
                 alien.scale.setTo(2, 2);
                 alien.anchor.setTo(0.5, 0.5);
                 game.physics.enable(alien, Phaser.Physics.ARCADE);
                 alien.body.velocity.setTo(400, 1);
                 alien.body.collideWorldBounds = true;
                 alien.body.bounce.setTo(1, 1);
             }
             aliens.x = 100;
             aliens.y = 50;
             var tween = game.add.tween(aliens).to({
                 x: 200
             }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
             tween.onLoop.add(descend, this);
         }

         function setupInvader(invader) {
             invader.anchor.x = 0.5;
             invader.anchor.y = 0.5;
             invader.animations.add('kaboom');
         }

         function descend() {
             aliens.y += 1;
         }

         function update() {

             starfield.tilePosition.y += 2;
             if (player.alive) {



                 fireBullet();
                 blaster.play();

                 if (game.time.now > firingTimer) {
                     enemyFires();
                 }
                 game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
                 game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
                 game.physics.arcade.overlap(aliens, player, enemySpriteHitsPlayer, null, this);
             }
         }

         function actionOnClick() {
             if (player.body.velocity.x === 200) {
                 player.body.velocity.x = -200;
             } else {
                 player.body.velocity.x = 200;
             }
         }

         function enemySpriteHitsPlayer(player, alien) {
             alien.kill();
             live = lives.getFirstAlive();
             if (live) {
                 live.kill();
             }
             var explosion = explosions.getFirstExists(false);
             explosion.reset(player.body.x, player.body.y);
             explosion.play('kaboom', 30, false, true);
             if (lives.countLiving() < 1) {
                 player.kill();
                 enemyBullets.callAll('kill');
                 stateText.text = 'Cuties win \n Tap to restart \n this level';
                 stateText.visible = true;
				 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 6);
                 HighScore.save();
                 
             }
			 score = parseInt(localStorage.currentGameScore);
                 game.input.onTap.addOnce(restart, this);
             }
         }

         function render() {}

         function collisionHandler(bullet, alien) {
             bullet.kill();
             alien.kill();
             explo.play();
             score += 1200;
			 
             scoreText.text = scoreString + score;
             var explosion = explosions.getFirstExists(false);
             explosion.reset(alien.body.x, alien.body.y);
             explosion.play('kaboom', 30, false, true);
             if (aliens.countLiving() == 0) {
                 score += lives.countLiving()*10000;
				 enemyBullets.callAll('kill');
                 scoreText.text = scoreString + score;
				var SCORE = score.toString(); 
			 localStorage.currentGameScore = SCORE;
                 enemyBullets.callAll('kill', this);
                 stateText.text = ' You Won, \n Click for level 8';
                 stateText.visible = true;
                 // if (score !== 0) {
                 // var game_session = Parse.Object.extend('game_session');
                 // var game_session = new game_session();
                 // game_session.set(' Level', 7);
                 // game_session.set('high_score', score);
                 // var currentUser = Parse.User.current();
                 // currentUser.fetch({
                 // success: function success(result) {
                 // game_session.set('playername', result.attributes.full_name);
                 // game_session.set('player_pic', result.attributes.profile_pic_url);
                 // game_session.save();
                 // }
                 // });
                 // }
                 game.input.onTap.addOnce(stopOneStartTwo, this);
             }
         }

         function stopOneStartTwo() {
             levelEight();
             game.destroy();
         }

         function enemyHitsPlayer(player, bullet) {
             bullet.kill();
             explo.play();
             live = lives.getFirstAlive();
             if (live) {
                 live.kill();
             }
             var explosion = explosions.getFirstExists(false);
             explosion.reset(player.body.x, player.body.y);
             explosion.play('kaboom', 30, false, true);
             if (lives.countLiving() < 1) {
                 player.kill();
                 enemyBullets.callAll('kill');
                 stateText.text = 'Cuties win \n Tap to restart \n this level';
                 stateText.visible = true;
                 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 7);
                 HighScore.save();
                 
             }
			 score = parseInt(localStorage.currentGameScore);
                 game.input.onTap.addOnce(restart, this);
             }
         }

         function enemyFires() {
             enemyBullet = enemyBullets.getFirstExists(false);
             livingEnemies.length = 0;
             aliens.forEachAlive(function(alien) {
                 livingEnemies.push(alien);
             });
             if (enemyBullet && livingEnemies.length > 0) {
                 var random = game.rnd.integerInRange(0, livingEnemies.length - 1);
                 var shooter = livingEnemies[random];
                 enemyBullet.reset(shooter.body.x, shooter.body.y);
                 game.physics.arcade.moveToObject(enemyBullet, player, 40);
                 firingTimer = game.time.now + 300;
             }
         }

         function fireBullet() {
             if (game.time.now > bulletTime) {
                 bullet = bullets.getFirstExists(false);
                 if (bullet) {
                     bullet.reset(player.x, player.y + 8);
                     bullet.body.velocity.y = -400;
                     bulletTime = game.time.now + 600;
                 }
             }
         }

         function resetBullet(bullet) {
             bullet.kill();
         }

         function restart() {
             lives.callAll('revive');
             aliens.removeAll();
             createAliens();
             player.revive();
             stateText.visible = false;
         }
     }

     function levelEight() {

         var game = new Phaser.Game(800, 600, Phaser.AUTO, 'cute-game', {
             preload: preload,
             create: create,
             update: update,
             render: render
         });

         var s = localStorage.ship;

         function preload() {
             game.load.image('movebutton', 'assets/movebutton.png');
             game.load.image('bullet', 'assets/bullet.png');
             game.load.image('enemyBullet', 'assets/enemy-bullet.png');
             game.load.spritesheet('invader1', 'assets/cute29.png', 32, 32);
             game.load.spritesheet('invader2', 'assets/cute30.png', 32, 32);
             game.load.spritesheet('invader3', 'assets/cute31.png', 32, 32);
             game.load.spritesheet('invader4', 'assets/cute32.png', 32, 32);
             game.load.image('ship', s);
             game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
             game.load.image('starfield', 'assets/starfield.png');
             game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
             game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
             game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
         }
         var blaster;
         var explo;
         var player;
         var aliens;
         var bullets;
         var bullet;
         var live;
         var bulletTime = 0;
         var cursors;
         var fireButton;
         var explosions;
         var starfield;
          var score = parseInt(localStorage.currentGameScore);
         var scoreString = '';
         var scoreText;
         var lives;
         var enemyBullet;
         var enemyBullets;
         var firingTimer = 0;
         var stateText;
         var livingEnemies = [];
         var butt;

         function create() {
             game.physics.startSystem(Phaser.Physics.ARCADE);
             explo = game.add.audio('explo');
             blaster = game.add.audio('blaster');
             starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
             bullets = game.add.group();
             bullets.enableBody = true;
             bullets.physicsBodyType = Phaser.Physics.ARCADE;
             bullets.createMultiple(30, 'bullet');
             bullets.setAll('anchor.x', 0.5);
             bullets.setAll('anchor.y', 1);
             bullets.setAll('outOfBoundsKill', true);
             bullets.setAll('checkWorldBounds', true);
             enemyBullets = game.add.group();
             enemyBullets.enableBody = true;
             enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
             enemyBullets.createMultiple(30, 'enemyBullet');
             enemyBullets.setAll('anchor.x', 0.5);
             enemyBullets.setAll('anchor.y', 1);
             enemyBullets.setAll('outOfBoundsKill', true);
             enemyBullets.setAll('checkWorldBounds', true);
             player = game.add.sprite(400, 500, 'ship');
             player.scale.setTo(.5, .5);
             player.anchor.setTo(0.5, 0.5);
             game.physics.enable(player, Phaser.Physics.ARCADE);
             player.enableBody = true;
             player.physicsBodyType = Phaser.Physics.ARCADE;
             player.body.collideWorldBounds = true;
             player.body.bounce.set(1);
             aliens = game.add.group();
             aliens.enableBody = true;
             aliens.physicsBodyType = Phaser.Physics.ARCADE;
             createAliens();
             scoreString = ' Level Eight \n Score : ';
             scoreText = game.add.text(10, 10, scoreString + score, {
                 font: '34px Arial',
                 fill: '#FF00FF'
             });
             lives = game.add.group();
             game.add.text(game.world.width - 100, 10, 'Lives : ', {
                 font: '34px Arial',
                 fill: '#FF00FF'
             });
             stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
                 font: '84px Arial',
                 fill: '#FF00FF',
			 align: 'center'
             });
             stateText.anchor.setTo(0.5, 0.5);
             stateText.visible = false;
             for (var i = 0; i < 5; i++) {
                 var ship = lives.create(game.world.width - 100 + 30 * i, 60, 'ship');
                 ship.anchor.setTo(0.5, 0.5);
                 ship.scale.setTo(.5, .5);

                 ship.alpha = 1;
             }
             explosions = game.add.group();
             explosions.createMultiple(30, 'kaboom');
             explosions.forEach(setupInvader, this);
             cursors = game.input.keyboard.createCursorKeys();
             fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
             butt = game.add.button(game.world.centerX - -275, 520, 'movebutton', actionOnClick, this, 2, 1, 0);
         }

         function createAliens() {
            
             for (var x = 0; x < 15; x++) {
                 var alien = aliens.create(x * 48, -400, 'invader1');
                 alien.scale.setTo(2, 2);
                 alien.anchor.setTo(0.5, 0.5);
                 game.physics.enable(alien, Phaser.Physics.ARCADE);
                 alien.body.velocity.setTo(400, 2);
                 alien.body.collideWorldBounds = true;
                 alien.body.bounce.setTo(1, 1);
             }
             for (var x = 0; x < 3; x++) {
                 var alien = aliens.create(x * 48, -300, 'invader2');
                 alien.scale.setTo(2, 2);
                 alien.anchor.setTo(0.5, 0.5);
                 game.physics.enable(alien, Phaser.Physics.ARCADE);
                 alien.body.velocity.setTo(2, 2);
                 alien.body.collideWorldBounds = true;
                 alien.body.bounce.setTo(1, 1);
             }
             for (var x = 0; x < 10; x++) {
                 var alien = aliens.create(x * 48, -200, 'invader3');
                 alien.scale.setTo(2, 2);
                 alien.anchor.setTo(0.5, 0.5);
                 game.physics.enable(alien, Phaser.Physics.ARCADE);
                 alien.body.velocity.setTo(800, 2);
                 alien.body.collideWorldBounds = true;
                 alien.body.bounce.setTo(1, 1);
             }
             for (var x = 0; x < 13; x++) {
                 var alien = aliens.create(x * 48, 0, 'invader4');
                 alien.scale.setTo(2, 2);
                 alien.anchor.setTo(0.5, 0.5);
                 game.physics.enable(alien, Phaser.Physics.ARCADE);
                 alien.body.velocity.setTo(200, 2);
                 alien.body.collideWorldBounds = true;
                 alien.body.bounce.setTo(1, 1);
             }
             aliens.x = 100;
             aliens.y = 50;
             var tween = game.add.tween(aliens).to({
                 x: 200
             }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
             tween.onLoop.add(descend, this);
         }

         function setupInvader(invader) {
             invader.anchor.x = 0.5;
             invader.anchor.y = 0.5;
             invader.animations.add('kaboom');
         }

         function descend() {
             aliens.y += 0;
         }

         function update() {

             starfield.tilePosition.y += 2;
             if (player.alive) {



                 fireBullet();
                 blaster.play();

                 if (game.time.now > firingTimer) {
                     enemyFires();
                 }
                 game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
                 game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
                 game.physics.arcade.overlap(aliens, player, enemySpriteHitsPlayer, null, this);
             }
         }

         function actionOnClick() {
             if (player.body.velocity.x === 600) {
                 player.body.velocity.x = -600;
             } else {
                 player.body.velocity.x = 600;
             }
         }

         function enemySpriteHitsPlayer(player, alien) {
             alien.kill();
             live = lives.getFirstAlive();
             if (live) {
                 live.kill();
             }
             var explosion = explosions.getFirstExists(false);
             explosion.reset(player.body.x, player.body.y);
             explosion.play('kaboom', 30, false, true);
             if (lives.countLiving() < 1) {
                 player.kill();
                 enemyBullets.callAll('kill');
                 stateText.text = 'Cuties win \n Tap to restart \n this level';
                 stateText.visible = true;
				 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 8);
                 HighScore.save();
                 
             }
			 score = parseInt(localStorage.currentGameScore);
                 game.input.onTap.addOnce(restart, this);
             }
         }

         function render() {}

         function collisionHandler(bullet, alien) {
             bullet.kill();
             alien.kill();
             explo.play();
             score += 5000;
			 
             scoreText.text = scoreString + score;
             var explosion = explosions.getFirstExists(false);
             explosion.reset(alien.body.x, alien.body.y);
             explosion.play('kaboom', 30, false, true);
             if (aliens.countLiving() == 0) {
                 score += lives.countLiving()*50000;
				 enemyBullets.callAll('kill');
                 scoreText.text = scoreString + score;
				 var SCORE = score.toString(); 
			 localStorage.currentGameScore = SCORE;
                 enemyBullets.callAll('kill', this);
                 stateText.text = ' Wow! You won \n the entire \n game!';
                 stateText.visible = true;
                 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 9);
                 HighScore.save();
                 
             }
                 //game.input.onTap.addOnce(stopOneStartTwo, this);
             }
         }

         function stopOneStartTwo() {
             levelOne();
             game.destroy();
         }

         function enemyHitsPlayer(player, bullet) {
             bullet.kill();
             explo.play();
             live = lives.getFirstAlive();
             if (live) {
                 live.kill();
             }
             var explosion = explosions.getFirstExists(false);
             explosion.reset(player.body.x, player.body.y);
             explosion.play('kaboom', 30, false, true);
             if (lives.countLiving() < 1) {
                 player.kill();
                 enemyBullets.callAll('kill');
                 stateText.text = 'Cuties win \n Tap to restart \n this level';
                 stateText.visible = true;
                 if (score !== 0) {
					var n = localStorage.name;
                 var highScore = Parse.Object.extend('highScore');
                 var HighScore = new highScore();
                 HighScore.set('name', n);
                 HighScore.set('score', score);
                 HighScore.set(' Level', 8);
                 HighScore.save();
                 
             }score = parseInt(localStorage.currentGameScore);
                 game.input.onTap.addOnce(restart, this);
             }
         }

         function stopOneStartTwo() {
             levelTwo();
             game.destroy();
         }

         function enemyFires() {
             enemyBullet = enemyBullets.getFirstExists(false);
             livingEnemies.length = 0;
             aliens.forEachAlive(function(alien) {
                 livingEnemies.push(alien);
             });
             if (enemyBullet && livingEnemies.length > 0) {
                 var random = game.rnd.integerInRange(0, livingEnemies.length - 1);
                 var shooter = livingEnemies[random];
                 enemyBullet.reset(shooter.body.x, shooter.body.y);
                 game.physics.arcade.moveToObject(enemyBullet, player, 700);
                 firingTimer = game.time.now + 100;
             }
         }

         function fireBullet() {
             if (game.time.now > bulletTime) {
                 bullet = bullets.getFirstExists(false);
                 if (bullet) {
                     bullet.reset(player.x, player.y + 8);
                     bullet.body.velocity.y = -400;
                     bulletTime = game.time.now + 700;
                 }
             }
         }

         function resetBullet(bullet) {
             bullet.kill();
         }

         function restart() {
             lives.callAll('revive');
             aliens.removeAll();
             createAliens();
             player.revive();
             stateText.visible = false;
         }
     }

     