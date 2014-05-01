module.exports = function(Widgetizer, i18n, dialogs) {

    var Base = require('basejs');
    var mustache = require('mustache');
    var ImageUtil = require("./ImageUtil")
    var Panel = require("./Panel")(Widgetizer, i18n, dialogs)

    var server = Widgetizer.rpc

    var ImportPanel = Panel.extend({
        constructor: function() {
            this.base($("#import-list"))
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
            console.log("ImportPanel.showItem", item)
            // TODO use mustache
            var self = this
            var previewUri = "/imports/" + item.importName + "/preview.png"
            var out = $("<div>")
            out.append(
                $("<h3>").text(item.title),
                $("<div>").text("Created: " + item.created),
                $("<img>").attr({
                    "width": 100,
                    "height": 100,
                    "src": previewUri
                }).click(function() {
                    if (item.apptype == "wow/app/game") {
                        self.goToGameAppPage(item.importName)
                    } else if (item.apptype == "wow/app/rulegame") {
                        self.goToRuleGamePage(item.importName)
                    } else {
                        self.goToImportPage(item.importName)
                    }
                }),
                this.makeRemoveButton(item._id, out)
            )
            ImageUtil.checkImageUrl(previewUri, function(found) {
                if (!found) previewUri = "/assets/misc/nopreview.svg"
                out.find("img").attr("src", previewUri)
            })
            return out
        },
        removeItemDB: function(id, next) {
            server("importRemove", id, next)
        }

    })


    return ImportPanel
}
