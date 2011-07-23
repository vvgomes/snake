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

  return surface;
};

var createApple = function(point) {
	var apple = {};

	apple.position = function() {
		return point;
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
		snake.grow();
		cutTail();
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

	return snake;
};

var createRadar = function(surface) {
	var radar = {};

	function snake() {
		return surface.snake();
	}

	function apple() {
		return surface.apple();
	}

	function availablePoints() {
		var surfacePoints = surface.points();
		var snakePoints = snake().body();
		var applePoints = apple().position();
		return surfacePoints.without(snakePoints).without(applePoints);
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
		return !surface.has(snake().position());
	};

	radar.snakeEatenApple = function() {
		return snake().position().equals(apple().position());
	};

	return radar;
};

var createInputHandler = function(callback) {
	var handler = {};

	var keys = {
		'37': directions.left,
		'38': directions.up,
		'39': directions.right,
		'40': directions.down
	};

	handler.handle = function(event) {
		var direction = keys[event.keyCode];
		direction && callback(direction);
	};

	return handler;
};

