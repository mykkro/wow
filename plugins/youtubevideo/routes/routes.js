module.exports = function(prefix, app, Auth) {
  // define additional routes here...
  app.get(prefix+"/api", function(req, res) {
    res.send("Hello, world!")
  })
}
