module.exports = function(prefix, app, Auth, API) {
  // define additional routes here...
  app.get(prefix+"/api", function(req, res) {
    res.send("Hello, world!")
  })
}
