
var Fifteen = Game.extend({
  // options
  shuffleSteps: 20,

  init: function(cb) {
    var root = this.root
    this.container = $("<div>").addClass("fifteen")
    root.html(this.container)

    if(cb) cb()

  },
  onVirtualControl: function(evt) {
    var name = evt.control
    var dirs = {right:[-1,0],left:[1,0],up:[0,1],down:[0,-1]}
    var dir = dirs[name]
    if(dir) {
      var x = this.emptyIndex&0x03
      var y = this.emptyIndex>>2
      x+= dir[0]
      y+= dir[1]
      if(x>=0 && x<4 && y>=0 && y<4) {
        var tile = this.tiles[x+4*y]
        this.tryToMoveTile(tile)
      }
    }
  },
  start: function(cb) {
    var self = this

    // reset board
    this.container.empty()
    for(var i=0; i<15;i++) {
      this.container.append($("<div>").addClass("tile tile"+(i+1)).text(""+(i+1)))
    }
    this.container.append($("<div>").addClass("tile tile16 empty").text(" "))

    var $el = this.container
    /* lay out tiles */
    self.tiles = []
    var index = 0
    /* position of empty space */
    self.emptyIndex = 0
    $el.find(".tile").each(function() {
      var $tile = $(this)
      if($tile.hasClass("empty")) self.emptyIndex = index
      var tile = {originalIndex:index,tile:$tile,empty:$tile.hasClass("empty")}
      
      $tile.click(function() {
        self.tryToMoveTile(tile) 
      });

      self.tiles.push(tile)
      index++
    })
    
    /* we can move by clicking only a tile adjacent to an empty tile */
    self.tryToMoveTile = function(tile) {
      if(tile.empty) {
        // cannot decide; must be moved by keyboard
      } else {
        for(var i=0; i<dirs.length; i++) {
          var dir = dirs[i]
          var newIndex = canMove(self.emptyIndex, dir[0], dir[1])
          if(newIndex >= 0 && (self.tiles[newIndex].originalIndex == tile.originalIndex)) {
            // empty space can trade places with this tile
            move(dir[0], dir[1], true)
            return
          }  
        }
      } 
    }
    
    var updateView = function() {
      var index = 0
      _.each(self.tiles, function(tt) {
        tt.tile.css({"position":"absolute", "left":112*(index%4)+"px","top":112*(index>>2)+"px"})
        index++
      })
    }
    
    var getTile = function(row, column) {
      return self.tiles[row*4+column];
    }

    var canMove = function(from, dx, dy) {
      var column = from%4;
      var row = from>>2;
      var newRow = row+dy;
      var newColumn = column+dx;
      return (newRow>=0 && newRow<4 && newColumn>=0 && newColumn<4) 
        ? ((newRow<<2)+newColumn)
        : -1;
    }
    
    var move = function(dx, dy, checkFinished) {
      var newIndex = canMove(self.emptyIndex, dx,dy)
      if(newIndex>=0) {
        // we can swap cells...
        var tile1 = self.tiles[self.emptyIndex]
        var tile2 = self.tiles[newIndex]
        self.tiles[self.emptyIndex] = tile2
        self.tiles[newIndex] = tile1
        self.emptyIndex = newIndex
        updateView()
        /* moved - we can test order */
        if(checkFinished && isSolved()) {
          //alertify.success("Congratulations!")
          // TODO event
          self.prompt(__("Well done!"), {}, function() {
              // restart game...
              self.start()
          })
              }
      }
    }
    var isSolved = function() {
      for(var i=0; i<self.tiles.length; i++) {
        if(self.tiles[i].originalIndex != i) return false;
      }
      return true;
    }

    var self = this
    var dirs = [[-1,0],[1,0],[0,1],[0,-1]]
    var shuffle = function() {
      var moves = self.shuffleSteps
      
      for(var i=0; i<moves; i++) {
        var dir = dirs[Math.floor(Math.random()*dirs.length)]
        move(dir[0],dir[1])
      }
      
    }
    
    updateView()
    
    shuffle()
    
    //updateView()

    if(cb) cb()
  },
  restart: function(cb) {
    this.start(cb)
  },
  quit: function(cb) {
    // cleanup...
    if(cb) cb()
  }


})