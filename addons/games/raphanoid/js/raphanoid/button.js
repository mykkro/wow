Raphanoid.Button = Raphanoid.Komponent.extend({
	onClick: $.noop,
	constructor: function(paper, text, color) {
		this.base(paper);
		var self = this;
        this.element = paper.set();
        this.element.push(paper.rect(150, 180, 100, 40, 10, 10).attr("fill", color));
        this.element.push(paper.text(200, 200, text).attr({
            "font-size": 20
        }));
        this.element.click(function () {
            self.remove();
            self.onClick();
        });
    }
});
