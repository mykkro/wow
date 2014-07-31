
   $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move", onmove: null, ondrag: null}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
			    var top = e.pageY + pos_y - drg_h
				var left = e.pageX + pos_x - drg_w
				if(opt.onmove) {
					console.log("Moving mouse", left, top, pos_x, pos_y, drg_w, drg_h)
					opt.onmove({x:left, y:top})
				}
                $('.draggable').offset({
                    top:top,
                    left:left
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
			if(opt.ondrag) {
				console.log("Dragging ended")
				opt.ondrag()
			}
        });

    }

var SplitImage = Game.extend({

  init: function(cb) {
    var self = this
	var root = this.root
	
	var opts = {
		"image": "media/friends.svg",
		"gridrows": 3,
		"gridcols": 3,
		"imagewidth": 400,
		"imageheight": 400
	}
	
	// we have a div (this.root) in which we can create contents
	
	var stageWidth = 770
	var stageHeight = 480
	
	var cont = $("<div>").css("width",stageWidth).css("height",stageHeight).css("background-color", "#efd").css("position", "relative")
	this.root.html(
		cont
	)
	var stageWidth = $(cont).width()
	var stageHeight = $(cont).height()
	console.log(stageWidth, stageHeight)
	
	var imageFill = 0.6
	var imageSize = Math.floor(Math.min(stageWidth, stageHeight) * imageFill)
	var tileWidth = imageSize / opts.gridcols
	var tileHeight = imageSize / opts.gridrows
	var tileXOffset = (stageWidth - imageSize)/2
	var tileYOffset = (stageHeight - imageSize)/2
	
	for(var i=0; i<opts.gridrows; i++) {
		for(var j=0; j<opts.gridcols; j++) {
			// add grid tile
			var tile = $("<div>").css("position", "absolute")
			var tileX = tileXOffset + j*tileWidth
			var tileY = tileYOffset + i*tileHeight
			tile.css("width", tileWidth+"px")
			tile.css("height", tileHeight+"px")
			tile.css("left", tileX)
			tile.css("top", tileY)
			tile.css("background-color", ((i+j)%2)?"cyan":"blue")
			cont.append(tile)
		}
	}

	var gridTiles = []
	
	var testPoint = function(x, y) {
		var dist = 20
		for(var i=0; i<gridTiles.length; i++) {
			var t = gridTiles[i]
			var cx = t.x + t.width/2
			var cy = t.y + t.height/2
			// put test here... 
			if(Math.abs(x-cx)<dist && Math.abs(y-cy<dist)) {
				return gridTiles[i]
			}
		}
		return null
	}
	
	
	for(var i=0; i<opts.gridrows; i++) {
		for(var j=0; j<opts.gridcols; j++) {
			// add grid tile
			var tile = $("<div>").css("position", "absolute")
			var tileX = tileXOffset + j*tileWidth
			var tileY = tileYOffset + i*tileHeight
			tile.css("width", tileWidth+"px")
			tile.css("height", tileHeight+"px")
			tile.css("left", tileX)
			tile.css("top", tileY)
			tile.css("background-image", "url("+self.appUrl+"/"+opts.image+")")
			var dx = -Math.round(j*tileWidth)
			var dy = -Math.round(i*tileHeight)
			console.log(dx, dy)
			tile.css("background-color", "#aaa")
			tile.css("background-position", dx+"px "+ dy+"px")
			tile.css("background-size", imageSize+"px "+imageSize+"px")
			cont.append(tile)
			$(tile).drags({
				onmove: function(x, y) {
					console.log("Moved!", x, y)
				},
				ondrag: function() {
					console.log("Dragged!")
				}
			})
			var newX = Math.floor(Math.random() * (stageWidth - tileWidth))
			var newY = Math.floor(Math.random() * (stageHeight - tileHeight))
			tile.css("left", newX+"px")
			tile.css("top", newY+"px")
			gridTiles.push({
				x: newX,
				y: newY,
				width: tileWidth,
				height: tileHeight,
				element: tile
			})
		}
	}
	
	console.log(gridTiles)
	
    if(cb) cb()
  },
  start: function(cb) {
    this.running = true
    if(cb) cb()
  },
  stop: function(cb) {
    this.running = false
    //if(this.promptStart) this.promptStart.hide()
    if(this.promptQuit) this.promptQuit.hide()
    if(cb) cb()
  },
  quit: function(cb) {
    this.stop(cb)
  },
  pause: function(cb) {
    this.paused = true
    this.base(cb)
  },
  resume: function(cb) {
    this.paused = false
    this.base(cb)
  }


})