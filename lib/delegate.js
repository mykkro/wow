// from: http://krasimirtsonev.com/blog/article/delegation-delegate-in-javascript

function delegate(scope, method) {
	if(arguments.length > 2) {
		var args = [];
		var numOfArgs = arguments.length;
		for(var i=2; i<numOfArgs; i++){
			args.push(arguments[i]);
		}
		return function() { return method.apply(scope, args); }
	} else {
		return function() { return method.call(scope); }
	}
}

module.exports = delegate