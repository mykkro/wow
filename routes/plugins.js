var fs = require("fs-extra")
var path = require("path")
var mustache = require("mustache")
var merge = require("merge")

module.exports = function(app, express, Auth) {
	
    // templates used when rendering GUI pages...
    var svgPageLayout = fs.readFileSync(path.join(__dirname, "../views/mustache/page.svg.mustache"), "utf8")
    var svgDefs = fs.readFileSync(path.join(__dirname, "../views/mustache/defs.svg.mustache"), "utf8")
    var pageMaster = fs.readFileSync(path.join(__dirname, "../views/mustache/page-master.mustache"), "utf8")

    // test - include plugin routes for enabled plugins
    var pluginCfg = require("../plugins/plugins.json")
    var defaults = require("../lib/defaults")
    for(var key in pluginCfg.plugins) {
      var prefix = "/plugins/"+key
      var cfg = pluginCfg.plugins[key]
      if(cfg.enabled) {
        app.use(prefix+"/assets", express.static(path.join(__dirname, ".."+prefix+"/public")))
        require(".."+prefix+"/routes/routes")(prefix, app)
      }
    }
    app.get('/plugins/:name', function(req, res) {
      var name = req.params.name
      res.redirect("/plugins/"+name+"/index");
    })
    app.get('/plugins/:name/:page', Auth.isAuthenticatedAsUser, function(req, res) {
      console.log("Current user:", req.user)
      var name = req.params.name
      var page = req.params.page
      var prefix = "/plugins/"+name
      if(!(name in pluginCfg.plugins) || !pluginCfg.plugins[name].enabled) {
        // not available
        res.send(404, "Plugin not available: "+name)
      } else {
        var wowPath = path.join(__dirname, ".."+prefix+"/pages/"+page+".wow")
        var htmlPath = path.join(__dirname, ".."+prefix+"/pages/"+page+".html")
        var view
        if(fs.existsSync(wowPath)) {
          // page is internal SVG content
          view = fs.readFileSync(wowPath, "utf8")
          view = mustache.to_html(svgPageLayout, {defs:svgDefs, content:view, query:req.query})
        } else {
          // page is already a wrapped html page
          view = fs.readFileSync(htmlPath, "utf8")
          view = mustache.to_html(view, {defs:svgDefs, query: req.query})
        }
        var preset = merge({}, defaults.preset, req.user.user.preset)
        var presetStr = JSON.stringify(preset)
        var location = merge({}, defaults.location, req.user.user.location)
        var locationStr = JSON.stringify(location)
        var html = mustache.to_html(pageMaster, {"name":name, "content":view, preset:presetStr, location: locationStr}); 
        res.send(html)
      }
    })        

}