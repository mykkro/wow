/**
 * ## ImageUtils
 * Various image related utility functions.
 * Depends on: jQuery
 */
var ImageUtils = {
    /**
     * ## ImageUtils.checkImageUrl
     * Checks whether the URL points to an image by checking its content type.
     * @param {string} url The image URL
     * @param {function} cb Callback function(err, res)
     */
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

module.exports = ImageUtils
