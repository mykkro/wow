module.exports = function(cfg, next) {
	console.log("Installing "+cfg.name)

	// put your install stuff here
	next()
}
