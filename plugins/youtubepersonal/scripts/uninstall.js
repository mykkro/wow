module.exports = function(cfg, next) {
	console.log("Unstalling "+cfg.name)

	// put your uninstall stuff here
	next()
}
