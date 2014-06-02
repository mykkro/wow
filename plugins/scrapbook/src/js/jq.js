var JQ = {
    button: function(caption, click, parent) {
        var btn = $("<button>").text(caption);
        if(click) btn.click(click);
        if(parent) btn.appendTo(parent);
        return btn;
    },
    linkButton: function(content, click, parent) {
        var btn = JQ.put($("<a>"), content);
        if(click) btn.click(click);
        if(parent) btn.appendTo(parent);
        return btn;
    },
    link: function(content, href, tooltip, parent) {
        var link = JQ.put($("<a>"), content).attr({"title":tooltip, "href":href});
        if(parent) link.appendTo(parent);
        return link;
    },
    ul: function(parent) {
        var ul = $("<ul>");
        if(parent) ul.appendTo(parent);
        return ul;
    },
    li: function(klass, parent) {
        var li = $("<li>").addClass(klass);
        if(parent) li.appendTo(parent);
        return li;
    },
    checkbox: function(name, checked, parent) {
        var input = $("<input>").attr({'type':'checkbox', 'name':name}).prop("checked", checked);
        if(parent) input.appendTo(parent);
        return input;
    },
    textfield: function(name, value, parent) {
        var input = $("<input>").attr({'type':'text', 'name':name, "value":value});
        if(parent) input.appendTo(parent);
        return input;
    },
    span: function(content, klass, parent) {
        var span = JQ.put("span", content).addClass(klass);
        if(parent) span.appendTo(parent);
        return span;
    },
    div: function(content, klass, parent) {
        var div = JQ.put("div", content).addClass(klass);
        if(parent) div.appendTo(parent);
        return div;
    },
    p: function(content, klass, parent) {
        var p = JQ.put("p", content).addClass(klass);
        if(parent) p.appendTo(parent);
        return p;
    },
    h1: function(content, klass, parent) {
        return JQ.hN(1, content, klass, parent);
    },
    h2: function(content, klass, parent) {
        return JQ.hN(2, content, klass, parent);
    },
    h3: function(content, klass, parent) {
        return JQ.hN(3, content, klass, parent);
    },
    h4: function(content, klass, parent) {
        return JQ.hN(4, content, klass, parent);
    },
    h5: function(content, klass, parent) {
        return JQ.hN(5, content, klass, parent);
    },
    h6: function(content, klass, parent) {
        return JQ.hN(6, content, klass, parent);
    },
    hN: function(level, content, klass, parent) {
        var heading = JQ.put("h"+level, content).addClass(klass);
        if(parent) heading.appendTo(parent);
        return heading;
    },
    label: function(content, klass, parent) {
        var label = JQ.put("label", content).addClass(klass);
        if(parent) label.appendTo(parent);
        return label;
    },
    clear: function(parent) {
        var clr = $("<div>").addClass("clear");
        if(parent) clr.appendTo(parent);
        return clr;
    },
    show: function(elem, enabled) {
        if(enabled) elem.show(); else elem.hide();
    },
    form: function(klass, parent) {
        var div = $("<form>").addClass(klass);
        if(parent) div.appendTo(parent);
        return div;
    },
    fieldset: function(klass, parent) {
        var div = $("<fieldset>").addClass(klass);
        if(parent) div.appendTo(parent);
        return div;
    },
    toggleLink: function(captionOn, captionOff, target, parent) {
        var visible = target.is(":visible");
        var btn = JQ.put("a", visible ? captionOn : captionOff).click(function() {
            var visible = target.is(":visible");
            if(visible) {
                target.hide();
                btn.text(captionOff);
            } else {
                target.show();
                btn.text(captionOn);
            }
        });
        if(parent) btn.appendTo(parent);
        return btn;
    },
    linkExt: function(caption, href, tooltip, parent) {
        return JQ.link(caption, href, tooltip, parent).attr("target","_blank");
    },
    put: function(where, what) {
        if(typeof(where) == "string") {
            where = $("<"+where+">");
        }
        if(what) {
            if(typeof(what) == "string") {
                where.text(what);
            } else {
                where.append(what);
            }
        }
        return where;
    }
};

