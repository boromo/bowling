// BowlingLane.js
// --------------------------------------

define(["jquery", "backbone", "views/View", "text!templates/bowlingLaneTemplate.html", "TweenMax"],

    function ($, Backbone, View, template) {

        var BowlingLane = View.extend({

            slide: true,
            progressMaxWidth: 0,

            // View Event Handlers
            events: {
                "click .release": "onReleaseBtnClick"
            },

            // View constructor
            initialize: function () {
                this.render();
                $(window).on("resize", _.bind(this._onResize, this));
            },

            // Renders the view's template to the UI
            render: function () {
                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                this.startPrecisionSlider();

                // Maintains chainability
                return this;

            },

            onReleaseBtnClick: function(){
                var barWidth = this.$el.find(".precisionBar").width();
                var percentage = barWidth / this.progressMaxWidth;
                this.hitThePins(percentage);
            },

            hitThePins: function (precision) {
                var pinsHitCount = Math.round(precision * 10);
                this.trigger("pinsHit", pinsHitCount);
            },
            startPrecisionSlider: function () {
                var element = this.$el.find(".precisionBar");
                this.slide = true;
                this.progressMaxWidth = this.$el.find(".progress").width();
                TweenMax.fromTo(element, 0.5, {width:0}, {width:this.progressMaxWidth+"px", repeat:-1, yoyo:true, ease:Power3.easeIn});
            },

            _onResize: function(){
                this.startPrecisionSlider();
            }
        });

        // Returns the BowlingLane
        return BowlingLane;

    }

);