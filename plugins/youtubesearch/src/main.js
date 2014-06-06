module.exports = function(Wow) {
    var $ = Wow.$
    var i18n = Wow.i18n
    var ItemListPage = require("../../../js/ItemListPage")(Wow)
    var window = Wow.window
    var url = require("url")
    var SvgHelper = require("../../../js/svghelper")(window)
    var truncate = require('html-truncate');

    var SearchVideosPage = ItemListPage.extend({
        /**
         * Shows single item.
         * @param  {object} data  The YouTube item data. Must contain: ytId, title, description, thumbnailUrl
         * @param  {integer} index Index of item ion page (0-5)
         */
        showItem: function(data, index) {
            console.log("Showing item:", data)
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
                var thumbUrl = data.thumbnailUrl
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
                    self.goToVideoPage(data.ytId)
                })
                obj["data-name"] = data.ytId
            } else {
                obj["class"] += " disabled"
            }
            return SvgHelper.group(obj, items)
        },
        displayResults: function(data, next) {
            var self = this
            self.showSearchResults(data)
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
        },
        /* update GUI with search results */
        /* also update left/right button status */
        showSearchResults: function(data) {
            var self = this
            data = data || {
                items: []
            }
            var items = data.items
            console.log("Showing search results: ",data)
            /* empty group... */
            while (self.resultGrp.hasChildNodes()) {
                self.resultGrp.removeChild(self.resultGrp.lastChild);
            }
            for (var i = 0; i < 6; i++) {
                var item = null
                if (i < items.length) item = items[i]
                self.resultGrp.appendChild(self.showItem(item, i))
            }
            self.previousSearch = data
            var leftEnabled = (data.prevPageToken)
            var rightEnabled = (data.nextPageToken)
            self.leftBtn.setEnabled(leftEnabled)
            self.rightBtn.setEnabled(rightEnabled)
        },        
        createControls: function(data) {
            this.base(data)
            var self = this
            var homeButton = self.getWidget("homeButton")
            var favVidButton = self.getWidget("favVidButton")
            var userVidButton = self.getWidget("userVidButton")
            self.searchButton = self.getWidget("searchButton")
            self.textBox = self.getWidget("searchTextbox")
            userVidButton.click(function() {
                self.goTo("/plugins/youtubepersonal")
            })
            favVidButton.click(function() {
                self.goTo("/plugins/youtubefavorite")
            })
            self.searchButton.click(function() {
                self.showSoftwareKeybard(function(txt) {
                    self.currentPageToken = null
                    self.textBox.val(txt)
                    self.searchIt()
                })
            })
            self.textBox.onFocused(function() {
                // alert("TextBox focused!")
                self.selectChain.select(self.textBox.element)
            })
            self.selectChain.append(homeButton.element)
            self.selectChain.append(favVidButton.element)
            self.selectChain.append(userVidButton.element)
            self.selectChain.append(self.searchButton.element)
            self.selectChain.append(self.textBox.element)

            self.query = data.query.query
            self.textBox.onEnterPressed = function() {
                self.currentPageToken = null
                self.searchIt()
            }
            self.getWidget("searchButton").click(function() {
                self.currentPageToken = null
                self.searchIt()
            })
        },
        updateView: function(data) {
            var self = this
            var query = data.query.query || ""
            var pageToken = data.query.pageToken            
            self.currentPageToken = pageToken
            if (query) {
                self.textBox.val(query)
                self.searchIt()
            } else {
                self.displayResults(null)
            }
        },
        /**
         * Takes the current query string and updates the pageToken part.
         */
        getQueryString: function(pageToken) {
            var self = this
            var parsedUrl = url.parse(window.location.href, true)
            parsedUrl.query.query = self.textBox.val()
            if(pageToken) {
                parsedUrl.query.pageToken = pageToken
            } else {
                delete parsedUrl.query.pageToken
            }
            parsedUrl.search = null
            return url.format(parsedUrl)
        },
        searchIt: function() {
            var self = this
            var query = self.textBox.val()
            var pageToken = self.currentPageToken  
            self.updateBrowserQuery({
                query: query
            })
            // new youtube search... paging is token-based!
            if(query) {
                var url = "/api/ytsearch?query="+ encodeURIComponent(query)+"&pageSize=6"
                if(pageToken) url += "&pageToken="+pageToken
                $.getJSON(url).done(function(data) {
                    console.log("Displaying results: ", data)
                    self.displayResults(data)                    
                })
            }
        },
        goToPreviousPage: function() {
            var pageToken = (this.previousSearch ? this.previousSearch.prevPageToken : null)
            this.goTo(this.getQueryString(pageToken))
        },
        goToNextPage: function() {
            var pageToken = (this.previousSearch ? this.previousSearch.nextPageToken : null)
            this.goTo(this.getQueryString(pageToken))
        },
        focusTextBoxIfCurrent: function() {
            var target = $(this.selectChain.current())
            var widget = this.getWidget(target)
            if (widget == this.textBox) {
                // focus text box
                this.textBox.focus()
            } else {
                // unfocus text box
                this.textBox.blur()
            }
        },
        // modified from VideoPage
        selectPrevious: function() {
            this.base()
            // if textbox is highlighted, focus the element
            this.focusTextBoxIfCurrent()
        },
        selectNext: function() {
            this.base()
            this.focusTextBoxIfCurrent()
        },
        // modified from VideoPage
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
        onVirtualControl: function(evt) {
            var target = $(this.selectChain.current())
            var widget = this.getWidget(target)
            var inTextBox = (widget == this.textBox)
            var self = this
            switch (evt.control) {
                case "left":
                    if (!inTextBox && self.leftBtn.isEnabled())
                        this.goToPreviousPage()
                    break;
                case "right":
                    if (!inTextBox && self.rightBtn.isEnabled())
                        this.goToNextPage()
                    break;
                case "home":
                    if (!inTextBox) this.goToHomePage()
                    break;
                case "up":
                    this.selectPrevious()
                    break;
                case "down":
                    this.selectNext()
                    break;
                case "select":
                    if (!inTextBox) this.activateSelected()
                    break;
            }
        }

    })
    return SearchVideosPage

}
