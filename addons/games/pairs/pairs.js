


define(['base', 'jquery'], function(Base, $) {

var tilesetBaseUrl = "../../media/tilesets/sampleTileset/"
var tileBackUrl = tilesetBaseUrl+"assets/tileback.png"

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

$.getJSON(tilesetBaseUrl + "metadata.json").done(function(d) {
  console.log("Tileset metadata loaded.")
  console.log(d)
  /* start with a set of cards.. */
  var cards = []
  _.each(d.tiles, function(ttt) {
    cards.push({name: ttt.name, tile:null, url:ttt.url});
  })
  /* use only first ten... */
  var totalCards = 10;
  var playground = []
  var turnedCards = {}
  var cardFlipping = true
  /* deal up cards */
  for(var i=0; i<totalCards; i++) {
    playground.push(cards[i])
    playground.push($.extend({},cards[i]))
  }
  /* shuffle... */
  playground = shuffle(playground);
  console.log(playground);
  /* display board */
  $("#board").empty()
  var blk = function(klass, attrs) {
    return $("<div>").addClass(klass).attr(attrs||{})
  }
  
  for(var i=0; i<playground.length; i++) {
    var tile = blk("tile")
        .css({"background-image": "url("+tilesetBaseUrl + playground[i].url+")"})
    var fun = function(){
        var j = i
        var card = blk("card").addClass("flipped").append(
          /* face */
          blk("tcf")
            .html(tile)
            .click(function() {
              if(cardFlipping) turnCardDown(j)
            }),
          /* back */
          blk("tcb")
            .css({"background-image": "url("+tileBackUrl+")"})
            .click(function(){
              if(cardFlipping) turnCardUp(j)
            })
        )
        $("#board").append(card) 
        playground[j].tile = card
    };
    fun()
  }
  
  function howMany(obj) {
    var length = 0;
   for(var key in obj) length++;
   return length;
  }
  
  var cardCoupleShowDuration = 1500;
  
  var foundTiles = {}
  
  function checkCards() {
    /* disable flipping by mouse */
    if(howMany(turnedCards) == 2) {
      cardFlipping = false
      var name;
      if(name = areCardsEqual()) {
        /*leave the cards in place */
        foundTiles[name] = name
        setTimeout(
          function() {
            for(var key in turnedCards) {
              turnedCards[key].tile.addClass("found")
            }
            turnedCards = {}
            if(howMany(foundTiles) == totalCards) {
              alert("Congratulations, you win!")
            } else {
              /* enable flipping */
              cardFlipping = true
            }
          }, cardCoupleShowDuration);
      } else {
        setTimeout(
          function() {
            for(var key in turnedCards) {
              turnCardDown(key)
            }
            /* enable flipping */
            cardFlipping = true
          }, cardCoupleShowDuration);
      }
    } 
  }
  
  function areCardsEqual() {
    var first, second;
    for(var key in turnedCards) {
      if(!first) first = turnedCards[key]
      else second = turnedCards[key]
    }
    return first.name == second.name ? first.name : null
  }
  
  function turnCardUp(i) {
    var cardsUp = howMany(turnedCards)
    console.log(cardsUp)
    if(cardsUp<2) {
      var card = playground[i]
      card.tile.removeClass("flipped")
      turnedCards[i] = card;
      // check cards
      checkCards()
    }
    console.log(turnedCards)
  }
  
  function turnCardDown(i) {
    var card = playground[i]
    if(!foundTiles[card.name]) {
      card.tile.addClass("flipped")
      delete turnedCards[i];
      console.log(turnedCards)
    }
  }

})



	return {
		init: function(root, $data) {
			console.log($data)
	        return $data;
		}
	}
});

