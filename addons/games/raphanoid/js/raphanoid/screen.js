Raphanoid.Screen = Base.extend({
    onScreenCleared: $.noop,
    constructor: function (paper) {
        this.paper = paper;
    	var self = this;
    	this.background = paper.image ("media/"+Raphanoid.screens[0].background, 0, 0, 400, 400); 
    	this.background2 = paper.image ("media/"+Raphanoid.screens[0].background, 0, 400, 400, 400); 
            this.ball = new Raphanoid.Ball(this, this.paper);
            this.bat = new Raphanoid.Bat(this.paper);
            this.scoreCounter = new Raphanoid.ScoreCounter(this.paper);
    	this.livesCounter = new Raphanoid.LivesCounter(this.paper);
    	this.livesCounter.onNoLifeLeft = function() {
    		self.gameOver();
    	};
    },
    setLevelBackground: function(level) {
    	this.background.attr("src", "media/"+Raphanoid.screens[level].background);
    	this.background2.attr("src", "media/"+Raphanoid.screens[level].background);
    	this.level = level;
    },
    animateBackground: function() {
        if(!this.alive) return
        if(this.running) {
        	this.setBackgroundPosition(this.frame);
        	this.frame += 1;
        	if(this.frame >= 400) this.frame -= 400;
        }
    	var self = this;
    	var fun = function() { self.animateBackground(); };
    	setTimeout(fun, 40);
    },
    setBackgroundPosition: function(y) {
    	this.background.attr("y", y-400);
    	this.background2.attr("y", y);
    },
    init: function (keepScore) {
        this.level = 0;
        this.bricks = {};
        this.score = 0;
        this.running = false;
        this.alive = true;
        this.setBackgroundPosition(0);
        this.frame = 0;
        this.animateBackground();
		this.screen = Raphanoid.screens[this.level];
        // grid...
        //Rx.grid(paper, 0, 0, 400, 400, 20, 20).attr("stroke","#aaa");
        // build all bricks
        var self = this;
		this.clearAllBricks();
        for (var i = 0; i < this.screen.bricks.length; i++) {
            var brick = this.screen.bricks[i];
            this.putBrick(brick.type, brick.x, brick.y);
        }
        this.putStartButton(keepScore);
    },
    stop: function() {
        this.running = false
        this.alive = false
    },
    isScreenClear: function () {
        // only unbreakable elements shall remain...
        for (var key in this.bricks) {
            var aBr = this.bricks[key];
            if (!aBr.brick.unbreakable) return false;
        }
        return true;
    },
    findBrickAtPosition: function (x, y) {
        var xx = x / 20;
        var yy = y / 20;
        for (var id in this.bricks) {
            var br = this.bricks[id];
            if (br.testBall(x, y, this.ball.radius)) {
                return br;
            }
        }
        return null;
    },
	clearAllBricks: function() {
		for(br in this.bricks) {
			this.bricks[br].element.remove();
		}
		this.bricks = {};
	},
    removeBrick: function (arkBrick) {
        // remove from Raphael set...
        arkBrick.element.remove();
        delete this.bricks[arkBrick.id];
        if (this.isScreenClear()) {
            // level over!
			this.endGame();
            this.putWellDoneButton();
        }
    },
    putStartButton: function (keepScore) {
		var self = this;
		Game.prompt("Start!", {}, function () {
			if(!keepScore) {
				self.scoreCounter.reset();
				self.livesCounter.reset();
			}
            self.startGame();
        })
    },
    putWellDoneButton: function () {
		var self = this;
        Game.prompt("Well done!", {}, function () {
			self.level++;
			if(self.level >= Raphanoid.screens.length) {
				self.level = 0;
			}
			self.setLevelBackground(self.level);
            self.init(true);
        })
    },
	loseLife: function() {
		var self = this;
		this.livesCounter.loseLife();
		this.ball.reset();
		this.bat.reset();
	},
	gameOver: function() {
		var self = this;
		self.endGame();
        Game.prompt("Game over!", {}, function () {
			self.level = 0;
			self.setLevelBackground(self.level);
			self.init();
        })
	},
    testCollisionsWithBrick: function (x, y, dx, dy, distance, brick) {
        var
        uu = dx * distance,
            vv = dy * distance,
            br = this.ball.radius,
            t = 1,
            ex = brick.extents(br),
            xMin = ex.xMin,
            yMin = ex.yMin,
            xMax = ex.xMax,
            yMax = ex.yMax,
            xx, yy;
        var collision = false;
        if (uu !== 0) {
            if (x + uu > xMin) {
                // left side...
                t = (xMin - x) / uu;
                yy = y + vv * t;
                if (t >= 0 && t <= 1 && yy >= yMin && yy <= yMax) {
                    // collision with left side!
                    dx = -dx;
                    collision = true;
                }
            }
            if (!collision && x + uu < xMax) {
                // right side...
                t = (x - xMax) / uu;
                yy = y + vv * t;
                if (t >= 0 && t <= 1 && yy >= yMin && yy <= yMax) {
                    // collision with right side!
                    dx = -dx;
                    collision = true;
                }
            }
        }
        if (vv !== 0) {
            if (!collision && y + vv > yMin) {
                // top side
                t = (yMin - y) / vv;
                xx = x + uu * t;
                if (t >= 0 && t <= 1 && xx >= xMin && xx <= xMax) {
                    // collision with top side!
                    dy = -dy;
                    collision = true;
                }
            }
            if (!collision && y + vv < yMax) {
                // bottom side...
                t = (y - yMax) / vv;
                xx = x + uu * t;
                if (t >= 0 && t <= 1 && xx >= xMin && xx <= xMax) {
                    // collision with bottom side!
                    dy = -dy;
                    collision = true;
                }
            }
        }
        if (!collision) t = 1;
        // vypocitat novou pozici a direction vektor...
        x += uu * t;
        y += vv * t;
        distance = distance * (1 - t); // tato vzdalenost jeste zbyva...     
        return {
            x: x,
            y: y,
            dx: dx,
            dy: dy,
            distance: distance
        };
    },
    // TODO nejak zjednodusit/zoptimalizovat?
    testCollisionsWithBat: function (x, y, dx, dy, distance) {
        var
        uu = dx * distance,
            vv = dy * distance,
            br = this.ball.radius,
            t = 1,
            xMin = this.bat.x - this.bat.width / 2 - br,
            yMin = this.bat.y - this.bat.height / 2 - br,
            xMax = this.bat.x + this.bat.width / 2 + br,
            yMax = this.bat.y + this.bat.height / 2 + br,
            xx, yy;
        //this.watches.put("col"," "+xMin+" "+yMin+" "+xMax+" "+yMax+" uu="+uu+" vv="+vv);
        var collision = false;
        if (uu !== 0) {
            if (x + uu > xMin) {
                // left side...
                t = (xMin - x) / uu;
                yy = y + vv * t;
                if (t >= 0 && t <= 1 && yy >= yMin && yy <= yMax) {
                    // collision with left side!
                    dx = -dx;
                    collision = true;
                }
            }
            if (!collision && x + uu < xMax) {
                // right side...
                t = (x - xMax) / uu;
                yy = y + vv * t;
                if (t >= 0 && t <= 1 && yy >= yMin && yy <= yMax) {
                    // collision with right side!
                    dx = -dx;
                    collision = true;
                }
            }
        }
        if (vv !== 0) {
            if (!collision && y + vv > yMin) {
                // top side
                t = (yMin - y) / vv;
                xx = x + uu * t;
                if (t >= 0 && t <= 1 && xx >= xMin && xx <= xMax) {
                    // collision with top side!
                    // where the ball hit the bat?
                    var pos = 2 * (xx - xMin) / (xMax - xMin) - 1;
                    var flipX = pos * 0.7;
                    var flipY = -1;
                    // normalize...
                    var flipSize = Math.sqrt(flipX * flipX + flipY * flipY);
                    flipX /= flipSize;
                    flipY /= flipSize;
                    dy = -dy;
                    dx = -dx;
                    // flip dx,dy vector around flipX,flipY
                    var cosTheta = dx * flipX + dy * flipY;
                    dx = dx - 2 * (dx - cosTheta * flipX);
                    dy = dy - 2 * (dy - cosTheta * flipY);
                    collision = true;
                }
            }
            if (!collision && y + vv < yMax) {
                // bottom side...
                t = (y - yMax) / vv;
                xx = x + uu * t;
                if (t >= 0 && t <= 1 && xx >= xMin && xx <= xMax) {
                    // collision with bottom side!
                    dy = -dy;
                    collision = true;
                }
            }
        }
        if (!collision) t = 1;
        // vypocitat novou pozici a direction vektor...
        x += uu * t;
        y += vv * t;
        distance = distance * (1 - t); // tato vzdalenost jeste zbyva...     
        return {
            x: x,
            y: y,
            dx: dx,
            dy: dy,
            distance: distance
        };
    },
    // TODO nejak zjednodusit/zoptimalizovat?
    testCollisionsWithWalls: function (x, y, dx, dy, distance) {
        var
			uu = dx * distance,
            vv = dy * distance,
            br = this.ball.radius,
            t = 1,
            tx = 1,
            ty = 1,
            axis = true,
            collision = false,
            xMin = br,
            yMin = br,
            xMax = 400 - br,
            yMax = 400 - br;
        if (uu !== 0) {
            if (x + uu < xMin) {
                // left wall...
                tx = Math.min((x - xMin) / uu, 0);
            } else if (x + uu > xMax) {
                // right wall...
                tx = Math.min((xMax - x) / uu, 0);
            }
        }
        if (vv !== 0) {
            if (y + vv < yMin) {
                // top wall...
                ty = Math.min((y - yMin) / vv, 0);
            } else if (y + vv > yMax) {
                // bottom wall...
                ty = Math.min((yMax) / vv, 0);
            }
        }
        if (tx < 1) {
            collision = true;
            if (ty < tx) {
                // y collision is closer...
                t = ty;
                axis = false;
            }
        } else if (ty < 1) {
            collision = true;
            t = ty;
            axis = false;
        }
        // vypocitat novou pozici a direction vektor...
        x += dx * distance * t;
        y += dy * distance * t;
        distance = distance * (1 - t); // tato vzdalenost jeste zbyva...     
        if (collision) {
            if (axis) {
                dx = -dx;
            } else {
                dy = -dy;
            }
        }
        return {
            x: x,
            y: y,
            dx: dx,
            dy: dy,
            distance: distance
        };
    },
    putBrick: function (type, x, y) {
        var self = this;
        var ab = new Raphanoid.Brick(this.paper, type, x, y);
        this.bricks[ab.id] = ab;
        ab.onHit = function (arkBrick) {
            self.scoreCounter.addPoints(arkBrick.brick.points);
        };
        ab.onDestroy = function (arkBrick) {
            // remove brick from screen...
            self.removeBrick(arkBrick);
        };
        ab.onRespawn = function (type, x, y) {
            self.putBrick(type, x, y);
        };
        ab.init(this.paper);
        return ab;
    },
	endGame: function() {
		this.running = false;		
	},
	startGame: function() {
		// reset all items...
		this.ball.reset();
		this.bat.reset();

		var self = this;
		this.running = true;
		var tickRate = 30,
			keyArrowUp = false,
			keyArrowDown = false,
			keyArrowLeft = false,
			keyArrowRight = false;

		$('body').keydown(function (e) {
			switch (e.which) {
				case 38:
					keyArrowUp = true;
					break;
				case 40:
					keyArrowDown = true;
					break;
				case 37:
					keyArrowLeft = true;
					break;
				case 39:
					keyArrowRight = true;
					break;
			}
		});

		$('body').keyup(function (e) {
			switch (e.which) {
				case 38:
					keyArrowUp = false;
					break;
				case 40:
					keyArrowDown = false;
					break;
				case 37:
					keyArrowLeft = false;
					break;
				case 39:
					keyArrowRight = false;
					break;
			}
		});

		var tick = function () {
			self.ball.move();
			if (keyArrowUp) {
				// up code
			} else if (keyArrowDown) {
				// down code
			} else if (keyArrowLeft) {
				// left code
				self.bat.move(-1);
			} else if (keyArrowRight) {
				// right code
				self.bat.move(1);
			}
			if(self.running) {
				setTimeout(tick, tickRate);
			}
		};
		
		tick();
	}
		
});
