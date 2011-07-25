var createPoint = function(x, y) {
	var point = {};

  point.x = x;
  point.y = y;

  point.equals = function(other) {
    return other.x === x && other.y === y;
	};

  point.translate = function(factorX, factorY) {
    return createPoint(x + factorX, y + factorY);
  };

  return point;
};

var createSurface = function(size) {
  var surface = {};
	var snake;
	var apple;
  var points = [];

	size.times(function(x) {
    size.times(function(y) {
      points.push(createPoint(x, y));
    });
  });

  surface.has = function(point) {
    return points.has(point);
  };

	surface.points = function() {
		return points;
	};

	surface.placeSnake = function(s)	{
		snake = s;
	};

	surface.placeApple = function(a) {
		apple = a;
	};

	surface.snake = function() {
		return snake;
	};

	surface.apple = function() {
		return apple;
	};

	surface.size = function() {
		return size;
	};

  return surface;
};

var createApple = function(point) {
	var apple = {};

	apple.position = function() {
		return point;
	};

	apple.render = function() {
		var selector = '#surface tr:eq('+point.y+') td:eq('+point.x+')';
		$(selector).attr('class', 'apple');
	};

	return apple;
};

var createDirection = function(factorX, factorY) {
	var direction = {};

	direction.factorX = factorX;
	direction.factorY = factorY;

	direction.equals = function(other) {
		return other.factorX === factorX && other.factorY === factorY;
	};

	direction.next = function(point) {
		return point.translate(factorX, factorY);
	};

	direction.opposite = function() {
		return createDirection(-factorX, -factorY);
	};

	return direction;
};

var directions = {
	right: createDirection(1, 0),
	left: createDirection(-1, 0),
	down: createDirection(0, 1),
	up: createDirection(0, -1)
};

var createSnake = function(point, initialDirection) {
	var snake = {};
	var body = [point];
	var direction = initialDirection;
	var alive = true;

	function head(newHead) {
		if(!newHead)
			return body[0];
		body.unshift(newHead);
	};

	function cutTail() {
		body.pop();
	}

	function nextPosition() {
		return direction.next(head());
	}

	function checkForSelfCollision() {
		$.each(body.slice(1), function(i, p) {
			p.equals(head()) &&	snake.die();
		});
	}

	snake.position = function() {
		return head();
	};

	snake.direction = function() {
		return direction;
	};

	snake.move = function() {
		head(nextPosition());
		cutTail();
		checkForSelfCollision();
	};

	snake.grow = function() {
		head(nextPosition());
		checkForSelfCollision();
	};

	snake.turnTo = function(newDirection) {
		if(!direction.opposite().equals(newDirection))
			direction = newDirection;
	};

	snake.alive = function() {
		return alive;
	};

	snake.die = function() {
		alive = false;
	};

	snake.body = function() {
		return body;
	};

	snake.render = function() {
		$.each(body, function(i, p) {
			var selector = '#surface tr:eq('+p.y+') td:eq('+p.x+')';
			$(selector).attr('class', 'snakeBody');
		});
	};

	return snake;
};

var createRadar = function(surface) {
	var radar = {};

	function availablePoints() {
		var snake = surface.snake();
		var apple = surface.apple();
		var used = snake ? snake.body() : [];
		apple && (used = used.concat(apple.position()));
		return surface.points().without(used);
	}

	radar.randomPoint = function() {
		return availablePoints().random();
	};

	radar.goodPoint = function() {
		return function f(point, available) {
			return available.has(point) ?
				point : f(point.translate(0, 1), available);
		}(createPoint(0, 0), availablePoints());
	};

	radar.snakeOutOfBounds = function() {
		var snake = surface.snake();
		return !surface.has(snake.position());
	};

	radar.snakeEatenApple = function() {
		var snake = surface.snake();
		var apple = surface.apple();
		return snake.position().equals(apple.position());
	};

	return radar;
};

var createInputHandler = function(game) {
	var handler = {};

	var keys = {
		'37': function(){ game.turnSnake(directions.left); },
		'38': function(){ game.turnSnake(directions.up); },
		'39': function(){ game.turnSnake(directions.right); },
		'40': function(){ game.turnSnake(directions.down); },
		'80': function(){ game.pause(); }
	};

	handler.handle = function(event) {
		var callback = keys[event.keyCode];
		callback && callback();
	};

	return handler;
};

