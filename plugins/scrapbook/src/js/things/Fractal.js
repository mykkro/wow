var CanvasThing = require("./CanvasThing")

// http://www.nihilogic.dk/labs/javascript_canvas_fractals/
var Fractal = CanvasThing.extend({
    draw: function(ctx, w, h) {
        var smoothColors = this.options.smoothcolors;
        var vx = this.options.vx;
        var vy = this.options.vy;
        var zoom = this.options.zoom;

        var imageData = !!ctx.getImageData;
        var startit = 30;
        var xmin, xmax, ymin, ymax, dx, dy;
        var er = 2;

        var colors = {
	        red : [[0,0,1],[0,1,0],[0,1,0]],
	        blue : [[0,0,0],[0,1,0],[0,1,1]],
	        green : [[0,1,0],[0,0,1],[0,1,0]],
	        orange : [[1,1,1],[0,1,0],[0,0,0]],
	        magenta : [[0,0,1],[0,0.1,0.5],[0,0,1]],
	        yellow : [[0.2,0.2,1],[0.2,0.2,1],[0,0,0.2]],

        };

        var log2 = 1 / Math.log(2.0);
        var sin = Math.sin;
        var cos = Math.cos;
        var exp = Math.exp;
        var phi = 1.6180339887;
        function cosh(a) {
            return (exp(a) + exp(-a))/2;
        }
        function sinh(a) {
            return (exp(a) - exp(-a))/2;
        }
        function csin(x,y) {
	        return [sin(x) * cosh(y), cos(x) * sinh(y)];
        }
        function ccos(x,y) {
	        return [cos(x)*cosh(y), -sin(x)*sinh(y)];
        }
        function cexp(x,y) {
	        return [exp(x)*cos(y), exp(x)*sin(y)];
        }
        function cmul(c1,c2) {
	        return [
		        c1[0]*c2[0]-c1[1]*c2[1],
		        c1[0]*c2[1]+c1[1]*c2[0]
	        ];
        }

        var fractals = {

	        mandelbrot : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var xx = x*x, yy = y*y;
		        var lastxx, lastyy;
		        do {
			        y = (x+x)*y + y0;
			        x = xx - yy + x0;
			        yy = y*y;
			        xx = x*x;
			        if (xx+yy > er2) {

				        y = (x+x)*y + y0; // iterate once for more for smoother colors
				        x = xx - yy + x0;
				        yy = y*y;
				        xx = x*x;

				        break;
			        }
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        juliacubed : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var xx = x*x, yy = y*y;
		        do {

			        tx = x;
			        ty = y;

			        tx2 = x*x-y*y;
			        ty2 = 2*x*y;

			        x = tx2*tx-ty2*ty + 1-phi;
			        y = tx2*ty+ty2*tx + 0.3;

			        xx = x*x;
			        yy = y*y;

			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        multibrot3 : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var tx, ty, tx2, ty2;
		        var xx = x*x, yy = y*y;
		        do {
			        tx = x;
			        ty = y;
			        tx2 = xx-yy;
			        ty2 = 2*x*y;
			        x = tx2*tx-ty2*ty + x0;
			        y = tx2*ty+ty2*tx + y0;
			        xx = x*x;
			        yy = y*y;
			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        multibrot4 : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var xx = x*x, yy = y*y;
		        do {
			        y = 2*x*y;
			        x = xx - yy;
			        yy = y*y;
			        xx = x*x;
			        y = 2*x*y + y0;
			        x = xx - yy + x0;
			        yy = y*y;
			        xx = x*x;
			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        multibrot8 : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var xx = x*x, yy = y*y;
		        do {
			        y = 2*x*y;
			        x = xx - yy;
			        yy = y*y;
			        xx = x*x;
			        y = 2*x*y;
			        x = xx - yy;
			        yy = y*y;
			        xx = x*x;
			        y = 2*x*y + y0;
			        x = xx - yy + x0;
			        yy = y*y;
			        xx = x*x;
			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        burningship : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var xx = x*x, yy = y*y;
		        do {
			        y = 2*Math.abs(x*y) - y0;
			        x = xx - yy - x0;
			        yy = y*y;
			        xx = x*x;
			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        tricorn : function(x, y, it, er2) {
		        var x0 = x, y0 = y;
		        var xx = x*x, yy = y*y;
		        do {
			        y = -y;

			        y = (x+x)*y + y0;
			        x = xx - yy + x0;
			        yy = y*y;
			        xx = x*x;
			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        julia_base : function(x, y, it, er2, cr, ci) {
		        var xx = x*x, yy = y*y;
		        do {
			        y = (x+x)*y + ci;
			        x = xx - yy + cr;
			        yy = y*y;
			        xx = x*x;

			        if (xx+yy > er2) {
				        y = (x+x)*y + ci;
				        x = xx - yy + cr;
				        yy = y*y;
				        xx = x*x;

				        break;
			        }
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        julia1 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, phi - 2, phi - 1);
	        },

	        julia2 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, 1-phi, 0);
	        },

	        julia3 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, 0.285, 0);
	        },

	        julia4 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, 0.285, 0.01);
	        },

	        julia5 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, -0.835, -0.2321);
	        },

	        julia6 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, -0.7, -0.3);
	        },

	        julia7 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, 0, 1);
	        },

	        julia8 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, -0.391, -0.587);
	        },

	        julia9 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, -0.123, 0.745);
	        },

	        julia10 : function(x, y, it, er2) {
		        return fractals["julia_base"](x, y, it, er2, -0.75, 0);
	        },

	        julia11 : function(x, y, it, er2) {
		        var zr, zi;
		        var cr = 0.6;
		        var ci = 1.1;
		        var xx = x*x, yy = y*y;
		        do {
			        zr = x - (x?(x<0?-1:1):0);
			        zi = y;
			        x = cr*zr-ci*zi;
			        y = cr*zi+ci*zr;
			        yy = y*y;
			        xx = x*x;
			        if (xx+yy > er2)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        juliasine_base : function(x, y, it, er2, cr, ci) {
		        var xx = x*x, yy = y*y;
		        var z, expy, expmy;
		        var c = [cr, ci];
		        do {
			        //z = csin(x,y);
			        expy = exp(y);
			        expmy = exp(-y);
			        z = [sin(x) * (expy + expmy)/2, cos(x) * (expy - expmy)/2];

			        x = c[0]*z[0]-c[1]*z[1];
			        y = c[0]*z[1]+c[1]*z[0];

			        yy = y*y, xx = x*x;
			        if (xx+yy > 500)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        juliasine : function(x, y, it, er2) {
		        return fractals["juliasine_base"](x, y, it, er2, 1, 0.1);
	        },

	        juliasine2 : function(x, y, it, er2) {
		        return fractals["juliasine_base"](x, y, it, er2, 1, 0.3);
	        },

	        juliacosine_base : function(x, y, it, er2, cr, ci) {
		        var xx = x*x, yy = y*y;
		        var z, expy, expmy;
		        var c = [cr, ci];
		        do {
			        //z = ccos(x,y);
			        expy = exp(y);
			        expmy = exp(-y);
			        z = [cos(x) * (expy + expmy)/2, -sin(x) * (expy - expmy)/2];

			        x = c[0]*z[0]-c[1]*z[1];
			        y = c[0]*z[1]+c[1]*z[0];

			        yy = y*y, xx = x*x;
			        if (xx+yy > 500)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

	        juliacosine : function(x, y, it, er2) {
		        return fractals["juliacosine_base"](x, y, it, er2, 1, 0.6);
	        },

	        juliacosine2 : function(x, y, it, er2) {
		        return fractals["juliacosine_base"](x, y, it, er2, Math.PI/2 * 1.5, Math.PI/2 * 0.05);
	        },

	        juliacosine3 : function(x, y, it, er2) {
		        var xx = x*x, yy = y*y;
		        var z, expy, expmy;
		        var c = [1, 0.1];
		        do {
			        //z = ccos(x,y);
			        expy = exp(y);
			        expmy = exp(-y);
			        z = [cos(x) * (expy + expmy)/2, -sin(x) * (expy - expmy)/2];

			        x = c[0]*z[0]-c[1]*z[1];
			        y = c[0]*z[1]+c[1]*z[0];

			        tx = x;
			        x = -y;
			        y = tx;

			        yy = y*y, xx = x*x;
			        if (xx+yy > 500)
				        break;
		        } while(--it)
		        return {
			        it : it, x : x, y : y, xx : xx, yy : yy
		        };
	        },

        };

        // from http://www.nihilogic.dk/labs/javascript_canvas_fractals/
        function render(fncFrac, colWeights) {
	        var time = new Date().getTime();

	        ctx.fillStyle = "#000000";
	        ctx.fillRect(0,0,w,h);

	        if (imageData) {
		        var data = ctx.getImageData(0,0,w,h);
		        var pixels = data.data;
	        }

	        var mi = Math.max(startit, Math.round(Math.max(Math.log(zoom),1) * startit));
	        var itfac = 1/mi*startit

	        xmin = vx - 2/zoom;
	        xmax = vx + 2/zoom;
	        ymin = vy - 2/zoom;
	        ymax = vy + 2/zoom;

	        dx = xmax-xmin;
	        dy = ymax-ymin;

	        var px, py, it;

	        var er2 = er*er;

	        var c1, c2, c3, m;
	        var col1, col2, col3;
	        var cw0 = colWeights[0], cw1 = colWeights[1], cw2 = colWeights[2];

	        var i = (w*h)-1;
	        do {
		        var offset = i*4;

		        px = (i%w);
		        py = h-((i/w)|0);

		        var res = fncFrac(
			        xmin + px/w * dx, 
			        ymin + py/h * dy, 
			        mi, er2
		        )

		        it = mi - res.it;

		        var mag = smoothColors ? 
				        (it * itfac) - (Math.log(Math.log(res.xx+res.yy))) * log2
				        : it * itfac;

		        //if (color == "bw") {
			    //    c1 = c2 = c3 = 
				//        (res.it==mi) ? 255 : 255 - mag/startit * 255;
		        //} else {
			        if (res.it == 0)
				        continue;

			        if (mag < startit/3) {
				        m = (mag*3);
				        col1 = m * 4;
				        col2 = m * 4;
				        col3 = m * 10;
			        } else if (mag < startit/1.5) {
				        m = (mag-startit/3)*3;
				        col1 = 80 + m * 8;
				        col2 = 80 + m * 8;
				        col3 = 200 + m * 2.5;
			        } else {
				        m = (mag-2*startit/3)*3
				        col1 = 220 + m * 1.5;
				        col2 = 220 + m * 1.5;
				        col3 = 255;
			        }

			        c1 = col1*cw0[0] + col2*cw0[1] + col3*cw0[2];
			        c2 = col1*cw1[0] + col2*cw1[1] + col3*cw1[2];
			        c3 = col1*cw2[0] + col2*cw2[1] + col3*cw2[2];
		        //}

		        c1 = c1 < 0 ? 0 : c1;
		        c2 = c2 < 0 ? 0 : c2;
		        c3 = c3 < 0 ? 0 : c3;

		        c1 = c1 > 255 ? 255 : c1;
		        c2 = c2 > 255 ? 255 : c2;
		        c3 = c3 > 255 ? 255 : c3;

		        if (!imageData) {
			        ctx.fillStyle = "rgb(" + (c1|0) + "," + (c2|0) + "," + (c3|0) + ")";
			        ctx.fillRect((px|0), h-((py|0)), 1, 1);
		        } else {
			        pixels[offset] = c1;
			        pixels[offset+1] = c2;
			        pixels[offset+2] = c3;
		        }

	        } while(--i);

	        if (imageData) {
		        ctx.putImageData(data,0,0);
		        ctx.fillRect(0,0,0,0);
	        }
        };

        render(fractals[this.options.algorithm], colors[this.options.color]);
    },
    _klass: "fractal thing",
    _type: "fractal",
    _defaults: {
        width: 300,
        height: 300,
        autoscale: false,
        autoresize: true,
        keepaspectratio: true,
        algorithm: "mandelbrot",
        color: "yellow",
        smoothcolors: true,
        vx: 0.3,
        vy: 0,
        zoom: 10
    },
    _schema: {
       "type":"object",
       "description":"Fractal properties",
       "properties":{
          "width":{
             "type":"integer",
             "required":true
          },
          "height":{
             "type":"integer",
             "required":true
          },
          "autoscale":{
             "type":"boolean",
             "required":false
          }
       },
       "additionalProperties":true
    }
});

module.exports = Fractal