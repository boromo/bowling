// Jasmine Unit Testing Suite
// --------------------------
define(["jquery", "backbone", "routers/GameRouter", "views/GameView"],
	function($, Backbone, GameRouter, GameView) {

		// Test suite that includes all of the Jasmine unit tests
		describe("Bowling game : ", function() {
			var router, gameView, players;

            function rollBalls(balls, pins) {
                for (var i = 0; i < balls; i ++) {
                    this.rollTheBall(pins);
                }
            }

			// Instantiates a new Game instance
			router = new GameRouter();

			// Runs before every View spec
			beforeEach(function() {

				// navigate to start view
				router.navigate("start", {trigger: true});
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
			describe("Game units", function() {

				it("should have at least one player in order to start the game", function() {
                    router.gameModel.startGame();
                    expect(players.length).not.toEqual(0);
				});

                it("Case with one player that hits, strike. Next frame should assigned to same player", function() {
                    var player1 = router.gameModel.addPlayer("Petra");
                    router.gameModel.startGame();

                    player1.rollTheBall(10);
                    expect(router.gameModel.get("activePlayer")).toEqual(player1);
                });

                it("If player does not hit the strike the frame should stay the same", function() {
                    var player1 = router.gameModel.addPlayer("Petra");
                    router.gameModel.startGame();

                    player1.rollTheBall(5);
                    expect(router.gameModel.get("activePlayer").get("activeFrame").get("frameNum")).toEqual(1);
                });


                it("case with two players switched after the first finishes the frame with the strike", function() {
                    var player1 = router.gameModel.addPlayer("Petra");
                    var player2 = router.gameModel.addPlayer("Dora");
                    router.gameModel.startGame();

                    player1.rollTheBall(10);

                    expect(router.gameModel.get("activePlayer")).toEqual(player2);
                });

                it("case with two players switched after the first finishes the frame with the spare", function() {
                    var player1 = router.gameModel.addPlayer("Petra");
                    var player2 = router.gameModel.addPlayer("Dora");
                    router.gameModel.startGame();

                    player1.rollTheBall(9);
                    player1.rollTheBall(1);

                    expect(router.gameModel.get("activePlayer")).toEqual(player2);
                });

                it("Perfect game, 300 score", function() {
                    var player1 = router.gameModel.addPlayer("Petra");
                    router.gameModel.startGame();

                    rollBalls.call(player1, 12, 10);
                    expect(router.gameModel.get("activePlayer").get("score")).toEqual(300);
                });

                it("Expect a score to be 133", function() {
                    var player1 = router.gameModel.addPlayer("Petra");
                    router.gameModel.startGame();

                    player1.rollTheBall(1);
                    player1.rollTheBall(4);

                    player1.rollTheBall(4);
                    player1.rollTheBall(5);

                    player1.rollTheBall(6);
                    player1.rollTheBall(4);

                    player1.rollTheBall(5);
                    player1.rollTheBall(5);

                    player1.rollTheBall(10);

                    player1.rollTheBall(0);
                    player1.rollTheBall(1);

                    player1.rollTheBall(7);
                    player1.rollTheBall(3);

                    player1.rollTheBall(6);
                    player1.rollTheBall(4);

                    player1.rollTheBall(10);

                    player1.rollTheBall(2);
                    player1.rollTheBall(8);
                    player1.rollTheBall(6);

                    expect(router.gameModel.get("activePlayer").get("score")).toEqual(133);
                });

                afterEach(function() {
                    router.gameModel.endGame();
                });

			});

		});

	});