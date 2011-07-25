var createGame = function() {
	var game = {};
	var surface;
	var apple;
	var snake;
	var radar;
	var score;
	var nextCommand;
	var paused;
	var loop;

	game.start = function() {
		surface = createSurface(20);
		radar = createRadar(surface);

		placeApple();
		placeSnake();

		score = 0;
		nextCommand = 'move';

		initView();
		resume();
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

	function initView() {
		surface.appendToDom();
		surface.render();
	}

	function updateView() {
		surface.render();
		$('#score').text(score);
	}

	function lifeCycle() {
		updateView();
		action();
	}

	function action() {
		snake[nextCommand]();

		if(!snake.alive() || radar.snakeOutOfBounds()) {
			gameOver();
			return;
		}

		if(radar.snakeEatenApple()) {
			nextCommand = 'grow';
			placeApple();
			score++;
			return;
		}

		nextCommand = 'move';
	}

	function gameOver() {
		clearInterval(loop);
		alert('You just killed the poor snake :(');
	}

	function resume() {
		paused = false;
		loop = setInterval(lifeCycle, 100);
	}

	game.pause = function() {
		if(paused) {
			resume();
			return;
		}
		paused = true;
		clearInterval(loop);
	};


	game.turnSnake = function(newDirection) {
		snake.turnTo(newDirection);
	};

	return game;
};

$(document).ready(function() {
	var game = createGame();
	game.start();
	document.onkeydown = createInputHandler(game).handle;
});

