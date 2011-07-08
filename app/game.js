$(document).ready(function() {

	var surface = createSurface(10);
	var position = surface.goodPoint();
	var snake = createSnake(position, directions.right);
	var somewhere = surface.availablePoints().random();
	var apple = createApple(somewhere);

	var keys = {
		'37': directions.left,
		'38': directions.up,
		'39': directions.right,
		'40': directions.down
	};

	document.onkeydown = function(e) {
		var newDirection = keys[e.keyCode];
		newDirection && turnSnake(newDirection);
	};

	var count = 0;
	var action = 'move';

	function loop() {
		console.log('loop: '+(count++));

		// initial check (self colision might have happened)
		console.log('snake alive: '+snake.alive());
		if(!snake.alive()) {
			console.log('snake is dead :(');
			return;
		}

		console.log('apple at: '+pp(apple.position()));

		snake[action]();
		// check if it is still alive (self colision might have happened)
		console.log('snake at: '+pp(snake.position()));

		// surface boundaries check
		var inside = surface.has(snake.position());
		console.log('snake is out: '+(!inside));
		(!inside) && snake.die();

		// apple check
		var eat = snake.position().equals(apple.position());
		console.log('snake eat: '+eat);
		action = eat ? 'grow' : 'move';
		if(eat) {
			apple.destroy();
			var newPosition = surface.availablePoints().random();
			apple = createApple(newPosition);
		}
	}

	function turnSnake(newDirection) {
		snake.turnTo(newDirection);
		console.log('snake turned to: '+pd(snake.direction()));
	}

	function pp(p) {
		return '(' + p.x + ', ' + p.y + ')';
	}

	function pd(d) {
		if(d.equals(directions.right))
			return 'right';
		if(d.equals(directions.left))
			return 'left';
		if(d.equals(directions.down))
			return 'down';
		return 'up';
	}

	loop();
	setInterval(loop, 6000);
});

