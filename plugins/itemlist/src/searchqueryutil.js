/**
 * Example query in querystring:
 * http://localhost:9999/plugins/itemlist/index/?page=1&query=pinky+mouse&type=app|book&tags=nature|mouse&favorite=yes&itemsPerPage=6&notOlderThan=2012-01-01&newerThan=2010-09-09&withAllTags=false

 query: Object
    favorite: "yes"
    itemsPerPage: "6"
    newerThan: "2010-09-09"
    notOlderThan: "2012-01-01"
    page: "1"
    query: "pinky mouse"
    tags: "nature|mouse"
    type: "app|book"
 */
 var SearchQueryUtil = {
    getStringField: function(name, from, to) {
        if(name in from) {
            to[name] = from[name]
        }
    },

    getStringArrayField: function(name, from, to) {
        if(name in from) {
            to[name] = from[name].split("|")
        }
    },

    getIntField: function(name, from, to) {
        if(name in from) {
            to[name] = parseInt(from[name])
        }
    },

    getDateField: function(name, from, to) {
        if(name in from) {
            to[name] = new Date(from[name])
        }
    },

    getBooleanField: function(name, from, to) {
        if(name in from) {
            var bb = from[name]
            to[name] = (bb == "true" || bb == "yes" || bb == "1")
        }
    },

    getDataFromQueryObj: function(q) {
        var out = {}
        this.getStringField("query", q, out)
        this.getIntField("page", q, out)
        this.getIntField("itemsPerPage", q, out)
        this.getDateField("newerThan", q, out)
        this.getDateField("notNewerThan", q, out)
        this.getDateField("olderThan", q, out)
        this.getDateField("notOlderThan", q, out)
        this.getStringArrayField("tags", q, out)
        this.getBooleanField("withAllTags", q, out)
        this.getStringArrayField("type", q, out)
        this.getBooleanField("favorite", q, out)
        this.getBooleanField("personal", q, out)
        return out
    }
 }


module.exports = SearchQueryUtil