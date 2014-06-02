var Thing = require("./Thing")

var RefList = Thing.extend({
    init: function() {
      this.element.empty()
      this.element.append($("<p>").text(__("References")))
    },
    refresh: function() {
        this.base();
    },
    // refs = array of ref decorator objects
    setReferences: function(refs) {
      this.element.empty()
      this.element.append($("<p>").text(__("References")))
      var list = $("<ul>").appendTo(this.element)
      if(refs) {
        for(var i=0; i<refs.length; i++) {
          list.append(this.makeReference(refs[i], i))
        }
      } else {
        this.element.append($("<p>").text(__("No references found.")))
      }
    },
    makeReference: function(ref, index) {
      return $("<li>").append(
        $("<span>").addClass("ref-link").text(index+1),
        $("<span>").addClass("ref-label").text(ref.options.source)
      )
    },
    _klass: "ref-list thing",
    _type: "ref-list",
    _defaults: {
    },
    _schema: {
       "type":"object",
       "description":"References List properties",
       "properties":{
       },
       "additionalProperties":true
    }

});

module.exports = RefList