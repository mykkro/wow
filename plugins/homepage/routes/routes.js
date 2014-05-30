module.exports = function(prefix, app) {
  app.get(prefix+"/", function(req, res) {
    res.send("Hello, world!")
  })
}
