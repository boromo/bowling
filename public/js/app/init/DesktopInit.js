// DesktopInit.js
// --------------

// Includes Desktop Specific JavaScript files here (or inside of your Desktop router)
require(["jquery", "backbone", "routers/GameRouter", "jqueryui", "bootstrap", "backbone.validateAll"],

  function($, Backbone, GameRouter) {

    // Instantiates a new Game Router instance
    new GameRouter();

  }

);