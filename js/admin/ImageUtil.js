var ImageUtil = {
	checkImageUrl: function(url, cb) {
        $.ajax({
            type: "HEAD",
            url: url,
            success: function(message, text, response) {
                cb(response.getResponseHeader('Content-Type').indexOf("image") != -1)
            },
            error: function() {
                cb()
            }
        })
    }
}

module.exports = ImageUtil