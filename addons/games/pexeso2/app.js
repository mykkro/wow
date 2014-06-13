var Pexeso = Game.extend({  
  // options
  cardCoupleShowDuration: 1500,
  constructor: function(options, root, appUrl) {
      this.base(options, root, appUrl)
      console.log("Initializing Pexeso game")
  },

  //+ Jonas Raoni Soares Silva
  //@ http://jsfromhell.com/array/shuffle [v1.0]
  shuffle: function(o){ //v1.0
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  },
  howMany: function(obj) {
    var length = 0;
   for(var key in obj) length++;
   return length;
  },
  turnCardDown: function(i) {
    var card = this.playground[i]
    if(!this.foundTiles[card.name]) {
      card.tile.addClass("flipped")
      delete this.turnedCards[i];
    }
  },
  turnCardUp: function(i) {
    var cardsUp = this.howMany(this.turnedCards)
    if(cardsUp<2) {
      var card = this.playground[i]
      card.tile.removeClass("flipped")
      this.turnedCards[i] = card;
      // check cards
      this.checkCards()
    }
  },
  areCardsEqual: function() {
    var first, second;
    for(var key in this.turnedCards) {
      if(!first) first = this.turnedCards[key]
      else second = this.turnedCards[key]
    }
    return first.name == second.name ? first.name : null
  },
  checkCards: function() {
    var self = this;
    /* disable flipping by mouse */
    if(self.howMany(self.turnedCards) == 2) {
      self.cardFlipping = false
      var name;
      if(name = self.areCardsEqual()) {
        /*leave the cards in place */
        self.foundTiles[name] = name
        setTimeout(
          function() {
            for(var key in self.turnedCards) {
              self.turnedCards[key].tile.addClass("found")
            }
            self.turnedCards = {}
            if(self.howMany(self.foundTiles) == self.totalCards) {
              self.levelUp()
            } else {
              /* enable flipping */
              self.cardFlipping = true
            }
          }, self.cardCoupleShowDuration);
      } else {
        setTimeout(
          function() {
            for(var key in self.turnedCards) {
              self.turnCardDown(key)
            }
            /* enable flipping */
            self.cardFlipping = true
          }, self.cardCoupleShowDuration);
      }
    } 
  },
  levelUp: function() {
    var self = this
    self.finished = true
    self.finishedPrompt = self.levelUpPrompt(function() {
        // quit the game...
        console.log("Finished the level!")
        self.finished = false
        self.finishedPrompt = null
        if(self.onFinished) {
            self.onFinished()
        }
    })
  },
  init: function(cb) {
    var self = this;
    var tilesetName = "animals" // "sports"
    this.tilesetBaseUrl = this.getResourceUri("media/tilesets/"+tilesetName+"/")

    // create empty board...
    $(".game-container").html($("<div>").attr("id","board"))
    // load tileset...
    $.getJSON(this.tilesetBaseUrl + "metadata.json").done(function(d) {
      self.tileset = d      
      self.tileBackUrl = self.tilesetBaseUrl+d.tiles.backgrounds[0].url
      /* start with a set of cards.. */
      self.cards = []
      _.each(self.tileset.tiles.game, function(ttt) {
        self.cards.push({name: ttt.name, tile:null, url:ttt.url});
      })
      // callback...
      if(cb) cb()
    })

  },
  getTile: function(row, col) {
    return this.playground[col+row*this.columns]
  },
  toggleTile: function(row, col) {
    var tile = this.getTile(row, col)
    var ndx = row*this.columns + col
    this.gridCtl.select(row, col)
    if(this.cardFlipping) {
      if(tile.tile.hasClass("flipped")) {
        this.turnCardUp(ndx)
      } else {
        this.turnCardDown(ndx)
      }
    }
  },
  drawTile: function(tileObj, j) {
      var self = this
      var blk = function(klass, attrs) {
        return $("<div>").addClass(klass).attr(attrs||{})
      }
      var cardSize = this.cardSize-8
      var row = Math.floor(j/this.columns)
      var col = j%this.columns
      var tile = blk("tile")
          .css({"background-image": "url("+this.tilesetBaseUrl + tileObj.url+")"})
      var card = blk("card").css({"width":cardSize+"px", "height":cardSize+"px"}).addClass("flipped").append(
        /* face */
        blk("tcf")
          .html(tile)
          .click(function() {
            self.toggleTile(row, col)
          }),
        /* back */
        blk("tcb")
          .css({"background-image": "url("+self.tileBackUrl+")"})
          .click(function(){
            self.toggleTile(row, col)
          })
      )
      return card
  },
  drawBoard: function() {
      $("#board").empty()
      for(var i=0; i<this.playground.length; i++) {
          var card = this.drawTile(this.playground[i], i)
          $("#board").append(card) 
          this.playground[i].tile = card
      }
  },
  start: function(cb) {
      var self = this
      /* use only first ten... */
      this.totalCards = this.tileset.count;
      var tilesCnt = 2 * this.totalCards
      /* arranged to a grid with 4 rows and 5 columns */
      this.cardSize = Math.floor(Math.sqrt(600*450/tilesCnt))
      this.columns = Math.floor(600/this.cardSize)
      this.rows = Math.ceil(tilesCnt/this.columns)
      // alert("Rows="+this.rows+", columns="+this.columns)
      this.playground = []
      this.turnedCards = {}
      this.foundTiles = {}
      this.cardFlipping = true
      /* deal up cards */
      for(var i=0; i<this.totalCards; i++) {
        this.playground.push(this.cards[i])
        this.playground.push($.extend({},this.cards[i]))
      }
      /* shuffle... */
      this.playground = this.shuffle(this.playground);
      console.log(this.playground);
      this.gridCtl = new GridController({
          width: this.columns,
          height: this.rows,
          changed: function(row, col) {
              self.updateSelection(row, col)
          },
          selected: function(row, col) {
              self.cellSelected(row, col)
          }
      })
      /* display board */
      this.drawBoard()
      // call this to trigger change event to draw selection box
      this.gridCtl.select(0,0)

      // game started callback...
      if(cb) cb();    
  },
  isGameOver: function() {
    return false
  },
  isFinished: function() {
    return this.finished
  },
  onVirtualControl: function(evt) {
    if(this.gridCtl) {
      if(this.isGameOver()) {
          if(evt.type=="press" && evt.control=="select") {
              // kill prompt...
              this.gameOverPrompt.hide()
          }
      } else if(this.isFinished()) {
          if(evt.type=="press" && evt.control=="select") {
              // kill prompt...
              this.finishedPrompt.hide()
          }
      } else {
          this.gridCtl.onVirtualControl(evt)
      }
    }
  },
  updateSelection: function(row, col) {
    $("#board .card").removeClass("selected")
    var tile = this.getTile(row, col)
    // console.log("TILE: ", tile, row, col, this.playground)
    tile.tile.addClass("selected")
  },
  cellSelected: function(row, col) {
    this.toggleTile(row, col)
  },
  restart: function(cb) {
    this.start(cb)
  },
  quit: function(cb) {
    // cleanup...
    $("#board").empty()
    if(cb) cb()
  }


})