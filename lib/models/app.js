module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	var AppSchema = Schema({
	    name: String
	  , title: String
	  , description: String
	  , version: String
	  , imported: Date
	})
	return {
		App: mongoose.model('App', AppSchema)
	}
}
