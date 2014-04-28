module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var BasePage = require("../../js/basepage")
    var SvgHelper = require("../../js/svghelper")(window)
    var url = require("url")
    var truncate = require('html-truncate');

    var ItemListPage = require("../../js/itemlistpage")(Wow)

    var UserAppsPage = ItemListPage.extend({
        activateSelected: function() {
            var target = $(this.selectChain.current())
            var widget = this.getWidget(target)
            if (widget.type == "iconbutton") {
                target.click()
            } else {
                this.followLink(target.find(".youtube-result"))
            }
        },
        followLink: function(tgt) {
            var targetName = tgt.data("name")
            var targetApptype = tgt.data("apptype")
            this.goToAppPage(targetName, targetApptype)
        },
        createControls: function(data) {
            var self = this
            this.base(data)
            var homeButton = self.getWidget("homeButton")
            self.selectChain.append(homeButton.element)
        },
        // TODO callback after all items are widgetized
        searchIt: function(page, next) {
            var self = this
            self.updateBrowserQuery(page)
            this.wtr.rpc("importsList", { /*userId:userId, */
                page: page
            }, function(err, data) {
                if (!err) {
                    if (data) data = {
                        // TODO change server query to return similar results as youtube search...
                        totalItems: 7,
                        startIndex: 1,
                        itemsPerPage: 6,
                        items: data.result
                    }
                    //self.selectChain.clear()
                    self.showSearchResults(page, data)
                    /* create plain widgets from results... */
                    var promises = $(".youtube-result").map(function() {
                        var $this = $(this)
                        var el = $this.get(0)
                        return self.widgetize(el)
                    })
                    $.when.apply($, promises).then(function() {
                        var results = Array.prototype.slice.call(arguments)
                        _.each(results, function(w) {
                            /* attach events... */
                            self.selectChain.append(w.element)
                            var tgt = $(w.element).find(".youtube-result")
                            if (tgt.data("name")) {
                                $(w.element).click(function() {
                                    self.followLink(tgt)
                                })
                            }
                        })
                        self.selectChain.update()
                        if (next) next(results)
                    })
                }

            })
        },
        showItem: function(data, index) {
            var self = this
            var column = index % 3
            var row = Math.floor(index / 3)
            var tx = 160 + column * 223
            var ty = 36 + row * 223
            var rect = SvgHelper.rect({
                ry: 35,
                rx: 35,
                height: 195,
                width: 195,
                fill: "#fff",
                stroke: self.colors[index],
                "stroke-width": 5
            })
            var items = [rect]
            var obj = {
                "class": "youtube-result",
                transform: "translate(" + tx + ", " + ty + ")"
            }
            if (data) {
                var label = data.title ? truncate(data.title, 20) : ""
                var thumbUrl = "/imports/" + data.importName + "/preview.png"
                var thumb = SvgHelper.image({
                    x: 7,
                    y: 20,
                    width: 180,
                    height: 120,
                    src: thumbUrl
                })
                var txt = SvgHelper.text(label, {
                    x: 97,
                    y: 170,
                    "text-anchor": "middle"
                })
                items = [rect, thumb, txt]
                obj['data-name'] = data.importName
                obj['data-apptype'] = data.apptype
            } else {
                obj["class"] += " disabled"
            }
            return SvgHelper.group(obj, items)
        }
    })
    return UserAppsPage

}
