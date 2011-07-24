var createGame = function() {
	var game = {};
	var surface;
	var apple;
	var snake;
	var radar;
	var interval;

	game.start = function() {
		surface = createSurface(20);
		radar = createRadar(surface);

		placeApple();
		placeSnake();
		setupEvents();

		initView();

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
		var table = $('<table />').attr('id', 'surface');
		$('body').append(table);

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
		console.log('=== action ===');
		snake[command]();
		console.log(command);

		if(!snake.alive() || radar.snakeOutOfBounds()) {
			gameOver();
			return;
		}

		if(radar.snakeEatenApple()) {
			console.log('### snake ate apple');
			command = 'grow';
			placeApple();
			return;
		}

		command = 'move';
	}

	function gameOver() {
		clearInterval(interval);
		alert('You just killed the poor snake :(');
	}

	function updateView() {
		console.log('=== updateView ===');
		function print(n, o) {
			var p = o.position();
			console.log(''+n+' at: ('+p.x+', '+p.y+')');
		}
		print('snake', snake);
		print('apple', apple);

		$('#surface td').css('background-color', 'white');

		var id = '#'+ apple.position().x +'_'+ apple.position().y;
		$(id).css('background-color', 'red');

		$.each(snake.body(), function(i, p) {
			$('#'+p.x+'_'+p.y).css('background-color', 'green');
		});
	}

	return game;
};

$(document).ready(function() {
	var game = createGame();
	game.start();
});
//TODO: points

