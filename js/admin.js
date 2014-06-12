$(document).ready(function() {

    $.playable('soundmanager/swf/')

    var Widgetizer = require("./Widgetizer")(window, $, SVG)
    var i18n = new(require("./i18n"))({
        locales: ['en', 'de', 'cz'],
        defaultLocale: 'en'
    })
    i18n.setLocale('de')
    var dialogs = require("./dialogs")($, i18n)

    var activeTab = 1
    if(pageMode == "view") activeTab = 4;
    if(pageMode == "edit") activeTab = 5

    // create tabs
    var tabber1 = new Yetii({
        id: 'admintabs',
        active: activeTab,
        tabclass: 'ui-tabs-panel'
    });


    console.log("Ready!")

    var Commons = require("./Commons")

    var doAjax = Commons.doAjax


    var putImage = function(dropData, next) {
        console.log("Store image to DB", dropData)
        var data = {
            title: dropData.uploaded.originalFilename,
            description: "Uploaded image file",
            tags: [],
            imageUUID: dropData.uploaded.uuid
        }
        var uri = '/api/image/new'
        doAjax('POST', uri, data, function(err, res) {
            if (!err) {
                if (next) next(null, res[0])
            } else next(err)
        })
    }

    var putVideo = function(dropData, next) {
        console.log("Store video to DB", dropData)
        var data = {
            title: dropData.uploaded.originalFilename,
            description: "Uploaded video file",
            tags: [],
            videoUUID: dropData.uploaded.uuid
        }
        var uri = '/api/video/new'
        doAjax('POST', uri, data, function(err, res) {
            if (!err) {
                if (next) next(null, res[0])
            } else next(err)
        })
    }

    var putAudio = function(dropData, next) {
        console.log("Store audio to DB", dropData)
        var data = {
            title: dropData.uploaded.originalFilename,
            description: "Uploaded audio file",
            tags: [],
            voiceUUID: dropData.uploaded.uuid
        }
        var uri = '/api/voice/new'
        doAjax('POST', uri, data, function(err, res) {
            if (!err) {
                if (next) next(null, res[0])
            } else next(err)
        })
    }

    var putArticle = function(dropData, next) {
        console.log("Store article to DB", dropData)
        var data = {
            title: "Untitled Article",
            description: "An article",
            tags: [],
            content: dropData.html || dropData.text
        }
        var uri = '/api/article/new'
        doAjax('POST', uri, data, function(err, res) {
            if (!err) {
                if (next) next(null, res[0])
            } else next(err)
        })
    }

    var putYouTube = function(dropData, next) {
        console.log("Store youtube to DB", dropData)
        var data = {
            tags: [],
            ytId: dropData.videoId
        }
        var uri = '/api/youTubeVideo/new'
        doAjax('POST', uri, data, function(err, res) {
            if (!err) {
                if (next) next(null, res[0])
            } else next(err)
        })
    }

    var tryToImportApp = function(dropData, next) {
        console.log("Trying to import application", dropData)
        var data = {
            tags: [],
            title: dropData.uploaded.originalFilename,
            archiveUUID: dropData.uploaded.uuid
        }
        var uri = '/api/app/import'
        doAjax('POST', uri, data, function(err, res) {
            if (!err) {
                if (next) next(null, res[0])
            } else next(err)
        })
    }

    var dragging = false

    function dragStart(ev) {
        console.log("Drag started")
        ev.dataTransfer.effectAllowed = 'copy';
        ev.dataTransfer.setData("nodeId", ev.target.getAttribute("id")); // --> nothing is passed; maybe Chrome-specific?
        dragging = true
    }

    function dragEnd(ev) {
        console.log("Drag ended")
        dragging = false
    }

    function updateRecentItemsPreview() {
        var skip = 0
        var limit = 10
        var uri = "/api/search?&skip=" + skip + "&limit=" + limit + "&sort=created:desc"
        var out = $("#recentitems").css("position", "relative")
        updateItemsPreview(uri, out, "default")
    }

    function getSearchUri(page, types, query) {
        page = page || 1
        types = types || []
        var skip = 10 * (page - 1)
        var limit = 10
        var uri = "/api/search?&skip=" + skip + "&limit=" + limit + "&sort=created:desc"
        if (query) {
            uri += "&query=title:" + encodeURIComponent(query)
            //uri += "&query=description:"+encodeURIComponent(query)
        }
        _.each(types, function(t) {
            uri += '&query=type:' + t
        })
        return uri
    }

    function updateSearchItemsPreview() {
        var page = $("input[name=searchpage]").val()
        var query = $("input[name=searchquery]").val()
        var types = $("input[name=searchtypes]").val()
        var out = $("#searchresults").css("position", "relative")
        var outLinks = $("#searchlinks").css("position", "relative")
        page = page ? parseInt(page) : 1
        types = _.filter(types.split(","), function(t) { return !!t})
        var uri =  getSearchUri(page, types, query)
        updateItemsPreview(uri, out, "short")
        updatePageLinks(page, outLinks)
    }

    // TODO intelligent showing of Next link
    function updatePageLinks(page, out) {
        out.empty();
        for(var i=1; i<=page+1; i++) {
            (function(ind) {
                var label = (ind<=page) ? ""+ind : "Next"
                var link = $('<a href="#">').text(label).click(function() {
                    // set page and do search again...
                    $("input[name=searchpage]").val(ind)
                    updateSearchItemsPreview()
                    return false;
                })
                if(ind == page) link.addClass("current")
                out.append(link)
            })(i)
        }
    }

    function updateItemsPreview(uri, out, previewType) {
        $.getJSON(uri).done(function(data) {
            // console.log("Received items:", data)
            var previewUris = _.map(data, function(d) {
                return d ? d.node.previewUri : null
            })
            out.empty()
            for (var i = 0; i < previewUris.length; i++) {
                if (!previewUris[i]) {
                    continue;
                }
                (function(i) {
                    var viewUri = "/admin/" + data[i].node.type + "/" + data[i]._id + "/view"
                    var id = "node-" + data[i].node.type + "-" + data[i]._id
                    var uri = previewUris[i] + "?view=" + previewType
                    var el = $("<div>").attr("draggable", "true").attr("id", id).addClass("node-preview-wrapper").addClass("view-" + previewType).load(uri).appendTo(out)
                    el.get(0).addEventListener('dragstart', dragStart, false);
                    el.get(0).addEventListener('dragend', dragEnd, false);
                    el.click(function() {
                        if (dragging) {
                            return;
                        }
                        // click action here
                        window.location.href = viewUri
                    });
                })(i);
            }
        })
    }

    function afterPutApp(err, data) {
        if (!err) {
            console.log("App imported: ", data)
            var thumbUri = data.thumbnailUri
            $("#allpurpose-dropzone img").attr("src", thumbUri)
            afterPut(err, data)
        } else {}
    }

    function afterPut(err, data) {
        if (!err) {
            console.log("Stored into DB: ", data)
            updateRecentItemsPreview()
        } else {
            console.error("Storing into DB failed")
        }
    }

    $('#allpurpose-dropzone').dropAnything({
        reuseUUID: false,
        accept: '*',
        // TODO use global upload config
        maxUploadFilesize: 50000000,
        dropped: function(data) {
            console.log("Dropped!", data)
            switch (data.type) {
                case 'text':
                    switch (data.subtype) {
                        case 'html':
                            console.log("Rich Text dropped: " + data.html)
                            return putArticle(data, afterPut)
                        default:
                            console.log("Text droped: " + data.text)
                            return putArticle(data, afterPut)
                    }
                    return
                case 'link':
                    switch (data.subtype) {
                        case 'youtube':
                            console.log("YouTube link dropped: " + data.videoId)
                            return putYouTube(data, afterPut)
                        case "image":
                            console.log("Image link dropped and uploaded: " + data.uploaded.uuid)
                            return putImage(data, afterPut)
                        case "audio":
                            console.log("Audio link dropped and uploaded: " + data.uploaded.uuid)
                            return putAudio(data, afterPut)
                        case "video":
                            console.log("Video link dropped and uploaded: " + data.uploaded.uuid)
                            return putVideo(data, afterPut)
                        case "pdf":
                            console.log("PDF link dropped and uploaded: " + data.uploaded.uuid)
                            return
                        case "zip":
                            console.log("ZIP file link dropped and uploaded: " + data.uploaded.uuid)
                            return
                        default:
                            console.log("Link dropped: " + data.url)
                    }
                    return
                case 'file':
                    switch (data.subtype) {
                        case "image":
                            console.log("Image uploaded: " + data.uploaded.uuid)
                            return putImage(data, afterPut)
                        case "audio":
                            console.log("Audio uploaded: " + data.uploaded.uuid)
                            return putAudio(data, afterPut)
                        case "video":
                            console.log("Video uploaded: " + data.uploaded.uuid)
                            return putVideo(data, afterPut)
                        case "pdf":
                            console.log("PDF uploaded: " + data.uploaded.uuid)
                            return
                        case "zip":
                            console.log("ZIP file uploaded: " + data.uploaded.uuid)
                            return tryToImportApp(data, afterPutApp)
                        default:
                            console.log("Unsupported file subtype: " + data.subtype)
                    }
                    return
                default:
                    console.log("Unsupported drop type: " + data.type)
            }
        },
        uploaded: function(data) {
            console.log("Uploaded!", data)
        }
    })

    updateRecentItemsPreview()

    $("#searchbutton").click(function() {
        $("input[name=searchpage]").val(1)
        updateSearchItemsPreview()
    })

    function cancel(e) {
        if (e.preventDefault) e.preventDefault(); // required by FF + Safari
        return false; // required by IE
    }

    $("#node-dropbox")
        .bind('dragover', cancel)
        .bind('dragenter', cancel)
        .bind('dragleave', cancel)
        .bind('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log("Dropped!", e)
            console.log(e.dataTransfer.getData("nodeId"))
            return false;
        })



})
