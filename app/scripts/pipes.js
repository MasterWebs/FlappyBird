window.Pipes = (function () {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var GAP = 15;
	var INITIAL_POSITION_X = 108;

	var Pipes = function(elUpper, elLower, game) {
		this.elUpper = elUpper;
		this.elLower = elLower;
		this.pos =  { x: 0, y: 0 };
		this.game = game;
		this.playing = false;
	};

	/**
	 * Resets the state of the pipes for a new game.
	 */
	Pipes.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;

		var lowerHeight = getRandomInt(20, this.game.WORLD_HEIGHT - GAP - 20);
		var upperHeight = this.game.WORLD_HEIGHT - lowerHeight - GAP;

		this.elUpper.css('height', lowerHeight + 'em');
		this.elLower.css('height', upperHeight + 'em');
		this.elLower.css('top', (upperHeight + GAP) + 'em');

		this.playing = false;
	};

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	Pipes.prototype.onFrame = function(delta) {
		if (this.playing) {
			this.pos.x -= delta * SPEED;
		} else if (Controls.keys.space) {
			this.playing = true;
		}

		if (this.pos.x + WIDTH < 0) {
			this.reset();
		}

		this.elUpper.css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');
		this.elLower.css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');
	};

	return Pipes;
})();