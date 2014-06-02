//= require "thing"

var PageDecorator = Thing.extend({
    init: function() {
        this.base();
        this.pageContent = $("<div>").addClass("page-content").appendTo(this.element);
        this.pageInfo = $("<div>").addClass('page-info').appendTo(this.element);
        this.setSlot('content', Thing.empty());
    },
    // options changed...
    refresh: function() {
        // TODO text mask?
        this.base();
        if(this.options.showInfo) this.pageInfo.show(); else this.pageInfo.hide();
        this.pageInfo.text("Page "+this.options.pageNumber);
    },
    setSlot: function(key, value) {
        this.base(key, value);
        this.pageContent.html(value.get());
        return this;
    },
    _klass: "page-decorator thing",
    _type: "page-decorator",
    _defaults: {
        'showInfo' : false,
        'pageNumber': 2,
        'pagesTotal' : 3,
        'recordsTotal' : 10
    },
    _schema: {
       "type":"object",
       "properties":{
          "showInfo":{
             "type":"boolean",
             "required":true
          },
          "pageNumber":{
             "type":"integer",
             "required":true
          },
          "pagesTotal":{
             "type":"integer",
             "required":true
          },
          "recordsTotal":{
             "type":"integer",
             "required":true
          }
       },
       "additionalProperties":true
    }
});

