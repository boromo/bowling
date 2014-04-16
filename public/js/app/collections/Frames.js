// Frames.js
// -------------
define(["jquery","backbone","collections/Collection", "models/Frame"],

    function($, Backbone, Collection, Frame) {

        var Frames = Collection.extend({

            // Tells the Backbone Collection that all of it's models will be of type Frame (listed up top as a dependency)
            model: Frame

        });

        // Returns the Frames collection class
        return Frames;

    }

);