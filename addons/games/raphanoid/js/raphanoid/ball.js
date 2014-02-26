Raphanoid.Ball = Raphanoid.Komponent.extend({
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
