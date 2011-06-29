describe('point', function () {  
	
  var point;
  
  beforeEach(function() {
    point = createPoint(1, 2);
  });
	
	it('should be composed by two-dimensional coordinates', function() {
		expect(point.x).toBe(1);
    expect(point.y).toBe(2);
	});

  it('should be equal to another point with the same coordinates', function() {
		var another = createPoint(1, 2);
    expect(point.equals(another)).toBeTruthy();
	});
  
  it('should not be equal to another point with different coordinates', function() {
    var differentX = createPoint(3, 2);
    var differentY = createPoint(1, 3);
    var differentXandY = createPoint(3, 3);
    expect(point.equals(differentX)).toBeFalsy();
    expect(point.equals(differentY)).toBeFalsy();
    expect(point.equals(differentXandY)).toBeFalsy();
  });
  
  it('should be able to perform a geometric translation', function() {
    var translated = point.translate(1, 0);
    expect(translated.equals(createPoint(2, 2))).toBeTruthy();
  });
  
  it('should be able to render itself as a td', function() {
    var td = point.render();
    expect(td.attr('tagName')).toEqual('TD');
  });
		
});

describe('surface', function() {
  
  var surface;
  
  beforeEach(function() {
    surface = createSurface(3);
  });
  
  it('should have a point which coordinates are inside the surface area', function() {
    var point = createPoint(1, 1);
    expect(surface.has(point)).toBeTruthy();
  });
  
  it('should have the origin point', function() {
    var origin = createPoint(0, 0);
    expect(surface.has(origin)).toBeTruthy();
  });
  
  it('should have the lower right point', function() {
    var lowerRight = createPoint(2, 2);
    expect(surface.has(lowerRight)).toBeTruthy();
  });
  
  it('should not have a point outside the surface area', function() {
    var outside = createPoint(3, 3);
    expect(surface.has(outside)).toBeFalsy();
  });
  
  it('should be able to render itself as a table', function() {
    var table = surface.render();
    expect(table.attr('tagName')).toEqual('TABLE');
    expect(table.attr('id')).toEqual('surface');
  });
  
  it('should be able to render all the points', function() {
    var table = surface.render();
    expect(table.html()).toEqual(
      '<tbody>'+
      '<tr><td></td><td></td><td></td></tr>'+
      '<tr><td></td><td></td><td></td></tr>'+
      '<tr><td></td><td></td><td></td></tr>'+
      '</tbody>'
    );
  });

});

/*	
describe('Direction', function() {

  beforeEach(function() {
		up = new Direction(keys.up, keys.down, function(p) {
			return new Position(p.x, p.y - 1);
		});
	});		
		
	it('should give me the next position', function() {
		var next = up.nextPosition(new Position(2, 2));
		expect(next.equals(new Position(2,1))).toBeTruthy();
	});

	it('should give me the oposite direction', function() {
		var down = new Direction(keys.down);
		expect(up.isOppositeTo(down)).toBeTruthy();
	});
		
	it('should be equal to another direction with the same key', function() {
    var other = new Direction(keys.up);			
    expect(up.equals(other)).toBeTruthy();
  });
});
	
describe('Snake', function() {
		
	beforeEach(function() {			
		position = {};
		surface = {};
		right = {
			nextPosition: function(p){ 
				return position; 
			}
		};
	});

	it('should still be alive after move inside the surface', function() {
		surface.has = function(){ return true; };
				
		var snake = new Snake(surface, position, right);			
		snake.move();
		expect(snake.stillAlive()).toBeTruthy();
	});
		
  it('should be dead after a move to outside the surface', function() {
    surface.has = function(){ return false; };
    
    var snake = new Snake(surface, position, right);			
    snake.move();
    expect(snake.stillAlive()).toBeFalsy();
  });
		
	it('should turn to a valid direction', function() {			
    var up = {};			
    right.isOppositeTo = function(){ return false; };
  
    var snake = new Snake(surface, position, right);
    snake.turnTo(up);
		expect(snake.getDirection()).toEqual(up);
	});
	
	it('should not turn to the oposite direction', function() {
		var left = {};			
		right.isOppositeTo = function(){ return true; };
			
		var snake = new Snake(surface, position, right);
		snake.turnTo(left);
		expect(snake.getDirection()).toEqual(right);
	});
});
	
describe('Apple', function() {
	
  it('should be placed in a random place inside the surface', function() {
		surface = new Surface(5, 5);			
  	apple = new Apple(surface);
		expect(surface.has(apple.getPosition())).toBeTruthy();
	});
  
  it('should not be placed over the snake body', function() {
    //create a surface and place a snake
    //create an apple and try to place it over the snake
    //observe that the apple was not placed
    expect(true).toBeFalsy();
  });
});  
*/