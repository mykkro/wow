var Pexeso = Game.extend({
  // options
  cardCoupleShowDuration: 1500,

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
    this.tilesetBaseUrl = "media/tilesets/sampleTileset/"
    this.tileBackUrl = this.tilesetBaseUrl+"assets/tileback.png"

    //$.getJSON(this.tilesetBaseUrl + "metadata.json").done(function(d) {
    //  console.log("Tileset metadata loaded.")
      self.tileset = {
        "$type": "playonweb-tileset",
        "name": "sampleTileset",
        "title": "Sample Tileset",
        "version": "1.0",
        "width": 256,
        "height": 256,
        "tiles": [
          {
            "name": "tile1",
            "url": "assets/baseball_ball.png"
          },
          {
            "name": "tile2",
            "url": "assets/basketball_ball.png"
          },
          {
            "name": "tile3",
            "url": "assets/boxing_gloves.png"
          },
          {
            "name": "tile5",
            "url": "assets/football_ball.png"
          },
          {
            "name": "tile4",
            "url": "assets/volleyball_ball.png"
          },
          {
            "name": "tile6",
            "url": "assets/golf_ball.png"
          },
          {
            "name": "tile7",
            "url": "assets/hockey_iceskate.png"
          },
          {
            "name": "tile8",
            "url": "assets/motorsport_helmet.png"
          },
          {
            "name": "tile9",
            "url": "assets/skateboard.png"
          },
          {
            "name": "tile10",
            "url": "assets/soccer_ball.png"
          },
          {
            "name": "tile11",
            "url": "assets/tennis_ball.png"
          },
          {
            "name": "tile12",
            "url": "assets/tennis.png"
          },
          {
            "name": "tileBackground",
            "url": "assets/tileback.png"
          }
        ]
      }
      /* start with a set of cards.. */
      self.cards = []
      _.each(self.tileset.tiles, function(ttt) {
        self.cards.push({name: ttt.name, tile:null, url:ttt.url});
      })
      // callback...
      if(cb) cb()
//    })
    $("<div>").attr("id","board").appendTo($("#tab-game"))

  },
  start: function(cb) {
      var self = this
      /* use only first ten... */
      this.totalCards = 10;
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
      $("#board").empty()
      var blk = function(klass, attrs) {
        return $("<div>").addClass(klass).attr(attrs||{})
      }
      
      for(var i=0; i<this.playground.length; i++) {
        var tile = blk("tile")
            .css({"background-image": "url("+this.tilesetBaseUrl + this.playground[i].url+")"})
        var fun = function(){
            var j = i
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
            $("#board").append(card) 
            self.playground[j].tile = card
        };
        fun()
      }
      // game started callback...
      if(cb) cb();    
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