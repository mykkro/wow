module.exports = function(Widgetizer, i18n, dialogs) {

    var Base = require('basejs');

    var Panel = Base.extend({
        constructor: function(root) {
            this.root = root
            this.searchArgs = {
                page: 1
            }
            this.refreshView()
        },
        refreshView: function() {
            var self = this
            self.getItemsDB(self.searchArgs, function(err, data) {
                if (!err) self.showItems(data.result)
            })
        },
        showItems: function(data) {
            console.log("Panel.showItems", data)
            this.root.empty()
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    this.root.append(this.showItem(data[i]))
                }
            }
        },
        /**
         * @returns button jQuery/DOM element
         */
        makeRemoveButton: function(itemId, div) {
            var self = this
            return $("<button>").text("Remove").click(function() {
                self.showRemoveDialog(function() {
                    // confirmed...
                    self.removeItem(itemId, div)
                })
            })
        },
        /**
         * @returns nothing
         */
        removeItem: function(id, div) {
            // remove record from database...
            console.log("Removing item: " + id)
            this.removeItemDB(id, function(err, res) {
                if (err) console.error(err);
                else {
                    div.fadeOut("slow")
                }
            })
        },
        showRemoveDialog: function(cb) {
            dialogs.removeDialog(function(reallyRemove) {
                if (reallyRemove) cb()
            })
        },

        getItemsDB: function(args, next) {
            // to be overridden by subclasses
            next("Panel.getItemsDB: not implemented yet")
        },
        removeItemDB: function(id, next) {
            // to be overridden by subclasses...
            next("Panel.removeItemDB: not implemented yet")
        },
        showItem: function(item) {
            // to be overridden by subclasses...
            console.log("Panel.showItem", item)
            var self = this
            var out = $("<div>")
            out.append(
                $("<h3>").text(item.title),
                $("<div>").text("Created: " + item.created),
                this.makeRemoveButton(item._id, out)
            )
            return out
        }

    })

    return Panel
}
