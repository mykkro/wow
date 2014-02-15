var tungus = require('tungus');
var mongoose = require("mongoose"),
    Schema = mongoose.Schema

// !!! does not deem to work correctly... (wuith tungus?))
// will find results which do not even pass the  filter conditions

require('mongoose-middleware').initialize(mongoose);

var
    KittehModel = mongoose.model(
        'kittehs',
        new Schema({
            birthday : { type : Date, default : Date.now },
            features : {
                color : String,
                isFurreh : Boolean
            },
            home : String,
            name : String,
            peePatches : [String]
        })
    );

/* test of pagination */
mongoose.connect('tingodb://'+__dirname+'/data', function (err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
  var options = {
      filter : {
          field : ['name', 'home', 'features.color'],
          mandatory : {
              contains : {
                  home : 'seattle'
              },
              exact : {
                  name : 'Hamish'
              }
          },
          optional : {
              contains : {
                  'features.color' : ['brindle', 'black', 'white']
              }
          }
      },
      sort : {
          desc : 'birthday',
          asc : 'name'
      },
      start : 0,
      count : 500
  };

/* kreate some kittenz! */
/*
  var kitten = new KittehModel({name: 'Kat', home:'Box', features: { color: "blue"}});
  kitten.save(function (err) {
    if(err) console.log(err);
    else console.log("Kitten saved!")
  })
*/
  KittehModel
      .find()
      .field(options)
      .keyword(options)
      .filter(options)
      .order(options)
      .page(options,
          function (err, kittehs) {
              if (!err) {
                  console.log('we haz kittehs!');
                  console.log(kittehs);
              } else {
                  console.log(err);
              }
          });

})





