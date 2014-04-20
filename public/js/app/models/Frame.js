// Frame.js
// --------------------------------------

define(["jquery", "backbone", "models/Model"],

    function ($, Backbone, Model) {

        var Frame = Model.extend({

            // Default values for all of the Model attributes
            defaults: {
                frameNum: 1,
                balls: [],
                hasStrike: false,
                hasSpare: false,
                hasBonus: false,
                score: 0,
                pendings: []
            },

            update: function (pins) {
                // if all pins are hit and first ball of the frame
                // then this is a strike hit, go to next frame
                if (pins >= 10 && this.get("balls").length === 0) {
                    this.set("hasStrike", true);
                    this._addPendingObjects(2);
                }
                // if second ball and all 10 pins are hit, it's a spare
                if (this.get("balls").length === 1 && this.get("balls")[0].numOfPins + pins >= 10) {
                    this.set("hasSpare", true);
                    this._addPendingObjects(1);
                }
                // if last frame and has strike or spare, then frame has bonus ball
                if (this.isLastFrame() && (this.get("hasStrike") || this.get("hasSpare"))) {
                    this.set("hasBonus", true);
                }

                // if it's second ball, check to be sure that the
                // that number of pins don't exceed 10
                if (!this.isLastFrame() && this.get("balls").length === 1) {
                    if((this.get("balls")[0].numOfPins + pins) > 10){
                        pins = 10 - this.get("balls")[0].numOfPins;
                    }
                }
                else if(this.isLastFrame() && this.get("balls").length === 1 && !this.get("hasStrike")){
                    if((this.get("balls")[0].numOfPins + pins) > 10){
                        pins = 10 - this.get("balls")[0].numOfPins;
                    }
                }

                // update balls object
                var ballObj = {};
                ballObj.numOfPins = pins;
                this.get("balls").push(ballObj);

                // update score
                this._updateScore(pins);

                return this;
            },

            _updateScore: function (pins) {
                this.set("score", this.get("score") + pins, {validate: true});
            },

            /**
             * Creates and ads pending objects to pendings array
             * @param count number of pending objects to be created
             * @private
             */
            _addPendingObjects: function (count) {
                for (var i = 0; i < count; i++) {
                    var pendingObj = {};
                    pendingObj.score = null;
                    pendingObj.waiting = true;
                    this.get("pendings").push(pendingObj);
                }
            },

            /**
             * Method for checking is there any pending objects left
             * @returns {boolean}
             * @private
             */
            _isPending: function () {
                var waiting = false;
                if (_.where(this.get("pendings"), {waiting: true}).length > 0)
                    waiting = true;
                return waiting;
            },

            /**
             * Method for updating pending object
             * @param pins to be added on pending object
             * @returns {boolean} is still pending
             */
            updatePending: function (pins) {
                if (this._isPending()) {
                    // update only first object
                    var pendingObj = _.where(this.get("pendings"), {waiting: true})[0];
                    // score property holds the the numer of pins
                    pendingObj.score = pins;
                    pendingObj.waiting = false;

                    // update score with pending object pins
                    this._updateScore(pins);
                }
                // return is still pending
                return this._isPending();
            },
            isLastFrame: function () {
                return this.get("frameNum") === 10;
            }

        });

        // Returns the Frame class
        return Frame;

    }

);