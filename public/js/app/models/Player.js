// Player.js
// --------------------------------------

define(["jquery", "backbone", "models/Model", "collections/Frames"],

    function($, Backbone, Model, Frames) {

        // Creates a new Backbone Model class object
        var Player = Model.extend({

            // Model Constructor
            initialize: function(){
                // create frames collection
                this.frames = new Frames();

            },

            // Default values for all of the Model attributes
            defaults: {
                name:null
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Player class
        return Player;

    }

);