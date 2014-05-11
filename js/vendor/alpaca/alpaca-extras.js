/*!
Alpaca Version 1.1.2

Copyright 2013 Gitana Software, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance with the License. 

You may obtain a copy of the License at 
	http://www.apache.org/licenses/LICENSE-2.0 

Unless required by applicable law or agreed to in writing, software 
distributed under the License is distributed on an "AS IS" BASIS, 
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
See the License for the specific language governing permissions and 
limitations under the License. 

For more information, please contact Gitana Software, Inc. at this
address:

  info@gitanasoftware.com
*/
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.AddressField = Alpaca.Fields.ObjectField.extend(
    /**
     * @lends Alpaca.Fields.AddressField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.ObjectField
         *
         * @class A combo field for rendering a standard US address. It also comes up with support for Google Map
         * which would requires including Google Map JS file for the form that uses this class.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector,errorCallback) {
            this.base(container, data, options, schema, view, connector,errorCallback);
        },

        /**
         * @private
         * @see Alpaca.Fields.ObjectField#setup
         */
        setup: function() {
            this.base();

            this.schema = {
                "title": "Home Address",
                "type": "object",
                "properties": {
                    "street": {
                        "title": "Street",
                        "type": "array",
                        "items": {
                            "type": "string",
                            "maxLength": 30,
                            "minItems": 0,
                            "maxItems": 3
                        }
                    },
                    "city": {
                        "title": "City",
                        "type": "string"
                    },
                    "state": {
                        "title": "State",
                        "type": "string",
                        "enum": ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]
                    },
                    "zip": {
                        "title": "Zip Code",
                        "type": "string",
                        "pattern": /^(\d{5}(-\d{4})?)?$/
                    }
                }
            };
            Alpaca.merge(this.options, {
                "fields": {
                    "zip": {
                        "maskString": "99999",
                        "size": 5
                    },
                    "state": {
                        "optionLabels": ["ALABAMA", "ALASKA", "AMERICANSAMOA", "ARIZONA", "ARKANSAS", "CALIFORNIA", "COLORADO", "CONNECTICUT", "DELAWARE", "DISTRICTOFCOLUMBIA", "FEDERATEDSTATESOFMICRONESIA", "FLORIDA", "GEORGIA", "GUAM", "HAWAII", "IDAHO", "ILLINOIS", "INDIANA", "IOWA", "KANSAS", "KENTUCKY", "LOUISIANA", "MAINE", "MARSHALLISLANDS", "MARYLAND", "MASSACHUSETTS", "MICHIGAN", "MINNESOTA", "MISSISSIPPI", "MISSOURI", "MONTANA", "NEBRASKA", "NEVADA", "NEWHAMPSHIRE", "NEWJERSEY", "NEWMEXICO", "NEWYORK", "NORTHCAROLINA", "NORTHDAKOTA", "NORTHERNMARIANAISLANDS", "OHIO", "OKLAHOMA", "OREGON", "PALAU", "PENNSYLVANIA", "PUERTORICO", "RHODEISLAND", "SOUTHCAROLINA", "SOUTHDAKOTA", "TENNESSEE", "TEXAS", "UTAH", "VERMONT", "VIRGINISLANDS", "VIRGINIA", "WASHINGTON", "WESTVIRGINIA", "WISCONSIN", "WYOMING"]
                    }
                }
            });

            if (Alpaca.isEmpty(this.options.addressValidation)) {
                this.options.addressValidation = true;
            }
        },

        /**
         * Returns address in a single line string.
         *
         * @returns {String} Address as a single line string.
         */
        getAddress: function() {
            var value = this.getValue();
            if (this.view.type == "view") {
                value = this.data;
            }
            var address = "";
            if (value) {
                if (value.street) {
                    $.each(value.street, function(index, value) {
                        address += value + " ";
                    });
                }
                if (value.city) {
                    address += value.city + " ";
                }
                if (value.state) {
                    address += value.state + " ";
                }
                if (value.zip) {
                    address += value.zip;
                }
            }
            return address;
        },

        /**
         * @see Alpaca.Field#renderField
         */
        renderField: function(onSuccess) {

            var self = this;

            this.base(function() {

                // apply additional css
                $(self.fieldContainer).addClass("alpaca-addressfield");

                if (self.options.addressValidation && !self.isDisplayOnly()) {
                    $('<div style="clear:both;"></div>').appendTo(self.fieldContainer);
                    var mapButton = $('<div class="alpaca-form-button">Google Map</div>').appendTo(self.fieldContainer);
                    if (mapButton.button) {
                        mapButton.button({
                            text: true
                        });
                    }
                    mapButton.click(
                        function() {
                            if (google && google.maps) {
                                var geocoder = new google.maps.Geocoder();
                                var address = self.getAddress();
                                if (geocoder) {
                                    geocoder.geocode({
                                        'address': address
                                    }, function(results, status) {
                                        if (status == google.maps.GeocoderStatus.OK) {
                                            var mapCanvasId = self.getId() + "-map-canvas";
                                            if ($('#' + mapCanvasId).length === 0) {
                                                $("<div id='" + mapCanvasId + "' class='alpaca-controlfield-address-mapcanvas'></div>").appendTo(self.fieldContainer);
                                            }
                                            var map = new google.maps.Map(document.getElementById(self.getId() + "-map-canvas"), {
                                                "zoom": 10,
                                                "center": results[0].geometry.location,
                                                "mapTypeId": google.maps.MapTypeId.ROADMAP
                                            });
                                            var marker = new google.maps.Marker({
                                                map: map,
                                                position: results[0].geometry.location
                                            });
                                        } else {
                                            self.displayMessage("Geocoding failed: " + status);
                                        }
                                    });
                                }
                            } else {
                                self.displayMessage("Google Map API is not installed.");
                            }
                        }).wrap('<small/>');

                    if (self.options.showMapOnLoad)
                    {
                        mapButton.click();
                    }
                }

                if (onSuccess) {
                    onSuccess();
                }
            });

        },//__BUILDER_HELPERS

        /**
         * @see Alpaca.Field#isContainer
         */
        isContainer: function() {
            return false;
        },

        /**
         * @private
         * @see Alpaca.Fields.ObjectField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "validateAddress": {
                        "title": "Address Validation",
                        "description": "Enable address validation if true",
                        "type": "boolean",
                        "default": true
                    },
                    "showMapOnLoad": {
                        "title": "Whether to show the map when first loaded",
                        "type": "boolean"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.ObjectField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "validateAddress": {
                        "helper": "Address validation if checked",
                        "rightLabel": "Enable Google Map for address validation?",
                        "type": "checkbox"
                    }
                }
            });
        },
        /**
         * @see Alpaca.Fields.ObjectField#getTitle
         */
        getTitle: function() {
            return "Address";
        },

        /**
         * @see Alpaca.Fields.ObjectField#getDescription
         */
        getDescription: function() {
            return "Standard US Address with Street, City, State and Zip. Also comes with support for Google map.";
        },

        /**
         * @see Alpaca.Fields.ObjectField#getType
         */
        getType: function() {
            return "any";
        },

        /**
         * @see Alpaca.Fields.ObjectField#getFieldType
         */
        getFieldType: function() {
            return "address";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("address", Alpaca.Fields.AddressField);
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.DateField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.DateField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Date control for JSON schema date format.
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

            if (!this.options.dateFormat) {
                this.options.dateFormat = Alpaca.defaultDateFormat;
            }
            if (!this.options.dateFormatRegex) {
                this.options.dateFormatRegex = Alpaca.regexps.date;
            }
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.field && $.datepicker)
                {
                    var datePickerOptions = self.options.datepicker;
                    if (!datePickerOptions)
                    {
                        datePickerOptions = {
                            "changeMonth": true,
                            "changeYear": true
                        };
                    }
                    if (!datePickerOptions.dateFormat)
                    {
                        datePickerOptions.dateFormat = self.options.dateFormat;
                    }
                    self.field.datepicker(datePickerOptions);

                    if (self.fieldContainer) {
                        self.fieldContainer.addClass('alpaca-controlfield-date');
                    }
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Field#onChange
         */
        onChange: function(e) {
            this.base();
            this.refreshValidationState();
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

            var status = this._validateDateFormat();
            valInfo["invalidDate"] = {
                "message": status ? "" : Alpaca.substituteTokens(this.view.getMessage("invalidDate"), [this.options.dateFormat]),
                "status": status
            };

            return baseStatus && valInfo["invalidDate"]["status"];
        },

        /**
         * Validates date format.
         * @returns {Boolean} True if it is a valid date, false otherwise.
         */
        _validateDateFormat: function() {
            var value = this.field.val();

            if ($.datepicker) {
                try {
                    $.datepicker.parseDate(this.options.dateFormat, value);
                    return true;
                } catch(e) {
                    return false;
                }
            } else {
                //validate the date without the help of datepicker.parseDate
                return value.match(this.options.dateFormatRegex);
            }
        },

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val) {
            // skip out if no date
            if (val === "") {
                this.base(val);
                return;
            }

            this.base(val);
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
                        "default":"date",
                        "enum" : ["date"],
                        "readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "format": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "dateFormat": {
                        "title": "Date Format",
                        "description": "Date format",
                        "type": "string",
                        "default": Alpaca.defaultDateFormat
                    },
                    "dateFormatRegex": {
                        "title": "Format Regular Expression",
                        "description": "Regular expression for validation date format",
                        "type": "string",
                        "default": Alpaca.regexps.date
                    },
                    "datepicker": {
                        "title": "Date Picker options",
                        "description": "Optional configuration to be passed to jQuery UI DatePicker control",
                        "type": "any"
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
                    "dateFormat": {
                        "type": "text"
                    },
                    "dateFormatRegex": {
                        "type": "text"
                    },
                    "datetime": {
                        "type": "any"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Date Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Date Field.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "date";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerMessages({
        "invalidDate": "Invalid date for format {0}"
    });
    Alpaca.registerFieldClass("date", Alpaca.Fields.DateField);
    Alpaca.registerDefaultFormatFieldMapping("date", "date");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.DatetimeField = Alpaca.Fields.TextField.extend(
        /**
         * @lends Alpaca.Fields.DatetimeField.prototype
         */
        {
            /**
             * @constructs
             * @augments Alpaca.Fields.ObjectField
             *
             * @class A combo field for rendering a standard US range. It also comes up with support for Google Map
             * which would requires including Google Map JS file for the form that uses this class.
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
            /**
             * @private
             * @see Alpaca.Fields.ObjectField#setup
             */
            setup: function() {
                this.base();
            },

            /**
             * @see Alpaca.Fields.TextField#postRender
             */
            postRender: function(callback) {

                var self = this;

                this.base(function() {

                    if (self.field)
                    {
                        if (self.field.datetimepicker) {
                            self.field.hover(function() {
                                if (!$(this).hasClass('hasDatepicker')) {

                                    var timePickerOptions = self.options.timepicker;
                                    if (!timePickerOptions)
                                    {
                                        timePickerOptions = self.options.timepicker;
                                    }
                                    if (!timePickerOptions)
                                    {
                                        timePickerOptions = {
                                            "changeYear": true,
                                            "changeMonth": true
                                        };
                                    }
                                    $(this).datetimepicker(timePickerOptions);
                                }
                            });
                            if (self.fieldContainer) {
                                self.fieldContainer.addClass('alpaca-controlfield-datetime');
                            }
                        }
                    }

                    callback();

                });
            },

            /**
             *@see Alpaca.Fields.TextField#setValue
             */
            setValue: function(value) {
                if (value) {
                    if (Alpaca.isNumber()) {
                        value = new Date(value);
                    }
                    if (Object.prototype.toString.call(value) == "[object Date]") {
                        this.base((value.getMonth() + 1) + "/" + value.getDate() + "/" + value.getFullYear() + " " + value.getHours() + ":" + value.getMinutes());
                    } else {
                        this.base(value);
                    }
                } else {
                    this.base(value);
                }
            },

            /**
             * @see Alpaca.Fields.TextField#getValue
             */
            getValue: function() {
                return this.base();
            },

            /**
             * Returns field value in datetime.
             *
             * @returns {Date} Field value.
             */
            getDatetime: function() {
                try {
                    return this.field.datetimepicker('getDate');
                } catch (e) {
                    return this.getValue();
                }
            },//__BUILDER_HELPERS

            /**
             * @private
             * @see Alpaca.ControlField#getSchemaOfOptions
             */
            getSchemaOfOptions: function() {
                return Alpaca.merge(this.base(), {
                    "properties": {
                        "timepicker": {
                            "title": "Timepicker options",
                            "description": "Options that are supported by the <a href='http://trentrichardson.com/examples/timepicker/'>jQuery timepicker addon</a>.",
                            "type": "any"
                        }
                    }
                });
            },

            /**
             * @private
             * @see Alpaca.ControlField#getOptionsForOptions
             */
            getOptionsForOptions: function() {
                return Alpaca.merge(this.base(), {
                    "fields": {
                        "timepicker": {
                            "type": "any"
                        }
                    }
                });
            },

            /**
             * @see Alpaca.Fields.TextField#getTitle
             */
            getTitle: function() {
                return "Datetime Field";
            },

            /**
             * @see Alpaca.Fields.TextField#getDescription
             */
            getDescription: function() {
                return "Datetime Field based on Trent Richardson's <a href='http://trentrichardson.com/examples/timepicker/'>jQuery timepicker addon</a>.";
            },

            /**
             * @see Alpaca.Fields.TextField#getFieldType
             */
            getFieldType: function() {
                return "datetime";
            }//__END_OF_BUILDER_HELPERS
        });

    Alpaca.registerFieldClass("datetime", Alpaca.Fields.DatetimeField);

    // "datetime" is legacy (pre v4 schema)
    Alpaca.registerDefaultFormatFieldMapping("datetime", "datetime");

    // official v4 uses date-time
    Alpaca.registerDefaultFormatFieldMapping("date-time", "datetime");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.EditorField = Alpaca.Fields.TextField.extend(
        /**
         * @lends Alpaca.Fields.EditorField.prototype
         */
        {
            /**
             * @constructs
             * @augments Alpaca.Fields.TextField
             *
             * @class Textarea control for chunk of text.
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

                this.controlFieldTemplateDescriptor = this.view.getTemplateDescriptor("controlFieldEditor");
            },

            /**
             * @see Alpaca.Fields.TextField#postRender
             */
            postRender: function(callback) {

                var self = this;

                this.base(function() {

                    if (self.fieldContainer)
                    {
                        self.fieldContainer.addClass('alpaca-controlfield-editor');

                        // set field container parent width = 100%
                        $(self.fieldContainer).parent().css("width", "100%");

                        // ACE HEIGHT
                        var aceHeight = self.options.aceHeight;
                        if (aceHeight)
                        {
                            $(self.fieldContainer).css("height", aceHeight);
                        }

                        // ACE WIDTH
                        var aceWidth = self.options.aceWidth;
                        if (!aceWidth) {
                            aceWidth = "100%";
                        }
                        $(self.fieldContainer).css("width", aceWidth);
                    }

                    // locate where we will insert the editor
                    var el = $(self.fieldContainer).find(".control-field-editor-el")[0];

                    // ace must be included ahead of time
                    if (!ace && window.ace) {
                        ace = window.ace;
                    }

                    if (!ace)
                    {
                        Alpaca.logError("Editor Field is missing the 'ace' Cloud 9 Editor");
                    }
                    else
                    {
                        self.editor = ace.edit(el);

                        // theme
                        var aceTheme = self.options.aceTheme;
                        if (!aceTheme) {
                            aceTheme = "ace/theme/chrome";
                        }
                        self.editor.setTheme(aceTheme);

                        // mode
                        var aceMode = self.options.aceMode;
                        if (!aceMode) {
                            aceMode = "ace/mode/json";
                        }
                        self.editor.getSession().setMode(aceMode);

                        self.editor.renderer.setHScrollBarAlwaysVisible(false);
                        //this.editor.renderer.setVScrollBarAlwaysVisible(false); // not implemented
                        self.editor.setShowPrintMargin(false);

                        // set data onto editor
                        self.editor.setValue(self.data);
                        self.editor.clearSelection();

                        // clear undo session
                        self.editor.getSession().getUndoManager().reset();

                        // FIT-CONTENT the height of the editor to the contents contained within
                        if (self.options.aceFitContentHeight)
                        {
                            var heightUpdateFunction = function() {

                                var first = false;
                                if (self.editor.renderer.lineHeight === 1)
                                {
                                    first = true;
                                    self.editor.renderer.lineHeight = 16;
                                }

                                // http://stackoverflow.com/questions/11584061/
                                var newHeight = self.editor.getSession().getScreenLength() * self.editor.renderer.lineHeight + self.editor.renderer.scrollBar.getWidth();

                                $(self.fieldContainer).height(newHeight.toString() + "px");

                                // This call is required for the editor to fix all of
                                // its inner structure for adapting to a change in size
                                self.editor.resize();

                                if (first)
                                {
                                    window.setTimeout(function() {
                                        self.editor.clearSelection();
                                    }, 5);
                                }
                            };

                            // Set initial size to match initial content
                            heightUpdateFunction();

                            // Whenever a change happens inside the ACE editor, update
                            // the size again
                            self.editor.getSession().on('change', heightUpdateFunction);
                        }

                        // READONLY
                        if (self.schema.readonly)
                        {
                            self.editor.setReadOnly(true);
                        }

                        // if the editor's dom element gets destroyed, make sure we clean up the editor instance
                        // normally, we expect Alpaca fields to be destroyed by the destroy() method but they may also be
                        // cleaned-up via the DOM, thus we check here.
                        $(el).bind('destroyed', function() {

                            if (self.editor) {
                                self.editor.destroy();
                                self.editor = null;
                            }
                        });
                    }

                    callback();
                });

            },

            /**
             * @see Alpaca.Field#destroy
             */
            destroy: function() {

                // destroy the editor instance
                if (this.editor)
                {
                    this.editor.destroy();
                    this.editor = null;
                }

                // call up to base method
                this.base();
            },

            /**
             * @return the ACE editor instance
             */
            getEditor: function()
            {
                return this.editor;
            },

            /**
             * @see Alpaca.ControlField#handleValidate
             */
            handleValidate: function() {
                var baseStatus = this.base();

                var valInfo = this.validation;

                var wordCountStatus =  this._validateWordCount();
                valInfo["wordLimitExceeded"] = {
                    "message": wordCountStatus ? "" : Alpaca.substituteTokens(this.view.getMessage("wordLimitExceeded"), [this.options.wordlimit]),
                    "status": wordCountStatus
                };

                var editorAnnotationsStatus = this._validateEditorAnnotations();
                valInfo["editorAnnotationsExist"] = {
                    "message": editorAnnotationsStatus ? "" : this.view.getMessage("editorAnnotationsExist"),
                    "status": editorAnnotationsStatus
                };

                return baseStatus && valInfo["wordLimitExceeded"]["status"] && valInfo["editorAnnotationsExist"]["status"];
            },

            _validateEditorAnnotations: function() {

                if (this.editor)
                {
                    var annotations = this.editor.getSession().getAnnotations();
                    if (annotations && annotations.length > 0)
                    {
                        return false;
                    }
                }

                return true;
            },

            /**
             * Validate for word limit.
             *
             * @returns {Boolean} True if the number of words is equal to or less than the word limit.
             */
            _validateWordCount: function() {

                if (this.options.wordlimit && this.options.wordlimit > -1)
                {
                    var val = this.editor.getValue();

                    if (val)
                    {
                        var wordcount = val.split(" ").length;
                        if (wordcount > this.options.wordlimit)
                        {
                            return false;
                        }
                    }
                }

                return true;
            },

            /**
             * Force editor to resize to ensure it gets drawn correctly.
             * @override
             */
            onDependentReveal: function()
            {
                if (this.editor)
                {
                    this.editor.resize();
                }
            },

            /**
             *@see Alpaca.Fields.TextField#setValue
             */
            setValue: function(value) {

                var self = this;

                if (this.editor)
                {
                    this.editor.setValue(value);
                }

                // be sure to call into base method
                this.base(value);
            },

            /**
             * @see Alpaca.Fields.TextField#getValue
             */
            getValue: function() {

                var value = null;

                if (this.editor)
                {
                    value = this.editor.getValue();
                }

                return value;
            },//__BUILDER_HELPERS

            /**
             * @private
             * @see Alpaca.Fields.TextField#getSchemaOfOptions
             */
            getSchemaOfOptions: function() {
                return Alpaca.merge(this.base(), {
                    "properties": {
                        "aceTheme": {
                            "title": "ACE Editor Theme",
                            "description": "Specifies the theme to set onto the editor instance",
                            "type": "string",
                            "default": "ace/theme/twilight"
                        },
                        "aceMode": {
                            "title": "ACE Editor Mode",
                            "description": "Specifies the mode to set onto the editor instance",
                            "type": "string",
                            "default": "ace/mode/javascript"
                        },
                        "aceWidth": {
                            "title": "ACE Editor Height",
                            "description": "Specifies the width of the wrapping div around the editor",
                            "type": "string",
                            "default": "100%"
                        },
                        "aceHeight": {
                            "title": "ACE Editor Height",
                            "description": "Specifies the height of the wrapping div around the editor",
                            "type": "string",
                            "default": "300px"
                        },
                        "aceFitContentHeight": {
                            "title": "ACE Fit Content Height",
                            "description": "Configures the ACE Editor to auto-fit its height to the contents of the editor",
                            "type": "boolean",
                            "default": false
                        },
                        "wordlimit": {
                            "title": "Word Limit",
                            "description": "Limits the number of words allowed in the text area.",
                            "type": "number",
                            "default": -1
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
                        "aceTheme": {
                            "type": "text"
                        },
                        "aceMode": {
                            "type": "text"
                        },
                        "wordlimit": {
                            "type": "integer"
                        }
                    }
                });
            },

            /**
             * @see Alpaca.Fields.TextField#getTitle
             */
            getTitle: function() {
                return "Editor";
            },

            /**
             * @see Alpaca.Fields.TextField#getDescription
             */
            getDescription: function() {
                return "Editor";
            },

            /**
             * @see Alpaca.Fields.TextField#getFieldType
             */
            getFieldType: function() {
                return "editor";
            }//__END_OF_BUILDER_HELPERS

        });

    Alpaca.registerMessages({
        "wordLimitExceeded": "The maximum word limit of {0} has been exceeded.",
        "editorAnnotationsExist": "The editor has errors in it that must be corrected"
    });

    Alpaca.registerTemplate("controlFieldEditor", '<div id="${id}" class="control-field-editor-el"></div>');
    Alpaca.registerFieldClass("editor", Alpaca.Fields.EditorField);

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.EmailField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.EmailField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for JSON schema email format.
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

            if (!this.schema.pattern) {
                this.schema.pattern = Alpaca.regexps.email;
            }
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (this.fieldContainer) {
                    this.fieldContainer.addClass('alpaca-controlfield-email');
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

            if (!valInfo["invalidPattern"]["status"]) {
                valInfo["invalidPattern"]["message"] = this.view.getMessage("invalidEmail");
            }

            return baseStatus;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            var pattern = (this.schema && this.schema.pattern) ? this.schema.pattern : Alpaca.regexps.email;
            return Alpaca.merge(this.base(), {
                "properties": {
                    "pattern": {
                        "title": "Pattern",
                        "description": "Field Pattern in Regular Expression",
                        "type": "string",
                        "default": pattern,
                        "enum":[pattern],
                        "readonly": true
                    },
                    "format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
                        "default":"email",
                        "enum":["email"],
                        "readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "format": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Email Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Email Field.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "email";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerMessages({
        "invalidEmail": "Invalid Email address e.g. info@cloudcms.com"
    });
    Alpaca.registerFieldClass("email", Alpaca.Fields.EmailField);
    Alpaca.registerDefaultFormatFieldMapping("email", "email");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.IntegerField = Alpaca.Fields.NumberField.extend(
    /**
     * @lends Alpaca.Fields.IntegerField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.NumberField
         *
         * @class Control for integers. If jQuery UI is enabled, it can also be
         * turned into a slider.
         *<p>
         * The following additional JSON Schema properties are supported:
         *<p/>
         *<code>
         *     <pre>
         * {
         *    minimum: {number},
         *    maximum: {number},
         *    minimumCanEqual: {boolean},
         *    maximumCanEqual: {boolean},
         *    divisibleBy: {number}
         * }
         * </pre>
         * </code>
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
         * @see Alpaca.Fields.NumberField#getValue
         */
        getValue: function() {
            var textValue = this.field.val();
            if (Alpaca.isValEmpty(textValue)) {
                return -1;
            } else {
                return parseInt(textValue, 10);
            }
        },

        /**
         * @see Alpaca.Field#onChange
         */
        onChange: function(e) {
            this.base();
            if (this.slider) {
                this.slider.slider("value", this.getValue());
            }
        },

        /**
         * @see Alpaca.Fields.NumberField#postRender
         */
        postRender: function(callback)
        {
            var self = this;

            this.base(function() {

                if (self.options.slider) {
                    if (!Alpaca.isEmpty(self.schema.maximum) && !Alpaca.isEmpty(self.schema.minimum)) {

                        if (self.field)
                        {
                            self.field.after('<div id="slider"></div>');
                            self.slider = $('#slider', self.field.parent()).slider({
                                value: self.getValue(),
                                min: self.schema.minimum,
                                max: self.schema.maximum,
                                slide: function(event, ui) {
                                    self.setValue(ui.value);
                                    self.refreshValidationState();
                                }
                            });
                        }
                    }
                }

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-integer');
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Fields.NumberField#handleValidate
         */
        handleValidate: function() {

            var baseStatus = this.base();

            var valInfo = this.validation;

            if (!valInfo["stringNotANumber"]["status"]) {
                valInfo["stringNotANumber"]["message"] = this.view.getMessage("stringNotAnInteger");
            }

            return baseStatus;
        },

        /**
         * Validates if it is an integer.
         * @returns {Boolean} true if it is an integer
         */
        _validateNumber: function() {
            var textValue = this.field.val();

            if (Alpaca.isValEmpty(textValue)) {
                return true;
            }

            var floatValue = this.getValue();

            // quick check to see if what they entered was a number
            if (isNaN(floatValue)) {
                return false;
            }

            // check if valid number format
            if (!textValue.match(Alpaca.regexps.integer)) {
                return false;
            }

            return true;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "minimum": {
                        "title": "Minimum",
                        "description": "Minimum value of the property.",
                        "type": "integer"
                    },
                    "maximum": {
                        "title": "Maximum",
                        "description": "Maximum value of the property.",
                        "type": "integer"
                    },
                    "divisibleBy": {
                        "title": "Divisible By",
                        "description": "Property value must be divisible by this number.",
                        "type": "integer"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "minimum": {
                        "helper": "Minimum value of the field.",
                        "type": "integer"
                    },
                    "maximum": {
                        "helper": "Maximum value of the field.",
                        "type": "integer"
                    },
                    "divisibleBy": {
                        "helper": "Property value must be divisible by this number.",
                        "type": "integer"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "slider": {
                        "title": "Slider",
                        "description": "Generate jQuery UI slider control with the field if true.",
                        "type": "boolean",
                        "default": false
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "slider": {
                        "rightLabel": "Slider control ?",
                        "helper": "Generate slider control if selected.",
                        "type": "checkbox"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.NumberField#getTitle
         */
        getTitle: function() {
            return "Integer Field";
        },

        /**
         * @see Alpaca.Fields.NumberField#getDescription
         */
        getDescription: function() {
            return "Field for integers.";
        },

        /**
         * @see Alpaca.Fields.NumberField#getType
         */
        getType: function() {
            return "integer";
        },

        /**
         * @see Alpaca.Fields.NumberField#getFieldType
         */
        getFieldType: function() {
            return "integer";
        }//__END_OF_BUILDER_HELPERS
    });

    // Additional Registrations
    Alpaca.registerMessages({
        "stringNotAnInteger": "This value is not an integer."
    });
    Alpaca.registerFieldClass("integer", Alpaca.Fields.IntegerField);
    Alpaca.registerDefaultSchemaFieldMapping("integer", "integer");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.IPv4Field = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.IPv4Field.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for JSON schema ip-address format.
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
            
            if (!this.schema.pattern) {
                this.schema.pattern = Alpaca.regexps.ipv4;
            }
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-ipv4');
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();
            
            var valInfo = this.validation;
            
            if (!valInfo["invalidPattern"]["status"]) {
                valInfo["invalidPattern"]["message"] = this.view.getMessage("invalidIPv4");
            }
            
            return baseStatus;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            var pattern = (this.schema && this.schema.pattern)? this.schema.pattern : Alpaca.regexps.ipv4;
            return Alpaca.merge(this.base(), {
                "properties": {
                    "pattern": {
                        "title": "Pattern",
                        "description": "Field Pattern in Regular Expression",
                        "type": "string",
                        "default": pattern,
                        "readonly": true
                    },                    
					"format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
                        "enum": ["ip-address"],
						"default":"ip-address",
						"readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
		getOptionsForSchema: function() {
            return Alpaca.merge(this.base(),{
				"fields": {
					"format": {
						"type": "text"
					}
				}
			});
        },
        
        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "IP Address Field";
        },
        
        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "IP Address Field.";
        },

		/**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "ipv4";
        }//__END_OF_BUILDER_HELPERS
    });
    
    Alpaca.registerMessages({
        "invalidIPv4": "Invalid IPv4 address, e.g. 192.168.0.1"
    });
    Alpaca.registerFieldClass("ipv4", Alpaca.Fields.IPv4Field);
    Alpaca.registerDefaultFormatFieldMapping("ip-address", "ipv4");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.JSONField = Alpaca.Fields.TextAreaField.extend(
    /**
     * @lends Alpaca.Fields.JSONField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextAreaField
         *
         * @class JSON control for chunk of text.
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
         * @see Alpaca.ContainerField#getValue
         */
        setValue: function(value) {
            if (Alpaca.isObject(value) || typeof(value) == "object") {
                value = JSON.stringify(value, null, 3);
            }
            this.base(value);
        },

        /**
         * @see Alpaca.ContainerField#getValue
         */
        getValue: function() {

            var val = this.base();

            if (val && Alpaca.isString(val)) {
                val = JSON.parse(val);
            }

            return val;
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

			var status = this._validateJSON();
            valInfo["stringNotAJSON"] = {
                "message": status.status ? "" : this.view.getMessage("stringNotAJSON") +" "+ status.message,
                "status": status.status
            };

            return baseStatus && valInfo["stringNotAJSON"]["status"] ;
        },

        /**
         * Validates if it is a valid JSON object.
         * @returns {Boolean} true if it is a valid JSON object
         */
        _validateJSON: function() {
            var textValue = this.field.val();
            // allow null
            if (Alpaca.isValEmpty(textValue)) {
                return {
                    "status" : true
                };
            }

            // parse the string
            try {
                var obj = JSON.parse(textValue);
                // format the string as well
                this.setValue(JSON.stringify(obj, null, 3));
                return {
                    "status" : true
                };
            } catch(e) {
                return {
                    "status" : false,
                    "message" : e.message
                };
            }
        },

        /**
         * @see Alpaca.Fields.TextAreaField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.field)
                {
                    // Some auto-formatting capabilities
                    self.field.bind('keypress', function(e) {
                        //console.log(e.which);
                        if (e.which == 34) {
                            self.field.insertAtCaret('"');
                        }
                        if (e.which == 123) {
                            self.field.insertAtCaret('}');
                        }
                        if (e.which == 91) {
                            self.field.insertAtCaret(']');
                        }
                    });
                    self.field.bind('keypress', 'Ctrl+l', function() {
                        self.getEl().removeClass("alpaca-field-focused");

                        // set class from state
                        self.refreshValidationState();
                    });
                    self.field.attr('title','Type Ctrl+L to format and validate the JSON string.');
                }

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-json');
                }

                callback();

            });

        },//__BUILDER_HELPERS

		/**
         * @see Alpaca.Fields.TextAreaField#getTitle
		 */
		getTitle: function() {
			return "JSON Editor";
		},

		/**
         * @see Alpaca.Fields.TextAreaField#getDescription
		 */
		getDescription: function() {
			return "Editor for JSON objects with basic validation and formatting.";
		},

		/**
         * @see Alpaca.Fields.TextAreaField#getFieldType
         */
        getFieldType: function() {
            return "json";
        }//__END_OF_BUILDER_HELPERS
    });

    // Additional Registrations
    Alpaca.registerMessages({
        "stringNotAJSON": "This value is not a valid JSON string."
    });

    Alpaca.registerFieldClass("json", Alpaca.Fields.JSONField);

    $.fn.insertAtCaret = function (myValue) {

        return this.each(function() {

            //IE support
            if (document.selection) {

                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();

            } else if (this.selectionStart || this.selectionStart == '0') {

                //MOZILLA / NETSCAPE support
                var startPos = this.selectionStart;
                var endPos = this.selectionEnd;
                var scrollTop = this.scrollTop;
                this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                this.focus();
                this.selectionStart = startPos /*+ myValue.length*/;
                this.selectionEnd = startPos /*+ myValue.length*/;
                this.scrollTop = scrollTop;

            } else {

                this.value += myValue;
                this.focus();
            }
        });
    };
/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/
    jQuery.hotkeys = {
        version: "0.8",

        specialKeys: {
            8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
            20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
            37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
            96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
            104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
            112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
            120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
        },

        shiftNums: {
            "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
            "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
            ".": ">",  "/": "?",  "\\": "|"
        }
    };

    function keyHandler( handleObj ) {
        // Only care when a possible input has been specified
        if ( typeof handleObj.data !== "string" ) {
            return;
        }

        var origHandler = handleObj.handler,
            keys = handleObj.data.toLowerCase().split(" ");

        handleObj.handler = function( event ) {
            // Don't fire in text-accepting inputs that we didn't directly bind to
            if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
                 event.target.type === "text") ) {
                return;
            }

            // Keypress represents characters, not special keys
            var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
                character = String.fromCharCode( event.which ).toLowerCase(),
                key, modif = "", possible = {};

            // check combinations (alt|ctrl|shift+anything)
            if ( event.altKey && special !== "alt" ) {
                modif += "alt+";
            }

            if ( event.ctrlKey && special !== "ctrl" ) {
                modif += "ctrl+";
            }

            // TODO: Need to make sure this works consistently across platforms
            if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
                modif += "meta+";
            }

            if ( event.shiftKey && special !== "shift" ) {
                modif += "shift+";
            }

            if ( special ) {
                possible[ modif + special ] = true;

            } else {
                possible[ modif + character ] = true;
                possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

                // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
                if ( modif === "shift+" ) {
                    possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
                }
            }

            for ( var i = 0, l = keys.length; i < l; i++ ) {
                if ( possible[ keys[i] ] ) {
                    return origHandler.apply( this, arguments );
                }
            }
        };
    }

    jQuery.each([ "keydown", "keyup", "keypress" ], function() {
        jQuery.event.special[ this ] = { add: keyHandler };
    });

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.IntegerField = Alpaca.Fields.NumberField.extend(
    /**
     * @lends Alpaca.Fields.IntegerField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.NumberField
         *
         * @class Control for integers. If jQuery UI is enabled, it can also be
         * turned into a slider.
         *<p>
         * The following additional JSON Schema properties are supported:
         *<p/>
         *<code>
         *     <pre>
         * {
         *    minimum: {number},
         *    maximum: {number},
         *    minimumCanEqual: {boolean},
         *    maximumCanEqual: {boolean},
         *    divisibleBy: {number}
         * }
         * </pre>
         * </code>
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
         * @see Alpaca.Fields.NumberField#getValue
         */
        getValue: function() {
            var textValue = this.field.val();
            if (Alpaca.isValEmpty(textValue)) {
                return -1;
            } else {
                return parseInt(textValue, 10);
            }
        },

        /**
         * @see Alpaca.Field#onChange
         */
        onChange: function(e) {
            this.base();
            if (this.slider) {
                this.slider.slider("value", this.getValue());
            }
        },

        /**
         * @see Alpaca.Fields.NumberField#postRender
         */
        postRender: function(callback)
        {
            var self = this;

            this.base(function() {

                if (self.options.slider) {
                    if (!Alpaca.isEmpty(self.schema.maximum) && !Alpaca.isEmpty(self.schema.minimum)) {

                        if (self.field)
                        {
                            self.field.after('<div id="slider"></div>');
                            self.slider = $('#slider', self.field.parent()).slider({
                                value: self.getValue(),
                                min: self.schema.minimum,
                                max: self.schema.maximum,
                                slide: function(event, ui) {
                                    self.setValue(ui.value);
                                    self.refreshValidationState();
                                }
                            });
                        }
                    }
                }

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-integer');
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Fields.NumberField#handleValidate
         */
        handleValidate: function() {

            var baseStatus = this.base();

            var valInfo = this.validation;

            if (!valInfo["stringNotANumber"]["status"]) {
                valInfo["stringNotANumber"]["message"] = this.view.getMessage("stringNotAnInteger");
            }

            return baseStatus;
        },

        /**
         * Validates if it is an integer.
         * @returns {Boolean} true if it is an integer
         */
        _validateNumber: function() {
            var textValue = this.field.val();

            if (Alpaca.isValEmpty(textValue)) {
                return true;
            }

            var floatValue = this.getValue();

            // quick check to see if what they entered was a number
            if (isNaN(floatValue)) {
                return false;
            }

            // check if valid number format
            if (!textValue.match(Alpaca.regexps.integer)) {
                return false;
            }

            return true;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "minimum": {
                        "title": "Minimum",
                        "description": "Minimum value of the property.",
                        "type": "integer"
                    },
                    "maximum": {
                        "title": "Maximum",
                        "description": "Maximum value of the property.",
                        "type": "integer"
                    },
                    "divisibleBy": {
                        "title": "Divisible By",
                        "description": "Property value must be divisible by this number.",
                        "type": "integer"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "minimum": {
                        "helper": "Minimum value of the field.",
                        "type": "integer"
                    },
                    "maximum": {
                        "helper": "Maximum value of the field.",
                        "type": "integer"
                    },
                    "divisibleBy": {
                        "helper": "Property value must be divisible by this number.",
                        "type": "integer"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "slider": {
                        "title": "Slider",
                        "description": "Generate jQuery UI slider control with the field if true.",
                        "type": "boolean",
                        "default": false
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "slider": {
                        "rightLabel": "Slider control ?",
                        "helper": "Generate slider control if selected.",
                        "type": "checkbox"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.NumberField#getTitle
         */
        getTitle: function() {
            return "Integer Field";
        },

        /**
         * @see Alpaca.Fields.NumberField#getDescription
         */
        getDescription: function() {
            return "Field for integers.";
        },

        /**
         * @see Alpaca.Fields.NumberField#getType
         */
        getType: function() {
            return "integer";
        },

        /**
         * @see Alpaca.Fields.NumberField#getFieldType
         */
        getFieldType: function() {
            return "integer";
        }//__END_OF_BUILDER_HELPERS
    });

    // Additional Registrations
    Alpaca.registerMessages({
        "stringNotAnInteger": "This value is not an integer."
    });
    Alpaca.registerFieldClass("integer", Alpaca.Fields.IntegerField);
    Alpaca.registerDefaultSchemaFieldMapping("integer", "integer");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.LowerCaseField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.LowerCaseField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for lower case text.
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
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback)
        {
            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-lowercase');
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val) {
            var lowerValue = val.toLowerCase();

            if (lowerValue != this.getValue()) {
                this.base(lowerValue);
            }
        },

        /**
         * @see Alpaca.ControlField#onKeyPress
         */
        onKeyPress: function(e) {
            this.base(e);

            var _this = this;

            Alpaca.later(25, this, function() {
                var v = _this.getValue();
                _this.setValue(v);
            });
        },//__BUILDER_HELPERS

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Lowercase Text";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Text field for lowercase text.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "lowercase";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("lowercase", Alpaca.Fields.LowerCaseField);
    Alpaca.registerDefaultFormatFieldMapping("lowercase", "lowercase");

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.MapField = Alpaca.Fields.ArrayField.extend(
    /**
     * @lends Alpaca.Fields.MapField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextAreaField
         *
         * @class JSON control for chunk of text.
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
         * @see Alpaca.Fields.TextAreaField#setup
         */
        setup: function() {

            this.base();

            Alpaca.mergeObject(this.options, {
                "forceRevalidation" : true
            });

            if (Alpaca.isEmpty(this.data)) {
                return;
            }

            if (!Alpaca.isArray(this.data)) {

                if (Alpaca.isObject(this.data)) {
                    var newData = [];
                    $.each(this.data, function(key, value) {
                        var newValue = Alpaca.copyOf(value);
                        newValue["_key"] = key;
                        newData.push(newValue);
                    });
                    this.data = newData;
                }
            }
        },

        /**
         * @see Alpaca.ContainerField#getValue
         */
        getValue: function()
        {
            // if we don't have any children and we're not required, hand back undefined
            if (this.children.length === 0 && !this.schema.required)
            {
                return;
            }

            var o = {};
            for (var i = 0; i < this.children.length; i++) {
                var v = this.children[i].getValue();
                var key = v["_key"];
                if (key) {
                    delete v["_key"];
                    o[key] = v;
                }
            }
            return o;
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

            var isValidMapKeysNotEmpty = this._validateMapKeysNotEmpty();
            valInfo["keyMissing"] = {
                "message": isValidMapKeysNotEmpty ? "" : this.view.getMessage("keyMissing"),
                "status": isValidMapKeysNotEmpty
            };

            var isValidMapKeysUnique = this._validateMapKeysUnique();
            valInfo["keyNotUnique"] = {
                "message": isValidMapKeysUnique ? "" : this.view.getMessage("keyNotUnique"),
                "status": isValidMapKeysUnique
            };

            return baseStatus && valInfo["keyMissing"]["status"] && valInfo["keyNotUnique"]["status"];
        },

        /**
         * Validates if key fields are unique.
         * @returns {Boolean} true if keys are unique
         */
        _validateMapKeysNotEmpty: function() {

            var isValid = true;

            for (var i = 0; i < this.children.length; i++) {
                var v = this.children[i].getValue();
                var key = v["_key"];

                if (!key) {
                    isValid = false;
                    break;
                }
            }

            return isValid;
        },

        /**
         * Validates if key fields are unique.
         * @returns {Boolean} true if keys are unique
         */
        _validateMapKeysUnique: function() {

            var isValid = true;

            var keys = {};
            for (var i = 0; i < this.children.length; i++) {
                var v = this.children[i].getValue();
                var key = v["_key"];

                if (keys[key]) {
                    isValid = false;
                }

                keys[key] = key;
            }

            return isValid;
        },

        /**
         * @see Alpaca.Fields.TextAreaField#postRender
         */
        postRender: function(callback)
        {
            var self = this;

            this.base(function() {

                if (this.fieldContainer) {
                    this.fieldContainer.addClass('alpaca-controlfield-map');
                }

                callback();
            });

        },//__BUILDER_HELPERS

		/**
         * @see Alpaca.Fields.TextAreaField#getTitle
		 */
		getTitle: function() {
			return "Map Field";
		},

		/**
         * @see Alpaca.Fields.TextAreaField#getDescription
		 */
		getDescription: function() {
			return "Field for objects with key/value pairs that share the same schema for values.";
		},

		/**
         * @see Alpaca.Fields.TextAreaField#getFieldType
         */
        getFieldType: function() {
            return "map";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("map", Alpaca.Fields.MapField);

    // Additional Registrations
    Alpaca.registerMessages({
        "keyNotUnique": "Keys of map field are not unique.",
        "keyMissing": "Map contains an empty key."
    });
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.PasswordField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.PasswordField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for JSON schema password format.
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
            
            if (!this.schema.pattern) {
                this.schema.pattern = Alpaca.regexps.password;
            }
            
            this.controlFieldTemplateDescriptor = this.view.getTemplateDescriptor("controlFieldPassword");
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-password');
                }

                callback();
            });
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();
            
            var valInfo = this.validation;
            
            if (!valInfo["invalidPattern"]["status"]) {
                valInfo["invalidPattern"]["message"] = this.view.getMessage("invalidPassword");
            }
            
            return baseStatus;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            var pattern = (this.schema && this.schema.pattern)? this.schema.pattern : /^[0-9a-zA-Z\x20-\x7E]*$/;
            return Alpaca.merge(this.base(), {
                "properties": {
                    "pattern": {
                        "title": "Pattern",
                        "description": "Field Pattern in Regular Expression",
                        "type": "string",
                        "default": this.schema.pattern,
                        "enum":[pattern],
                        "readonly": true
                    },                    
					"format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
						"default":"password",
                        "enum":["password"],
						"readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
		getOptionsForSchema: function() {
            return Alpaca.merge(this.base(),{
				"fields": {
					"format": {
						"type": "text"
					}
				}
			});
        },
        
        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Password Field";
        },
        
        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Password Field.";
        },

		/**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "password";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerTemplate("controlFieldPassword", '<input type="password" id="${id}" {{if options.size}}size="${options.size}"{{/if}} {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each(i,v) options.data}}data-${i}="${v}"{{/each}}/>');
    Alpaca.registerMessages({
        "invalidPassword": "Invalid Password"
    });
    Alpaca.registerFieldClass("password", Alpaca.Fields.PasswordField);
    Alpaca.registerDefaultFormatFieldMapping("password", "password");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.PersonalNameField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.PersonalNameField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for upper case text.
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
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-personalname');
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val) {
            var upperValue = "";

            for ( var i = 0; i < val.length; i++ ) {
                if ( i === 0 ) {
                    upperValue += val.charAt(i).toUpperCase();
                } else if (val.charAt(i-1) == ' ' ||  val.charAt(i-1) == '-' || val.charAt(i-1) == "'") {
                    upperValue += val.charAt(i).toUpperCase();
                } else {
                    upperValue += val.charAt(i);
                }
            }

            if (upperValue != this.getValue()) {
                this.base(upperValue);
            }
        },

        /**
         * @see Alpaca.ControlField#onKeyPress
         */
        onKeyPress: function(e) {
            this.base(e);

            var _this = this;

            Alpaca.later(25, this, function() {
                var v = _this.getValue();
                _this.setValue(v);
            });
        },//__BUILDER_HELPERS

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Personal Name";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Text Field for personal name with captical letter for first letter & after hyphen, space or apostrophe.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "personalname";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("personalname", Alpaca.Fields.PersonalNameField);

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.PhoneField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.PhoneField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for standard US phone numbers.
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

            if (!this.schema.pattern) {
                this.schema.pattern = Alpaca.regexps.phone;
            }

            if (Alpaca.isEmpty(this.options.maskString)) {
                this.options.maskString = "(999) 999-9999";
            }

        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-phone');
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

            if (!valInfo["invalidPattern"]["status"]) {
                valInfo["invalidPattern"]["message"] = this.view.getMessage("invalidPhone");
            }

            return baseStatus;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            var pattern = (this.schema && this.schema.pattern) ? this.schema.pattern : Alpaca.regexps.phone;
            return Alpaca.merge(this.base(), {
                "properties": {
                    "pattern": {
                        "title": "Pattern",
                        "description": "Field Pattern in Regular Expression",
                        "type": "string",
                        "default": pattern,
                        "enum":[pattern],
                        "readonly": true
                    },
                    "format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
                        "default":"phone",
                        "enum":["phone"],
                        "readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "format": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "maskString": {
                        "title": "Field Mask String",
                        "description": "Expression for field mask",
                        "type": "string",
                        "default": "(999) 999-9999"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Phone Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Phone Field.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "phone";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerMessages({
        "invalidPhone": "Invalid Phone Number, e.g. (123) 456-9999"
    });
    Alpaca.registerFieldClass("phone", Alpaca.Fields.PhoneField);
    Alpaca.registerDefaultFormatFieldMapping("phone", "phone");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.TagField = Alpaca.Fields.LowerCaseField.extend(
    /**
     * @lends Alpaca.Fields.TagField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Time control for JSON schema time format.
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

            if (!this.options.separator) {
                this.options.separator = ",";
            }
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-tag');
                }

                callback();
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getValue
         */
        getValue: function() {
            var val = this.base();
            if (val === "") {
                return [];
            }
            return val.split(this.options.separator);
        },

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val) {
            if (val === "") {
                return;
            }

            this.base(val.join(this.options.separator));
        },

        /**
         * @see Alpaca.Field#onBlur
         */
        onBlur: function(e) {
            this.base(e);

            var vals = this.getValue();

            var trimmed = [];

            $.each(vals, function(i, v) {
                if (v.trim() !== "") {
                    trimmed.push(v.trim());
                }
            });

            this.setValue(trimmed);

        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "separator": {
                        "title": "Separator",
                        "description": "Separator used to split tags.",
                        "type": "string",
                        "default":","
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
                    "separator": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Tag Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Text field for entering list of tags separated by delimiter.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "tag";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("tag", Alpaca.Fields.TagField);
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.TimeField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.TimeField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Time control for JSON schema time format.
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

            if (!this.options.timeFormat) {
                this.options.timeFormat = "hh:mm:ss";
            }

            if (!this.options.timeFormatRegex) {
                this.options.timeFormatRegex = /^(([0-1][0-9])|([2][0-3])):([0-5][0-9]):([0-5][0-9])$/;
            }

            if (Alpaca.isEmpty(this.options.maskString)) {
                this.options.maskString = "99:99:99";
            }
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-time');
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Field#onChange
         */
        onChange: function(e) {
            this.base();
            this.refreshValidationState();
        },

        /**
         * @see Alpaca.Fields.TextField#handleValitime
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

            var status = this._validateTimeFormat();
            valInfo["invalidTime"] = {
                "message": status ? "" : Alpaca.substituteTokens(this.view.getMessage("invalidTime"), [this.options.timeFormat]),
                "status": status
            };

            return baseStatus && valInfo["invalidTime"]["status"];
        },

        /**
         * Valitimes time format.
         * @returns {Boolean} True if it is a valid time, false otherwise.
         */
        _validateTimeFormat: function() {
            var value = this.field.val();
            if (!this.schema.required && (Alpaca.isValEmpty(value) || value == "__:__:__")) {
                return true;
            }
            //valitime the time without the help of timepicker.parseTime
            return value.match(this.options.timeFormatRegex);
        },//__BUILDER_HELPERS

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val) {
            // skip out if no time
            if (val === "") {
                this.base(val);
                return;
            }

            this.base(val);
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
                        "default":"time",
                        "enum" : ["time"],
                        "readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "format": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "timeFormat": {
                        "title": "Time Format",
                        "description": "Time format",
                        "type": "string",
                        "default": "hh:mm:ss"
                    },
                    "timeFormatRegex": {
                        "title": "Format Regular Expression",
                        "description": "Regular expression for validation time format",
                        "type": "string",
                        "default": /^(([0-1][0-9])|([2][0-3])):([0-5][0-9]):([0-5][0-9])$/
                    },
                    "maskString": {
                        "default" : "99:99:99"
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
                    "timeFormat": {
                        "type": "text"
                    },
                    "timeFormatRegex": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Time Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Field for time.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "time";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerMessages({
        "invalidTime": "Invalid time for format {0}"
    });
    Alpaca.registerFieldClass("time", Alpaca.Fields.TimeField);
    Alpaca.registerDefaultFormatFieldMapping("time", "time");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.UpperCaseField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.UpperCaseField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for upper case text.
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
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-uppercase');
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val) {

            var upperValue = val.toUpperCase();

            if (upperValue != this.getValue()) {
                this.base(upperValue);
            }
        },

        /**
         * @see Alpaca.ControlField#onKeyPress
         */
        onKeyPress: function(e) {
            this.base(e);

            var _this = this;

            Alpaca.later(25, this, function() {
                var v = _this.getValue();
                _this.setValue(v);
            });
        },//__BUILDER_HELPERS

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Uppercase Text";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Text field for uppercase text.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "uppercase";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("uppercase", Alpaca.Fields.UpperCaseField);
    Alpaca.registerDefaultFormatFieldMapping("uppercase", "uppercase");

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.WysiwygField = Alpaca.Fields.TextAreaField.extend(
    /**
     * @lends Alpaca.Fields.WysiwygField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextAreaField
         *
         * @class WYSIWYG control for chunk of text.
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

            this.controlsConfig = {};
            this.controlsConfig.simple = {
                "html": { "visible": true },
                "createLink": { "visible": false },
                "unLink": { "visible": false },
                "h1": { "visible": false },
                "h2": { "visible": false },
                "h3": { "visible": false },
                "indent": { "visible": false },
                "insertHorizontalRule": { "visible": false },
                "insertImage": { "visible": false },
                "insertOrderedList": { "visible": false },
                "insertTable": { "visible": false },
                "insertUnorderedList": { "visible": false },
                "justifyCenter": { "visible": false },
                "justifyFull": { "visible": false },
                "justifyLeft": { "visible": false },
                "justifyRight": { "visible": false },
                "outdent": { "visible": false },
                "redo": { "visible": false },
                "removeFormat": { "visible": false },
                "subscript": { "visible": false },
                "superscript": { "visible": false },
                "undo": { "visible": false },
                "code": { "visible": false },
                "strikeThrough": { "visible": false }
            };
        },

        /**
         * @see Alpaca.Fields.TextAreaField#setup
         */
        setup: function() {
            this.base();

            // instantiated plugin reference
            this.plugin = null;
        },
        
        /**
         * @see Alpaca.Fields.TextAreaField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                // see if we can render jWysiwyg
                if (self.field && $.wysiwyg)
                {
                    var wysiwygOptions = self.options.wysiwyg ? self.options.wysiwyg : {};

                    if (wysiwygOptions.controls)
                    {
                        if (typeof(wysiwygOptions.controls) === "string")
                        {
                            wysiwygOptions.controls = self.controlsConfig[wysiwygOptions.controls];
                            if (!wysiwygOptions.controls)
                            {
                                wysiwygOptions.controls = {};
                            }
                        }
                    }

                    if (self.options.onDemand)
                    {
                        self.outerEl.find("textarea").mouseover(function() {

                            if (!self.plugin)
                            {
                                self.plugin = $(this).wysiwyg(wysiwygOptions);

                                self.outerEl.find(".wysiwyg").mouseout(function() {

                                    if (self.plugin) {
                                        self.plugin.wysiwyg('destroy');
                                    }

                                    self.plugin = null;

                                });
                            }
                        });
                    }
                    else
                    {
                        self.plugin = self.field.wysiwyg(wysiwygOptions);
                    }

                    self.outerEl.find(".wysiwyg").mouseout(function() {
                        self.data = _this.getValue();
                        self.refreshValidationState();
                    });
                }

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-wysiwyg');
                }

                callback();
            });

        },//__BUILDER_HELPERS
		
        /**
         * @private
         * @see Alpaca.ControlField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "wysiwyg": {
                        "title": "Editor options",
                        "description": "Options that are supported by the <a href='https://github.com/akzhan/jwysiwyg'>jQuery WYSIWYG plugin</a>.",
                        "type": "any"
                    },
                    "onDemand": {
                        "title": "On Demand",
                        "description": "If true, WYSIWYG editor will only be enabled when the field is hovered.",
                        "type": "boolean",
                        "default": false
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.ControlField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "wysiwyg": {
                        "type": "any"
                    },
                    "onDemand": {
                        "type": "checkbox",
                        "rightLabel": "Make the editor on-demand?"
                    }
                }
            });
        },

		/**
         * @see Alpaca.Fields.TextAreaField#getTitle
		 */
		getTitle: function() {
			return "Wysiwyg Editor";
		},
		
		/**
         * @see Alpaca.Fields.TextAreaField#getDescription
		 */
		getDescription: function() {
			return "Wysiwyg editor for multi-line text which is based on Akzhan Abdulin's <a href='https://github.com/akzhan/jwysiwyg'>jQuery WYSIWYG plugin</a>.";
		},

		/**
         * @see Alpaca.Fields.TextAreaField#getFieldType
         */
        getFieldType: function() {
            return "wysiwyg";
        }//__END_OF_BUILDER_HELPERS
    });
    
    Alpaca.registerFieldClass("wysiwyg", Alpaca.Fields.WysiwygField);
    
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.StateField = Alpaca.Fields.SelectField.extend(
    /**
     * @lends Alpaca.Fields.StateField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class State Control
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

            // defaults
            if (Alpaca.isUndefined(this.options.capitalize)) {
                this.options.capitalize = false;
            }
            if (Alpaca.isUndefined(this.options.includeStates)) {
                this.options.includeStates = true;
            }
            if (Alpaca.isUndefined(this.options.includeTerritories)) {
                this.options.includeTerritories = true;
            }
            if (Alpaca.isUndefined(this.options.format)) {
                this.options.format = "name";
            }

            // validate settings
            if (this.options.format == "name" || this.options.format == "code")
            {
                // valid formats
            }
            else
            {
                Alpaca.logError("The configured state format: " + this.options.format + " is not a legal value [name, code]");

                // default to name format
                this.options.format = "name";
            }

            // configure
            var holdings = Alpaca.retrieveUSHoldings(
                this.options.includeStates,
                this.options.includeTerritories,
                (this.options.format == "code"),
                this.options.capitalize);

            this.schema["enum"] = holdings.keys;
            this.options.optionLabels = holdings.values;

            this.base();
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-state');
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            // no additional validation

            return baseStatus;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {

            return Alpaca.merge(this.base(), {
                "properties": {
                    "format": {
                        "title": "Format",
                        "description": "How to represent the state values in the selector",
                        "type": "string",
                        "default": "name",
                        "enum":["name", "code"],
                        "readonly": true
                    },
                    "capitalize": {
                        "title": "Capitalize",
                        "description": "Whether the values should be capitalized",
                        "type": "boolean",
                        "default": false,
                        "readonly": true
                    },
                    "includeStates": {
                        "title": "Include States",
                        "description": "Whether to include the states of the United States",
                        "type": "boolean",
                        "default": true,
                        "readonly": true
                    },
                    "includeTerritories": {
                        "title": "Include Territories",
                        "description": "Whether to include the territories of the United States",
                        "type": "boolean",
                        "default": true,
                        "readonly": true
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
                    "format": {
                        "type": "text"
                    },
                    "capitalize": {
                        "type": "checkbox"
                    },
                    "includeStates": {
                        "type": "checkbox"
                    },
                    "includeTerritories": {
                        "type": "checkbox"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "State Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Provides a dropdown selector of states and/or territories in the United States, keyed by their two-character code.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "state";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("state", Alpaca.Fields.StateField);
    Alpaca.registerDefaultFormatFieldMapping("state", "state");

    /**
     * Helper function to retrieve the holdings of US states and territories.
     *
     * @param {Boolean} includeStates whether to include US states
     * @param {Boolean} includeTerritories whether to include US territories
     * @param {Boolean} codeValue whether to hand back US holding codes (instead of names)
     * @param {Boolean} capitalize whether to capitalize the values handed back
     *
     * @type {Object} an object containing "keys" and "values", both of which are arrays.
     */
    Alpaca.retrieveUSHoldings = function()
    {
        var holdings = [];
        holdings.push({
            "name": "Arkansas",
            "code": "AK",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Alabama",
            "code": "AL",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "American Samoa",
            "code": "AS",
            "state": false,
            "territory": true
        });
        holdings.push({
            "name": "Arizona",
            "code": "AR",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "California",
            "code": "CA",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Colorado",
            "code": "CO",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Connecticut",
            "code": "CT",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Delaware",
            "code": "DE",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Distict of Columbia",
            "code": "DC",
            "state": false,
            "territory": true
        });
        holdings.push({
            "name": "Federated States of Micronesia",
            "code": "FM",
            "state": false,
            "territory": true
        });
        holdings.push({
            "name": "Florida",
            "code": "FL",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Georgia",
            "code": "GA",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Guam",
            "code": "GU",
            "state": false,
            "territory": true
        });
        holdings.push({
            "name": "Georgia",
            "code": "GA",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Hawaii",
            "code": "HI",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Idaho",
            "code": "ID",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Illinois",
            "code": "IL",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Indiana",
            "code": "IN",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Iowa",
            "code": "IA",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Kansas",
            "code": "KS",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Kentucky",
            "code": "KY",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Louisiana",
            "code": "LA",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Maine",
            "code": "ME",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Marshall Islands",
            "code": "MH",
            "state": false,
            "territory": true
        });
        holdings.push({
            "name": "Maryland",
            "code": "MD",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Massachusetts",
            "code": "MA",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Michigan",
            "code": "MI",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Minnesota",
            "code": "MN",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Mississippi",
            "code": "MS",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Missouri",
            "code": "MO",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Montana",
            "code": "MT",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Nebraska",
            "code": "NE",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Nevada",
            "code": "NV",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "New Hampshire",
            "code": "NH",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "New Jersey",
            "code": "NJ",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "New Mexico",
            "code": "NM",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "New York",
            "code": "NY",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "North Carolina",
            "code": "NC",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "North Dakota",
            "code": "ND",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Northern Mariana Islands",
            "code": "MP",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Ohio",
            "code": "OH",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Oklahoma",
            "code": "OK",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Oregon",
            "code": "OR",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Palau",
            "code": "PW",
            "state": false,
            "territory": true
        });
        holdings.push({
            "name": "Pennsylvania",
            "code": "PA",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Puerto Rico",
            "code": "PR",
            "state": false,
            "territory": true
        });
        holdings.push({
            "name": "Rhode Island",
            "code": "RI",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "South Carolina",
            "code": "SC",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "South Dakota",
            "code": "SD",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Tennessee",
            "code": "TN",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Texas",
            "code": "TX",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Utah",
            "code": "UT",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Vermont",
            "code": "VT",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Virgin Islands",
            "code": "VI",
            "state": false,
            "territory": true
        });
        holdings.push({
            "name": "Virginia",
            "code": "VA",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Washington",
            "code": "WA",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "West Virginia",
            "code": "WV",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Wisconsin",
            "code": "WI",
            "state": true,
            "territory": false
        });
        holdings.push({
            "name": "Wyoming",
            "code": "WY",
            "state": true,
            "territory": false
        });

        return function(includeStates, includeTerritories, codeValue, capitalize) {

            var result = {
                "keys": [],
                "values": []
            };

            for (var i = 0; i < holdings.length; i++)
            {
                var keep = false;

                if (holdings[i].state && includeStates) {
                    keep = true;
                } else if (holdings[i].territory && includeTerritories) {
                    keep = true;
                }

                if (keep) {

                    var key = holdings[i].code;
                    var value = holdings[i].name;

                    if (codeValue) {
                        value = holdings[i].code;
                    }
                    if (capitalize) {
                        value = value.toUpperCase();
                    }

                    result.keys.push(key);
                    result.values.push(value);
                }
            }

            return result;
        };
    }();

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.CountryField = Alpaca.Fields.SelectField.extend(
    /**
     * @lends Alpaca.Fields.CountryField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Country Control
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

            // defaults
            if (Alpaca.isUndefined(this.options.capitalize)) {
                this.options.capitalize = false;
            }

            this.schema["enum"] = [];
            this.options.optionLabels = [];

            var countriesMap = this.view.getMessage("countries");
            if (countriesMap)
            {
                for (var countryKey in countriesMap)
                {
                    this.schema["enum"].push(countryKey);

                    var label = countriesMap[countryKey];
                    if (this.options.capitalize) {
                        label = label.toUpperCase();
                    }
                    this.options.optionLabels.push(label);
                }
            }

            this.base();
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-country');
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            // no additional validation

            return baseStatus;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {

            return Alpaca.merge(this.base(), {
                "properties": {
                    "capitalize": {
                        "title": "Capitalize",
                        "description": "Whether the values should be capitalized",
                        "type": "boolean",
                        "default": false,
                        "readonly": true
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
                    "capitalize": {
                        "type": "checkbox"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Country Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Provides a dropdown selector of countries keyed by their ISO3 code.  The names of the countries are read from the I18N bundle for the current locale.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "country";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("country", Alpaca.Fields.CountryField);
    Alpaca.registerDefaultFormatFieldMapping("country", "country");

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.ZipcodeField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.ZipcodeField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Zipcode Control
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

            this.options.format = (this.options.format ? this.options.format : "nine");

            if (this.options.format == "nine")
            {
                this.schema.pattern = Alpaca.regexps["zipcode-nine"];
            }
            else if (this.options.format == "five")
            {
                this.schema.pattern = Alpaca.regexps["zipcode-five"];
            }
            else
            {
                Alpaca.logError("The configured zipcode format: " + this.options.format + " is not a legal value [five, nine]");

                // default to nine format
                this.options.format = "nine";
                this.schema.pattern = Alpaca.regexps["zipcode-nine"];
            }

            // set mask string
            if (this.options.format == "nine")
            {
                this.options["maskString"] = "99999-9999";
            }
            else if (this.options.format == "five")
            {
                this.options["maskString"] = "99999";
            }

            this.base();
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-zipcode');
                }

                callback();
            });
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

            if (!valInfo["invalidPattern"]["status"]) {

                if (this.options.format == "nine")
                {
                    valInfo["invalidPattern"]["message"] = this.view.getMessage("invalidZipcodeFormatNine");
                }
                else if (this.options.format == "five")
                {
                    valInfo["invalidPattern"]["message"] = this.view.getMessage("invalidZipcodeFormatFive");
                }
            }

            return baseStatus;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {

            return Alpaca.merge(this.base(), {
                "properties": {
                    "format": {
                        "title": "Format",
                        "description": "How to represent the zipcode field",
                        "type": "string",
                        "default": "five",
                        "enum":["five", "nine"],
                        "readonly": true
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
                    "format": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Zipcode Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Provides a five or nine-digital US zipcode control with validation.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "zipcode";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerMessages({
        "invalidZipcodeFormatFive": "Invalid Five-Digit Zipcode (#####)",
        "invalidZipcodeFormatNine": "Invalid Nine-Digit Zipcode (#####-####)"
    });
    Alpaca.registerFieldClass("zipcode", Alpaca.Fields.ZipcodeField);
    Alpaca.registerDefaultFormatFieldMapping("zipcode", "zipcode");

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.URLField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.URLField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class URL Control
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

            this.schema.pattern = Alpaca.regexps.url;
            this.schema.format = "uri";

            this.base();
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-url');
                }

                callback();

            });
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

            if (!valInfo["invalidPattern"]["status"]) {

                valInfo["invalidPattern"]["message"] = this.view.getMessage("invalidURLFormat");
            }

            return baseStatus;
        },//__BUILDER_HELPERS

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "URL Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Provides a text control with validation for an internet web address.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "url";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerMessages({
        "invalidURLFormat": "The URL provided is not a valid web address."
    });
    Alpaca.registerFieldClass("url", Alpaca.Fields.URLField);
    Alpaca.registerDefaultFormatFieldMapping("url", "url");

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.UploadField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.UploadField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.ObjectField
         *
         * @class Upload Field
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

            var self = this;

            this.base();

            this.controlFieldTemplateDescriptor = this.view.getTemplateDescriptor("controlFieldUpload");
            this.uploadDescriptor = self.view.getTemplateDescriptor("controlFieldUpload_upload");
            this.downloadDescriptor = self.view.getTemplateDescriptor("controlFieldUpload_download");

            if (typeof(self.options.multiple) == "undefined")
            {
                self.options.multiple = false;
            }

            if (typeof(self.options.showUploadPreview) == "undefined")
            {
                self.options.showUploadPreview = true;
            }

        },

        /**
         * @see Alpaca.ControlField#renderField
         */
        renderField: function(onSuccess) {

            var self = this;

            this.base(function() {

                self.field = $(self.field).find(".alpaca-fileupload-input-hidden");

                if (onSuccess) {
                    onSuccess();
                }

            });
        },


        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function(callback) {

            var self = this;

            this.base(function() {

                if (self.fieldContainer) {
                    self.fieldContainer.addClass('alpaca-controlfield-upload');
                }

                self.handlePostRender(self.fieldContainer, function() {
                    callback();
                });

            });
        },

        handlePostRender: function(el, callback)
        {
            var self = this;

            var uploadTemplateFunction = function(data)
            {
                return Alpaca.tmpl(self.uploadDescriptor, {
                    o: data
                });
            };
             var downloadTemplateFunction = function(data)
             {
                 return Alpaca.tmpl(self.downloadDescriptor, {
                     o: data
                 });
             };

            // file upload config
            var fileUploadConfig = {};

            // defaults
            fileUploadConfig["dataType"] = "json";
            fileUploadConfig["uploadTemplateId"] = null;
            fileUploadConfig["uploadTemplate"] = uploadTemplateFunction;
            fileUploadConfig["downloadTemplateId"] = null;
            fileUploadConfig["downloadTemplate"] = downloadTemplateFunction;
            fileUploadConfig["filesContainer"] = $(el).find(".files");
            fileUploadConfig["dropZone"] = $(el).find(".fileupload-active-zone");
            fileUploadConfig["url"] = "/";
            fileUploadConfig["method"] = "post";
            fileUploadConfig["showUploadPreview"] = self.options.showUploadPreview;

            if (self.options.upload)
            {
                for (var k in self.options.upload)
                {
                    fileUploadConfig[k] = self.options.upload[k];
                }
            }

            if (self.options.multiple)
            {
                $(el).find(".alpaca-fileupload-input").attr("multiple", true);
                $(el).find(".alpaca-fileupload-input").attr("name", self.name + "_files[]");
            }

            // hide the progress bar at first
            $(el).find(".progress").css("display", "none");

            /**
             * If a file is being uploaded, show the progress bar.  Otherwise, hide it.
             *
             * @param e
             * @param data
             */
            fileUploadConfig["progressall"] = function (e, data) {

                var showProgressBar = false;
                if (data.loaded < data.total)
                {
                    showProgressBar = true;
                }
                if (showProgressBar)
                {
                    $(el).find(".progress").css("display", "block");
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css(
                        'width',
                        progress + '%'
                    );
                }
                else
                {
                    $(el).find(".progress").css("display", "none");
                }
            };

            // allow for extension
            self.applyConfiguration(fileUploadConfig);

            // instantiate the control
            var fileUpload = self.fileUpload = $(el).find('.alpaca-fileupload-input').fileupload(fileUploadConfig);

            // When file upload of a file competes, we offer the chance to adjust the data ahead of FileUpload
            // getting it.  This is useful for cases where you can't change the server side JSON but could do
            // a little bit of magic in the client.
            fileUpload.bindFirst("fileuploaddone", function(e, data) {

                var enhanceFiles = self.options.enhanceFiles;
                if (enhanceFiles)
                {
                    enhanceFiles(fileUploadConfig, data);
                }
                else
                {
                    self.enhanceFiles(fileUploadConfig, data);
                }

                // copy back down into data.files
                data.files = data.result.files;
            });

            // When files are submitted, the "properties" and "parameters" options map are especially treated
            // and are written into property<index>__<key> and param<index>__key entries in the form data.
            // This allows for multi-part receivers to get values on a per-file basis.
            // Plans are to allow token substitution and other client-side treatment ahead of posting.
            fileUpload.bindFirst("fileuploadsubmit", function(e, data) {

                if (self.options["properties"])
                {
                    $.each(data.files, function(index, file) {

                        for (var key in self.options["properties"])
                        {
                            var propertyName = "property" + index + "__" + key;
                            var propertyValue = self.options["properties"][key];

                            // token substitutions
                            propertyValue = self.applyTokenSubstitutions(propertyValue, index, file);

                            if (!data.formData) {
                                data.formData = {};
                            }

                            data.formData[propertyName] = propertyValue;
                        }
                    });
                }

                if (self.options["parameters"])
                {
                    $.each(data.files, function(index, file) {

                        for (var key in self.options["parameters"])
                        {
                            var paramName = "param" + index + "__" + key;
                            var paramValue = self.options["parameters"][key];

                            // token substitutions
                            paramValue = self.applyTokenSubstitutions(paramValue, index, file);

                            if (!data.formData) {
                                data.formData = {};
                            }

                            data.formData[paramName] = paramValue;
                        }
                    });
                }
            });

            /**
             * When files are uploaded, we adjust the value of the field.
             */
            fileUpload.bind("fileuploaddone", function(e, data) {

                // existing
                var array = self.getValue();

                var f = function(i)
                {
                    if (i == data.files.length)
                    {
                        // done
                        self.setValue(array);
                        return;
                    }

                    self.convertFileToDescriptor(data.files[i], function(err, descriptor) {
                        if (descriptor)
                        {
                            array.push(descriptor);
                        }
                        f(i+1);
                    });
                };
                f(0);
            });

            // allow for extension
            self.applyBindings(fileUpload, el);

            // allow for preloading of documents
            self.preload(fileUpload, el, function(files) {

                if (files)
                {
                    var form = $(self.fieldContainer).find('.alpaca-fileupload-input');
                    $(form).fileupload('option', 'done').call(form, $.Event('done'), {
                        result: {
                            files: files
                        }
                    });

                    self.afterPreload(fileUpload, el, files, function() {
                        callback();
                    });
                }
                else
                {
                    callback();
                }
            });
        },

        applyTokenSubstitutions: function(text, index, file)
        {
            var tokens = {
                "index": index,
                "name": file.name,
                "size": file.size,
                "url": file.url,
                "thumbnailUrl": file.thumbnailUrl
            };

            // substitute any tokens
            var x = -1;
            var b = 0;
            do
            {
                x = text.indexOf("{", b);
                if (x > -1)
                {
                    var y = text.indexOf("}", x);
                    if (y > -1)
                    {
                        var token = text.substring(x + car.length, y);

                        var replacement = tokens[token];
                        if (replacement)
                        {
                            text = text.substring(0, x) + replacement + text.substring(y+1);
                        }

                        b = y + 1;
                    }
                }
            }
            while(x > -1);

            return text;
        },

        /**
         * Removes a descriptor with the given id from the value set.
         *
         * @param id
         */
        removeValue: function(id)
        {
            var self = this;

            var array = self.getValue();
            for (var i = 0; i < array.length; i++)
            {
                if (array[i].id == id)
                {
                    array.splice(i, 1);
                    break;
                }
            }

            self.setValue(array);
        },


        /**
         * Extension point for adding properties and callbacks to the file upload config.
         *
         * @param fileUploadconfig
         */
        applyConfiguration: function(fileUploadconfig)
        {
        },

        /**
         * Extension point for binding event handlers to file upload instance.
         *
         * @param fileUpload
         */
        applyBindings: function(fileUpload)
        {
        },

        /**
         * Converts from a file to a storage descriptor.
         *
         * A descriptor looks like:
         *
         *      {
         *          "id": ""
         *          ...
         *      }
         *
         * A descriptor may contain additional properties as needed by the underlying storage implementation
         * so as to retrieve metadata about the described file.
         *
         * Assumption is that the underlying persistence mechanism may need to be consulted.  Thus, this is async.
         *
         * By default, the descriptor mimics the file.
         *
         * @param file
         * @param callback function(err, descriptor)
         */
        convertFileToDescriptor: function(file, callback)
        {
            var descriptor = {
                "id": file.id,
                "name": file.name,
                "size": file.size,
                "url": file.url,
                "thumbnailUrl":file.thumbnailUrl,
                "deleteUrl": file.deleteUrl,
                "deleteType": file.deleteType
            };

            callback(null, descriptor);
        },

        /**
         * Converts a storage descriptor to a file.
         *
         * A file looks like:
         *
         *      {
         *          "id": "",
         *          "name": "picture1.jpg",
         *          "size": 902604,
         *          "url": "http:\/\/example.org\/files\/picture1.jpg",
         *          "thumbnailUrl": "http:\/\/example.org\/files\/thumbnail\/picture1.jpg",
         *          "deleteUrl": "http:\/\/example.org\/files\/picture1.jpg",
         *          "deleteType": "DELETE"
         *      }
         *
         * Since an underlying storage mechanism may be consulted, an async callback hook is provided.
         *
         * By default, the descriptor mimics the file.
         *
         * @param descriptor
         * @param callback function(err, file)
         */
        convertDescriptorToFile: function(descriptor, callback)
        {
            var file = {
                "id": descriptor.id,
                "name": descriptor.name,
                "size": descriptor.size,
                "url": descriptor.url,
                "thumbnailUrl":descriptor.thumbnailUrl,
                "deleteUrl": descriptor.deleteUrl,
                "deleteType": descriptor.deleteType
            };

            callback(null, file);
        },

        /**
         * Extension point for "enhancing" data received from the remote server after uploads have been submitted.
         * This provides a place to convert the data.rows back into the format which the upload control expects.
         *
         * Expected format:
         *
         *    data.result.rows = [{...}]
         *    data.result.files = [{
         *      "id": "",
         *      "path": "",
         *      "name": "picture1.jpg",
         *      "size": 902604,
         *      "url": "http:\/\/example.org\/files\/picture1.jpg",
         *      "thumbnailUrl": "http:\/\/example.org\/files\/thumbnail\/picture1.jpg",
         *      "deleteUrl": "http:\/\/example.org\/files\/picture1.jpg",
         *      "deleteType": "DELETE"*
         *    }]
         *
         * @param fileUploadConfig
         * @param row
         */
        enhanceFiles: function(fileUploadConfig, data)
        {
        },

        /**
         * Preloads data descriptors into files.
         *
         * @param fileUpload
         * @param el
         * @param callback
         */
        preload: function(fileUpload, el, callback)
        {
            var self = this;

            var files = [];

            // now preload with files based on property value
            var descriptors = self.getValue();

            var f = function(i)
            {
                if (i == descriptors.length)
                {
                    // all done
                    callback(files);
                    return;
                }

                self.convertDescriptorToFile(descriptors[i], function(err, file) {
                    if (file)
                    {
                        files.push(file);
                    }
                    f(i+1);
                });
            };
            f(0);
        },

        afterPreload: function(fileUpload, el, files, callback)
        {
            callback();
        },

        /**
         * @override
         *
         * Retrieves an array of descriptors.
         */
        getValue: function()
        {
            if (!this.data)
            {
                this.data = [];
            }

            return this.data;
        },

        /**
         * @override
         *
         * Sets an array of descriptors.
         *
         * @param data
         */
        setValue: function(data)
        {
            this.data = data;
        },

        reload: function(callback)
        {
            var self = this;

            var descriptors = this.getValue();

            var files = [];

            var f = function(i)
            {
                if (i == descriptors.length)
                {
                    // all done

                    var form = $(self.fieldContainer).find('.alpaca-fileupload-input');
                    $(form).fileupload('option', 'done').call(form, $.Event('done'), {
                        result: {
                            files: files
                        }
                    });

                    callback();

                    return;
                }

                self.convertDescriptorToFile(descriptors[i], function(err, file) {
                    if (file)
                    {
                        files.push(file);
                    }
                    f(i+1);
                });
            };
            f(0);
        },
        //__BUILDER_HELPERS

        /**
         * @see Alpaca.ControlField#getTitle
         */
        getTitle: function() {
            return "Upload Field";
        },

        /**
         * @see Alpaca.ControlField#getDescription
         */
        getDescription: function() {
            return "Provides an upload field with support for thumbnail preview";
        },

        /**
         * @see Alpaca.ControlField#getType
         */
        getType: function() {
            return "array";
        },

        /**
         * @see Alpaca.ControlField#getFieldType
         */
        getFieldType: function() {
            return "upload";
        }//__END_OF_BUILDER_HELPERS
    });

    var TEMPLATE = ' \
        <div class="alpaca-fileupload-container {{if cssClasses}}${cssClasses}{{/if}}"> \
            <div class="container-fluid"> \
                <div class="row"> \
                    <div class="col-md-12"> \
                        <div class="btn-group"> \
                            <button class="btn btn-default fileinput-button"> \
                                <i class="glyphicon glyphicon-upload"></i> \
                                <span class="fileupload-add-button">Choose files...</span> \
                                <input class="alpaca-fileupload-input" type="file" name="${name}_files"> \
                                <input class="alpaca-fileupload-input-hidden" type="hidden" name="${name}_files_hidden"> \
                            </button> \
                        </div> \
                    </div> \
                </div> \
                <div class="row alpaca-fileupload-well"> \
                    <div class="col-md-12 fileupload-active-zone"> \
                        <table class="table table-striped"> \
                            <tbody class="files"> \
                            </tbody> \
                        </table> \
                        <p align="center">Click the Choose button or Drag and Drop files here to start...</p> \
                    </div> \
                </div> \
                <div class="row"> \
                    <div class="col-md-12"> \
                        <div id="progress" class="progress"> \
                            <div class="progress-bar progress-bar-success"></div> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div> \
    ';

    var TEMPLATE_UPLOAD = ' \
        <script id="template-upload" type="text/x-tmpl"> \
        {{each(i, file) o.files}} \
            <tr class="template-upload fade"> \
                {{if o.options.showUploadPreview}} \
                <td class="preview"> \
                    <span class="fade"></span> \
                </td> \
                {{else}} \
                <td> \
                </td> \
                {{/if}} \
                <td class="name"><span>${file.name}</span></td> \
                <td class="size"><span>${file.size}</span></td> \
            {{if file.error}} \
                <td class="error" colspan="2"><span class="label label-important">Error</span> ${file.error}</td> \
            {{else}} \
                {{if o.files.valid && !i}} \
                <td> \
                    <div class="progress progress-success progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"> \
                        <div class="progress-bar" style="width:0%;"></div>\
                    </div> \
                </td> \
                <td class="start">\
                {{if !o.options.autoUpload}} \
                    <button class="btn btn-primary"> \
                        <i class="glyphicon glyphicon-upload glyphicon-white"></i> \
                        <span>Start</span> \
                    </button> \
                {{/if}} \
                </td> \
                {{else}} \
                <td colspan="2"></td> \
                <td class="cancel">\
                {{if !i}} \
                    <button class="btn btn-warning"> \
                        <i class="glyphicon glyphicon-ban-circle glyphicon-white"></i> \
                        <span>Cancel</span> \
                    </button> \
                {{/if}} \
                </td> \
                {{/if}} \
            {{/if}} \
                <td></td> \
            </tr> \
        {{/each}} \
        </script> \
    ';

    var TEMPLATE_DOWNLOAD = ' \
        <script id="template-download" type="text/x-tmpl"> \
        {{each(i, file) o.files}} \
            <tr class="template-download fade"> \
            {{if file.error}} \
                <td></td> \
                <td class="name"><span>${file.name}</span></td> \
                <td class="size"><span>${file.size}</span></td> \
                <td class="error" colspan="2"><span class="label label-important">Error</span> ${file.error}</td> \
            {{else}} \
                <td class="preview"> \
                {{if file.thumbnailUrl}} \
                    <a href="${file.url}" title="${file.name}" data-gallery="gallery" download="${file.name}"> \
                        <img src="${file.thumbnailUrl}"> \
                    </a> \
                {{/if}} \
                </td> \
                <td class="name"> \
                    <a href="${file.url}" title="${file.name}" data-gallery="${file.thumbnailUrl}gallery" download="${file.name}">${file.name}</a> \
                </td> \
                <td class="size"><span>${file.size}</span></td> \
                <td colspan="2"></td> \
            {{/if}} \
                <td> \
                    <button class="delete btn btn-danger" data-type="${file.deleteType}" data-url="${file.deleteUrl}" {{if file.deleteWithCredentials}}data-xhr-fields="{\"withCredentials\":true}" {{/if}}> \
                        <i class="glyphicon glyphicon-trash glyphicon-white"></i> \
                        <span>Delete</span> \
                    </button> \
                </td> \
            </tr> \
        {{/each}} \
        </script> \
    ';

    Alpaca.registerTemplate("controlFieldUpload", TEMPLATE);
    Alpaca.registerTemplate("controlFieldUpload_upload", TEMPLATE_UPLOAD);
    Alpaca.registerTemplate("controlFieldUpload_download", TEMPLATE_DOWNLOAD);
    Alpaca.registerFieldClass("upload", Alpaca.Fields.UploadField);

    // https://github.com/private-face/jquery.bind-first/blob/master/dev/jquery.bind-first.js
    // jquery.bind-first.js
    (function($) {
        var splitVersion = $.fn.jquery.split(".");
        var major = parseInt(splitVersion[0]);
        var minor = parseInt(splitVersion[1]);

        var JQ_LT_17 = (major < 1) || (major == 1 && minor < 7);

        function eventsData($el)
        {
            return JQ_LT_17 ? $el.data('events') : $._data($el[0]).events;
        }

        function moveHandlerToTop($el, eventName, isDelegated)
        {
            var data = eventsData($el);
            var events = data[eventName];

            if (!JQ_LT_17) {
                var handler = isDelegated ? events.splice(events.delegateCount - 1, 1)[0] : events.pop();
                events.splice(isDelegated ? 0 : (events.delegateCount || 0), 0, handler);

                return;
            }

            if (isDelegated) {
                data.live.unshift(data.live.pop());
            } else {
                events.unshift(events.pop());
            }
        }

        function moveEventHandlers($elems, eventsString, isDelegate) {
            var events = eventsString.split(/\s+/);
            $elems.each(function() {
                for (var i = 0; i < events.length; ++i) {
                    var pureEventName = $.trim(events[i]).match(/[^\.]+/i)[0];
                    moveHandlerToTop($(this), pureEventName, isDelegate);
                }
            });
        }

        $.fn.bindFirst = function()
        {
            var args = $.makeArray(arguments);
            var eventsString = args.shift();

            if (eventsString) {
                $.fn.bind.apply(this, arguments);
                moveEventHandlers(this, eventsString);
            }

            return this;
        };

    })($);

})(jQuery);
