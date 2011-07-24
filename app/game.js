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
			$('<table />').attr('id', 'surface').css('border-width', '1px 1px 1px 1px'),
			$('<p />').attr('id', 'apples').css('font-size', 'small').text('Apples: '+apples)
		);
		var size = surface.size();
		size.times(function(lines) {
			var tr = $('<tr />');
			size.times(function(cells) {
				tr.append($('<td />'));
			});
			$('#surface').append(tr);
		});
		$('#surface td').css('border', 'none');
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

		var p = apple.position();
		$('#surface tr:eq('+p.y+') td:eq('+p.x+')')
			.css('background-color', 'red');

		$.each(snake.body(), function(i, p) {
			$('#surface tr:eq('+p.y+') td:eq('+p.x+')')
				.css('background-color', 'green');
		});

		$('#apples').text('Apples: '+apples);
	}

	return game;
};

$(document).ready(function() {
	var game = createGame();
	game.start();
});

