

	$(document).ready(function() {

	    $.playable('soundmanager/swf/')

	    var Widgetizer = require("./widgetizer")(window, $, SVG)
	    var i18n = new(require("./i18n"))({
	        locales: ['en', 'de', 'cz'],
	        defaultLocale: 'en'
	    })
	    i18n.setLocale('de')
	    var dialogs = require("./dialogs")($, i18n)

	    var server = Widgetizer.rpc

	    // create tabs
	    var tabber1 = new Yetii({
	        id: 'tabs-container-1',
	        active: 1,
	        tabclass: 'ui-tabs-panel'
	    });


  	console.log("Ready!")

	var doAjax = function(method, uri, data, cb) {
	  var opts = (method == "GET" || method == 'DELETE') 
	    ? {
	      url: uri,
	      type: method,
	      contentType: "application/json; charset=utf-8"
	    }
	    : {
	      url: uri,
	      type: method,
	      data: JSON.stringify(data),
	      dataType: 'json',
	      contentType: "application/json; charset=utf-8"
	    }
	    $.ajax(opts).then(function(res) {
	      if(!res.error) {
	        cb(null, res)
	      } else {
	        cb(res.error)
	      }
	    })
	}


	var putImage = function(dropData, next) {
	  console.log("Store image to DB", dropData)
	  var data = {
	    ownerAdminId: -1,
	    title: dropData.uploaded.originalFilename,
	    description: "Uploaded image file",
	    tags: [],
	    imageUUID: dropData.uploaded.uuid
	  }
	  var uri = '/api/image/new'
	  doAjax('POST', uri, data, function(err, res) {
	      if(!err) {
	        if(next) next(null, res[0])
	      } else next(err)
	    })
	}

	var putVideo = function(dropData, next) {
	  console.log("Store video to DB", dropData)
	  var data = {
	    ownerAdminId: -1,
	    title: dropData.uploaded.originalFilename,
	    description: "Uploaded video file",
	    tags: [],
	    videoUUID: dropData.uploaded.uuid
	  }
	  var uri = '/api/video/new'
	  doAjax('POST', uri, data, function(err, res) {
	      if(!err) {
	        if(next) next(null, res[0])
	      } else next(err)
	    })
	}

	var putAudio = function(dropData, next) {
	  console.log("Store audio to DB", dropData)
	  var data = {
	    ownerAdminId: -1,
	    title: dropData.uploaded.originalFilename,
	    description: "Uploaded audio file",
	    tags: [],
	    voiceUUID: dropData.uploaded.uuid
	  }
	  var uri = '/api/voice/new'
	  doAjax('POST', uri, data, function(err, res) {
	      if(!err) {
	        if(next) next(null, res[0])
	      } else next(err)
	    })
	}

	var putArticle = function(dropData, next) {
	  console.log("Store article to DB", dropData)
	  var data = {
	    ownerAdminId: -1,
	    title: "Untitled Article",
	    description: "An article",
	    tags: [],
	    content: dropData.html || dropData.text
	  }
	  var uri = '/api/article/new'
	  doAjax('POST', uri, data, function(err, res) {
	      if(!err) {
	        if(next) next(null, res[0])
	      } else next(err)
	    })
	}

	var putYouTube = function(dropData, next) {
	  console.log("Store youtube to DB", dropData)
	  var data = {
	    ownerAdminId: -1,
	    tags: [],
	    ytId: dropData.videoId
	  }
	  var uri = '/api/youTubeVideo/new'
	  doAjax('POST', uri, data, function(err, res) {
	      if(!err) {
	        if(next) next(null, res[0])
	      } else next(err)
	    })
	}

	var tryToImportApp = function(dropData, next) {
	  console.log("Trying to import application", dropData)
	  var data = {
	    ownerAdminId: -1,
	    tags: [],
	    title: dropData.uploaded.originalFilename,
	    archiveUUID: dropData.uploaded.uuid
	  }
	  var uri = '/api/app/import'
	  doAjax('POST', uri, data, function(err, res) {
	      if(!err) {
	        if(next) next(null, res[0])
	      } else next(err)
	    })
	}

	function dragStart(ev) {
	  console.log("Drag started")
	   ev.dataTransfer.effectAllowed='copy';
	   ev.dataTransfer.setData("nodeId", ev.target.getAttribute("id")); // --> nothing is passed; maybe Chrome-specific?
	}

	function dragEnd(ev) {
	  console.log("Drag ended")
	}

	function updateRecentItemsPreview() {
	  var skip = 0
	  var limit = 10
	  var uri = "/api/search?&skip="+skip+"&limit="+limit+"&sort=created:desc&query=ownerAdminId:-1"
      var out = $("#recentitems").css("position","relative")
      updateItemsPreview(uri, out, "default")
	}

	function updateSearchItemsPreview() {
	  var page = $("input[name=searchpage]").val()
	  if(page) page = parseInt(page); else page = 1
	  var query = $("input[name=searchquery]").val()
	  var skip = 10*(page-1)
	  var limit = 10
	  var ownerAdminId = -1
	  // we search only items that are one of these types...
	  var types = ['image']
	  var uri = "/api/search?&skip="+skip+"&limit="+limit+"&sort=created:desc"
	  if(query) {
	  	uri += "&query=title:"+encodeURIComponent(query)
	  	//uri += "&query=description:"+encodeURIComponent(query)
	  }
	  if(ownerAdminId) uri += "&query=ownerAdminId:"+ownerAdminId
	  _.each(types, function(t) {
	  	uri += '&query=type:'+t
	  })
      var out = $("#searchresults").css("position","relative")
      updateItemsPreview(uri, out, "short")
	}

	function updateItemsPreview(uri, out, previewType) {
	  $.getJSON(uri).done(function(data) {
	    console.log("Received items:", data)
	    var previewUris = _.map(data, function(d) { return d.node.previewUri })
	    out.empty()
	    for(var i=0; i<previewUris.length; i++) {
	      var id = "node-"+ data[i].node.type + "-" + data[i]._id
	      var uri = previewUris[i] + "?view="+previewType
	      var el = $("<div>").attr("draggable","true").attr("id", id).addClass("node-preview-wrapper").addClass("view-"+previewType).load(uri).appendTo(out)
	      el.get(0).addEventListener('dragstart', dragStart, false);
	      el.get(0).addEventListener('dragend', dragEnd, false);
	    }
	  })
	}

  function afterPutApp(err, data) {
    if(!err) {
      console.log("App imported: ", data)
      var thumbUri = data.thumbnailUri
      $("#allpurpose-dropzone img").attr("src", thumbUri)
      afterPut(err, data)
    } else {
    }    
  }

  function afterPut(err, data) {
    if(!err) {
      console.log("Stored into DB: ", data)
      updateRecentItemsPreview()
    } else {
      console.error("Storing into DB failed")
    }    
  }

  $('#allpurpose-dropzone').dropAnything({
      reuseUUID: false,
      accept: '*',
      dropped: function(data) {
        console.log("Dropped!", data)
        switch(data.type) {
          case 'text':
            switch(data.subtype) {
              case 'html':
                console.log("Rich Text dropped: "+data.html)
                return putArticle(data, afterPut)
              default:
                console.log("Text droped: "+data.text)
                return putArticle(data, afterPut)
            }
            return
          case 'link': 
            switch(data.subtype) {
              case 'youtube':
                console.log("YouTube link dropped: "+data.videoId)
                return putYouTube(data, afterPut)
              case "image":
                console.log("Image link dropped and uploaded: "+data.uploaded.uuid)
                return putImage(data, afterPut)
              case "audio":
                console.log("Audio link dropped and uploaded: "+data.uploaded.uuid)
                return putAudio(data, afterPut)
              case "video":
                console.log("Video link dropped and uploaded: "+data.uploaded.uuid)
                return putVideo(data, afterPut)
              case "pdf":
                console.log("PDF link dropped and uploaded: "+data.uploaded.uuid)
                return
              case "zip":
                console.log("ZIP file link dropped and uploaded: "+data.uploaded.uuid)
                return
              default:
                console.log("Link dropped: "+data.url)
            }
            return
          case 'file':
            switch(data.subtype) {
              case "image":
                console.log("Image uploaded: "+data.uploaded.uuid)
                return putImage(data, afterPut)
              case "audio":
                console.log("Audio uploaded: "+data.uploaded.uuid)
                return putAudio(data, afterPut)
              case "video":
                console.log("Video uploaded: "+data.uploaded.uuid)
                return putVideo(data, afterPut)
              case "pdf":
                console.log("PDF uploaded: "+data.uploaded.uuid)
                return
              case "zip":
                console.log("ZIP file uploaded: "+data.uploaded.uuid)
                return tryToImportApp(data, afterPutApp)
              default:
                console.log("Unsupported file subtype: "+data.subtype)
            }
            return
          default:
            console.log("Unsupported drop type: "+data.type)
        }
      },
      uploaded: function(data) {
        console.log("Uploaded!", data)
      }
  })  

  updateRecentItemsPreview()

  $("#searchbutton").click(updateSearchItemsPreview)

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
