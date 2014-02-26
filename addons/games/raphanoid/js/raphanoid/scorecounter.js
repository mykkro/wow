Raphanoid.ScoreCounter = Raphanoid.Komponent.extend({
	constructor: function(paper) {
		this.base(paper);
        this.element = paper.text(200, 8).attr({
            "font-size": "16",
            "font-weight": "bold"
        });
		this.reset();
    },
    setScore: function (score) {
        this.score = score;
        this.element.attr("text", "Score: " + score);
    },
    reset: function (score) {
        this.setScore(0);
    },
    addPoints: function (score) {
        this.setScore(this.score + score);
    }
});