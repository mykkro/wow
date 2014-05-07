module.exports = function(Widgetizer, i18n, dialogs) {

    var Base = require('basejs');
    var mustache = require('mustache');
    var ImageUtils = require("../util/ImageUtils")
    var Panel = require("./Panel")(Widgetizer, i18n, dialogs)

    var server = Widgetizer.rpc
    var fs = require("fs")
    // TODO use path module?
    var template = fs.readFileSync(__dirname + "/../../templates/previews/import.html")

    var AppPanel = Panel.extend({
        constructor: function() {
            this.base($("#import-list"), template)
        },
        getItemsDB: function(args, next) {
            server("importsList", args, next)
        },
        goTo: function(url) {
            window.location.href = url
        },
        goToImportPage: function(name) {
            this.goTo("/pages/app?importname=" + name + "&lang=de&showquitbutton=no")
        },
        goToGameAppPage: function(name) {
            this.goTo("/pages/game?importname=" + name + "&lang=de")
        },
        goToRuleGamePage: function(name) {
            this.goTo("/pages/rulegame?importname=" + name + "&lang=de")
        },
        showItem: function(item) {
            var self = this            
            var previewUri = "/imports/" + item.importName + "/preview.png"
            var out = this.base(item)
            ImageUtils.checkImageUrl(previewUri, function(found) {
                if (!found) previewUri = "/assets/misc/nopreview.svg"
                out.children("img")
                    .attr("src", previewUri)
                    .click(function() {
                        if (item.apptype == "wow/app/game") {
                            self.goToGameAppPage(item.importName)
                        } else if (item.apptype == "wow/app/rulegame") {
                            self.goToRuleGamePage(item.importName)
                        } else {
                            self.goToImportPage(item.importName)
                        }
                    })
            })
            return out
        },
        removeItemDB: function(id, next) {
            server("importRemove", id, next)
        }

    })


    return AppPanel
}
