// Jasmine Unit Testing Suite
// --------------------------
define(["jquery", "backbone", "routers/GameRouter", "views/GameView"],

    function($, Backbone, GameRouter, GameView) {

        // Test suite that includes all of the Jasmine unit tests   
        describe("Bowling game : ", function() {

            // Backbone View Suite: contains all tests related to views
            describe("Backbone views", function() {

                // Runs before every View spec
                beforeEach(function() {

                    // Instantiates a new Game instance
                    this.router = new GameRouter();

                });

                it("should contain the correct game view element", function() {

                    this.gameView = new GameView();

                    expect(this.gameView.$el.selector).toEqual("#game-view");

                });

            });

    });

});