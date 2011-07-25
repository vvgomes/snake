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

	it('should be able to place a snake on it', function() {
		var snake = {};
		surface.placeSnake(snake);
		expect(surface.snake()).toBe(snake);
	});

	it('should be able to place an apple on it', function() {
		var apple = {};
		surface.placeApple(apple);
		expect(surface.apple()).toBe(apple);
	});

	it('should give me its square size', function() {
		expect(surface.size()).toBe(3);
	});

});

describe('apple', function() {

	var apple;

  beforeEach(function() {
		var point = createPoint(1, 2);
    apple = createApple(point);
  });

	it('should tell me about its position', function() {
		var expected = createPoint(1, 2);
		expect(apple.position().equals(expected)).toBeTruthy();
	});

	it('should be able to render itself', function() {

	});

});

describe('direction', function() {

	var right;

	beforeEach(function() {
		right = createDirection(1, 0);
	});

	it('should give me the next point based on the translation factors', function() {
		var current = createPoint(1, 1);
		var next = createPoint(2, 1);
		expect(right.next(current).equals(next)).toBeTruthy();
	});

	it('should be equal to another direction with the same translation factors', function() {
		var anotherRight = createDirection(1, 0);
		expect(right.equals(anotherRight)).toBeTruthy();
	});

	it('should not be equal to another direction with different translation factors', function() {
	  var up = createDirection(0, -1);
	  var down = createDirection(0, 1);
	  var left = createDirection(-1, 0);
	  expect(right.equals(up)).toBeFalsy();
	  expect(right.equals(down)).toBeFalsy();
	  expect(right.equals(left)).toBeFalsy();
	});

	it('should tell me about the opposite direction', function() {
		var left = createDirection(-1, 0);
		expect(right.opposite().equals(left)).toBeTruthy();
		expect(left.opposite().equals(right)).toBeTruthy();
	});

});

describe('directions', function() {

	it('should give me right', function() {
		var expected = createDirection(1, 0);
		expect(directions.right.equals(expected)).toBeTruthy();
	});

	it('should give me left', function() {
		var expected = createDirection(-1, 0);
		expect(directions.left.equals(expected)).toBeTruthy();
	});

	it('should give me down', function() {
		var expected = createDirection(0, 1);
		expect(directions.down.equals(expected)).toBeTruthy();
	});

	it('should give me up', function() {
		var expected = createDirection(0, -1);
		expect(directions.up.equals(expected)).toBeTruthy();
	});

});

describe('snake', function() {

	var snake;

	beforeEach(function(){
		var position = createPoint(1, 1);
		snake = createSnake(position, directions.right);
	});

	it('should move based on its direction', function() {
		var next = createPoint(2, 1);
		snake.move();
		expect(snake.position().equals(next)).toBeTruthy();
	});

	it('should be able to change the direction', function() {
		snake.turnTo(directions.down);
		expect(snake.direction().equals(directions.down)).toBeTruthy();
	});

	it('should not be able to turn to the oposite direction', function() {
		var current = snake.direction();
		var opposite = current.opposite();
		snake.turnTo(opposite);
		expect(snake.direction().equals(current)).toBeTruthy();
	});

	it('should have size of one point by default', function() {
		expect(snake.body().length).toBe(1);
	});

	it('should be able to grow', function(){
		snake.grow();
		expect(snake.body().length).toBe(2);
		expect(snake.position().equals(createPoint(2, 1))).toBeTruthy();
	});

	it('should be alive by default', function() {
		expect(snake.alive()).toBeTruthy();
	});

	it('should be able to kill itself', function() {
		snake.die();
		expect(snake.alive()).toBeFalsy();
	});

	it('should die after hitting itself', function() {
		snake.grow();
		snake.turnTo(directions.down);
		snake.grow();
		snake.turnTo(directions.left);
		snake.grow();
		snake.turnTo(directions.up);
		snake.grow();
		expect(snake.alive()).toBeFalsy();
	});

	it('should let me know about its body points', function() {
		var body = snake.body();
		var head = createPoint(1, 1);
		expect(body.length).toBe(1);
		expect(body[0].equals(head)).toBeTruthy();
	});

});

describe('radar', function() {

	var radar;
	var surface;

	beforeEach(function() {
		var apple = createApple(createPoint(1, 0));
		var snake = createSnake(createPoint(0, 0), directions.right);
		surface = createSurface(3);
		surface.placeApple(apple);
		surface.placeSnake(snake);
		radar = createRadar(surface);
	});

	it('should give me a random available point', function() {
		var applePoint = surface.apple().position();
		var snakePoint = surface.snake().position();
		var rand = radar.randomPoint();
		expect(rand.equals(applePoint)).toBeFalsy();
		expect(rand.equals(snakePoint)).toBeFalsy();
	});

	it('should give me a good point in the surface', function() {
		var good = createPoint(0, 1);
		expect(radar.goodPoint().equals(good)).toBeTruthy();
	});

	it('should detect when snake get out of the surface area', function() {
		expect(radar.snakeOutOfBounds()).toBeFalsy();
		(3).times(function() {
			surface.snake().move();
		});
		expect(radar.snakeOutOfBounds()).toBeTruthy();
	});

	it('should detect when the snake eats the apple', function() {
		expect(radar.snakeEatenApple()).toBeFalsy();
		surface.snake().move();
		expect(radar.snakeEatenApple()).toBeTruthy();
	});

});

describe('inputHandler', function() {

	var game = {
		turnSnake: function(){},
		pause: function(){}
	};

	describe('when the user wants to turn the snake', function() {

		beforeEach(function() {
			spyOn(game, 'turnSnake');
		});

		it('should detect keyboard right arrow pressed', function() {
			var event = { keyCode: '39' };
			var handler = createInputHandler(game);
			handler.handle(event);
			expect(game.turnSnake).toHaveBeenCalledWith(directions.right);
		});

		it('should detect keyboard left arrow pressed', function() {
			var event = { keyCode: '37' };
			var handler = createInputHandler(game);
			handler.handle(event);
			expect(game.turnSnake).toHaveBeenCalledWith(directions.left);
		});

		it('should detect keyboard up arrow pressed', function() {
			var event = { keyCode: '38' };
			var handler = createInputHandler(game);
			handler.handle(event);
			expect(game.turnSnake).toHaveBeenCalledWith(directions.up);
		});

		it('should detect keyboard down arrow pressed', function() {
			var event = { keyCode: '40' };
			var handler = createInputHandler(game);
			handler.handle(event);
			expect(game.turnSnake).toHaveBeenCalledWith(directions.down);
		});

	});

	it('should detect when the user wants to pause the game', function() {
		spyOn(game, 'pause');
		var event = { keyCode: '80' };
		var handler = createInputHandler(game);
		handler.handle(event);
		expect(game.pause).toHaveBeenCalled();
	});

	it('should ignore irrelevant keyboard keys', function() {
		spyOn(game, 'turnSnake');
		spyOn(game, 'pause');
		var event = { keyCode: '41' };
		var handler = createInputHandler(game);
		handler.handle(event);
		expect(game.turnSnake).not.toHaveBeenCalled();
		expect(game.pause).not.toHaveBeenCalled();
	});

});

