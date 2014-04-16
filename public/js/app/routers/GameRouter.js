// BowlingGame.js 
// --------------------------------------

define(["jquery", "backbone", "routers/DesktopRouter", "models/GameModel", "views/GameView"],
	function($, Backbone, DesktopRouter, GameModel, GameView) {

		var GameRouter = DesktopRouter.extend({
			
			gameModel:null,
			
			initialize: function() {
				this.gameModel = new GameModel();
				var gameView = new GameView({model:this.gameModel});
				// Tells Backbone to start watching for hashchange events
				Backbone.history.start();

			},
			// All of your Backbone Routes (add more)
			routes: {
				// When there is no hash on the url, the home method is called
				"": "index",
				"start": "onStartGame",
				"multiplayer": "onMultiplayerGame",
				"exit": "onGameExit"
			},
			index: function() {
				// when index show game menu
				console.log("Hello from Bowling game index");

			},
			onStartGame: function(){
				
			},
			onMultiplayerGame: function(){
				
			},
			onGameExit: function(){
				
			}

		});

		// Returns the GameRouter class
		return GameRouter;

	}

);