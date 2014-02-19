/* main game module */
define(['require'], function(localRequire) {
    var dfd = $.Deferred();
    /* loading local resources.. */
    localRequire(['./aux'], function(aux) {
        console.log("Aux file loaded.")
        // all local resource loaded...
        dfd.resolve()
    })    
	return {
		init: function(metadata, playerConfig) {
			console.log("Game initialized!")
			console.log(metadata)
			console.log(playerConfig)
		},
        // promise - indicates when the game is ready
        loaded: function() {
          return dfd.promise();
        }
	}
})
