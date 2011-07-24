var createGame = function() {
	var game = {};
	var surface;
	var apple;
	var snake;
	var radar;
	var interval;
	var apples;

	game.start = function() {
		surface = createSurface(20);
		radar = createRadar(surface);

		placeApple();
		placeSnake();
		setupEvents();

		initView();

		apples = 0;

		interval = setInterval(loop, 100);
	};

	function placeApple() {
		var position = radar.randomPoint();
		apple = createApple(position);
		surface.placeApple(apple);
	}

	function placeSnake() {
		var position = radar.goodPoint();
		snake = createSnake(position, directions.right);
		surface.placeSnake(snake);
	}

	function initView() {
		$('body').css('font-family', 'sans-serif').append(
			$('<h1 />').css('font-size', 'medium').text('The Hungry Snake'),
			$('<table />').attr('id', 'surface'),
			$('<p />').attr('id', 'apples').css('font-size', 'small').text('Apples: '+apples)
		);
		var points = surface.points();
		var size = surface.size();
		size.times(function(lines) {
			var tr = $('<tr />');
			size.times(function(cells) {
				var point = points[lines * size + cells];
				var id = point.x+'_'+point.y;
				var td = $('<td />').attr('id', id);
			  tr.append(td);
			});
			$('#surface').append(tr);
		});
	}

	function setupEvents() {
		var handler = createInputHandler(snake.turnTo);
		document.onkeydown = handler.handle;
	}

	function loop() {
		updateView();
		action();
	}

	var command = 'move';

	function action() {
		snake[command]();
		console.log(command);

		if(!snake.alive() || radar.snakeOutOfBounds()) {
			gameOver();
			return;
		}

		if(radar.snakeEatenApple()) {
			command = 'grow';
			placeApple();
			apples++;
			return;
		}

		command = 'move';
	}

	function gameOver() {
		clearInterval(interval);
		alert('You just killed the poor snake :(');
	}

	function updateView() {
		$('#surface td').css('background-color', 'white');

		var id = '#'+ apple.position().x +'_'+ apple.position().y;
		$(id).css('background-color', 'red');

		$.each(snake.body(), function(i, p) {
			$('#'+p.x+'_'+p.y).css('background-color', 'green');
		});

		$('#apples').text('Apples: '+apples);
	}

	return game;
};

$(document).ready(function() {
	var game = createGame();
	game.start();
});

