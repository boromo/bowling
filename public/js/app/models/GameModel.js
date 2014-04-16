// GameModel.js 
// --------------------------------------

define(["jquery", "backbone", "models/Model"],

    function($, Backbone, Model) {

        // Creates a new Backbone Model class object
        var GameModel = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {
                currentView: null
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return GameModel;

    }

);
