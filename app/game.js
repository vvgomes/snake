var createGame = function() {
	var game = {};
	var surface;
	var apple;
	var snake;
	var radar;
	var interval;

	game.start = function() {
		surface = createSurface(10);
		radar = createRadar(surface);

		placeApple();
		placeSnake();
		setupEvents();

		interval = setInterval(loop, 5000);
	};

	function placeApple() {
		var position = radar.randomPoint();
		apple = createApple(position);
		surface.placeApple(apple);
	}

	function placeSnake() {
		var position = radar.goodPoint();
		snake = createSnake(position, directions.right);
		surface.placeSnake(snake);
	}

	function setupEvents() {
		var handler = createInputHandler(snake.turnTo);
		document.onkeydown = handler.handle;
	}

	function loop() {
		render();
		action();
	}

	function action() {

	}

	function gameOver() {
		clearInterval(interval);
		console.log('snake is dead :(');
	}

	function render() {
		function print(n, o) {
			var p = o.position();
			console.log(n+' at: ('+p.x+', '+p.y+')');
		}
		print('snake', snake);
		print('apple', apple);
	}

	return game;
};

$(document).ready(function() {
	var game = createGame();
	game.start();
});

