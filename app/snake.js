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

	direction.next = function(point) {
		return point.translate(factorX, factorY);
	};

	direction.factorX = factorX;
	direction.factorY = factorY;

	direction.equals = function(other) {
		return other.factorX === factorX && other.factorY === factorY;
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
	var position = point;
	var direction = initialDirection;

	position.use();

	snake.move = function() {
		position.release();
		position = direction.next(position);
		position.use();
	};

	snake.position = function() {
		return position;
	};

	snake.turnTo = function(newDirection) {
		if(!direction.opposite().equals(newDirection))
			direction = newDirection;
	};

	snake.direction = function() {
		return direction;
	};

	return snake;
};

/*
var Snake = function(surface, position, direction) {
	var surface = surface;
	var direction = direction;
	var position = position;
	var body = [];
	var alive = true;

	this.move = function() {
		candidate = direction.nextPosition(position);

		if (surface.has(candidate)) {
			 moveBody();
			 position = candidate;
		 } else {
		 	die();
		 }
	};

	this.turnTo = function(newDirection) {
		(!direction.isOppositeTo(newDirection)) && (direction = newDirection);
	};

	this.stillAlive = function() {
		return alive;
	};

	this.getDirection = function() {
		return direction;
	};

	this.getPosition = function() {
		return position;
	};
	this.getBody = function() {
		return body;
	};
	this.grow = function() {
		body.push(position);
	};

	var moveBody = function() {
		var p = position
		for (var i = 0; i < body.length; i++) {
			aux = body[i];
			body[i] = p;
			p = aux;
		}
	};

	var die = function() {
		alive = false;
	};
};
*/

