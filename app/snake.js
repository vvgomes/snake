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

  point.toDom = function() {
    return $('<td />');
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

	var apple;

  surface.has = function(point) {
    return points.has(point);
  };

  surface.toDom = function() {
    var table = $('<table id="surface" />');
    size.times(function(line) {
      var tr = $('<tr />');
      size.times(function(column) {
        tr.append(points[size * line + column].toDom());
      });
      table.append(tr);
    });
    return table;
  };

	var availablePoints = function() {
		return points.filter(function(point){
      return point.empty();
    });
	};

	surface.placeApple = function() {
		var position = availablePoints().random();
		apple = createApple(position);
	};

  return surface;
};

var createApple = function(point) {
	point.use();
};

/*

var directions = [];

var Direction = function(key, oppositeKey, nextPosition) {
	this.key = key;
	this.nextPosition = nextPosition;

	this.isOppositeTo = function(other) {
		var opposite = directions[oppositeKey];
		return other.equals(opposite);
	};

	this.equals = function(other) {
		return other.key == key;
	};

	directions[key] = this;
};

var keys = {
	up: 38,
	down: 40,
	right: 39,
	left: 37
};

var createDirections = function() {
	new Direction(keys.up, keys.down, function(p) {
		return new Position(p.x, p.y-1);
	});
	new Direction(keys.down, keys.up, function(p) {
		return new Position(p.x, p.y+1);
	});
	new Direction(keys.left, keys.right, function(p) {
		return new Position(p.x-1, p.y);
	});
	new Direction(keys.right, keys.left, function(p) {
		return new Position(p.x+1, p.y);
	});
};

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

var Apple = function(surface) {
	var surface = surface;
	var x = randomUpTo(surface.cols()-1);
	var y = randomUpTo(surface.rows()-1);
	var position = new Position(x,y);

	this.getPosition = function() {
		return position;
	};
};

var randomUpTo = function(maxCell) {
	return Math.floor((maxCell-1)*Math.random());
};
*/

