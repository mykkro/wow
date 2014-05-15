'use strict';

var Storage = require("../../lib/Storage")

module.exports = {

    '/api/info': function(req, res){
        res.json({
            "title": "wow application info",
            "application": "wow",
            "version": "0.2",
            "currentDir": process.cwd(),
            "localAppDir": Storage.appDir,
            "localUserDir": Storage.userDir,
            "platform": process.platform,
            "nodeVersions": process.versions,
            "host": req.headers.host,
            "referer": req.headers.referer,
            "user-agent": req.headers['user-agent']
        });
    }

};