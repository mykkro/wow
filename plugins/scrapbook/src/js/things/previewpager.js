//= require "ajaxpager"
//= require "clickable"
//= require "pagedecorator"
//= require "orderablelayout"

var PreviewPager = AjaxPager.extend({
    constructor: function(options, callback) {
        this.base(options); // baseUrl, query, includePublic, allTags, disableSearchBox
        this.onselected = callback || $.noop;
    },
    createControls: function() {
        this.base();
        var self = this
        var changer = function() {
            self.refreshView()
        }
        this.searchBox = $('<input type="text" name="sf-text" class="search rounded" placeholder="Search...">').attr("value", this.options.query).on("change keyup paste", changer)
        this.publicCBox = $('<input type="checkbox" name="sf-public">').prop('checked', this.options.includePublic).change(changer)
        this.allCBox = $('<input type="checkbox" name="sf-all">').prop("checked", this.options.allTags).change(changer)
        if(!this.options.disableSearchBox) {
            var sc = $("<div>")
                .addClass('search-controls')
                .appendTo(this.element)
                .append(
                    $('<label>').append(this.searchBox), 
                    $('<label>').append(this.publicCBox, $('<span>Include public content</span>')),
                    $('<label>').append(this.allCBox, $('<span>Use all tags</span>'))
                );
        }
    },
    getPageUrl: function(page) {
        var text = encodeURIComponent(this.searchBox.val())
        var publ = this.publicCBox.is(':checked') ? 'true' : 'false'
        var all = this.allCBox.is(':checked') ? 'true' : 'false'
        return this.base(page) + "?public="+publ+"&text="+text+"&all="+all
    },
    _dataReceived: function(data) {
        return data;
    },
    _dataTransform: function(data) {
        var self = this;
        var ol = new OrderableLayout({"css":"mykkro-flow-layout"});
        for(var i=0; i<data.items.length; i++) {
            var thing = Thing.create(data.items[i].preview);
            var clickable = new Clickable({tooltip: data.items[i].title});
            clickable.setSlot('content', thing);
            (function() {
                var url = data.items[i].url;
                clickable.click(function() {
                    self._selected(url);
                });
/*
                // TODO settings - otevre formular
                // Thing ma definovane schema pro validaci options
                var st = makeSettingsToolbar(function(){
                    // change thing's settings
                    self._selected(url, true);
                });
                st.setSlot('content', clickable);
                ol.add(st);
*/
                ol.add(clickable);
            })();
        }
        var pd = new PageDecorator({
            'pageNumber': data.page,
            'pagesTotal' : data.pagesTotal,
            'recordsTotal' : data.itemsTotal            
        });
        pd.setSlot('content', ol);
        return pd;
    },
    _selected: function(url, editSettings) {
        var self = this;
         $.ajax({
              url: url,
              dataType: 'json',
              //data: data,
              success: function(data) {
                   console.log("Selected:")
                   console.log(data)
                  if(editSettings) {
                     // ziskat schema, zobrazit formular, nastavit data.options                    
                  }
                  var thing = Thing.create(data);
                  self.onselected(thing);
              }
          });
    },
    _type: "preview-pager"
}, {
    choose: function(type, callback, options) {
        options = options || {}
	    var mm = {};
        var url = baseUrl+'api/pagedpreviews/'+type+'/';
        var ap = new PreviewPager($.extend({baseUrl:url}, options), function(thing) { 
            mm.modal.close();
            if(callback) callback(thing);
        });
        /**/options.resizable = false/**/
        mm.modal = Modal.show(ap, options);
    }
});

