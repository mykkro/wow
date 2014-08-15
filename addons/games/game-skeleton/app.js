
var GameSkeleton = Game.extend({
	init: function(cb) {
		// put initialization code here...
		
		if(cb) cb()
	},
	
	onKeyboard: function(evt) {

	},
	
	onGamepad: function(evt) {

	},
	
	start: function(cb) {
		
		if(cb) cb()
	},
    
	
	quit: function(cb) {
		this.stop(cb)
	},
	
	stop: function(cb) {
	        if (cb) cb()
	}
	
})
