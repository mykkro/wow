var RaphaelThing = require("./RaphaelThing")

// TODO kdyz zmenim parametry hodin a ulozim, nepromitne se to do inputu

var Clock = RaphaelThing.extend({
    refresh: function() {
        this.base();
        var 
            o = this.options,
            size = o.size,
            canvas = this.canvas,
            clock = canvas.circle(size*.5,size*.5, size * .475);
        clock.attr({"fill":o.fillColor,"stroke":o.strokeColor,"stroke-width":(size*.025)})
        var hour_sign;
        for(i=0;i<12;i++){
            var start_x = size*.5+Math.round((size*.4)*Math.cos(30*i*Math.PI/180));
            var start_y = size*.5+Math.round((size*.4)*Math.sin(30*i*Math.PI/180));
            var end_x = size*.5+Math.round((size*.45)*Math.cos(30*i*Math.PI/180));
            var end_y = size*.5+Math.round((size*.45)*Math.sin(30*i*Math.PI/180));
            hour_sign = canvas.path("M"+start_x+" "+start_y+"L"+end_x+" "+end_y);
        }
        this.hour_hand = canvas.path("M" + size*.5 + " " + size*.5 + "L" + size*.5 + " " + (size*.25) + "");
        this.hour_hand.attr({stroke: o.hourHandColor, "stroke-width": size*.03});
        this.minute_hand = canvas.path("M" + size*.5 + " " + size*.5 + "L" + size*.5 + " " + (size*.2) + "");
        this.minute_hand.attr({stroke: o.minuteHandColor, "stroke-width": size*.02});
        this.second_hand = canvas.path("M" + size*.5 + " " + (size*.55) + "L" + size*.5 + " " + (size*.125) + "");
        this.second_hand.attr({stroke: o.secondHandColor, "stroke-width": size*.01});
        var pin = canvas.circle(size*.5, size*.5, size*.025);
        pin.attr("fill", o.pinColor);

        var self = this;
        var updater = function() {
            self.update();
        };
        updater();
        setInterval(updater,1000); 
    },
    update: function() {
        var self = this,
            size = this.options.size,
            now = new Date(),
            hours = now.getHours(),
            minutes = now.getMinutes(),
            seconds = now.getSeconds(),
            cc = ","+(size*.5)+","+(size*.5);
        self.hour_hand.transform('r'+(30*hours+(minutes/2.5))+cc);
        self.minute_hand.transform('r'+(6*minutes)+cc);
        self.second_hand.transform('r'+(6*seconds)+cc);
    },
    _klass: "clock raphael-thing thing",
    _type: "clock",
    _defaults: {
        width: 100,
        height: 100,
        size: 100,
        fillColor: "white", 
        strokeColor: "black", 
        pinColor: "gray",
        hourHandColor:"black", 
        minuteHandColor:"black",
        secondHandColor:"black"
    },
    _schema: {
       "type":"object",
       "description":"Clock properties",
       "properties":{
          "size":{
             "type":"integer",
             "required":true
          },
          "width":{
             "type":"integer",
             "required":true
          },
          "height":{
             "type":"integer",
             "required":true
          },
          "fillColor":{
             "type":"string",
             "format": "color",
             "required":true
          },
          "strokeColor": { "type": "string", "required": true, "format": "color" },
          "pinColor": { "type": "string", "required": true, "format": "color" },
          "hourHandColor": { "type": "string", "required": true, "format": "color" },
          "minuteHandColor": { "type": "string", "required": true, "format": "color" },
          "secondHandColor": { "type": "string", "required": true, "format": "color" }
       },
       "additionalProperties":true
    }
});

module.exports = Clock
