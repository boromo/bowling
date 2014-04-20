// Player.js
// --------------------------------------

define(["jquery", "backbone", "models/Model", "collections/Frames"],

    function ($, Backbone, Model, Frames) {

        // Creates a new Backbone Model class object
        var Player = Model.extend({

            // Default values for all of the Model attributes
            defaults: {
                name: null,
                firstName:"",
                lastName:"",
                score: 0,
                activeFrame: null
            },

            gameOver: false,

            // Model Constructor
            initialize: function () {
                // create frames collection
                this.frames = new Frames();
                this.listenTo(this.frames, "add", this._onFrameAdded);
            },

            /**
             * Creates new game Frame
             */
            newFrame: function () {
                this.frames.addNewFrame();
            },

            /**
             * And I roll, and I roll, and I ....
             * @param {Number} how many pins where hit
             * @param {Array} optional array of pins that are hit
             */
            rollTheBall: function (pinsCount, pins) {
                // entering point of pins, validate and alter
                // if need to match rules
                if(isNaN(pinsCount)) pinsCount = 0;
                if(pinsCount > 10) pinsCount = 10;

                var activeFrame = this.get("activeFrame");

                activeFrame.update(pinsCount);

                // update frames scores after each ball
                this._updateFramesScores(pinsCount);

                this.trigger("ballRolled", this);

                if(!activeFrame.get("hasBonus") && activeFrame.get("hasStrike")){
                    this.trigger("frameEnd", this);
                }
                else if(!activeFrame.isLastFrame() && !activeFrame.get("hasBonus") && activeFrame.get("balls").length === 2){
                    this.trigger("frameEnd", this);
                }
                else if((activeFrame.get("hasBonus") && activeFrame.get("balls").length === 3) || (activeFrame.isLastFrame() && !activeFrame.get("hasBonus") && activeFrame.get("balls").length === 2)){
                    this.gameOver = true;
                    this.trigger("frameEnd", this);
                }

            },

            _updateFramesScores: function (pins) {
                var score = 0, scores = [];
                _.each(this.frames.models, function (frame) {
                    // if frame pending score and the score is not from same frame
                    if(frame._isPending() && this.get("activeFrame") !== frame){
                        frame.updatePending(pins);
                    }
                    score += frame.get("score");
                    scores.push(score);
                }, this);
                this.set("score", score);
            },

            _onFrameAdded: function (frame) {
                this.set("activeFrame", frame);
            },

            restart: function(){
                this.gameOver = false;
                this.set("score", 0);
                this.set("activeFrame", null);
                this.frames = new Frames();
                this.listenTo(this.frames, "add", this._onFrameAdded);
            }

        });

        // Returns the Player class
        return Player;

    }

);