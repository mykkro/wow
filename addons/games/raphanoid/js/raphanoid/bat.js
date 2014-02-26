Raphanoid.Bat = Raphanoid.Komponent.extend({
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
