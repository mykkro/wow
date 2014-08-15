var KEY = {
	UP: 68,//38,
	DOWN: 67,//40,
	UP2: 81, // 87,
	DOWN2: 65 // 83
}


var PingPong = Game.extend({
	scoreA: 0, // score hrace A
	scoreB: 0, // score hrace B
	pressedKeys: {},
	ball: {
		speed: 5,
		x: 150,
		y: 100,
		directionX: 1,
		directionY: 1
	},	
	init: function(cb) {
	 
		var self = this
		var pingpong = this
		var html = '<div id="playground"><img src="/addons/games/pingpong/media/pingpong-playground-2.svg" id="pingpong-background" /><div id="paddleA" class="paddle"></div><div id="paddleB" class="paddle"></div><div id="ball"></div></div>'
		this.container = $(".game-container").html(html)
		
		if(cb) cb()
	},
	
	onKeyboard: function(evt) {
		var keyCode = evt.which
		if(keyCode == KEY.UP || keyCode == KEY.DOWN || keyCode == KEY.UP2 || keyCode == KEY.DOWN2) {
			if(evt.type == "keydown") {
				this.pressedKeys[keyCode] = true
			}
			if(evt.type == "keyup") {
				this.pressedKeys[keyCode] = false
			}
		}
	},
	
	start: function(cb) {
		var self = this
		var pingpong = this
		var ball = pingpong.ball;
		
		ball.x = 150;
		ball.y = 205;
		$("#ball").css({
			"left": ball.x,
			"top": ball.y
		});
		
		pingpong.running = true;
		
		// nastaveni intervalu volani funkce gameloop na 30 milisekung
		var fun = function() {
			self.gameloop()
		}
		pingpong.timer = setInterval(fun,30);
		
		if(cb) cb()
	},
    
	pause: function(cb) {
		var pingpong = this
		pingpong.running = false;		
		this.base(cb)
	},
    
	resume: function(cb) {
		var pingpong = this
        pingpong.running = true;
        this.base(cb)
    },
	
	restart: function(cb) {
		var pingpong = this
        // restart game
        var self = this;
		if(pingpong.timer) clearInterval(pingpong.timer)
        this.base(cb)
    },
	
	quit: function(cb) {
		// cleanup...
		this.stop(cb)
	},
	
	stop: function(cb) {
        if (cb) cb()
    },

	// volani teto funkce je kazdych 30 milisekund
	gameloop: function() {
		if (this.running) {
			this.moveBall();
			this.movePaddles();	
			// console.log(this.pressedKeys)
		}
	},
	
	
	//casovacem pravielne volana funkce, ktera vyhodnocuje stisknute klavesy
	movePaddles: function() {
		var pingpong = this
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
		if (pingpong.pressedKeys[KEY.UP2]) {
			// posunuti palky A o pet pixelu nahoru
			var top = parseInt($("#paddleA").css("top"));
			$("#paddleA").css("top",top - 5);
		}
		// klavesa S
		if (pingpong.pressedKeys[KEY.DOWN2]) {
			// posunuti palky A o pet pixelu dolu
			var top = parseInt($("#paddleA").css("top"));
			$("#paddleA").css("top",top + 5);
		}
	},	
	
	// pohyb micku 
	moveBall: function() {
		var pingpong = this
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
			ball.x = 570;
			ball.y = 205;
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
			ball.y = 205;
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
	
})
