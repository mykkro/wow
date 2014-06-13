var fs = require("fs-extra")
var path = require("path")
var mustache = require("mustache")
var merge = require("merge")
var url = require("url")

module.exports = function(app, express, Auth, API) {
	
	var redirUrl = function(myUrl, pathname) {
		var q = url.parse(myUrl, true)
		q.search = null
		q.pathname = pathname
		return url.format(q)
	}

  // test - include plugin routes for enabled plugins
  var pluginCfg = require("../plugins/plugins.json")
  var defaults = require("../lib/defaults")
	
  var static = function() {
    for(var key in pluginCfg.plugins) {
      var prefix = "/plugins/"+key
      var cfg = pluginCfg.plugins[key]
      if(cfg.enabled) {
        app.use(prefix+"/assets", express.static(path.join(__dirname, ".."+prefix+"/public")))
        app.use("/locales", express.static(path.join(__dirname, ".."+prefix+"/locales")))
      }
    }
  }

  var routes = function() {
    // templates used when rendering GUI pages...
    var svgPageLayout = fs.readFileSync(path.join(__dirname, "../views/mustache/page.svg.mustache"), "utf8")
    var svgDefs = fs.readFileSync(path.join(__dirname, "../views/mustache/defs.svg.mustache"), "utf8")
    var pageMaster = fs.readFileSync(path.join(__dirname, "../views/mustache/page-master.mustache"), "utf8")

    for(var key in pluginCfg.plugins) {
      var prefix = "/plugins/"+key
      var cfg = pluginCfg.plugins[key]
      if(cfg.enabled) {
        require(".."+prefix+"/routes/routes")(prefix, app, Auth, API)
      }
    }

    app.get('/plugins/:name', function(req, res) {
      var name = req.params.name
    // create redirect URL but keep querystring...
    var tgt = redirUrl(req.url, "/plugins/"+name+"/index")
      res.redirect(tgt);
    })
    
    app.get('/plugins/:name/:page', Auth.isAuthenticatedAsUser, function(req, res) {
      var name = req.params.name
      var page = req.params.page
      var locale = req.user.user.locale || 'en'
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
        /**/console.log("PRESET:", defaults.preset, req.user.user)
        var preset = merge({}, defaults.preset, req.user.user.preset)
        var presetStr = JSON.stringify(preset)
        var location = merge({}, defaults.location, req.user.user.location)
        var locationStr = JSON.stringify(location)
        var html = mustache.to_html(pageMaster, {"name":name, "content":view, "locale": locale, preset:presetStr, location: locationStr}); 
        res.send(html)
      }
    })        
  }

  return {
    static: static,
    routes: routes
  }

}