var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
}

var pingpong = {
	scoreA: 0, // score hrace A
	scoreB: 0 // score hrace B
}

pingpong.pressedKeys = []

pingpong.ball = {
	speed: 5,
	x: 150,
	y: 100,
	directionX: 1,
	directionY: 1
}

// volani teto funkce je kazdych 30 milisekund
function gameloop() {
	moveBall();
	movePaddles();
}

// pohyb micku 
function moveBall() {
	// nacteni potrebnych hodnot
	 //var ballTop = parseInt($("#ball").css("top"));
	 //var ballLeft = parseInt($("#ball").css("left"));
	var playgroundHeight = parseInt($("#playground").height());
	var playgroundWidth = parseInt($("#playground").width());	
	var ball = pingpong.ball;
	
	// overeni hranice herniho pole
	
	// dolni hrana
	 // if (ballTop+ball.speed*ball.directionY > playgroundHeight - 20) {
	if (ball.y +ball.speed*ball.directionY > playgroundHeight - 20) {
		ball.directionY = -1;
	}
	// horni hrana
	 // if (ballTop+ball.speed*ball.directionY < 0) {
	if (ball.y +ball.speed*ball.directionY < 0) {
		ball.directionY = 1;
	}
	// prava hrana
	 // if (ballLeft+ball.speed*ball.directionX > playgroundWidth - 20) {
	if (ball.x + ball.speed*ball.directionX > playgroundWidth - 20) {
		// hrac B prohral
		pingpong.scoreA++;
		$("#scoreA").html(pingpong.scoreA);
		//premisteni micku do vychozi polohy
		ball.x = 250;
		ball.y = 100;
		$("#ball").css({
			"left": ball.x,
			"top": ball.y
		});
		 // ballTop = parseInt($("#ball").css("top"));
		 // ballLeft = parseInt($("#ball").css("left"));
		ball.directionX = -1;
	}
	// leva hrana
	 // if (ballLeft + ball.speed*ball.directionX < 0) {
	if (ball.x + ball.speed*ball.directionX < 0) {
		// hrac A prohral
		pingpong.scoreB++;
		$("#scoreB").html(pingpong.scoreB);
		//premisteni micku do vychozi polohy
		ball.x = 150;
		ball.y = 100;
		$("#ball").css({
			"left": ball.x,
			"top": ball.y
		});
		 // ballTop = parseInt($("#ball").css("top"));
		 // ballLeft = parseInt($("#ball").css("left"));
		ball.directionX = 1;
	}
	// ball.x += ball.speed * ball.directionX;
	// ball.y += ball.speed * ball.directionY;
	
	// polohy palek
	
	// leva palka
	var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
	var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
	var paddleAYTop = parseInt($("#paddleA").css("top"));
	 // if (ballLeft + ball.speed*ball.directionX < paddleAX) {
	if (ball.x + ball.speed*ball.directionX < paddleAX) {
		  // if (ballTop + ball.speed*ball.directionY <= paddleAYBottom && 
				// ballTop + ball.speed*ball.directionY >= paddleAYTop) {
		if (ball.y + ball.speed*ball.directionY <= paddleAYBottom &&
				ball.y + ball.speed*ball.directionY >= paddleAYTop) {
			ball.directionX = 1;
		}
	}
	
	// prava palka
	var paddleBX = parseInt($("#paddleB").css("left"));
	var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
	var paddleBYTop = parseInt($("#paddleB").css("top"));
	 // if (ballLeft + ball.speed*ball.directionX >= paddleBX - 20)
	if (ball.x + ball.speed*ball.directionX >= paddleBX - 20) {
		if (ball.y + ball.speed*ball.directionY <= paddleBYBottom && 
			ball.y + ball.speed*ball.directionY >= paddleBYTop) {
			ball.directionX = -1;
		}
	}
	
	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;
	
	// vlastni pohyb micku pozadovanym smerem
	$("#ball").css({
		 // "left" : ballLeft + ball.speed * ball.directionX,
		 // "top" : ballTop + ball.speed * ball.directionY
		"left" : ball.x,
		"top" : ball.y
	});
}

//casovacem pravielne volana funkce, ktera vyhodnocuje stisknute klavesy
function movePaddles() {
	// sipka nahoru
	if (pingpong.pressedKeys[KEY.UP]) {
		// posunuti palky B o pet pixelu nahoru
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top - 5);
	}
	// sipka dolu
	if (pingpong.pressedKeys[KEY.DOWN]) {
		// posunuti palky B o pet pixelu dolu
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top + 5);
	}
	// klavesa W
	if (pingpong.pressedKeys[KEY.W]) {
		// posunuti palky A o pet pixelu nahoru
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top - 5);
	}
	// klavesa S
	if (pingpong.pressedKeys[KEY.S]) {
		// posunuti palky A o pet pixelu dolu
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top + 5);
	}
}








var PingPong = Game.extend({

  init: function(cb) {
 
    var self = this
	var html = '<div id="playground"><img src="/addons/games/pingpong/media/pingpong-playground-2.svg" id="pingpong-background" /><div id="paddleA" class="paddle"></div><div id="paddleB" class="paddle"></div><div id="ball"></div></div>'
    this.container = $(".game-container").html(html)

	// zaznamenani stisknuti a uvolneni klaves do pole pressedKeys
	$(document).keydown(function(e) {
		pingpong.pressedKeys[e.which] = true;  // [e.keyCode]
	});
	$(document).keyup(function(e) {
		pingpong.pressedKeys[e.which] = false;  // [e.keyCode]
	});

	
    if(cb) cb()

  },
  start: function(cb) {
    var self = this

	// nastaveni intervalu volani funkce gameloop na 30 milisekung
	pingpong.timer = setInterval(gameloop,30);

    if(cb) cb()
  },
  quit: function(cb) {
    // cleanup...
    if(cb) cb()
  }


})