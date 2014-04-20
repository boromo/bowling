// BowlingGame.js 
// --------------------------------------

define(["jquery", "backbone", "routers/DesktopRouter", "models/GameModel", "views/GameMenu", "views/GameView", "views/MultiplayerGameView"],
	function($, Backbone, DesktopRouter, GameModel, GameMenu, GameView, MultiplayerGameView) {

		var GameRouter = DesktopRouter.extend({
			
			gameModel:null,

			initialize: function() {
				this.gameModel = new GameModel();

                this._initViews();

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
                this._changeModelCurrentView(this.menuView);
			},
			onStartGame: function(){
                // start route
                this._changeModelCurrentView(this.gameView);
			},
			onMultiplayerGame: function(){
                // multiplayer route
                this._changeModelCurrentView(this.multiplayerGameView);
			},
			onGameExit: function(){
				
			},
            _changeModelCurrentView: function(newView){
                this.gameModel.set("currentView", newView);
            },
            _initViews: function(){
                this.menuView = new GameMenu({model:this.gameModel});
                this.gameView = new GameView({model:this.gameModel});
                this.multiplayerGameView = new MultiplayerGameView({model:this.gameModel});
            }

		});

		// Returns the GameRouter class
		return GameRouter;

	}

);