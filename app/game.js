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
		var size = surface.size();
		size.times(function(lines) {
			var tr = $('<tr />');
			size.times(function(cells) {
				tr.append($('<td />'));
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
	$('body').append(
		$('<h1 />').text('The Hungry Snake'),
		$('<table />').attr('id', 'surface'),
		$('<p />').attr('id', 'apples').text('Apples: 0')
	);

	var game = createGame();
	game.start();
});
// TODO:
// span for the score
// css classes for bg colors
// html for title, table, and score

