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


/**
 * Create Alpaca form
 * @param {object} entitySchema
 * @param {obnect} formParams
 * @param {object} data
 * @param {number} index
 * @param {string} name
 */
var createAddForm = function(entitySchema, formParams, data, index, name) {
    var schema = formParams.schema || entitySchema
    var options = formParams.options || {}
    var form = $("#tabs-"+index+"-add .form").alpaca({
      schema:schema, 
      options:options, 
      data:data,
      postRender: function(control) {
        // console.log("postRender: ")
        tabaddforms[index] = control              
        $(control.container).find("[name=submit]").click(function() {
          // clicked on submit button...
          formSubmitted(name, "add", control, control.form.getValue(), function(rr) {
            // show item's view
            viewItem(name, rr)
          })
          return false;
        })
      }
    })    
}

var createEditForm = function(entitySchema, formParams, data, index, name) {
    var schema = formParams.schema || entitySchema
    var options = formParams.options || {}
    var form = $("#tabs-"+index+"-edit .form").alpaca({
      schema:schema, 
      options:options, 
      data:data,
      postRender: function(control) {
        // console.log("postRender: ")
        tabeditforms[index] = control              
        $(control.container).find("[name=submit]").click(function() {
          // clicked on submit button...
          formSubmitted(name, "edit", control, control.form.getValue(), function(rr) {
            viewItem(name, rr)
          })
          return false;
        })
      }
    })
}


var tabInfo = []

var tabbers = {}
var tabnames = {}
var tabindexes = {}
var tabeditforms = {}
var tabaddforms = {}

var currentTab = null
var currentIndex = null


// TODO use mustache...
var makeUploadControl = function() {
    var previousUUID = null
    $("#remove-upload").click(function() {
      if(previousUUID) {
        var opts = {
          url: "/upload/"+previousUUID,
          type: "DELETE",
          contentType: "application/json; charset=utf-8"
        }
        $.ajax(opts).then(function(res) {
          if(!res.error) {
            console.log("File deleted!")
            previousUUID = null
            $("#upload-thumb").empty()
            $("#remove-upload").hide()
            $("#upload-uuid").val(previousUUID)
          } 
        })                  
        return false
      }
    }).hide()
    $("#demo1").AjaxFileUpload({
      action: previousUUID ? "/upload?uuid="+previousUUID : "/upload",
      onComplete: function(filename, response) {
        $("#upload-thumb").html(
          $("<img />").attr("src", response.thumbnailUri).attr("width", 200)
        );
        previousUUID = response.uuid
        $("#remove-upload").show()
        $("#upload-uuid").val(previousUUID)
      },
      onSubmit : function(id, fileName){
        // send additionsl data to be send in form submit...
        return { uuid: previousUUID }
      }
    });
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
          console.log("File uploaded!", data)
      }
  })  

  makeUploadControl()

})
