module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var BasePage = require("./basepage")
    var SvgHelper = require("./svghelper")(window)
    var url = require("url")
    var Base = require("basejs")
    var SelectChain = require("./selectchain")($, Base)
    var truncate = require('html-truncate');

    var ItemListPage = BasePage.extend({
        colors: [
            "#330099", "#f8c300", "#dd1379", "#dd1379", "#330099", "#f8c300"
        ],
        init: function(data, next) {
            var self = this
            self.createControls(data)
            self.selectChain.update()
            self.defaultChain = self.selectChain
            self.updateView(data)

            /* continue when finished */
            if (next) next(this)
        },
        createControls: function(data) {
            var document = window.document
            var svgsvg = document.getElementById("pagecontent")

            var self = this
            self.selectChain = new SelectChain()
            self.resultGrp = SvgHelper.group({
                "class": "youtube-results"
            })
            self.leftBtn = this.getWidget("leftButton")
            self.rightBtn = this.getWidget("rightButton")
            self.textBox = this.getWidget("searchTextbox")
            self.homeButton = this.getWidget("homeButton")

            self.leftBtn.click(function() {
                self.goToPreviousPage()
            })
            self.rightBtn.click(function() {
                self.goToNextPage()
            })
            self.homeButton.click(function() {
                self.goToHomePage()
            })
            svgsvg.appendChild(self.resultGrp)
        },
        updateView: function(data) {
            var self = this
            var page = parseInt(data.query.page || 1)
            self.searchIt(page, function(results) {
                console.log("Displaying results: ", results)
            })
        },
        /* create a plain widget from a SVG element. Returns Promise. */
        widgetize: function(el) {
            var deferred = $.Deferred()
            this.wtr.makePlainWidget(el, function(w) {
                deferred.resolve(w)
            })
            return deferred.promise()
        },
        selectPrevious: function() {
            this.selectChain.selectPrevious()
        },
        selectNext: function() {
            this.selectChain.selectNext()
        },
        activateSelected: function() {
            // to be implemented in subclass...
            var target = $(this.selectChain.current())
            console.log("Selected: " + target)
        },
        searchIt: function(page) {
            // to be implemented in subclass...
            // TODO callback after all items are widgetized
        },
        showItem: function(data, index) {
            // to be implemented in subclass...
            return SvgHelper.group({}, [])
        },
        /* update GUI with search results */
        /* also update left/right button status */
        showSearchResults: function(page, data) {
            var self = this
            data = data || {
                totalItems: 0,
                startIndex: 1,
                itemsPerPage: 6,
                items: []
            }
            var total = data.totalItems
            var start = data.startIndex
            var pagesize = data.itemsPerPage
            var items = data.items
            console.log("Showing results " + start + "-" + (start + items.length - 1) + " from " + total + " total")
            console.log(data)
            /* empty group... */
            while (self.resultGrp.hasChildNodes()) {
                self.resultGrp.removeChild(self.resultGrp.lastChild);
            }
            for (var i = 0; i < 6; i++) {
                var item = null
                if (i < items.length) item = items[i]
                self.resultGrp.appendChild(self.showItem(item, i))
            }
            var leftEnabled = (page > 1)
            var rightEnabled = (start - 1 + items.length < total)
            self.leftBtn.setEnabled(leftEnabled)
            self.rightBtn.setEnabled(rightEnabled)
        },
        onVirtualControl: function(evt) {
            var self = this
            switch (evt.control) {
                case "left":
                    if (self.leftBtn.isEnabled())
                        this.goToPreviousPage()
                    break;
                case "right":
                    if (self.rightBtn.isEnabled())
                        this.goToNextPage()
                    break;
                case "home":
                    this.goToHomePage()
                    break;
                case "up":
                    this.selectPrevious()
                    break;
                case "down":
                    this.selectNext()
                    break;
                case "select":
                    this.activateSelected()
                    break;
            }
        }
    })

    return ItemListPage

}
