$(function() {

var tilesetBaseUrl = "../../media/tilesets/sampleTileset/"
var tileBackUrl = tilesetBaseUrl+"assets/tileback.png"

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var blk = function(klass, attrs) {
  return $("<div>").addClass(klass).attr(attrs||{})
}


if(!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}

/* smart object which can behave both as object and array */
/*var */$O = function() {
  var data = []
  var mapping = null
  if(arguments.length==0) {
    /* empty object/array */  
    data = []
    mapping = {}
  } else if(arguments.length>1) {
    /* array of arguments */
    data = Array.prototype.slice.call(arguments, 0);
  } else {
    /* single argument */
    var arg = arguments[0]
    if(arg === null) {
      data = []
      mapping = {}
    } else if(typeof(arg) != 'object') {
      data = [{key:"value",value:arg}]
      mapping = {0:'value',value:0}
    } else {
      // object or array
      if(Array.isArray(arg)) {
        data = arg;
      } else {
        // it is an object
        data = []
        mapping = {}
        var index = 0
        for(var key in arg) {
          data.push({"key":key,"value":arg[key]})
          mapping[key] = index
          mapping[index] = key
        }
      }
    }
  }
  
  return {
    data:data,
    mapping: mapping,
    get: function(index) {
      if(typeof(index)=="string") {
        // TODO check property
        if(!mapping) {
          // this array does not have a mapping table
          console.error("Invalid index: "+index)
          return undefined
        }
        index = mapping[index]
        return data[index] ? data[index].value : undefined
      } else {
        if(index<0||index>=data.length) return undefined
        return mapping? data[index].value : data[index]
      }
    },
    set: function(index, value) {
      if(typeof(index)=="string") {
        if(!mapping) {
          // this array does not have a mapping table
          console.error("Invalid index: "+index)
          return
        }
        // TODO check property
        if(index in mapping) {
          index = mapping[index]
          data[index].value = value
        } else {
          // add new mapping and add new element to the end  of data array
          data.push({key:index, value:value})
          var newIndex = data.length-1
          mapping[newIndex] = index
          mapping[index] = newIndex
        }
      } else {
        if(index<0||index>=data.length) {
          console.error("Invalid index: "+index)
          return
        };
        if(mapping) {
          data[index].value = value
        } else {
          data[index] = value
        }
      }
    },
    length: function() {
      return data.length
    },
    hasProp: function(index) {
      return typeof(index)=="string" && mapping && (index in mapping);
    },
    each: function(fun/*(value, index, name?*/) {
      for(var i=0; i<data.length; i++) {
        if(mapping) {
          fun(data[i].value, i, data[i].key)
        } else {
          fun(data[i], i)
        }
      }
    }
  }
}

/*
var aaa = [
  $O(),
  $O(null),
  $O(null, null),
  $O("asdf"),
  $O(123.4),
  $O(true),
  $O({key:"value"}),
  $O([1,2,3,4,5]),
  $O(3,4,5,6,7)
]

_.each(aaa, function(aa) {
  console.log("Testing...")
  console.log(aa)
  console.log(aa.get(0))
  console.log(aa.get("key"))
  console.log(aa.length())
  aa.set("key",666)
  console.log("after set...")
  console.log(aa)
  console.log(aa.get("key"))
  console.log(aa.length())
})
*/

$.getJSON(tilesetBaseUrl + "metadata.json").done(function(d) {
  console.log("Tileset metadata loaded.")
  console.log(d)
  /* start with a set of cards.. */
  /* smart object which can behave as array */
  var cards = $O()
  _.each(d.tiles, function(ttt) {
    cards.set(ttt.name, {tile:null, url:ttt.url});
  })
  /* display board */
  $("#board").empty()
  for(var i=0; i<cards.length(); i++) {
    var tile = blk("tile")
        .css({"background-image": "url("+tilesetBaseUrl + cards.get(i).url+")"})
    var fun = function(){
        var j = i
        var card = blk("card").append(
          /* face */
          blk("tcf")
            .html(tile),
          /* back */
          blk("tcb")
            .css({"background-image": "url("+tileBackUrl+")"})
        )
        cards.get(j).tile = card
    };
    fun()
  }
  
  cards.each(function(data, index, name) {
    console.log(data.url+" "+index+" "+name)
  })

var pickNine = function(cards) {
 var alreadyUsed = {}
 var out = []
 for(var i=0; i<3; i++) {
   var ndx=null;
   do {
    ndx = Math.floor((cards.length()-1)*Math.random())
   } while (alreadyUsed[ndx])
   alreadyUsed[ndx] = true
   out.push(ndx) 
 }
 var cc = [out[0], out[0], out[0], out[0], out[1], out[1], out[1], out[2], out[2]]
 shuffle(cc)
 $("#board").empty()
 for(var i=0; i<cc.length; i++) {
   $("#board").append(cards.get(cc[i]).tile.clone())
   if(i%3==2) $("#board").append($("<br/>"))
 }
return out;
}


function overlay(options) {
	el = $("#overlay");
	var content = el.children(".content")
	if(options.content) content.html(options.content)
	if(options.contentClass) content.attr("class", "content "+options.contentClass)
	if(options.width) content.css("width", options.width+"px" )
	if(options.height) content.css("height", options.height+"px")
	return el.hide()
}


/* simpleControl generates events */
var SimpleEventSource = Base.extend({
  constructor: function(type) {
    this.type = type
    this.listeners = []
  },
  addListener: function(listener) {
    for(var i=0; i<this.listeners.length; i++) {
      if(this.listeners[i] == listener) {
        // already registered!
        return;
      }
    }
    this.listeners.push(listener)
  },
  removeListener: function(listener) {
    var nl = []
    for(var i=0; i<this.listeners.length; i++) 
      if(this.listeners[i] != listener) nl.push(this.listeners[i])
    this.listeners = nl
  },
  fireEvent: function(evt) {
    for(var i=0; i<this.listeners.length; i++) {
      this.listeners[i].onEvent(evt)
    }
  }
})

var TimedEventSource = SimpleEventSource.extend({
  constructor: function() {
    this.base("timed")
    this.delay = 1000
    this.frame = 0
  },
  start: function() {
    var self = this
    var fun = function() {
      self.fireEvent({type:self.type, frame:self.frame++})
    }
    this.timer = setInterval(fun, this.delay)
    console.log("Started timer: "+this.timer)
  },
  stop: function() {
    clearInterval(this.timer)
  }
})

/* TODO singleton pattern */
var KeyboardEventSource = SimpleEventSource.extend({
  constructor: function() {
    this.base("keyboard")
    this.init()
  },
  init: function() {
    var self = this
    $(document).keyup(function(evt) {
      self.fireEvent(evt)
    })
    $(document).keydown(function(evt) {
      self.fireEvent(evt)
    })
    $(document).keypress(function(evt) {
      self.fireEvent(evt)
    })
  }
})

// TODO list supported events 
var SimpleControl = SimpleEventSource.extend({
  constructor: function() {
    this.base("simplecontrol")
  },
  /* actions: left down up right select escape home */
  fireLeft: function() {
    this.fireEvent({type:"simplecontrol", action:"left"})
  },
  fireRight: function() {
    this.fireEvent({type:"simplecontrol", action:"right"})
  },
  fireUp: function() {
    this.fireEvent({type:"simplecontrol", action:"up"})
  },
  fireDown: function() {
    this.fireEvent({type:"simplecontrol", action:"down"})
  },
  fireSelect: function() {
    this.fireEvent({type:"simplecontrol", action:"select"})
  },
  fireEscape: function() {
    this.fireEvent({type:"simplecontrol", action:"escape"})
  },
  fireHome: function() {
    this.fireEvent({type:"simplecontrol", action:"home"})
  },
})

var SimpleKeyboardControl = SimpleControl.extend({
  constructor: function(keyeventsource) {
    this.base("simplekeyboardcontrol")
    this.source = keyeventsource
    this.source.addListener(this)
  },
  onEvent: function(e) {
    if(e.type=="keyup" && e.keyCode == 27) this.fireEscape()
    if(e.type=="keyup") {
      if(e.keyCode == 27) this.fireEscape()
      else if(e.keyCode == 13) this.fireSelect()
      else if(e.keyCode == 37) this.fireLeft()
      else if(e.keyCode == 39) this.fireRight()
      else if(e.keyCode == 38) this.fireUp()
      else if(e.keyCode == 40) this.fireDown()
      else if(e.keyCode == 36) this.fireHome()
    }
  }
})

var Gizmo = SimpleEventSource.extend({
  listenTo: function(eventSource) {
    eventSource.addListener(this)
  },
  stopListening: function(eventSource) {
    eventSource.removeListener(this)
  },
  onEvent: function(e) {
    console.log(e)
  }
})

//var sc = new TimedEventSource()
var sc = new KeyboardEventSource()
var cc = new SimpleKeyboardControl(sc)
/*
var gz = new Gizmo()
gz.listenTo(cc)
*/

var Overlay = Gizmo.extend({
  constructor: function(opts) {
    this.base("overlay")
    this.options = $.extend({ 
      closeOnEscape: true, 
      closeOnSelect: true,
      onclose: $.noop,
      onopen: $.noop,
      contentClass: "info"
      /* closeAfter: 2000  */
    }, opts)
    this.overlay = overlay({
      width: 300,
      //height: 200
      content: this.options.content,
      contentClass: this.options.contentClass
    })
    var self = this
    /*
    this.overlay.click(function(evt) {
      if(self.options.closeOnEscape) self.close()
      evt.stopPropagation()
    })
    */
    /* show it */
    var self = this
    if(this.options.closeAfter) {
      setTimeout(function() {
        self.close()
      }, this.options.closeAfter)
    }
    this.open()
  },
  onEvent: function(e) {
    if(this.overlay.is(":visible")) {
      if(e.type=="simplecontrol" && e.action=="escape") {
        if(this.options.closeOnEscape) {
          this.close()
        }
      }
      if(e.type=="simplecontrol" && e.action=="select") {
        if(this.options.closeOnSelect) {
          this.close()
        }
      }
    }
  },
  open: function() {
    this.overlay.show()
    this.fireEvent({type: "overlay show"})
    if(this.options.onopen) this.options.onopen(this)
  },
  close: function() {
    this.overlay.hide()
    this.fireEvent({type: "overlay close"})
    if(this.options.onclose) this.options.onclose(this)
  },
  destroy: function() {
    
  }
})


var showOverlay = function(control, opts, after) {
  var oo = new Overlay({
    content: opts.content,
    closeOnEscape: opts.closeOnEscape, 
    closeOnSelect: opts.closeOnSelect,
    closeAfter: opts.closeAfter,
    contentClass: opts.contentClass,    
    onclose: function(self) {
      self.stopListening(control)
      if(after) after()
    },
    onopen: function(self) {
      self.listenTo(control)    
    }
  })
  return oo
}

var offeredCards = function(timeout, after) {
  var correctOrder = pickNine(cards)
  var fun = function() { 
    if(after) after(correctOrder)
  }
  if(timeout) {
    setTimeout(fun, timeout)
  } else fun()
  
}

var askQuestion = function(correct, after) {
  var random = correct.slice(0)
  var over;
  shuffle(random)
  var selected = function(i) {
    console.log(random[i] == correct[0])
    over.close()
    if(after) after(random[i] == correct[0]) 
  }
  var html = $("<div>").append(
    $("<p>Choose the most frequent item:</p>"),
    $("<div>").append(
      cards.get(random[0]).tile.clone().click(function(){selected(0)}),
      cards.get(random[1]).tile.clone().click(function(){selected(1)}),
      cards.get(random[2]).tile.clone().click(function(){selected(2)})
    )
  )
  over = showOverlay(cc, {content:html, closeOnSelect:false, closeOnSelect:false})
}

var delay = 5000
function playLevel(delay, after) {
  showOverlay(cc, {content:"<p>Press Enter when ready</p>", closeOnSelect:true, contentClass:"info"}, function() {
    $("#board").show()
    offeredCards(delay, function(correct) {
      $("#board").hide()
      askQuestion(correct, function(answeredCorrectly) {
        if(answeredCorrectly)
          showOverlay(cc, {content:"<p>Correct!</p>", contentClass: "success", closeOnSelect:false, closeOnEscape: false, closeAfter: 2000}, after)
        else 
          showOverlay(cc, {content:"<p>Incorrect</p>", contentClass: "fail", closeOnSelect:false, closeOnEscape: false, closeAfter: 2000}, after)
      })
    })
  })
}
 
playLevel(5000, function() {
  console.log("finished level")
  playLevel(4000, function() {
    console.log("finished level")
    playLevel(3000, function() {
      console.log("finished level")
    })
  })
})

/*
var gz = new Gizmo()
gz.listenTo(oo)
*/



/* usage: gizmo.listenTo(control) */
/*        gizmo.stopListening(control) */

 

/* hide it */
//ov.hide()

})

})