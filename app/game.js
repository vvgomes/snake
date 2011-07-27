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

	(function initialize() {
		score = createScore();
		surface = createSurface(20);
		radar = createRadar(surface);
		placeApple();
		placeSnake();
		nextCommand = 'move';
	})();

	// state   | transition | next

	// ready   | turn       | moving
  // ready   | eat        | ready
  // ready   | pause      | ready

  // moving  | turn       | moving
  // moving  | eat        | growing
  // moving  | pause      | paused

	// growing | turn       | moving
	// growing | eat        | growing
  // growing | pause      | paused

  // paused  | turn       | paused
	// paused  | eat        | paused
  // paused  | pause      | moving


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

	function updateView() {
		surface.render();
		score.render();
	}

	function lifeCycle() {
		action();
		updateView();
	}

	function action() {
		snake[nextCommand]();

		if(!snake.alive() || radar.snakeOutOfBounds()) {
			gameOver();
			return;
		}

		if(radar.snakeAteApple()) {
			score.increase();
			placeApple();
			nextCommand = 'grow';
			return;
		}

		nextCommand = 'move';
	}

	function gameOver() {
		clearInterval(loop);
		alert('You just killed the poor snake :(');
	}

	game.render = function() {
		surface.appendToDom();
		surface.render();
	};

	game.start = function() {
		paused = false;
		loop = setInterval(lifeCycle, 100);
	}

	game.pause = function() {
		if(paused) {
			game.start();
			return;
		}
		paused = true;
		clearInterval(loop);
	};

	game.turnSnake = function(newDirection) {
		!paused && snake.turnTo(newDirection);
	};

	return game;
};

$(document).ready(function() {
	var game = createGame();
  var handler = createInputHandler(game);

  game.render();

	document.onkeydown = function(event) {
		handler.handle(event);
    game.start();
		document.onkeydown = handler.handle;
	};
});

