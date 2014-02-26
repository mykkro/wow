Raphanoid.Komponent = Base.extend({
	constructor: function(paper) {
		this.paper = paper;
    },
	remove: function() {
		if(this.element) {
			this.element.remove();
			this.element = null;
		}
	}
});