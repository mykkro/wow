var Raphatris = Game.extend({

  init: function(cb) {
    var self = this
    self.state = 0
    self.timerSpeed = 500

    var paperDiv = $("<div>").attr("id", "paper").appendTo($("#tab-game"))
      var 
          paper = Raphael("paper", 700, 450),
          s = 20,
          colors = ["red", "blue", "green", "orange", "cyan", "yellow", "purple", "#666"],
          bricks = [
              [[-1,0],[0,0],[1,0],[2,0]],
              [[-1,0],[0,0],[1,0],[0,1]],
              [[-1,0],[0,0],[1,0],[1,1]],
              [[-1,0],[0,0],[1,0],[-1,1]],
              [[-1,0],[0,0],[0,1],[1,1]],
              [[-1,1],[0,1],[0,0],[1,0]],
              [[0,0],[0,1],[1,0],[1,1]]
          ],

          rnd = function(n) {
              return Math.floor(n*Math.random())
          },

          rand = function(arr) {
              return arr[rnd(arr.length)]
          },

          rotated = function(block) {
              return transformed(block, function(pos) { return [-pos[1], pos[0]]; })    
          },

          moved = function(block, dx, dy) {    
              return transformed(block, function(pos) { return [pos[0]+dx, pos[1]+dy]; })    
          },

          transformed = function(block, fun) {
              return { "color": block.color, "bricks": block.bricks.map(fun) }
          },

          emptySet = function(st) {
              while(st.length) st.splice(0,1).remove()
              return st
          },

          stageW = 10,
          stageH = 21,
          pcount = 1, 
          blox, score, linecnt, bmp, pid, next, stage, preview, px, py, defpx=Math.floor(stageW/2), defpy=2,
          blocksToRemove = {},
          started,

      init = function() {
          blox = {}
          score = 0
          linecnt = 0
          pid = null
          next = null
          // background
          drawBrick(1, 1, stageW, stageH).attr("fill","#ccc")
          drawBrick(3+stageW, 1, 5, 5).attr("fill", "#ccc")
          stage = paper.set()
          preview = paper.set()
          nextBlock()
          bmp_update()
      },
      draw = function() {            
          var st = emptySet(stage)
          // draw blocks...
          for(var key in blox) 
              st.push(drawBlock(blox[key]))
          st.transform("T" + s + " " + s)
          return st
      },     
      drawBlock = function(block) {
          var st = paper.set()
          block.bricks.forEach(function(pos) {
              st.push(drawBrick(pos[0], pos[1]));
          })
          return st.attr("fill", block.color)
      },
      drawBrick = function(x, y, w, h) {
          w = w || 1
          h = h || 1
          return paper.rect(x*s, y*s, w*s, h*s)
      },
      // creates array of exploded bricks
      explode = function(b, out) {
          b.bricks.forEach(function(br) {
              out[pcount++] = {"color": b.color, "bricks": [br] }
          })
          return out
      },
      // returns true if the brick is out of stage
      isOutside = function(pos) {
          var x = pos[0], y = pos[1]
          return x<0 || x>=stageW || y<0 || y>=stageH
      },
      checkWalls = function(b) {
          return b.bricks.some(isOutside)
      },
      canPut = function(b, i) {
          if(!checkWalls(b)) {
              var bb = b.bricks;
              for(var j=0; j<bb.length; j++) {
                  var pos = bb[j]
                  var value = bmp_get(pos[0], pos[1])
                  if(value != i && value) return false;
              }
              return true;
          } 
      },
      bmp_update = function() {
          bmp = new Array(stageW*stageH)
          for(var key in blox) 
              if(key != pid) {
                  blox[key].bricks.forEach(function(pos) {
                      bmp[pos[0]+stageW*pos[1]] = key;
                  })
              }
      },
      bmp_get = function(x, y) {
          return bmp[stageW*y + x]
      },
      fullLines = function() {
          var lines = []
          for(var i=0; i<stageH; i++) {
              for(var j=0; j<stageW; j++) 
                  if(!bmp_get(j, i)) break
              if(j == stageW) lines.push(i)
          }
          return lines;
      },
      bricksOnLines = function(lines) {
          var 
              ww = stageW,
              brix = {}
          for(var i=0; i<lines.length; i++) {
              var row = lines[i]
              for(var col=0; col<ww; col++) {
                  var id = bmp_get(col, row)
                  if(id) brix[id] = id;
              }
          }
          return brix
      },
      isEmpty = function(obj) {
        return Object.keys(obj).length === 0;
      },
      scanLines = function() {
          var lines = fullLines()
          linecnt += lines
          score += lines.length*10
          var brix = bricksOnLines(lines);
          if(!isEmpty(brix)) {
              var newBricks = {}
              for(var id in brix) explode(blox[id], newBricks)
              killBlocks(brix, newBricks)
              return bricksOnLines(lines);
          }
      },
      // removes blocks specified by idmap blocksToRemove 
      // optionally adds blocks contained in array newBlocks
      killBlocks = function(blocksToRemove, newBlocks) {
          for(var key in blocksToRemove) delete blox[key]
          for(var key in newBlocks) blox[key] = newBlocks[key]
          bmp_update();
      },
      selectBlocks = function(blocks) {
          for(var key in blocks) blox[key].color="gold"
      },
      fallBlocks = function() {
          // try to move blocks by 1 down
          var bl = $.extend({}, blox)
          var changed=false
          var anyFallen=false
          do {
              changed = false
              for(var id in bl) {
                  var blk = moved(bl[id], 0, 1)
                  if(canPut(blk, id)) {
                      // replace block...
                      blox[id] = blk
                      bmp_update()
                      delete bl[id]
                      changed = true
                      anyFallen = true
                  }
              }
          } while(changed)
          return anyFallen
      },
      nextBlock = function() {
          next = {"color": rand(colors), "bricks": rand(bricks) }
          var rot = rnd(4)
          for(var i=0; i<rot; i++) next = rotated(next)
          // draw preview...
          if(preview) preview.remove()
          preview = drawBlock(moved(next, 2, 2)).transform("T" + (stageW+3)*s + " " + s)
      },
      /* summon new brick to be controlled by player */
      summon = function() {
          var block = next
          block = moved(block, defpx, defpy)
          if(canPut(block, null)) {
              pid = pcount++
              blox[pid] = block
              px = defpx
              py = defpy
              nextBlock()
              return block
          } 
      },
      alterMe = function(brick) {
          if(canPut(brick, pid)) {
              blox[pid] = brick
              draw()        
              return true
          }
      },
      moveMe = function(dx, dy) {
          if(alterMe(moved(blox[pid], dx, dy))) {                
              px += dx;
              py += dy;
              return true
          }
      },
      rotateMe = function() {
          return alterMe(moved(rotated(moved(blox[pid], -px, -py)), px, py))
      },
      go = function(s) {
          switch(s) {
              case 0: //"init"
                  init()                
                  self.promptStart = self.prompt("Click to start", {}, function() {
                    started = true
                  })
                  started = false
                  return 1
              case 1: //"start" - waiting for S key...
                  if(started) {
                      return 6
                  } else return 1
              case 2: //"drop"
                  return moveMe(0,1) ? 2 : 3
              case 3: //"select"
                  // add player block to bitmap
                  pid = null
                  bmp_update()
                  blocksToRemove = scanLines()
                  if(blocksToRemove) {
                      selectBlocks(blocksToRemove)
                      draw()
                      return 4
                  } else {
                      return 6
                  }
              case 4: //"remove"
                  killBlocks(blocksToRemove, {})
                  draw()
                  return 5
              case 5: //"fall"
                  if(fallBlocks()) {
                      draw()
                      return 5
                  } else return 3
              case 6: //"summon":
                  if(summon()) {
                      draw()
                      return 2
                  } else {
                      self.promptQuit = self.prompt("Game over", {}, function() {
                        continued = true
                      })
                      continued = false
                      return 7
                  } 
              case 7: //"gameover" - waiting for pressing key...
                  if(continued) {
                      stage.remove()
                      preview.remove()
                      continued = false;
                      return 0
                  } else return 7
          }
      }
                  
      tick = function() {
        if(self.running) {
          console.log("Tick!")
          self.state = go(self.state)
          setTimeout(tick, self.timerSpeed)
        }
      }

      self.tick = tick

      
      $('body').keydown(function (e) {
          if(self.state == 2) {
            switch (e.which) {
                  case 32: // space
                      // drop
                      while(moveMe(0,1)) {}
                      break;
              case 38:
                      // rotate left
                      rotateMe()
                break;
              case 40:
                      // rotate right
                      rotateMe()
                      rotateMe()
                      rotateMe()
                break;
              case 37:
                      // move left
                      moveMe(-1,0);
                break;
              case 39:
                      // move right
                      moveMe(1,0);
                break;
            }
          }
      });
                              
      if(cb) cb()
  },
  start: function(cb) {
    this.state = 0
    this.running = true
    this.tick()
    if(cb) cb()
  },
  stop: function(cb) {
    this.running = false
    if(this.promptStart) this.promptStart.hide()
    if(this.promptQuit) this.promptQuit.hide()
    if(cb) cb()
  },
  quit: function(cb) {
    this.stop(cb)
  }


})