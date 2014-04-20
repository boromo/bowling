// Frames.js
// -------------
define(["jquery", "backbone", "collections/Collection", "models/Frame"],

    function ($, Backbone, Collection, Frame) {

        var Frames = Collection.extend({

            // Tells the Backbone Collection that all of it's models will be of type Frame (listed up top as a dependency)
            model: Frame,
            numOfFrames: 10,
            lastScore: 0,

            addNewFrame: function () {
                if (this.length >= this.numOfFrames) {
                    return false;
                }
                var frame = new Frame({
                    frameNum: this.length + 1,
                    balls: [],
                    hasStrike: false,
                    hasSpare: false,
                    hasBonus: false,
                    score: 0,
                    pendings: []
                });
                this.add(frame);
            }
        });

        // Returns the Frames collection class
        return Frames;

    }

);