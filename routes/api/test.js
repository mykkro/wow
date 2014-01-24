'use strict';

module.exports = {

    '/api/test': function(req, res){
        res.send("It's subpage of my app. It use GET method.");
    }

};