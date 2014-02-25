
var Fifteen = Game.extend({
  // options
  shuffleSteps: 20,

  init: function(cb) {

    this.container = $("<div>").addClass("fifteen").appendTo($("#tab-game"))

    if(cb) cb()

  },
  start: function(cb) {

    // reset board
    this.container.empty()
    for(var i=0; i<15;i++) {
      this.container.append($("<div>").addClass("tile tile"+(i+1)).text(""+(i+1)))
    }
    this.container.append($("<div>").addClass("tile tile16 empty").text(" "))

    var $el = this.container
    /* lay out tiles */
    var tiles = []
    var index = 0
    /* position of empty space */
    var emptyIndex = 0
    $el.find(".tile").each(function() {
      var $tile = $(this)
      if($tile.hasClass("empty")) emptyIndex = index
      var tile = {originalIndex:index,tile:$tile,empty:$tile.hasClass("empty")}
      
      $tile.click(function() {
        tryToMoveTile(tile) 
      });

      tiles.push(tile)
      index++
    })
    
    /* we can move by clicking onli a tile adjacent to an empty tile */
    var tryToMoveTile = function(tile) {
      if(tile.empty) {
        // cannot decide; must be moved by keyboard
      } else {
        for(var i=0; i<dirs.length; i++) {
          var dir = dirs[i]
          var newIndex = canMove(emptyIndex, dir[0], dir[1])
          console.log(newIndex)
          console.log(newIndex>=0?tiles[newIndex]:"")
          console.log(tile)
          if(newIndex >= 0 && (tiles[newIndex].originalIndex == tile.originalIndex)) {
            // empty space can trade places with this tile
            move(dir[0], dir[1], true)
            return
          }  
        }
      } 
    }
    
    var updateView = function() {
      var index = 0
      _.each(tiles, function(tt) {
        tt.tile.css({"position":"absolute", "left":112*(index%4)+"px","top":112*(index>>2)+"px"})
        index++
      })
    }
    
    var getTile = function(row, column) {
      return tiles[row*4+column];
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
      var newIndex = canMove(emptyIndex, dx,dy)
      if(newIndex>=0) {
        // we can swap cells...
        var tile1 = tiles[emptyIndex]
        var tile2 = tiles[newIndex]
        tiles[emptyIndex] = tile2
        tiles[newIndex] = tile1
        emptyIndex = newIndex
        updateView()
        /* moved - we can test order */
        if(checkFinished && isSolved()) {
          alertify.success("Congratulations!")
          // TODO event
        }
      }
    }
    var isSolved = function() {
      for(var i=0; i<tiles.length; i++) {
        if(tiles[i].originalIndex != i) return false;
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
    
    console.log(tiles)

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