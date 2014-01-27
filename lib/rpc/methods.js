module.exports = {
    hello: function(params, next) {
        /* each rpc method has two arguments: */
        /* params - a params map */
        /* next - contains two callback methods: onSuccess(result) and onFailure(error) */
        next.onSuccess({"greeting": "hello "+params.name})
    }
}
