// Jasmine Unit Testing Suite
// --------------------------
define(["jquery", "backbone", "routers/GameRouter", "views/GameView"],

    function($, Backbone, GameRouter, GameView) {

        // Test suite that includes all of the Jasmine unit tests
        describe("Bowling game : ", function() {
            var router, gameView, players;

            // Instantiates a new Game instance
            router = new GameRouter();

            // Runs before every View spec
            beforeEach(function() {

                // navigate to start view
                router.navigate("start", { trigger: true });
                players = router.gameModel.get("players");

            });

            // Backbone View Suite: contains all tests related to views
            describe("Backbone views", function() {

                it("should contain the correct game view element", function() {
                    var gameView = router.gameView;
                    expect(gameView.$el.selector).toEqual("#game-view");
                });

                it("should contain the correct game menu view element", function() {
                    var menuView = router.menuView;
                    expect(menuView.$el.selector).toEqual("#game-menu");
                });

                it("should contain the correct multiplayer view element", function() {
                    var multiplayerGameView = router.multiplayerGameView;
                    expect(multiplayerGameView.$el.selector).toEqual("#game-multiplayer");
                });

            });


            // Game units
            describe("Game units", function(){

                it("should have at least one player in order to start the game", function(){
                    expect(players.length).toEqual(true);
                });

            });

    });

});