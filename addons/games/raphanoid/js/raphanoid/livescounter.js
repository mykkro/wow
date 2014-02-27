Raphanoid.LivesCounter = Raphanoid.Komponent.extend({
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
});