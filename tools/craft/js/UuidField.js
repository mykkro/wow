/**
 * File upload field, showing drop box and saving uploaded files under their UUID.
 * Compatible with Alpaca 1.1.1
 */
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
            this.base(container, data, options, schema, view, connector, errorCallback);            
        },

        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function() {
            this.base();

            this.controlFieldTemplateDescriptor = this.view.getTemplateDescriptor("controlFieldUuid");
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function() {
            var self = this;

            this.base();

            if (self.fieldContainer) {
                self.fieldContainer.addClass('alpaca-controlfield-uuid');
            }

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
            // TODO option setting does not work!
            self.droparea.dropAnything({
                  uuid: uuid,
                  accept: self.options.accept,
                  exclude: self.options.exclude,
                  uploaded: function(data) {
                    // got uploaded file!
                    console.log("Upload to UUID field:", data)
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
            this.base(value)
            this.createDropArea(value)
        },

        /**
         * @see Alpaca.Fields.TextField#getValue
         */
        getValue: function() {
            return this.base();
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "accept": {
                        "title": "Accepted types",
                        "description": "Accepted type(s)",
                        "type": "string",
                        "default": false
                    },
                    "exclude": {
                        "title": "Excluded types",
                        "description": "Excluded type(s)",
                        "type": "string",
                        "default": false
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "accept": {
                        "type": "string"
                    },
                    "exclude": {
                        "type": "string"
                    }
                }
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