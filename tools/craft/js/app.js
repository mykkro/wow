var socket = io.connect('http://localhost:9999');
  socket.on('news', function (data) {  
    console.log("SOCKET: ",data);
    socket.emit('my other event', { my: 'data' });
  });

var JsonUtils = require("JsonUtils")



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

var filterData = function(value, schema) {
  for(var key in value) {
    if(!(key in schema.properties)) {
      delete value[key]
    }
  }
  return value
}

// password should be hashed on the server...
var hashPassword = function(pwd) {
  return pwd
}

var postProcessData = function(type, action, value) {
  console.log("postProcessData: Form "+type+"."+action+" submitted!")
  console.log(value)
  // custom post-processing...
  /*
  if(type=="admin" && action=="add") {
    // hash password...
    value.password = hashPassword(value.password)
  }
  */
  var schema = tabschemas[type]
  // filter out items not in schema...
  return filterData(value, schema)
}

var formSubmitted = function(type, action, control, value, next) {
  value = postProcessData(type, action, value)
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
    var id = $("#tabs-"+tabindexes[type]+"-edit input[name=itemid]").val()
    var uri = "/api/"+type+"/" + id
    var data = value
    doAjax('PUT', uri, data, function(err, res) {
      if(!err) {
       if(next) next(null, $.extend({_id:id},data))
      } else {
        next(err)
      }
    })
  }
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

var refreshListView = function() {
  if(currentIndex>0) {
    var main = $("#tabs-"+currentIndex+"-list")
    var div = main.find(".list")
    var uri = "/api/"+currentTab+"/search"
    doAjax('GET', uri, {}, function(err, res) {
      if(!err) 
        div.html(displayItems(currentTab, res))
    })
  }
}

var removeItem = function(type, id) {
    var uri = "/api/"+type+"/" + id
    doAjax('DELETE', uri, {}, function(err, res) {
      if(!err)
        refreshListView()
    })
}

// rendering on server...
var viewItem = function(type, id) {  
  var tabIndex = tabindexes[type]
  var div = $("#tabs-"+tabIndex+"-view .content")
  renderAjaxView(div, type, id)
  tabbers[tabIndex].show(5) // view tab
}

var renderAjaxView = function(div, type, id) {
  $.get("/"+type+"/"+id+"/view").done(function(v) {
    div.html(v)
  })
}

var editItem = function(type, item) {
  var tabIndex = tabindexes[type]
  var control = tabeditforms[tabIndex]
  control.form.setValue(item)
  var hidn = $("#tabs-"+tabIndex+'-edit input[name=itemid]')
  hidn.val(item._id)
  var div = $("#tabs-"+tabIndex+"-edit .content")
  tabbers[tabIndex].show(6) // edit tab
}

var displayItems = function(type, items) {
  var out = $("<div>")
  out.append($("<div>").text("Displaying items: "+items.length))
  _.each(items, function(it) {
    out.append(displayItem(type, it))
  })
  return out
}

var displayItem = function(type, item) {
  var out = $("<div>")
  out.append($("<span>").text("#"+item._id+" "+item.title))
  var viewLink = $("<a>").attr("href", "#").addClass("viewitem").text(" view ").click(function() {
    viewItem(type, item._id)
    return false
  })
  var editLink = $("<a>").attr("href", "#").addClass("edititem").text(" edit ").click(function() {
    editItem(type, item)
    return false
  })
  var removeLink = $("<a>").attr("href", "#").addClass("removeitem").text(" remove ").click(function() {
    removeItem(type, item._id)
    return false
  })
  /**/
  var previewDiv = $("<div>").appendTo(out)
  $.get("/"+type+"/"+item._id+"/preview").done(function(p) {
    previewDiv.html(p)
  })
  /**/
  out.append(viewLink, editLink, removeLink)
  return out
}


var FormIt = {
  createForm: function(div, opts) {
    var schema = opts.schema
    var options = opts.options
    var data = opts.data
    // creating form from schema
    console.log("FormIt.createForm", schema, options, data)
  }
}


// Alpaca-based form creation
var createForm = function(type, action, schema, options, data) {
    var index = tabindexes[type]
    var form = $("#tabs-"+index+"-"+action+" .form")
    /*
    FormIt.createForm(form, {
      schema:schema, 
      options:options, 
      data:data})
    */
    form.alpaca({
      schema:schema, 
      // !!!!! options object is probably changing in alpaca form...
      options:$.extend({}, options),
      data:data,
      postRender: function(control) {
        // console.log("postRender: ")
        if(action=="add") {
          tabaddforms[index] = control              
        } else if(action=="edit") {
          tabeditforms[index] = control
        }
        $(control.container).find("[name=submit]").click(function() {
          // clicked on submit button...
          formSubmitted(type, action, control, control.form.getValue(), function(err, rr) {
            if(err) {
              console.error(err)
              return false
            }
            // reset form
            console.log("Resetting form...")
            // TODO this does not work! how to properly reset a form?
            control.form.clear()
            // show item's view
            viewItem(type, rr._id)
          })
          return false;
        })
      }
    })    
}

