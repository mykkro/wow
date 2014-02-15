var tungus = require('tungus');
var mongoose = require("mongoose"),
    Schema = mongoose.Schema

// from: https://github.com/edwardhotchkiss/mongoose-paginate

/**
 * @method paginate
 * @param {Object} query Mongoose Query Object
 * @param {Number} pageNumber 
 * @param {Number} resultsPerPage
 * Extend Mongoose Models to paginate queries
 **/

mongoose.Model.paginate = function(q, pageNumber, resultsPerPage, callback, options) { 
  var model = this;
  var options = options || {};
  var columns = options.columns || null;
  var sortBy = options.sortBy || {_id:1};
  callback = callback || function(){};
  
  var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;

  if(columns == null){
  var query = model.find(q).skip(skipFrom).limit(resultsPerPage).sort(sortBy);
  }else{
  var query = model.find(q).select(options.columns).skip(skipFrom).limit(resultsPerPage).sort(sortBy);
  }

  query.exec(function(error, results) {
    if (error) {
      callback(error, null, null);
    } else {
      model.count(q, function(error, count) {
        if (error) {
          callback(error, null, null);
        } else {
          var pageCount = Math.ceil(count / resultsPerPage);
          if (pageCount == 0) {
            pageCount = 1;
          };
          callback(null, pageCount, results);
        };
      });
    };
  });
};


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

/* kreate some kittenz! */
/*
  var kitten = new KittehModel({name: 'Kat', home:'Box', features: { color: "blue"}});
  kitten.save(function (err) {
    if(err) console.log(err);
    else console.log("Kitten saved!")
  })
*/
  KittehModel.paginate({name:/^ka/i}, 1, 10, function(error, pageCount, paginatedResults) {
    if (error) {
      console.error(error);
    } else {
      console.log('Pages:', pageCount);
      console.log(paginatedResults);
    }
  });

})





