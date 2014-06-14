var AdminPage = function($, i18n, pageMode, editableNodes, node, nodeType) {

    $.playable('soundmanager/swf/')

    var Widgetizer = require("./Widgetizer")(window, $, SVG)
    var dialogs = require("./Dialogs")($, i18n)

    var activeTab = 1
    if(pageMode == "view") activeTab = 4;
    if(pageMode == "edit") activeTab = 5

    // create tabs
    var tabber1 = new Yetii({
        id: 'admintabs',
        active: activeTab,
        tabclass: 'ui-tabs-panel'
    });


    var Commons = require("./Commons")

    var doAjax = Commons.doAjax

    var doAjaxPOST = function(uri, data, next) {
        doAjax('POST', uri, data, function(err, res) {
            if (!err) {
                if (next) next(null, res[0])
            } else next(err)
        })
    }

    var putImage = function(dropData, next) {
        console.log("Store image to DB", dropData)
        var data = {
            title: dropData.uploaded.originalFilename,
            description: "Uploaded image file",
            tags: [],
            imageUUID: dropData.uploaded.uuid
        }
        var uri = '/api/image/new'
        doAjaxPOST(uri, data, next)
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
        doAjaxPOST(uri, data, next)
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
        doAjaxPOST(uri, data, next)
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
        doAjaxPOST(uri, data, next)
    }

    var putYouTube = function(dropData, next) {
        console.log("Store youtube to DB", dropData)
        var data = {
            tags: [],
            ytId: dropData.videoId
        }
        var uri = '/api/youTubeVideo/new'
        doAjaxPOST(uri, data, next)
    }

    var tryToImportApp = function(dropData, next) {
        console.log("Trying to import application", dropData)
        var data = {
            tags: [],
            title: dropData.uploaded.originalFilename,
            archiveUUID: dropData.uploaded.uuid
        }
        var uri = '/api/app/import'
        doAjaxPOST(uri, data, next)
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

    function updateSearchItemsPreview(page) {
        page = page ? parseInt(page) : 1
        var query = $("input[name=searchquery]").val()
        var types = $("input[name=searchtypes]").val()
        var out = $("#searchresults").css("position", "relative")
        var outLinks = $("#searchlinks").css("position", "relative")
        types = _.filter(types.split(","), function(t) { return !!t})
        var uri =  getSearchUri(page, types, query)
        updateItemsPreview(uri, out, "short")
        updatePageLinks(page, outLinks, function(ind) {
            // link changed...
            // set page and do search again...
            updateSearchItemsPreview(ind)
        })
    }

    // TODO intelligent showing of Next link
    function updatePageLinks(page, out, cb) {
        out.empty();
        for(var i=1; i<=page+1; i++) {
            (function(ind) {
                var label = (ind<=page) ? ""+ind : "Next"
                var link = $('<a href="#">').text(label).click(function() {
                    if(cb) cb(ind)
                    return false;
                })
                if(ind == page) link.addClass("current")
                out.append(link)
            })(i)
        }
    }

    function makeItemPreview(d, previewType, cb) {
        var previewUri = d.node.previewUri
        var viewUri = "/admin/" + d.node.type + "/" + d._id + "/view"
        var id = "node-" + d.node.type + "-" + d._id
        var uri = previewUri + "?view=" + previewType
        var el = $("<div>").attr("draggable", "true").attr("id", id).addClass("node-preview-wrapper").addClass("view-" + previewType).load(uri)
        el.get(0).addEventListener('dragstart', dragStart, false);
        el.get(0).addEventListener('dragend', dragEnd, false);
        el.click(function() {
            if (dragging) {
                return;
            }
            if(cb) {
                cb(d)
            } else {
                // click action here
                window.location.href = viewUri
            }
        });
        return el
    }

    // previewType: default, short
    function updateItemsPreview(uri, out, previewType, cb) {
        $.getJSON(uri).done(function(data) {
            // console.log("Received items:", data)
            out.empty()
            _.each(data, function(d) {
                if(d) {
                    out.append(makeItemPreview(d, previewType, cb))
                }                    
            })
        })
    }

    // previewType: default, short
    function updateItemPreview(uri, out, previewType, cb) {
        $.getJSON(uri).done(function(d) {
            if(d) {
                out.html(makeItemPreview(d, previewType, cb))
            } else {
                out.html("N/A")
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
        updateSearchItemsPreview(1)
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

    /* test area... */

    var showItemSelector = function(types, cb) {
        var div = $("<div>").addClass("node-itemselector")
        var linksDiv = $("<div>")
        var dlg = null
        function updateSelectorItemsPreview(div, page) {
            var query = null
            var uri =  getSearchUri(page, types, query)
            updateItemsPreview(uri, div, "default", function(data) {
                dlg.hide()
                if(cb) cb(data)
            })
            updatePageLinks(page, linksDiv, function(ind) {
                // link changed...
                // set page and do search again...
                updateSelectorItemsPreview(div, ind)
            })
        }

        updateSelectorItemsPreview(div, 1)
        dlg = dialogs.simpleDialog(i18n("Select item"), div, linksDiv, {width: 600})
    }


   var updateSelector = function(id, type, div, fun) {
    if(id) {
        var url = "/api/node/"+type+"/"+id
        updateItemPreview(url, div, "default", fun)
    } else {
        var out = $("<span>").text("N/A").click(fun)
        div.html(out)
    }
   }

   var updateItemView = function(id, type, div) {
    if(id) {
        var url = "/api/node/"+type+"/"+id
        updateItemPreview(url, div, "default")
    } else {
        var out = $("<span>").text("N/A")
        div.html(out)
    }
   }

   var attachItemView = function(type, div) {
       var id = parseInt(div.text())
       div.empty()
       updateItemView(id, type, div)
   }


   var attachSelector = function(input, type) {
       input.hide()
       var pDiv = $("<div>").insertAfter(input)

       var fun = function() {
            showItemSelector([type], function(data) {
                console.log("Selected:", data)
                var id = data ? data._id : null
                input.val(id)
                updateSelector(id, type, pDiv, fun)
            })
       }
       var id = input.val()
       updateSelector(id, type, pDiv, fun)
   }

   var attachLocaleSelector = function(input) {
       input.hide()
       var pDiv = $("<div>").addClass("lang-selector").insertAfter(input)
       var langs = ['en','de','cz']
        _.each(langs, function(lang) {
            var langSel = $("<img>").attr("src", "/locale/"+lang+"/icon").attr("data-lang", lang)
            langSel.click(function() {
                var lang = $(this).attr("data-lang")
                input.val(lang)
                updateLocaleSelector(lang)
            })
            pDiv.append(langSel)            
        })
       var updateLocaleSelector = function(currentLang) {
            pDiv.find("img").removeClass("selected")
            pDiv.find("img[data-lang="+currentLang+"]").addClass("selected")
       }
       var lang = input.val()
       updateLocaleSelector(lang)
   }

   var attachSelectorsToForm = function(type, action, container) {
        if(type == "user") {
            attachSelector(container.find("input[name=locationId]"), "location")
            attachSelector(container.find("input[name=presetId]"), "preset")
            attachLocaleSelector(container.find("input[name=locale]"))
        }
        else if(type == "preset") {
            attachSelector(container.find("input[name=button1LinkId]"), "shortcut")
            attachSelector(container.find("input[name=button2LinkId]"), "shortcut")
            attachSelector(container.find("input[name=button3LinkId]"), "shortcut")
            attachLocaleSelector(container.find("input[name=themeId]"), "theme")
        }

   }

   var updateItemsView = function(type) {
        if(type == "user") {
            attachItemView("location", $("#view .field-locationId .value"))
            attachItemView("preset", $("#view .field-presetId .value"))
        }
        else if(type == "preset") {
            attachItemView("shortcut", $("#view .field-button1LinkId .value"))
            attachItemView("shortcut", $("#view .field-button2LinkId .value"))
            attachItemView("shortcut", $("#view .field-button3LinkId .value"))
            attachItemView("theme", $("#view .field-themeId .value"))
        }

   }
   
    var filterData = function(value, schema) {
      for(var key in value) {
        if(!(key in schema.properties)) {
          delete value[key]
        }
      }
      return value
    }

    var postProcessData = function(type, action, schema, fschema, value) {
      console.log("postProcessData: Form "+type+"."+action+" submitted!")
      console.log(value)
      // filter out items not in schema...
      return filterData(value, schema)
    }

    var formSubmitted = function(type, action, schema, fschema, value, next) {
      value = postProcessData(type, action, schema, fschema, value)
      if(action == "add") {
        var uri = "/api/"+type+"/new"
        var data = value
        doAjax('POST', uri, data, function(err, res) {
          if(!err) {
            // console.log("Data received: ", res)
            if(next) next(null, res[0])
          } else {
            next(err)
          }
        })
      } else if(action=="edit") {
        var uri = "/api/"+type+"/" + nodeId
        var data = value
        doAjax('PUT', uri, data, function(err, res) {
          if(!err) {
           if(next) next(null, $.extend({_id:nodeId},data))
          } else {
            next(err)
          }
        })
      }
    }             
  // Alpaca-based form creation
    var createForm = function(type, action, schema, fschema, options, data, div) {
        var form = div
        var opts = $.extend({}, options)
        // do not show any buttons (we will use our own)
        opts.form.buttons = {}
        opts.form.attributes = {}
        form.empty()
        form.alpaca({
          schema:fschema, 
          options:opts,
          data:data,
          postRender: function(control) {

            // may be useful...
            var oldValue = control.getValue()
            $(control.getEl()).bind("fieldupdate", function(e) {
                var value = control.getValue()
                console.log("Form updated!", oldValue, value)
                oldValue = value
            });

            console.log("postRender: ")
            var label = (action=="add") ? "Create" : "Update"
            var createBtn = $("<button>").text(label).appendTo(control.container)
            createBtn.click(function() {
                console.log("Submit clicked!")
                // clicked on submit button...
                if(!control.isValid()) {
                    // form is not valid!
                    console.log("Form not valid!")
                    return false
                }
                formSubmitted(type, action, schema, fschema, control.form.getValue(), function(err, rr) {
                    if(err) {
                        console.error(err)
                        return false
                    }
                    // show item's view
                    console.log("rr:", rr)
                    var oldhref = window.location.href
                    window.location.href = '/admin/'+type+"/"+rr._id+"/view"
                    if(window.location.href == oldhref) window.location.reload()
                })
                return false;
            })

            // attach selectors...
            attachSelectorsToForm(type, action, control.container)
          }
        })    
    }


    var passwordMatchValidator = function(control, callback) {
        var controlVal = control.getValue();
        if(!controlVal) {
          // no value yet...
            callback({
                "message": "Form is empty",
                "status": false
            });
        } else if (controlVal['password'] != controlVal['repeatPassword']) {
            callback({
                "message": "Passwords should match!",
                "status": false
            });
        } else {
            callback({
                "message": "Fields valid",
                "status": true
            });
        }
    }             
      
  var makeNodeControl = function(en) {
    var out = $("<div>").addClass("node-control")
    out.append($("<h3>").text(en.title))
    out.append($("<img>").attr("src", en.thumbnailUri))
    return out
  }
  var showAddForm = function(control, en) {
    // highlight the selected node...
    $("#newnode .node-control").removeClass("selected")
    control.addClass("selected")
    // get JSON metadata for forms...
    $.getJSON(en.metainfoUri).done(function(metainfo) {
        console.log("Got metainfo!")
        console.log(metainfo)
        var options = metainfo.forms.add.options
        var schema = metainfo.schema
        var fschema = metainfo.forms.add.schema || schema
        var name = metainfo.name
        var defaults = metainfo.defaults
        if(name=="user" || name=="admin") {
            options = $.extend({ validator: passwordMatchValidator }, options)
        }
        createForm(name, "add", schema, fschema, options, defaults, $("#newnodeform .form"))
    })
  }

// display controls for all editable node types             
$("#newnode").empty()
_.each(editableNodes, function(en) {
    var control = makeNodeControl(en)
    control.click(function() {
        showAddForm(control, en)
    })
    $("#newnode").append(control)
})

var typesInput = $("#searchcontrol input[name=searchtypes]")
var typeSelector = $("<div>").addClass("type-selector").insertAfter(typesInput)
_.each(editableNodes, function(en) {
    var selector = $("<img>").attr("src", en.thumbnailUri)
    selector.click(function() {
        toggleTypeSelector(selector, en.name)
        return false
    })
    typeSelector.append(selector)
})

var toggleTypeSelector = function(selector, type) {
    var typeStr = typesInput.val()
    var types = typeStr.split(",")
    var tm = {}
    _.each(types, function(t) {
        if(t) tm[t] = t
    })
    if(type in tm) {
        delete tm[type]
        selector.removeClass("selected")
    } else {
        tm[type] = type
        selector.addClass("selected")
    }
    var newTypes = []
    for(var key in tm) {
        newTypes.push(key)
    }
    typeStr = newTypes.join(",")
    typesInput.val(typeStr)
    return type in tm
}

  if(node) {
        console.log(node);
        var nodeId = node._id

        console.log('Generating edit form...', node, editableNodes, nodeType)
        var en = null
        _.each(editableNodes, function(e) {
            if(e.name==nodeType) {
                en=e;
                return;
            }
        })
        $.getJSON(en.metainfoUri).done(function(metainfo) {
            console.log("Got metainfo!")
            console.log(metainfo)
            var form = metainfo.forms.edit || metainfo.forms.add
            var options = form.options
            var schema = metainfo.schema
            var fschema = form.schema || schema
            var name = metainfo.name
            if(name=="user" || name=="admin") {
                options = $.extend({ validator: passwordMatchValidator }, options)
            }
            createForm(name, "edit", schema, fschema, options, node, $("#editnodeform .form"))
        })
        $("#removeitembtn").click(function() {
            var nodeUri = "/api/"+nodeType+"/"+nodeId
            console.log("Deleting "+nodeUri)
            var opts = {
                url: nodeUri,
                type: 'DELETE',
                contentType: "application/json; charset=utf-8"
            }
            $.ajax(opts).then(function(res) {
                console.log("Deleted!", res)
                window.location.href = "/admin"
            })

        })

        updateItemsView(nodeType)
    }

   // shows item preview in a div
   /*
   var pDiv = $("<div>").appendTo("body")

   var fun = function() {
        showItemSelector(["image"], function(data) {
            console.log("Selected:", data)
            var url = "/api/node/image/"+data._id
            updateItemPreview(url, pDiv, "default", fun)
        })
   }
   updateItemPreview("/api/node/app/3", pDiv, "default", fun)
    */

/*   
   var input = $('<input type="text" name="imageId" value="">').appendTo("body")

   attachSelector(input, "image")
*/
}

module.exports = AdminPage