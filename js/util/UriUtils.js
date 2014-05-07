/**
 * ## UriUtils
 * Miscellaneous URI-related functions.
 */
var UriUtils = {
	/**
	 * ## UriUtils.ext
	 * Get URI extension.
	 * @param  {string} url An URI to decode.
	 * @return {string} Extension of the given URI
	 */
	ext: function(url) {
        return (url = url.substr(1 + url.lastIndexOf("/")).split('?')[0]).substr(url.lastIndexOf("."))
    }
}

module.exports = UriUtils