var Raphatris = Game.extend({

  init: function(cb) {
    var self = this
    var root = this.root
    self.state = 0
    self.timerSpeed = 700
    self.paused = false
    self.s = 23
    self.stageW = 10
    self.stageH = 21
    self.stage = null
    self.preview = null
    self.bmp = null
    self.blox = null
    self.pid = null
    self.pcount = 1
    self.linecnt = 0
    self.score = 0
    self.next = null
    self.px = 0
    self.py = 0
    self.defpx = Math.floor(self.stageW/2)
    self.defpy = 2
    this.container = $("<div>").attr("id", "paper")
    root.html(this.container)
    self.paper = Raphael("paper", 700, 484)
    self.colors = ["red", "blue", "green", "orange", "cyan", "yellow", "purple", "#666"]
    self.bricks = [
              [[-1,0],[0,0],[1,0],[2,0]],
              [[-1,0],[0,0],[1,0],[0,1]],
              [[-1,0],[0,0],[1,0],[1,1]],
              [[-1,0],[0,0],[1,0],[-1,1]],
              [[-1,0],[0,0],[0,1],[1,1]],
              [[-1,1],[0,1],[0,0],[1,0]],
              [[0,0],[0,1],[1,0],[1,1]]
          ]

    
      self.blocksToRemove = {}
      self.started = false

      var continued
      
      var init = function() {
          self.blox = {}
          self.score = 0
          self.log("score", self.score)
          self.linecnt = 0
          self.pid = null
          self.next = null
          // background
          self.drawBrick(0, 0, self.stageW, self.stageH).attr("fill","#ccc")
          self.drawBrick(2+self.stageW, 0, 5, 5).attr("fill", "#ccc")
          self.stage = self.paper.set()
          self.preview = self.paper.set()
          self.nextBlock()
          self.bmp_update()
      },
      go = function(s) {
          switch(s) {
              case 0: //"init"
                  init()                
                  //self.promptStart = self.prompt(__("Click to start"), {}, function() {
                    self.started = true
                  //})
                  //started = false
                  return 1
              case 1: //"start" - waiting for S key...
                  if(self.started) {
                      return 6
                  } else return 1
              case 2: //"drop"
                  return self.moveMe(0,1) ? 2 : 3
              case 3: //"select"
                  // add player block to bitmap
                  self.pid = null
                  self.bmp_update()
                  self.blocksToRemove = self.scanLines()
                  if(self.blocksToRemove) {
                      self.selectBlocks(self.blocksToRemove)
                      self.draw()
                      return 4
                  } else {
                      return 6
                  }
              case 4: //"remove"
                  self.killBlocks(self.blocksToRemove, {})
                  self.draw()
                  return 5
              case 5: //"fall"
                  if(self.fallBlocks()) {
                      self.draw()
                      return 5
                  } else return 3
              case 6: //"summon":
                  if(self.summon()) {
                      self.draw()
                      return 2
                  } else {
                      self.promptQuit = self.prompt(__("Game over"), {}, function() {
                        continued = true
                      })
                      continued = false
                      return 7
                  } 
              case 7: //"gameover" - waiting for pressing key...
                  if(continued) {
                      self.stage.remove()
                      self.preview.remove()
                      continued = false;
                      return 0
                  } else return 7
          }
      }
                  
      tick = function() {
        if(self.running) {
          if(!self.paused) {
            console.log("Tick!")
            self.state = go(self.state)
          }
          self.clock = setTimeout(tick, self.timerSpeed)
        }
      }

      self.clock = null
      self.tick = tick

      if(cb) cb()
  },
  onVirtualControl: function(evt) {
      var self = this
      if(self.state == 2) {
        var name = evt.control
        switch (name) {
              case "select": // space
                  // drop
                  while(self.moveMe(0,1)) {}
                  break;
          case "up":
                  // rotate left
                  self.rotateMe()
            break;
          case "down":
                  // rotate right
                  self.rotateMe()
                  self.rotateMe()
                  self.rotateMe()
            break;
          case "left":
                  // move left
                  self.moveMe(-1,0);
            break;
          case "right":
                  // move right
                  self.moveMe(1,0);
            break;
        }
      }
  },
  /* summon new brick to be controlled by player */
  summon: function() {
      var self = this
      var block = self.next
      block = self.moved(block, self.defpx, self.defpy)
      if(self.canPut(block, null)) {
          self.pid = self.pcount++
          self.blox[self.pid] = block
          self.px = self.defpx
          self.py = self.defpy
          self.nextBlock()
          return block
      } 
  },
  alterMe: function(brick) {
      var self = this
      if(self.canPut(brick, self.pid)) {
          self.blox[self.pid] = brick
          self.draw()        
          return true
      }
  },
  moveMe: function(dx, dy) {
      var self = this
      if(self.alterMe(self.moved(self.blox[self.pid], dx, dy))) {                
          self.px += dx;
          self.py += dy;
          return true
      }
  },
  rotateMe: function() {
      var self = this
      return self.alterMe(self.moved(self.rotated(self.moved(self.blox[self.pid], -self.px, -self.py)), self.px, self.py))
  },
  nextBlock: function() {
      var self = this
      self.next = {"color": self.rand(self.colors), "bricks": self.rand(self.bricks) }
      var rot = self.rnd(4)
      for(var i=0; i<rot; i++) self.next = self.rotated(self.next)
      // draw preview...
      if(self.preview) self.preview.remove()
      self.preview = self.drawBlock(self.moved(self.next, 2, 2)).transform("T" + (self.stageW+3)*self.s + " " + self.s)
  },
  scanLines: function() {
      var self = this
      var lines = self.fullLines()
      self.linecnt += lines
      self.score += lines.length*10
      self.log("score", self.score)            
      var brix = self.bricksOnLines(lines);
      if(!self.isEmpty(brix)) {
          var newBricks = {}
          for(var id in brix) self.explode(self.blox[id], newBricks)
          self.killBlocks(brix, newBricks)
          return self.bricksOnLines(lines);
      }
  },
  fallBlocks: function() {
      var self = this
      // try to move blocks by 1 down
      var bl = $.extend({}, self.blox)
      var changed=false
      var anyFallen=false
      do {
          changed = false
          for(var id in bl) {
              var blk = self.moved(bl[id], 0, 1)
              if(self.canPut(blk, id)) {
                  // replace block...
                  self.blox[id] = blk
                  self.bmp_update()
                  delete bl[id]
                  changed = true
                  anyFallen = true
              }
          }
      } while(changed)
      return anyFallen
  },
  selectBlocks: function(blocks) {
      for(var key in blocks) this.blox[key].color="gold"
  },
  // removes blocks specified by idmap blocksToRemove 
  // optionally adds blocks contained in array newBlocks
  killBlocks: function(blocksToRemove, newBlocks) {
      var self = this
      var blocks = 0
      for(var key in blocksToRemove) {
        delete self.blox[key]
        blocks++
      }
      for(var key in newBlocks) self.blox[key] = newBlocks[key]
      self.bmp_update();
  },
  bmp_update: function() {
      var self = this
      self.bmp = new Array(self.stageW*self.stageH)
      for(var key in self.blox) 
          if(key != self.pid) {
              self.blox[key].bricks.forEach(function(pos) {
                  self.bmp[pos[0]+self.stageW*pos[1]] = key;
              })
          }
  },
  fullLines: function() {
      var lines = []
      for(var i=0; i<this.stageH; i++) {
          for(var j=0; j<this.stageW; j++) 
              if(!this.bmp_get(j, i)) break
          if(j == this.stageW) lines.push(i)
      }
      return lines;
  },
  bricksOnLines: function(lines) {
      var 
          ww = this.stageW,
          brix = {}
      for(var i=0; i<lines.length; i++) {
          var row = lines[i]
          for(var col=0; col<ww; col++) {
              var id = this.bmp_get(col, row)
              if(id) brix[id] = id;
          }
      }
      return brix
  },
  isEmpty: function(obj) {
    return Object.keys(obj).length === 0;
  },
  canPut: function(b, i) {
      if(!this.checkWalls(b)) {
          var bb = b.bricks;
          for(var j=0; j<bb.length; j++) {
              var pos = bb[j]
              var value = this.bmp_get(pos[0], pos[1])
              if(value != i && value) return false;
          }
          return true;
      } 
  },
  bmp_get: function(x, y) {
      return this.bmp[this.stageW*y + x]
  },
  checkWalls: function(b) {
      var self = this
      return b.bricks.some(function(pos) {
        return self.isOutside(pos)
      })
  },
  // returns true if the brick is out of stage
  isOutside: function(pos) {
      var x = pos[0], y = pos[1]
      return x<0 || x>=this.stageW || y<0 || y>=this.stageH
  },
  // creates array of exploded bricks
  explode: function(b, out) {
    var self = this
      b.bricks.forEach(function(br) {
          out[self.pcount++] = {"color": b.color, "bricks": [br] }
      })
      return out
  },
  draw: function() {            
      var st = this.emptySet(this.stage)
      // draw blocks...
      for(var key in this.blox) {
        st.push(this.drawBlock(this.blox[key]))
      }
      st.transform("T" + this.s + " " + this.s)
      return st
  },     
  drawBlock: function(block) {
      var self = this
      var st = this.paper.set()
      block.bricks.forEach(function(pos) {
          st.push(self.drawBrick(pos[0]-1, pos[1]-1));
      })
      return st.attr("fill", block.color)
  },
  drawBrick: function(x, y, w, h) {
      w = w || 1
      h = h || 1
      return this.paper.rect(x*this.s, y*this.s, w*this.s, h*this.s)
  },

  rnd: function(n) {
      return Math.floor(n*Math.random())
  },
  rand: function(arr) {
      return arr[this.rnd(arr.length)]
  },
  rotated: function(block) {
      return this.transformed(block, function(pos) { return [-pos[1], pos[0]]; })    
  },
  moved: function(block, dx, dy) {    
      return this.transformed(block, function(pos) { return [pos[0]+dx, pos[1]+dy]; })    
  },
  transformed: function(block, fun) {
      return { "color": block.color, "bricks": block.bricks.map(fun) }
  },
  emptySet: function(st) {
      while(st.length) st.splice(0,1).remove()
      return st
  },

  // options: handler, delay, name
  startClock: function(options) {
      var delay = options.delay
      var fun = options.handler
      var clockId = setInterval(fun, delay)
      return clockId
  },
  stopClock: function(clockId) {
    clearInterval(clockId)
  },
  start: function(cb) {
    this.state = 0
    this.running = true
    this.tick()
    if(cb) cb()
  },
  stop: function(cb) {
    this.running = false
    if(this.clock) {
      clearTimeout(this.clock)
      this.clock = null
    }
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