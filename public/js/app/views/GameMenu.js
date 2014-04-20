// GameView.js 
// --------------------------------------

define(["jquery", "backbone", "views/View", "models/Model", "text!templates/gameMenu.html"],

    function ($, Backbone, View, Model, template) {

        var GameMenu = View.extend({

            // The DOM Element associated with this view
            el: "#game-menu",

            // View Event Handlers
            events: {
                "click #start-game": "onStartGameClick",
                "click #start-multiplayer": "onMultiplayerStartGameClick"
            },

            // Renders the view's template to the UI
            render: function () {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            },

            onStartGameClick: function (event) {
                location.href = "#start";
            },
            onMultiplayerStartGameClick: function (event) {
                location.href = "#multiplayer";
            }

        });

        // Returns the GameMenu
        return GameMenu;

    }

);