var createAddForm = function(type, entitySchema, formParams, data) {
    // console.log("createAddForm:", type, entitySchema, formParams, data)
    if(type == "admin") {
      createAdminAddForm(type, entitySchema, formParams, data)      
      return
    } 
    var schema = formParams.schema || entitySchema
    var options = $.extend({}, formParams.options)
    createForm(type, "add", schema, options, data)
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

// add custom validator to options
var createAdminAddForm = function(type, entitySchema, formParams, data) {
    var schema = formParams.schema || entitySchema
    var options = $.extend({ validator: passwordMatchValidator }, formParams.options)
    createForm(type, "add", schema, options, data)
}

var createEditForm = function(type, entitySchema, formParams, data) {
    // console.log("createEditForm:", type, entitySchema, formParams, data)
    var schema = formParams.schema || entitySchema
    var options = $.extend({}, formParams.options)
    createForm(type, "edit", schema, options, data)
}


var tabInfo = []

var tabbers = {}
var tabnames = {}
var tabindexes = {}
var tabeditforms = {}
var tabaddforms = {}
var tabviews = {}
var tabdata = {}
var tabschemas = {}

var currentTab = null
var currentIndex = null


var removeUploadedFile = function(uuid, cb) {
    var opts = {
      url: "/upload/"+uuid,
      type: "DELETE",
      contentType: "application/json; charset=utf-8"
    }
    $.ajax(opts).then(function(res) {
      if(!res.error) {
        cb()
      } 
    })                  
}

var makeAjaxFileControl = function(fc, opts) {
    var previousUUID = null
    return fc.AjaxFileUpload({
      action: "/upload",
      onComplete: function(filename, response) {
        previousUUID = response.uuid
        if(opts.uploaded) opts.uploaded(response)
      },
      onSubmit : function(id, fileName){
        // additional data to be sent in form submit...
        return { uuid: previousUUID }
      }
    });
}

// TODO use mustache...
// make it jQuery plugin
var makeUploadControl = function(opts) {
    $("#remove-upload").click(function() {
      var uuid = $("#upload-uuid").val()
      if(uuid) {
        removeUploadedFile(uuid, function() {
          // console.log("File deleted!")
          $("#upload-thumb").empty()
          $("#remove-upload").hide()
          $("#upload-uuid").val("")
        })                  
        return false
      }
    }).hide()
    makeAjaxFileControl($("#upload-selectfile"), {    
      uploaded: function(response) {
        $("#upload-thumb").html(
          $("<img />").attr("src", response.thumbnailUri).attr("width", 200)
        );
        $("#remove-upload").show()
        $("#upload-uuid").val(response.uuid)
      }
   })
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function dragStart(ev) {
  console.log("Drag started")
   ev.dataTransfer.effectAllowed='copy';
   ev.dataTransfer.setData("nodeId", ev.target.getAttribute("id")); // --> nothing is passed; maybe Chrome-specific?
}

function dragEnd(ev) {
  console.log("Drag ended")
}

//$.event.props.push('dataTransfer');
function updateRecentItemsPreview() {
  var uri = "/api/search?&limit=10&sort=created:desc&query=ownerAdminId:-1"
  $.getJSON(uri).done(function(data) {
    console.log("Received 10 most recent items:", data)
    var previewUris = _.map(data, function(d) { return d.node.previewUri })
    console.log("PreviewUris:", previewUris)
    var out = $("#recentitems").css("position","relative")
    out.empty()
    for(var i=0; i<previewUris.length; i++) {
      var id = "node-"+ data[i].node.type + "-" + data[i]._id
      var el = $("<div>").attr("draggable","true").attr("id", id).addClass("node-preview-wrapper").load(previewUris[i]).appendTo(out)
      el.get(0).addEventListener('dragstart', dragStart, false);
      el.get(0).addEventListener('dragend', dragEnd, false);
    }
  })
}

$(document).ready(function() {
  console.log("Ready!")
  // jQuery.event.props.push("dataTransfer");

  var tabber1 = new Yetii({
      id: 'tabs-container-1',
      active: 1,
      tabclass: 'ui-tabs-panel',
      callback: function(tabnumber) {
        if(tabnumber>=1) {
          var tabName = tabInfo[tabnumber-1]
          currentTab = tabName
          currentIndex = tabnumber
        }
      }
  });  

  $("a.disabled").click(function(e) {
    e.preventDefault();
  });

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

  makeUploadControl()
  updateRecentItemsPreview()

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
