var createPoint = function(x, y) {
	var point = {};

  point.x = x;
  point.y = y;
	var empty = true;

  point.equals = function(other) {
    return other.x === x && other.y === y;
	};

  point.translate = function(factorX, factorY) {
    return createPoint(x + factorX, y + factorY);
  };

	point.empty = function() {
		return empty;
	};

	point.use = function() {
		empty = false;
	};

	point.release = function() {
		empty = true;
	};

  return point;
};

var createSurface = function(size) {
  var surface = {};

  var points = [];
  size.times(function(x) {
    size.times(function(y) {
      points.push(createPoint(x, y));
    });
  });

  surface.has = function(point) {
    return points.has(point);
  };

	surface.availablePoints = function() {
		return points.filter(function(point){
      return point.empty();
    });
	};

  return surface;
};

var createApple = function(point) {
	var apple = {};

	point.use();

	apple.position = function() {
		return point;
	};

	apple.destroy = function() {
		point.release();
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

	point.use();
	var body = [point];
	var direction = initialDirection;

	function head(newHead) {
		if(!newHead)
			return body[0];
		body.unshift(newHead);
		body[0].use();
	};

	function removeLast() {
		body[body.length-1].release();
		body.pop();
	}

	function nextPosition() {
		return direction.next(head());
	}

	snake.position = function() {
		return head();
	};

	snake.direction = function() {
		return direction;
	};

	snake.size = function() {
		return body.length;
	};

	snake.move = function() {
		head(nextPosition());
		removeLast();
	};

	snake.grow = function() {
		head(nextPosition());
	};

	snake.turnTo = function(newDirection) {
		if(!direction.opposite().equals(newDirection))
			direction = newDirection;
	};

	return snake;
};

