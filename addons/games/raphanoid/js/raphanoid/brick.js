// Arkanoid game
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
