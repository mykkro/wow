/**
 * MyClass
 */
var MyClass = Base.extend({
	/**
	 * @param a int An integer
	 * @param b string A name
	 * @param c object Anything
	 */
	constructor: function(a, b, c) {

	},
	hello: function(name) {
		return "Hello "+name
	},
	add: function(x, y) {
		return x+y
	}

})

module.exports = MyClass