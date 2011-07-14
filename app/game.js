var createGame = function() {
	var game = {};

	var surface;
	var snake;
	var apple;

	function setup() {
		surface = createSurface(10);

		position = surface.goodPoint();
		snake = createSnake(position, directions.right);

		somewhere = surface.availablePoints().random();
		apple = createApple(somewhere);

		document.onkeydown = handleUserInput;
	}

	function handleUserInput(event) {
		var newDirection = keys[e.keyCode];
		newDirection && snake.turnTo(newDirection);
	}

	game.start = function() {
		setup();
		startGameLoop();
	};

	return game;
	//loop();
	//setInterval(loop, 1000);
};

var keys = {
	'37': directions.left,
	'38': directions.up,
	'39': directions.right,
	'40': directions.down
};

$(document).ready(function() {
	var game = createGame();
	game.start();
});

