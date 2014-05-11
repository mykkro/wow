(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.UuidField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.UuidField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Uuid control for selecting files.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            console.log("UUID field: constructor")
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function() {
            console.log("UUID field: setup")
            this.base();

            this.controlFieldTemplateDescriptor = this.view.getTemplateDescriptor("controlFieldUuid");
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {
            console.log("UUID field: postRender")

            var self = this;

            this.base(function() {
                console.log("UUID field: after postRender")

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-uuid');
                }
                callback(); // the droparea stuff should be here - but this is never called!
            });

            if(this.field) {
                $(this.field).hide()
                this.createDropArea(null)
            }

        },

        createDropArea: function(uuid) {
            var self = this
            if(this.droparea) {
                this.droparea.remove()
                this.droparea = null
            }
            self.droparea = $("<div>").addClass("dropzone").insertAfter(self.field)
            // use dropAnything plugin
            self.droparea.dropAnything({
                  uuid: uuid,
                  uploaded: function(data) {
                    // got uploaded file!
                    var uuid = data.uuid
                    self.setValue(uuid)
                    return false
                  }
            })  
        },

        /**
         * @see Alpaca.ControlField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();
/*
            var valInfo = this.validation;

            var status =  this._validateWordCount();
            valInfo["wordLimitExceeded"] = {
                "message": status ? "" : Alpaca.substituteTokens(this.view.getMessage("wordLimitExceeded"), [this.options.wordlimit]),
                "status": status
            };
*/
            return baseStatus // && valInfo["wordLimitExceeded"]["status"];
        },


        /**
         *@see Alpaca.Fields.TextField#setValue
         */
        setValue: function(value) {
            console.log("Uuid field: setValue: ",value)
            $(this.field).val(value);
            this.createDropArea(value)

            // be sure to call into base method
            this.base(value);
        },

        /**
         * @see Alpaca.Fields.TextField#getValue
         */
        getValue: function() {
            return $(this.field).val();
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                /*
                "properties": {
                    "rows": {
                        "title": "Rows",
                        "description": "Number of rows",
                        "type": "number",
                        "default": 5
                    },
                    "cols": {
                        "title": "Columns",
                        "description": "Number of columns",
                        "type": "number",
                        "default": 40
                    },
                    "wordlimit": {
                        "title": "Word Limit",
                        "description": "Limits the number of words allowed in the text area.",
                        "type": "number",
                        "default": -1
                    }
                }
                */
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                /*
                "fields": {
                    "rows": {
                        "type": "integer"
                    },
                    "cols": {
                        "type": "integer"
                    },
                    "wordlimit": {
                        "type": "integer"
                    }
                }
                */
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "UUID Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "UUID Field.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "uuid";
        }//__END_OF_BUILDER_HELPERS

    });

    Alpaca.registerMessages({
//        "wordLimitExceeded": "The maximum word limit of {0} has been exceeded."
    });

    Alpaca.registerTemplate("controlFieldUuid", '<input type="text" class="uuid" id="${id}" {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each options.data}}data-${fieldId}="${value}"{{/each}}/>');
    Alpaca.registerFieldClass("uuid", Alpaca.Fields.UuidField);

})(jQuery);