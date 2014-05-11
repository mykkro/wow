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

var formSubmitted = function(type, action, control, value, next) {
  console.log("Form "+type+"."+action+" submitted!")
  console.log(value)
  if(action == "add") {
    var uri = "/api/"+type+"/new"
    var data = value
    doAjax('POST', uri, data, function(err, res) {
      if(!err) {
        console.log("Data received: ", res)
        if(next) next(res[0])
      }
    })
  } else if(action=="edit") {
    var id = $("#tabs-"+tabindexes[type]+"-edit input[name=itemid]").val()
    var uri = "/api/"+type+"/" + id
    var data = value
    doAjax('PUT', uri, data, function(err, res) {
      if(!err) {
        console.log("Data received: ", res)
       if(next) next($.extend({_id:id},data))
      }
    })
  }
}

var refreshListView = function() {
  if(currentIndex>0) {
    var main = $("#tabs-"+currentIndex+"-list")
    var div = main.find(".list")
    var uri = "/api/"+currentTab+"/search"
    doAjax('GET', uri, {}, function(err, res) {
      if(!err) console.log("Data received: ", res)
        div.html(displayItems(currentTab, res))
    })
  }
}

var removeItem = function(type, id) {
    var uri = "/api/"+type+"/" + id
    doAjax('DELETE', uri, {}, function(err, res) {
      if(!err) console.log("Data received: ", res)
        refreshListView()
    })
}

var viewItem = function(type, item) {
  var tabIndex = tabindexes[type]
  // show item view...
  var div = $("#tabs-"+tabIndex+"-view .content")
  console.log(item, div)
  div.html(JSON.stringify(item, null, 2))
  tabbers[tabIndex].show(5) // view tab
}

var editItem = function(type, item) {
  var tabIndex = tabindexes[type]
  var control = tabeditforms[tabIndex]
  control.form.setValue(item)
  var hidn = $("#tabs-"+tabIndex+'-edit input[name=itemid]')
  hidn.val(item._id)
  var div = $("#tabs-"+tabIndex+"-edit .content")
  console.log(item, div)
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
    viewItem(type, item)
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
  out.append(viewLink, editLink, removeLink)
  return out
}


var createForm = function(type, action, schema, options, data) {
    var index = tabindexes[type]
    var form = $("#tabs-"+index+"-"+action+" .form").alpaca({
      schema:schema, 
      options:options, 
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
          formSubmitted(type, action, control, control.form.getValue(), function(rr) {
            // show item's view
            viewItem(type, rr)
          })
          return false;
        })
      }
    })    
}

var createAddForm = function(type, entitySchema, formParams, data) {
    if(type == "admin") {
      createAdminAddForm(type, entitySchema, formParams, data)      
      return
    } 
    var schema = formParams.schema || entitySchema
    var options = formParams.options || {}
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
    var schema = formParams.schema || entitySchema
    var options = formParams.options || {}
    createForm(type, "edit", schema, options, data)
}


var tabInfo = []

var tabbers = {}
var tabnames = {}
var tabindexes = {}
var tabeditforms = {}
var tabaddforms = {}

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
          console.log("File deleted!")
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


$(document).ready(function() {
  console.log("Ready!")

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

  $('#allpurpose-dropzone').dropAnything({
      dropped: function(data) {
        console.log("Dropped!", data)
      },
      uploaded: function(data) {
        console.log("Uploaded!", data)
      }
  })  

  makeUploadControl()

})
