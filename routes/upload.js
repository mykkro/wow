module.exports = function(app, Storage, Auth, cfg) {
	var path = require("path")
	var fs = require("fs-extra")
	var merge = require("merge")
	var Downloader = require("../lib/Downloader")
    var downloader = new Downloader(cfg)
	var Importer = require("../lib/Importer")
	var importer = new Importer()
	var Uploader = require("../lib/Uploader")
	var uploader = new Uploader()

	app.get('/upload/:uuid/thumb', function(req, res) {
	  var uuid = req.params.uuid
	  uploader.get(uuid, function(err, resp) {
	    if(err) {
	      sendError(res, err)
	    } else {
	      var thumbnailUri = '/uploads/' + path.relative(Storage.uploadDir, resp.thumbnailPath)
	      res.writeHead(302, {location: thumbnailUri });
	      res.end();      
	    }
	  })
	})

	app.get('/upload/:uuid', function(req, res) {
	  var uuid = req.params.uuid
	  uploader.get(uuid, function(err, resp) {
	    if(err) {
	      sendError(res, err)
	    } else if(!resp) {
	      sendError(res, "File not found")
	    } else {      
	      res.send(withLinks(resp))
	    }
	  })
	})


	app.delete('/upload/:uuid', function(req, res) {
	  var uuid = req.params.uuid
	  uploader.remove(uuid, function(err, resp) {
	    if(err) {
	      sendError(res, err)
	    } else {
	      console.log("File deleted!", resp)
	      res.send({"deleted":uuid})
	    }
	  })
	})

	// Test it:
	// curl -F "file=@./media/golf_ball.png" localhost:9999/upload
    app.post('/upload', function(req, res) {
        var fileInfo = req.files.file
        var uuid = req.body.uuid
        uploadFile(fileInfo, uuid, res)
    })

	// Downloads file from URL and uploads it to local storage.
	// Test it:
	// curl -X POST  -H "Accept: application/json" -H "Content-Type: application/json" -d '{"url":"http://th00.deviantart.net/fs71/PRE/f/2013/191/3/b/mtg__urabrask_the_hidden_by_cryptcrawler-d39big4.jpg"}' http://localhost:9999/download
	app.post('/download', function(req, res) {
	  console.log(req.body)
	  var src = req.body.url
	  var uuid = req.body.uuid
	  downloader.download(src, function(err, fileInfo) {
	    if(err) {
	      sendError(res, err)
	      return
	    }
	    uploadFile(fileInfo, uuid, res)
	  })
	})

	app.post('/api/app/import', Auth.isAuthenticatedAsAdmin, function(req, res) {
		var ownerAdminId = parseInt(req.user.admin._id)
		var data = merge({},req.body, {ownerAdminId:ownerAdminId})
		console.log("Import: ",data)
		var uuid = data.archiveUUID
		data.archivePath = uploader.getPath(uuid, "zip")
		importer.import(data, function(err, resp) {
			if(err) {
				console.error(err)
				res.status(500);
    			res.end('error')
			} else {
				console.log(resp)
				out(res, null, resp)
			}
		})
	})


    var uploadFile = function(fileInfo, uuid, res) {
        var ext = getExtension(fileInfo.path).toLowerCase()
        var size = fileInfo.size
        if(size > cfg.allowedFilesize) {
          sendError(res, "File too big: "+size+", allowed: "+cfg.allowedFilesize)
          return
        }
        if(!(ext in cfg.allowedExtensions)) {
          sendError(res, "Unsupported file type: "+ext)
          return
        }
        // do upload...      
        console.log("server.uploadFile: Uploading "+fileInfo.name+" as "+fileInfo.path+", extension: "+ext+" size: "+size+" uuid: "+uuid)    
        uploader.copy({
            path: fileInfo.path, 
            originalFilename: fileInfo.name, 
            type: fileInfo.type,
            moveFile: true, 
            ownerAdminId: -1,
            uuid: uuid
          },
          function(err, file) {
            // console.log("server.uploadFile ended")
            if(err) {
              console.error(err)
              sendError(res, err)
              return;
            }
            res.send(withLinks({
              uuid: file.uuid,
              path: file.path,
              thumbnailPath: file.thumbnailPath,
              size: file.size,
              type: file.type,
              name: path.basename(file.path),
              originalFilename: fileInfo.originalFilename
            }));
          }
        )
    }

	//
	// Transforms path and thumbnailPath fields to uri and thumbnailUri
	// @param {object} File descriptor
	// @return {object} File descriptor with fields uri, thumbnailUri
	//
	var withLinks = function(file) {
	    var links = { 
	      uri: '/uploads/'+path.relative(Storage.uploadDir, file.path),
	      thumbnailUri: file.thumbnailPath ? '/uploads/' + path.relative(Storage.uploadDir, file.thumbnailPath) : null
	    }
	    var out = merge(links, file)
	    delete out.path
	    delete out.thumbnailPath
	    return out
	}

    function getExtension(filename) {
        var ext = path.extname(filename||'').split('.');
        return ext[ext.length - 1];
    }

	// helper function to return the results
	var out = function(res, err, rr) {
    	if(!err) {
    		res.json(rr)
    	} else {
    		console.error(err)
    		res.json({ error: err })
    	}
	}    

	var sendError = function(res, msg, details) {
	    res.send({
	      error: msg,
	      details: details
	    })
	}

}