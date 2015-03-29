window.Pipes = (function () {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var GAP = 20;
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
		this.generatePipes();

		this.playing = false;
	};

	Pipes.prototype.generatePipes = function () {
		this.pos.x = INITIAL_POSITION_X;

		this.lowerHeight = getRandomInt(10, this.game.WORLD_HEIGHT - GAP - 10);
		this.upperHeight = this.game.WORLD_HEIGHT - this.lowerHeight - GAP;
		this.lowerTop = this.upperHeight + GAP;
		console.log('Heights: ' + this.lowerHeight + ' ' + this.upperHeight);
		console.log('Top ' + this.lowerTop);

		this.elUpper.css('height', this.upperHeight + 'em');
		this.elLower.css('top', this.lowerTop + 'em');
		this.elLower.css('height', this.lowerHeight + 'em');
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
			this.generatePipes ();
		}

		this.elUpper.css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');
		this.elLower.css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');
	};

	return Pipes;
})();