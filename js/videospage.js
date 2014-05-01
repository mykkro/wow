module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var i18n = Wow.i18n
    var SvgHelper = require("./svghelper")(window)
    var userId = '555'
    var truncate = require('html-truncate');
    var ItemListPage = require("./ItemListPage")(Wow)

    var VideosPage = ItemListPage.extend({
        createControls: function(data) {
            this.base(data)
            var self = this
            var homeButton = self.getWidget("homeButton")
            self.selectChain.append(homeButton.element)
        },
        activateSelected: function() {
            var target = $(this.selectChain.current())
            var widget = this.getWidget(target)
            if (widget.type == "iconbutton") {
                target.click()
            } else {
                var targetName = target.find(".youtube-result").data("name")
                if (targetName) this.goToVideoPage(targetName)
            }
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
            var klass = "youtube-result"
            var obj = {
                "class": klass,
                transform: "translate(" + tx + ", " + ty + ")"
            }
            if (data) {
                var label = truncate(data.title, 20)
                var thumbUrl = data.thumbnail.sqDefault
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
                $(thumb).click(function() {
                    // go to video page...
                    self.goToVideoPage(data.id)
                })
                obj["data-name"] = data.id
            } else {
                obj["class"] += " disabled"
            }
            return SvgHelper.group(obj, items)
        },
        displayResults: function(page, data, next) {
            var self = this
            self.showSearchResults(page, data)
            /* create plain widgets from results... */
            var promises = $(".youtube-result").map(function() {
                var $this = $(this)
                var el = $this.get(0)
                return self.widgetize(el)
            })
            $.when.apply($, promises).then(function() {
                var results = Array.prototype.slice.call(arguments)
                self.selectChain = self.defaultChain.copy()
                _.each(results, function(w) {
                    /* attach events... */
                    self.selectChain.append(w.element)
                    var name = $(w.element).find(".youtube-result").data("name")
                    if (name) {
                        $(w.element).click(function() {
                            self.goToVideoPage(name)
                        })
                    }
                })
                self.selectChain.update()
                if (next) next(results)
            })
        }
    })

    return VideosPage

}
