// Frame.js
// --------------------------------------

define(["jquery", "backbone", "models/Model"],

    function($, Backbone, Model) {

        var Frame = Model.extend({

            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {

            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Frame class
        return Frame;

    }

);