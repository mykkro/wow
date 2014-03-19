module.exports = function($, Base) { 

	var SelectChain = Base.extend({
		/* widgets: an array of DOM/jQuery elements representing widgets */		
		constructor: function(widgets, currentIndex) {
			this.widgets = widgets;
			this.currentIndex = currentIndex || 0
			this.update()
		},
		select: function(index) {
			this.currentIndex = index
			this.update()
			return this
		},
		selectPrevious: function() {
			if(this.currentIndex>=0) {
				this.currentIndex = 
					this.widgets.length
						? ((this.currentIndex + this.widgets.length - 1) % this.widgets.length)
						: 0
				this.update()
			}
			return this
		},
		selectNext: function() {
			if(this.currentIndex>=0) {
				this.currentIndex = 
					this.widgets.length > 0 
						? ((this.currentIndex + 1) % this.widgets.length)
						: 0
				this.update()
			}
			return this
		},
		unselect: function() {
			this.currentIndex = -1
			this.update()
			return this
		},
		update: function() {
			for(var i=0; i<this.widgets.length; i++) {
				var el = this.widgets[i]
				if(i==this.currentIndex) {
					$(el).addClass("glow2")
				} else {
					$(el).removeClass("glow2")
				}
			}
			return this
		},
		current: function() {
			return this.widgets.length 
				? this.widgets[this.currentIndex]
				: null
		}
	})

	return SelectChain

}