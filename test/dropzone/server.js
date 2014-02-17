var express = require("express");
var app = express()
var fs = require('fs');
var im = require('imagemagick');
var path = require("path")

/// Include the express body parser
app.configure(function () {
  app.use(express.bodyParser());
  app.use("/dropzone", express.static(path.join(__dirname, 'dropzone')));
});



app.get("/", function(req, res) {
	res.sendfile("index.html")
})

/// Post files
app.post('/fileupload', function(req, res) {

	fs.readFile(req.files.file.path, function (err, data) {

		var imageName = req.files.file.name

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {

		   var newPath = __dirname + "/uploads/" + imageName;

		  var thumbPath = __dirname + "/uploads/thumbs/" + imageName;

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {

		  	/// write file to uploads/thumbs folder
		  	// if file is an image:
		  	/*
			  im.resize({
				  srcPath: newPath,
				  dstPath: thumbPath,
				  width:   200
				}, function(err, stdout, stderr){
				  if (err) throw err;
				  console.log('resized image to fit within 200x200px');
				});
			*/
			   res.redirect("/");

		  });
		}
	});
});

app.listen(9999)