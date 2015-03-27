window.Pipes = (function () {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 100;
	var INITIAL_POSITION_Y = 25;

	var Pipes = function(el, game) {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.playing = false;
	};

	/**
	 * Resets the state of the pipes for a new game.
	 */
	Pipes.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.playing = false;
	};

	Pipes.prototype.onFrame = function(delta) {
		if (this.playing) {
			this.pos.x -= delta * SPEED;
		}
		
	};

})();