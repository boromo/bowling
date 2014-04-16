// View.js
// -------
define(["jquery", "backbone", "models/Model", "text!templates/heading.html"],

    function($, Backbone, Model, template){

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",

            // View constructor
            initialize: function() {
                this.listenTo(this.model, "change:currentView", this._onCurrentViewChangeHandler);
            },

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

            },
            _onCurrentViewChangeHandler: function(currentView){
                console.log("HEllo from on current view changed");
                if(this === this.model.get("currentView")){
                    this.render();
                }else{
                    this.$el.html("");
                }
            }

        });

        // Returns the View class
        return View;

    }

);