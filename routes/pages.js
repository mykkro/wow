module.exports = function(app, Auth) {

	var mustache = require('mustache')
	var fs = require("fs-extra")
	var merge = require("merge")

    var defaultPreset = {
        "title":"Default preset",
        "content":{},
        "button1Link": {
            "title":"Videos",
            "content":{},
            "uri":"/pages/searchvideos"
        },
        "button2Link":{
            "title":"Radio",
            "content":{},
            "uri":"/pages/netradio"
        },
        "button3Link":{
            "title":"Entertainment",
            "content":{},
            "uri":"/pages/entertainment"
        },
        "theme":{
            "title":"Default theme",
            "options":{},
            "backgroundUri":"/assets/backgrounds/default.svg"
        }
    }

    var defaultLocation = {
        "title":"Prague",
        "description":"Prague",
        "latitude":50.08,
        "longitude":14.42
    }


    app.get('/pages/:name', Auth.isAuthenticatedAsUser, function(req, res) {
      console.log("Current user:", req.user)
      var preset = merge({}, defaultPreset, req.user.user.preset)
      var presetStr = JSON.stringify(preset)
      var location = merge({}, defaultLocation, req.user.user.location)
      var locationStr = JSON.stringify(location)
      var name = req.params.name
      var page = fs.readFileSync("templates/master.html", "utf8")
      var defs = fs.readFileSync("public/assets/misc/defs", "utf8")
      if(fs.existsSync("pages/"+name+"/index.wow")) {
        // page is internal SVG content
        var view = fs.readFileSync("pages/"+name+"/index.wow", "utf8")
        var master = fs.readFileSync("templates/page.svg", "utf8")
        var viewSVG = mustache.to_html(master, {defs:defs, content:view})
        var viewHtml = mustache.to_html(viewSVG, {query:req.query})
        var html = mustache.to_html(page, {query:req.query, "name":name, "content":viewHtml, preset:presetStr, location: locationStr}); 
      } else {
        // page is already a wrapped html page
        var view = fs.readFileSync("pages/"+name+"/index.html", "utf8")
        var viewSVG = mustache.to_html(view, {defs:defs, query:req.query})
        var viewHtml = viewSVG
        var html = mustache.to_html(page, {query:req.query, "name":name, "content":viewHtml, preset:presetStr, location: locationStr});
      }
      res.send(html)
    })

}