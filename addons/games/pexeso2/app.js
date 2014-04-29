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
              alert("Congratulations, you win!")
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
  init: function(cb) {
    var self = this;
    this.tilesetBaseUrl = this.getResourceUri("media/tilesets/sampleTileset/")
    this.tileBackUrl = this.tilesetBaseUrl+"assets/tileback.png"

    // create empty board...
    $(".game-container").html($("<div>").attr("id","board"))
    // load tileset...
    $.getJSON(this.tilesetBaseUrl + "metadata.json").done(function(d) {
      self.tileset = d      
      /* start with a set of cards.. */
      self.cards = []
      _.each(self.tileset.tiles, function(ttt) {
        self.cards.push({name: ttt.name, tile:null, url:ttt.url});
      })
      // callback...
      if(cb) cb()
    })

  },
  drawTile: function(tileObj, j) {
      var self = this
      var blk = function(klass, attrs) {
        return $("<div>").addClass(klass).attr(attrs||{})
      }
      var tile = blk("tile")
          .css({"background-image": "url("+this.tilesetBaseUrl + tileObj.url+")"})
      var card = blk("card").addClass("flipped").append(
        /* face */
        blk("tcf")
          .html(tile)
          .click(function() {
            if(self.cardFlipping) self.turnCardDown(j)
          }),
        /* back */
        blk("tcb")
          .css({"background-image": "url("+self.tileBackUrl+")"})
          .click(function(){
            if(self.cardFlipping) self.turnCardUp(j)
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
      this.totalCards = 10;
      /* arranged to a grid with 4 rows and 5 columns */
      this.rows = 4
      this.columns = 5
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
      /* display board */
      this.drawBoard()
      this.gridCtl = new GridController({
          width: this.columns,
          height: this.rows,
          changed: function(row, col) {
              self.updateSelection(col, row)
          },
          selected: function(row, col) {
              self.cellSelected(col, row)
          }
      })
      // call this to trigger change event to draw selection box
      this.gridCtl.select(0,0)

      // game started callback...
      if(cb) cb();    
  },
  updateSelection: function(col, row) {
    $("#board .card").removeClass("selected")
    var tile = this.playground[col+row*this.columns]
    tile.tile.addClass("selected")
  },
  cellSelected: function(col, row) {
    var tile = this.playground[col+row*this.columns]
    tile.tile.click()
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