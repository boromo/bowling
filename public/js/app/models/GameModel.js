// GameModel.js 
// --------------------------------------

define(["jquery", "backbone", "models/Model", "models/Player"],

    function($, Backbone, Model, Player) {

        // Creates a new Backbone Model class object
        var GameModel = Model.extend({

            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {
                currentView: null,
                players:[]
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },

            addPlayer: function(name){
                if(name === undefined){
                    name = "Player";
                }
                var player = new Player({name:name})
                this.get("players").push(player);

                return this;
            },

            startGame: function(){
                console.log("Model start game");
            },

            reset: function(){
                this.set("players", []);
            }

        });

        // Returns the Model class
        return GameModel;

    }

);
