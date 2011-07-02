$(document).ready(function() {
	//var game = new Game();
	//game.init();
	//setInterval(game.loop, 100);

	console.log('here');
	var surface = createSurface(3);
	var table = surface.render();
	console.log(table);
	$('body').append(table);



});

var Game = function() {
	var surface;
	var snake;
	var apple;
	this.init = function() {
		initModels();
		setupEvents();
		renderSurface();
	};

	this.loop = function() {
		snake.move();
		renderSnake();
		if(snake.getPosition().equals(apple.getPosition())) {
			snake.grow();
			apple = new Apple(surface);
		}
	};

	var initModels = function() {
		createDirections();
		surface = new Surface(20,20);
		snake = new Snake(surface, new Position(randomUpTo(surface.cols()),randomUpTo(surface.rows())), directions[keys.right]);
		apple = new Apple(surface);
	};

	var setupEvents = function() {
		document.onkeydown = function(e) {
			var newDirection = directions[e.keyCode];
			newDirection && snake.turnTo(newDirection);
		};
	};

	var renderSurface = function() {
		$('<table/>').attr('id', 'matrix').appendTo('body');
		var y = 0;
		while(y < surface.rows()) {
			$('<tr/>').attr('id', y).appendTo('#matrix');
			var x = 0;
			while(x < surface.cols()) {
				var position = new Position(x, y);
				$('<td/>').attr('id', position.toString()).appendTo('#'+y);
				x++;
			}
			y++;
		}
		renderSnake();
	};

	var renderSnake = function() {
		var position = snake.getPosition();
		var selector = '#' + position.toString();
		removeBackground('#matrix td');
		$('#matrix td').addClass('whiteBackground');

		removeBackground(selector);
		$(selector).addClass('blackBackground');

		var body = snake.getBody();
		for (var i = 0; i < body.length; i++) {
			var bodyValue = '#' + body[i];
			removeBackground(bodyValue);
			$(bodyValue).addClass('blackBackground');
		}
		renderFood();
	};
	var removeBackground = function(dom) {
		$(dom).removeClass('blackBackground');
		$(dom).removeClass('whiteBackground');
		$(dom).removeClass('redBackground');
	}

	var renderFood = function() {
		var food = '#' + apple.getPosition();
		removeBackground(food);
		$(food).addClass('redBackground');
	};
};

