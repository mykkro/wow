var Thing = require("./Thing")

var convertUri = function(uri, baseUri) {
    // if uri starts with '/' or 'http://', leave it be
    // else prepend baseUri
    return baseUri + "/" + uri
}

var Things = {
    klasses: {
        "audio-decorator": require("./AudioDecorator"),
        "book": require("./Book"),
        "background-decorator": require("./BackgroundDecorator"),
        "border-decorator": require("./BorderDecorator"),
        "clock": require("./Clock"),
        "empty": require("./Empty"),
        "grid-layout": require("./GridLayout"),
        "growablelayout": require("./GrowableLayout"),
        "imager": require("./Imager"),
        "inset-decorator": require("./InsetDecorator"),
        "layout": require("./Layout"),
        "opacity-decorator": require("./OpacityDecorator"),
        "ref-decorator": require("./RefDecorator"),
        "ref-list": require("./RefList"),
        "rounded-decorator": require("./RoundedDecorator"),
        "shadow-decorator": require("./ShadowDecorator"),
        "text-thing": require("./TextThing"),
        "tubeplayer-thing": require("./TubeplayerThing"),
        "video-thing": require("./VideoThing"),
    },
    create: function(def, opts) {
        if(!def) {
            return new Empty();
        }
        // udelat deserializaci
        // { type, options, slots }
        var klassName = def.type.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
        klassName = klassName.capitalize();
        var klazz = Things.klasses[def.type];
        if(!klazz) {
            throw new Error("Unknown thing type: "+def.type)
        }
        var slots = def.slots;
        var oid = def.id;
        if($.isArray(slots)) slots = slots.toObject();
        for(var key in slots) {
            slots[key] = Things.create(slots[key]);
        }
        var thing = new klazz($.extend(def.options, opts), slots);
        thing.oid = oid
        return thing
    },
    convertURIs: function(def, baseUri) {
        if(!def || !baseUri) {
            return def
        }
        var out = $.extend({}, def)
        var type = out.type
        if(type == "imager") {
            out.options.url = convertUri(out.options.url, baseUri)
            // console.log("Imager: ", def)
        } else if(type == "audio-decorator") {
            out.options.uri = convertUri(out.options.uri, baseUri)
            // console.log("Audio: ", def)
        } else if(type == "video-thing") {
            out.options.uri = convertUri(out.options.uri, baseUri)
            // console.log("Video: ", def)
        }
        var slots = out.slots;
        if($.isArray(slots)) slots = slots.toObject();
        for(var key in slots) {
            slots[key] = Things.convertURIs(slots[key], baseUri);
        }
        return out
    }    
}


module.exports = Things
