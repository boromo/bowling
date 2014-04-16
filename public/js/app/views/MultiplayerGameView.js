// MultiplayerGameView.js
// --------------------------------------

define(["jquery", "backbone", "views/View", "models/Model", "text!templates/multiplayerView.html"],

    function($, Backbone, View, Model, template){

        var MultiplayerGameView = View.extend({

            // The DOM Element associated with this view
            el: "#game-multiplayer",

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

        // Returns the MultiplayerGameView
        return MultiplayerGameView;

    }

);