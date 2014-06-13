
var Raphanoid = {
    width: 20,
    height: 20,
    bricks: {
        "basic": {
            width: 2,
            height: 1,
            points: 10, // receive on hit,
            lives: 1,
            color: "cyan"
        },
            "double": {
            width: 2,
            height: 1,
            points: 10,
            lives: 1,
            color: "blue",
            morphsTo: "basic" // if destroyed, changes to...
        },
            "solid": {
            width: 2,
            height: 1,
            points: 10,
            lives: 2, // hit it twice to destroy it...
            color: "red"
        },
            "unbreakable": {
            width: 2,
            height: 1,
            points: 10,
            lives: 1,
            color: "yellow",
            unbreakable: true
        }
    },
    /* screen has coordinate origin in top left corner */
    screens: [
	{
	"background": "textures/level0.jpg",
        "name": "Super Simple",
            "author": "Myrousz",
            "bricks": [{
            x: 3,
            y: 3,
            type: "basic"
        }, {
            x: 5,
            y: 3,
            type: "solid"
        }, {
            x: 7,
            y: 3,
            type: "basic"
        }, {
            x: 9,
            y: 3,
            type: "solid"
        }, {
            x: 11,
            y: 3,
            type: "basic"
        }, {
            x: 13,
            y: 3,
            type: "solid"
        }, {
            x: 15,
            y: 3,
            type: "basic"
        }]
    },
	{
	"background": "textures/level1.jpg",
        "name": "Demo Level",
            "author": "Myrousz",
            "bricks": [{
            x: 1,
            y: 1,
            type: "basic"
        }, {
            x: 3,
            y: 1,
            type: "double"
        }, {
            x: 5,
            y: 1,
            type: "basic"
        }, {
            x: 7,
            y: 1,
            type: "double"
        }, {
            x: 9,
            y: 1,
            type: "basic"
        }, {
            x: 11,
            y: 1,
            type: "double"
        }, {
            x: 13,
            y: 1,
            type: "basic"
        }, {
            x: 15,
            y: 1,
            type: "double"
        }, {
            x: 17,
            y: 1,
            type: "basic"
        }, {
            x: 2,
            y: 2,
            type: "basic"
        }, {
            x: 4,
            y: 2,
            type: "basic"
        }, {
            x: 6,
            y: 2,
            type: "basic"
        }, {
            x: 8,
            y: 2,
            type: "basic"
        }, {
            x: 10,
            y: 2,
            type: "basic"
        }, {
            x: 12,
            y: 2,
            type: "basic"
        }, {
            x: 14,
            y: 2,
            type: "basic"
        }, {
            x: 16,
            y: 2,
            type: "basic"
        }, {
            x: 3,
            y: 3,
            type: "basic"
        }, {
            x: 5,
            y: 3,
            type: "basic"
        }, {
            x: 7,
            y: 3,
            type: "basic"
        }, {
            x: 9,
            y: 3,
            type: "solid"
        }, {
            x: 11,
            y: 3,
            type: "basic"
        }, {
            x: 13,
            y: 3,
            type: "basic"
        }, {
            x: 15,
            y: 3,
            type: "basic"
        }]
    },
	{
	"background": "textures/level2.jpg",
        "name": "Demo Level 2",
            "author": "Myrousz",
            "bricks": [{
            x: 1,
            y: 1,
            type: "basic"
        }, {
            x: 3,
            y: 1,
            type: "double"
        }, {
            x: 5,
            y: 1,
            type: "basic"
        }, {
            x: 7,
            y: 1,
            type: "double"
        }, {
            x: 9,
            y: 1,
            type: "basic"
        }, {
            x: 11,
            y: 1,
            type: "double"
        }, {
            x: 13,
            y: 1,
            type: "basic"
        }, {
            x: 15,
            y: 1,
            type: "double"
        }, {
            x: 17,
            y: 1,
            type: "basic"
        }, {
            x: 2,
            y: 2,
            type: "basic"
        }, {
            x: 4,
            y: 2,
            type: "basic"
        }, {
            x: 6,
            y: 2,
            type: "basic"
        }, {
            x: 8,
            y: 2,
            type: "basic"
        }, {
            x: 10,
            y: 2,
            type: "basic"
        }, {
            x: 12,
            y: 2,
            type: "basic"
        }, {
            x: 14,
            y: 2,
            type: "basic"
        }, {
            x: 16,
            y: 2,
            type: "basic"
        }, {
            x: 3,
            y: 3,
            type: "basic"
        }, {
            x: 5,
            y: 3,
            type: "unbreakable"
        }, {
            x: 7,
            y: 3,
            type: "basic"
        }, {
            x: 9,
            y: 3,
            type: "solid"
        }, {
            x: 11,
            y: 3,
            type: "basic"
        }, {
            x: 13,
            y: 3,
            type: "unbreakable"
        }, {
            x: 15,
            y: 3,
            type: "basic"
        }]
    }
	]
};
;Raphanoid.Komponent = Base.extend({
	constructor: function(paper) {
		this.paper = paper;
    },
	remove: function() {
		if(this.element) {
			this.element.remove();
			this.element = null;
		}
	}
});;Raphanoid.Ball = Raphanoid.Komponent.extend({
    constructor: function (screen, paper) {
		this.base(paper);
        this.screen = screen;
        this.ball = paper.circle(200, 240, 8);
        this.ball.attr("fill", "#CCC");
		this.reset();
    },
	reset: function() {
        this.x = 200;
        this.y = 240;
        this.dx = 0; 
        this.dy = 1;
        this.speed = 6;
        this.radius = 8; 
        this.ball.attr("cx", this.x);
		this.ball.attr("cy", this.y);
		this.ball.attr("radius", this.radius);
	},
    move: function () {
        var bb;
        // test na kolizi s cihlou
        var brick = this.screen.findBrickAtPosition(this.x, this.y);
        if (brick) {
            brick.hit();
            bb = this.screen.testCollisionsWithBrick(this.x, this.y, this.dx, this.dy, this.speed, brick);
        } else {
			if(this.y+this.dy*this.speed > 400-this.screen.ball.radius) {
				// ball escapes the stage!
				this.screen.loseLife();
				return;
			} else {
				// palka nebo zed...
				bb = this._move(this.x, this.y, this.dx, this.dy, this.speed);
			}
        }
        /* we should ensure that the ball will not stuck in infinite horizontal movement... */
        if(Math.abs(bb.dy) < 0.15) {
            if(bb.dy<0) bb.dy = -0.15; else bb.dy = 0.15;
        }
        // ensure that the vector is unit vector
		var norm = Util.normalizeVector(bb.dx, bb.dy);
        this.x = bb.x;
        this.y = bb.y;
        this.dx = norm.x;
        this.dy = norm.y;
        this.ball.attr("cx", this.x);
        this.ball.attr("cy", this.y);
    },
    // returns new position & vector...
    _move: function (x, y, dx, dy, distance) {
        // test collisions...
        var co, co2;
        //do {
        co = this.screen.testCollisionsWithWalls(x, y, dx, dy, distance);
        co2 = this.screen.testCollisionsWithBat(x, y, dx, dy, distance);
        if (co2.distance > co.distance) {
            // collision with bat!
            co = co2;
        }
        x = co.x;
        y = co.y;
        dx = co.dx;
        dy = co.dy;
        distance = co.distance;
        //} while(co.distance > 1); // some arbitrary small distance...
        // it is sufficient to test only one collision per frame...
        return {
            x: x,
            y: y,
            dx: dx,
            dy: dy,
            distance: 0
        };
    }
});
;Raphanoid.Bat = Raphanoid.Komponent.extend({
    constructor: function (paper) {
		this.base(paper);
        this.minX = 40;
        this.maxX = 400 - 40;
        this.x = 200;
        this.y = 370;
        this.width = 60;
        this.height = 20;
        this.speed = 6;
        this.bat = paper.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, 8, 8);
        this.bat.attr("fill", "azure");
    },
	reset: function() {
        this.x = 200;
        this.y = 370;
        this.width = 60;
        this.height = 20;
        this.speed = 6;
        this.bat.attr({x: this.x - this.width / 2, y: this.y - this.height / 2, width: this.width, height: this.height});
	},
    move: function (direction) {
        var batX = this.x + this.speed * direction;
        batX = Math.max(this.minX, batX);
        batX = Math.min(this.maxX, batX);
        this.x = batX;
        // update bat position...        
        this.bat.attr("x", this.x - this.width / 2);
    }
});
;// Arkanoid game
Raphanoid.Brick = Raphanoid.Komponent.extend({
    // events...
    onHit: $.noop,
    onDestroy: $.noop,
    onRespawn: $.noop,
    // initialization...
    constructor: function (paper, type, x, y) {
		this.base(paper);
        this.id = Raphanoid.Brick.autoId();
        this.x = x;
        this.y = y;
        this.brick = Raphanoid.bricks[type];
        this.lives = this.brick.lives; // lives counter...
    },
    init: function (paper) {
        var self = this;
        var rect = paper.rect(this.x * 20, this.y * 20, this.brick.width * 20, this.brick.height * 20);
        rect.attr("fill", this.brick.color);
        /**/
        rect.click(function () {
            self.hit();
        });
        this.element = rect;
        return rect;
    },
    testBall: function (x, y, radius) {
        var ex = this.extents(radius);
        return (x >= ex.xMin && x <= ex.xMax && y >= ex.yMin && y <= ex.yMax);
    },
    extents: function (border) {
        var x1 = this.x * 20 - border;
        var y1 = this.y * 20 - border;
        var x2 = x1 + this.brick.width * 20 + border;
        var y2 = y1 + this.brick.height * 20 + border;
        return {
            xMin: x1,
            xMax: x2,
            yMin: y1,
            yMax: y2
        };
    },
    hit: function () {
        // give player the hit score
        this.onHit(this);
		// play sound...
		var snd = new Audio("media/boing2.wav"); // buffers automatically when created
		snd.volume = 0.1;
		snd.play();
        // if breakable, decrease lives count
        if (!this.brick.unbreakable) {
            this.lives--;
            if (!this.lives) {
                // if lives==0, destroy brick
                this.destroy();
                // if morphsTo!=null, create new brick in place of this one
            }
        }
    },
    destroy: function (arg) {
        if (this.brick.morphsTo) {
            // create new brick in place!
            this.respawn(this.brick.morphsTo, this.x, this.y);
        }
        this.onDestroy(this);
    },
    respawn: function (type, x, y) {
        this.onRespawn(type, x, y);
    }
}, {
    _idCounter: 0,
    autoId: function () {
        return "brick" + Raphanoid.Brick._idCounter++;
    }
});
;Raphanoid.LivesCounter = Raphanoid.Komponent.extend({
    onNoLifeLeft: $.noop,
	constructor: function(paper) {
		this.base(paper);
        /*
        this.element = paper.text(300, 8).attr({
            "font-size": "16",
            "font-weight": "bold"
        });
        */
		this.reset();
    },
    setLives: function (lives) {
        this.lives = lives;
        //this.element.attr("text", "Lives: " + lives);
    },
	loseLife: function() {
		this.setLives(this.lives-1);
		if(this.lives <= 0) {
			this.onNoLifeLeft();
		}
	},
    reset: function (score) {
        this.setLives(3);
    }
});;Raphanoid.ScoreCounter = Raphanoid.Komponent.extend({
	constructor: function(paper) {
		this.base(paper);
        /*
        this.element = paper.text(200, 8).attr({
            "font-size": "16",
            "font-weight": "bold"
        });
        */
		this.reset();
    },
    setScore: function (score) {
        this.score = score;
        //this.element.attr("text", "Score: " + score);
    },
    reset: function (score) {
        this.setScore(0);
    },
    addPoints: function (score) {
        this.setScore(this.score + score);
    }
});;Raphanoid.Screen = Base.extend({
    onScreenCleared: $.noop,
    constructor: function (paper, game) {
        this.game = game
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
        this.level = 0;
        this.score = 0;
    },
    setLevelBackground: function(level) {
    	this.background.attr("src", "media/"+Raphanoid.screens[level].background);
    	this.background2.attr("src", "media/"+Raphanoid.screens[level].background);
    },
    animateBackground: function() {
        if(!this.alive) return
        if(this.running && !this.game.paused) {
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
        this.bricks = {};
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
		//this.game.prompt(__("Start!"), {}, function () {
			if(!keepScore) {
				self.scoreCounter.reset();
				self.livesCounter.reset();
                self.level = 0;
			}
            self.startGame();
            self.game.log("score", self.scoreCounter.score)
            self.game.log("lives", self.livesCounter.lives)
            self.game.log("level", self.level+1)
        //})
    },
    putWellDoneButton: function () {
		var self = this;
        this.game.prompt(__("Well done!"), {}, function () {
			self.level++;
			if(self.level >= Raphanoid.screens.length) {
				self.level = 0;
			}
            self.game.log("level", self.level+1)
			self.setLevelBackground(self.level);
            self.init(true);
        })
    },
	loseLife: function() {
		var self = this;
		this.livesCounter.loseLife();
        this.game.log("lives", self.livesCounter.lives)
		this.ball.reset();
		this.bat.reset();
	},
	gameOver: function() {
		var self = this;
		self.endGame();
        this.game.prompt(__("Game over"), {}, function () {
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
            self.game.log("score", self.scoreCounter.score)            
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
            if(!self.game.paused) {
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
            }
			if(self.running) {
				setTimeout(tick, tickRate);
			}
		};
		
		tick();
	}
		
});
;var RaphanoidGame = Game.extend({
  init: function(cb) {
    this.base()
    this.paperDiv = $("<div>").attr("id", "paper").appendTo($("#tab-game"))    
    this.paper = null
    if(cb) cb()
  },
  start: function(cb) {
    // initialization...
    this.base()
    this.paperDiv.empty()
    this.paper = Raphael("paper", 400, 400);
    this.screen = new Raphanoid.Screen(this.paper, this);
    this.screen.init(this.paper);
    if(cb) cb()
  },
  stop: function(cb) {
    this.base()
    this.screen.stop()
    if(cb) cb()
  },
  quit: function(cb) {
    this.base(cb)
  },
  pause: function(cb) {
    this.paused = true
    this.base(cb)
  },
  resume: function(cb) {
    this.paused = false
    this.base(cb)
  },  
  availableLogs: function() {
    var logs = this.base()
    logs['lives'] = { "label": __("Lives"), "type": "integer", "defaultValue": 3, "visible": true },
    logs['level'] = { "label": __("Level"), "type": "integer", "defaultValue": 1, "visible": true }
    return logs
  }


})