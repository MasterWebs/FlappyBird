window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	// var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.playing = false;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.playing = false;
		this.el.removeClass('flapping');
	};

	Player.prototype.onFrame = function(delta) {
		/* if (Controls.keys.right) {
			this.pos.x += delta * SPEED;
		}
		if (Controls.keys.left) {
			this.pos.x -= delta * SPEED;
		}
		if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.up) {
			this.pos.y -= delta * SPEED;
		} */

		if (Controls.didJump()) {
			if (!this.playing) {
				this.playing = true;
			}
			this.pos.y -= delta * SPEED * 8;
			// animation up
			this.flap();
		} else {
			if (this.playing) {
				this.pos.y += delta * SPEED * 0.5;
				// animation down
			}
		}

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0em)');
	};

	Player.prototype.flap = function () {
		// this.el.css('transform', 'rotate(-20deg)');
		// this.el.css('-webkit-transform-origin', '0 0');
		// this.el.style.webkitAnimationPlayState = 'running';
		this.el.addClass('flapping');
		var flapSound = document.getElementById('flap-sound');
		flapSound.play();
		console.log('rotate');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;

})();
