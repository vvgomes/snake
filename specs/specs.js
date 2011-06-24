Screw.Unit(function() {
	
	describe('Position', function() {
		
		before(function() {
			position = new Position(3, 2);
		});
	
		it('should be initialized with bidimensional coordinates', function() {
			expect(position.x).to(equal, 3);
			expect(position.y).to(equal, 2);
		});
	
		it('should be equal to other position with the same coordinates', function() {
			expect(position.equals(new Position(3, 2))).to(be_true);
		});
		
		it('should be able to render itself as a string', function() {
			expect(new Position(3, 2).toString()).to(equal, '3_2');
		});
	});
	
	describe('Surface', function() {
		
		before(function() {
			surface = new Surface(5, 5);
		});

		it('should contain a position which coordinates are inside surface area', function() {
			expect(surface.has(new Position(1,2))).to(be_true);
		});
		
		it('should not contain a position which coordinates are outside surface area', function() {
			expect(surface.has(new Position(6,6))).to(be_false);
			expect(surface.has(new Position(-1,-1))).to(be_false);
		});
		
		it('should contain the origin', function() {
			expect(surface.has(new Position(0,0))).to(be_true);
		});
		
		it('should contain the last position', function() {
			expect(surface.has(new Position(5,5))).to(be_true);
		});	
	
		it('should give me the number of cols', function() {
			expect(surface.cols()).to(equal, 6);
		});			
	
		it('should give me the number of rows', function() {
			expect(surface.rows()).to(equal, 6);
		});
	});

	describe('Direction', function() {

		before(function() {
			up = new Direction(keys.up, keys.down, function(p) {
				return new Position(p.x, p.y - 1);
			});
		});		
		
		it('should give me the next position', function() {
			var next = up.nextPosition(new Position(2, 2));
			expect(next.equals(new Position(2,1))).to(be_true);
		});

		it('should give me the oposite direction', function() {
			var down = new Direction(keys.down);
			expect(up.isOppositeTo(down)).to(be_true);
		});
		
		it('should be equal to another direction with the same key', function() {
			var other = new Direction(keys.up);			
			expect(up.equals(other)).to(be_true);
		});
	});
	
	describe('Snake', function() {
		
		before(function() {			
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
			expect(snake.stillAlive()).to(be_true);
		});
		
		it('should be dead after a move to outside the surface', function() {
			surface.has = function(){ return false; };
			
			var snake = new Snake(surface, position, right);			
			snake.move();
			expect(snake.stillAlive()).to(be_false);
		});
		
		it('should turn to a valid direction', function() {			
			var up = {};			
			right.isOppositeTo = function(){ return false; };
									
			var snake = new Snake(surface, position, right);
			snake.turnTo(up);
			expect(snake.getDirection()).to(equal, up);
		});
	
		it('should not turn to the oposite direction', function() {
			var left = {};			
			right.isOppositeTo = function(){ return true; };
			
			var snake = new Snake(surface, position, right);
			snake.turnTo(left);
			expect(snake.getDirection()).to(equal, right);
		});
	});
	
	describe('Apple', function() {

		it('should be placed in a random place inside the surface', function() {
			surface = new Surface(5, 5);			
			apple = new Apple(surface);
			expect(surface.has(apple.getPosition())).to(be_true);
		});
	});
});
