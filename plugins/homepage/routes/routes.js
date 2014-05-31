module.exports = function(prefix, app) {
  // define additional routes here...
  app.get(prefix+"/api", function(req, res) {
    res.send("Hello, world!")
  })
}
