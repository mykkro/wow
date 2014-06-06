module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var SvgHelper = require("../../../js/svghelper")(window)
    var url = require("url")
    var truncate = require('html-truncate');

    var ItemListPage = require("../../../js/ItemListPage")(Wow)

    var SearchQueryUtil = require("../routes/searchqueryutil")

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
        followAppLink: function(targetId, appType, uuid) {
            switch(appType) {
                case "wow/app": 
                case "wow/game": // old game, just iframed content, no interop
                    this.followGameV1Link(targetId, uuid)
                    break
                case "wow/app/game": // new game, integrated controls
                    this.followGameV2Link(targetId, uuid)
                    break
                case "wow/app/rulegame": // rule game, integrated controls
                    this.followRuleGameLink(targetId, uuid)
                    break
                case "wow/scrapbook": // escrapbook
                    this.followEscrapbookLink(targetId, uuid)
                    break
                default:
                    console.error("Unsupported application type: "+appType)
            }
        },
        followGameV1Link: function(targetId, uuid) {
            var tgt = '/plugins/app/index?importname='+uuid
            window.location.href = tgt
        },
        followGameV2Link: function(targetId, uuid) {
            var tgt = '/plugins/game/index?importname='+uuid
            window.location.href = tgt
        },
        followRuleGameLink: function(targetId, uuid) {
            var tgt = '/plugins/rulegame/index?importname='+uuid
            window.location.href = tgt
        },
        followEscrapbookLink: function(targetId, uuid) {
            var tgt = '/plugins/scrapbook/index?importname='+uuid
            window.location.href = tgt
        },
        followImageLink: function(targetId, uuid) {
            // alert("Showing image: "+uuid)
        },
        followVideoLink: function(targetId, uuid) {
            // alert("Showing video: "+uuid)
        },
        followVoiceLink: function(targetId, uuid) {
            // alert("Showing voice: "+uuid)
        },
        followYouTubeVideoLink: function(targetId, ytid) {
            var tgt = '/plugins/youtubevideo/index?importname='+ytid
            window.location.href = tgt
        },
        followLink: function(tgt) {
            var targetId = tgt.data("id")
            var targetType = tgt.data("type")
            var uuid
            switch(targetType) {
                case 'app':
                    var appType = tgt.data("apptype")
                    uuid = tgt.data("uuid")
                    this.followAppLink(targetId, appType, uuid)
                    break;
                case 'image':
                    uuid = tgt.data("uuid")
                    this.followImageLink(targetId, uuid)
                    break;
                case 'video':
                    uuid = tgt.data("uuid")
                    this.followVideoLink(targetId, uuid)
                    break;
                case 'voice':
                    uuid = tgt.data("uuid")
                    this.followVoiceLink(targetId, uuid)
                    break;
                case 'youTubeVideo':
                    ytid = tgt.data("ytid")
                    this.followYouTubeVideoLink(targetId, ytid)
                    break;
                case 'shortcut':
                    var uri = tgt.data("uri")
                    window.location.href = uri
                    break;
                default:
                    console.error("Unsupported link type: "+targetType)
            }
        },
        createControls: function(data) {
            var self = this
            this.base(data)
            var homeButton = self.getWidget("homeButton")
            self.selectChain.append(homeButton.element)
        },
        // TODO callback after all items are widgetized
        searchIt: function(q, next) {
            var self = this
            var page = parseInt(q.page || 1)
            var query = SearchQueryUtil.getDataFromQueryObj(q)
            self.updateBrowserQuery({page:page})

            var qdata = {
                query: q,
                pathname: "/plugins/itemlist/api/search"
            }          

            // TODO do the real search here...  
            var searchUrl = self.formatUrl(qdata)
            $.getJSON(searchUrl).done(function(data) {
                console.log("DATA:", data)
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
                        if (tgt.data("id")) {
                            $(w.element).click(function() {
                                self.followLink(tgt)
                            })
                        }
                    })
                    self.selectChain.update()
                    if (next) next(results)
                })
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
                var thumbUrl = data.node.thumbnailUri
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
                obj['data-id'] = data._id
                obj['data-type'] = data.node.type
                switch(data.node.type) {
                    case 'app':
                        // extract 'apptype' and 'importUUID'...
                        obj['data-apptype'] = data.apptype
                        obj['data-uuid'] = data.importUUID
                        break;
                    case 'youTubeVideo':
                        obj['data-ytid'] = data.ytId
                        break;
                    case 'image':
                        obj['data-uuid'] = data.imageUUID
                        break;
                    case 'video':
                        obj['data-uuid'] = data.videoUUID
                        break;
                    case 'voice':
                        obj['data-uuid'] = data.voiceUUID
                        break;
                    case 'shortcut':
                        obj['data-uri'] = data.uri
                        break
                }
            } else {
                obj["class"] += " disabled"
            }
            return SvgHelper.group(obj, items)
        }
    })
    return UserAppsPage

}
