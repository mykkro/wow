//= require "thing"
//= require "ajax"

var AjaxPager = Thing.extend({
    init: function() {
        var self = this;
        this.base();
        this.page = new Ajax();
        this.page.received(function(data) { return self._dataReceived(data);});
        this.page.transform(function(data) { return self._dataTransform(data);});
        this.page.loaded(function(ajax) {self._pageLoaded(ajax);});
        this.page.get().appendTo(this.element);
        this.createControls();
        this.setPage(this.options.page);
    },
    createControls: function() {
        this.pagerControls = $("<div>").addClass('pager-controls');
        if(!this.options.disablePagerControl) this.pagerControls.appendTo(this.element);
    },
    refreshView: function() {
        this.setPage(this.options.page);
    },
    setPage: function(num) {
        this.options.page = num;
        var url = null;
        if(this.options.page && this.options.baseUrl) {
            url = this.getPageUrl(this.options.page);
            this.page.options.url = url;
            this.page.reload();
        } else {
            // signal error
        }
    },
    getPageUrl: function(page) {
        return this.options.baseUrl + page + ".json";
    },
    // muzeme podedit pokud potrebujeme jine chovani, transformaci dat aj.
    _dataReceived: function(data) {
        return data;
    },
    _dataTransform: function(data) {
        return Thing.create(data);
    },
    _pageLoaded: function(ajax) {
        this.pagerControls.empty();
        if(ajax instanceof PageDecorator) {
            // rebuild page controls
            this._buildPageControls(ajax);
        }
    },
    _buildPageControls: function(paged) {
        // TODO udelat PagerControls jako Thing
        // stranky jsou cislovany od jedne, nejmensi cislo je 1
        var o = paged.options;
        if(o.pageNumber>1) {
            // add first link
            this.pagerControls.append(this._makePageLink(1, "first"));
        }
        if(o.pageNumber>1) {
            // add previous link
            this.pagerControls.append(this._makePageLink(o.pageNumber-1, "previous"));
        }
        this.pagerControls
            .append($("<span>").text(__("Page")+" "+o.pageNumber+" "+__("from")+" "+o.pagesTotal));        
        if(o.pageNumber<o.pagesTotal) {
            // add previous link
            this.pagerControls.append(this._makePageLink(o.pageNumber+1, "next"));
        }
        if(o.pageNumber<o.pagesTotal) {
            // add first link
            this.pagerControls.append(this._makePageLink(o.pagesTotal, "last"));
        }
    },
    _makePageLink: function(pageno, type) {
        var self = this;
        return $('<a href="#">').text(type).click(function() {
            self.setPage(pageno);
            return false;
        });
    },
    _klass: "ajax-pager thing",
    _type: "ajax-pager",
    _defaults: {
        baseUrl: '',// 'testing/multi/',
        page: 1,
        disablePagerControl: false
    },
    _schema: {
	    "type":"object",
	    "$schema": "http://json-schema.org/draft-03/schema",
	    "properties":{
		    "page": {
			    "type":"integer",
			    "required":true
		    },
		    "url": {
			    "type":"string",
			    "id": "url",
                "format": "uri",
			    "required":true
		    }
	    }
    }
});

