module.exports = {
    hello: function(params, cb) {
        /* each rpc method has two arguments: */
        /* params - a params map */
        /* cb - function(error, result) */
        cb(null, {"greeting": "hello "+params.name})
    }
}
