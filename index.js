var markdown = require('markdown').markdown;
document.write(markdown.toHTML("Hello **World**!"))

var Db = require('tingodb')().Db,
    assert = require('assert');

/*
var db = new Db('db/sample', {});
// Fetch a collection to insert document into
var collection = db.collection("pokus");
// Insert a single document
collection.insert([{hello:'world_safe1'}
  , {hello:'world_safe2'}], {w:1}, function(err, result) {
  assert.equal(null, err);

  // Fetch the document
  collection.findOne({hello:'world_safe2'}, function(err, item) {
    assert.equal(null, err);
    assert.equal('world_safe2', item.hello);
  })
});
*/

// alert(d3)

/*
var gui = require('nw.gui');
var clipboard = gui.Clipboard.get();

// Read from clipboard
var text = clipboard.get('text');
console.log(text);

// Or write something
clipboard.set('I love node-webkit :)', 'text');

// And clear it!
clipboard.clear();
*/

var modules = {}
