var createPoint = function(x, y) {
	var point = {};
  
	point.toString = function() {
		return x + '_' + y;
	};

  point.equals = function(other) {
    return other.toString() === point.toString();
	};
  
  point.translate = function(factorX, factorY) {
    return createPoint(x + factorX, y + factorY);
  };
  
  point.render = function() {
    return $('<div id="' + point.toString() + '" />');
  };
	
  return point;
};
/*
var Surface = function(x, y) {
	var last = new Position(x, y);
	
	this.has = function(some) {
		return some.x >= 0 && some.x <= last.x 
				&& some.y >= 0 && some.y <= last.y;
	};

	this.cols = function() { 
		return last.x + 1; 
	};

	this.rows = function() { 
		return last.y + 1; 
	};
};

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