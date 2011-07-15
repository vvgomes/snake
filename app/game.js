var createGame = function() {
	var game = {};
	var surface;
	var apple;
	var snake;

	game.start = function() {
		surface = createSurface(10);
		placeApple();
		placeSnake();
		setupEvents();
		setInterval(loop, 5000);
	};

	function placeApple() {
		var position = surface.availablePoints().random();
		apple = createApple(position);
	}

	function placeSnake() {
		var position = surface.goodPoint();
		snake = createSnake(position, directions.right);
	}

	function setupEvents() {
		var keys = {
			'37': directions.left,
			'38': directions.up,
			'39': directions.right,
			'40': directions.down
		};
		document.onkeydown = function(event) {
			var newDirection = keys[event.keyCode];
			newDirection && snake.turnTo(newDirection);
		};
	}

	function loop() {
		render();
		action();
	}

	function action() {
		if(!snake.alive() || collision()) {
			console.log('snake is dead :(');
			gameOver();
		}
		else {
			if(snakeAteApple()) {
				console.log('snake ate the apple');
				snake.grow();
				placeApple();
			}
			else {
				console.log('snake will move');
				snake.move();
			}
		}
	}

	function collision() {
		return !surface.has(snake.position());
	}

	function snakeAteApple() {
		return snake.position().equals(apple.position());
	}

	function gameOver() {
		loop = function(){};
		alert('GAME OVER');
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

