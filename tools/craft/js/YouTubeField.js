(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.YouTubeField = Alpaca.Fields.TextField.extend(
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

            this.controlFieldTemplateDescriptor = this.view.getTemplateDescriptor("controlFieldYouTube");
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function() {
            var self = this;

            this.base();

            if (self.fieldContainer) {
                self.fieldContainer.addClass('alpaca-controlfield-youtube');
            }

            if(this.field) {
                $(this.field).hide()
                this.createDropArea(null)
            }

        },

        createDropArea: function(ytid) {
            var self = this
            if(this.droparea) {
                this.droparea.remove()
                this.droparea = null
            }
            self.droparea = $("<div>").addClass("dropzone").insertAfter(self.field)
            // use dropAnything plugin
            // TODO option setting does not work!
            self.droparea.dropAnything({
                  ytid: ytid,
                  youtubeOnly: true,
                  accept: 'youtubelink',
                  dropped: function(data) {
                    // got uploaded file!
                    console.log("Dropped!", data)
                    self.setValue(data.videoId)
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
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "YouTube Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "YouTube Field.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "youtube";
        }//__END_OF_BUILDER_HELPERS

    });

    Alpaca.registerMessages({
//        "wordLimitExceeded": "The maximum word limit of {0} has been exceeded."
    });

    Alpaca.registerTemplate("controlFieldYouTube", '<input type="text" class="youtubeId" id="${id}" {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each options.data}}data-${fieldId}="${value}"{{/each}}/>');
    Alpaca.registerFieldClass("youtube", Alpaca.Fields.YouTubeField);

})(jQuery);