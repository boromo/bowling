// GameView.js 
// --------------------------------------

define(["jquery", "backbone", "views/View", "models/Model", "views/BowlingLane", "text!templates/gameView.html", "text!templates/playersTemplate.html", "text!templates/gameOverModal.html", "bootstrap"],

    function ($, Backbone, View, Model, BowlingLane, template, playersTemplate, gameOverModal) {

        var GameView = View.extend({

            // The DOM Element associated with this view
            el: "#game-view",
            playersEl: "#players",
            gameOverModalEl: "#modal",
            gameOver: false,

            // View Event Handlers
            events: {
                "click #input-pins-btn": "_onInputPinsClick",
                "click .restart-btn": "onRestartClick",
                "click #back-to-menu-btn": "_onBackToMenu"
            },

            // View constructor
            initialize: function () {
                this.listenTo(this.model, "change:currentView", this._onCurrentViewChangeHandler);
                this.listenTo(this.model, "change:activePlayer", this._onActivePlayerChanged);
                this.listenTo(this.model, "ballRolled", this._onPlayerBallRolled);
                this.listenTo(this.model, "gameOver", this._onGameOver);
            },

            onPinsHit: function(pinsHitCount){
                if (this.gameOver)
                    return;

                var player = this.model.get("activePlayer");
                player.rollTheBall(pinsHitCount);
            },

            _onInputPinsClick: function(){
                var pinsHitCount = parseInt(this.$el.find("#pins").val());
                this.onPinsHit(pinsHitCount);
            },

            _onPlayerBallRolled: function (player) {
                if (player.gameOver)
                    return;

                this.updatePlayers();
            },

            _onCurrentViewChangeHandler: function (currentView) {
                if (this === this.model.get("currentView")) {
                    this.render();
                    this.startNewGame();
                } else {
                    this.$el.html("");
                }
            },

            startNewGame: function () {
                this._updateUIonGameStart();
                this.gameOver = false;
                this.model.startGame();
            },

            _restartTheGame: function(){
                this._updateUIonGameStart();
                this.gameOver = false;
                this.model.restartGame();
            },

            _onActivePlayerChanged: function (players) {
                this.updatePlayers(players);
            },

            updatePlayers: function () {
                var players = [];
                _.each(this.model.get("players"), function (player) {
                    var playerObj = player.toJSON();
                    playerObj.frames = player.frames.toJSON();
                    playerObj.activeClass = "";

                    if (player === this.model.get("activePlayer")) {
                        playerObj.activeClass = "active";
                    }

                    players.push(playerObj);
                }, this);
                //console.log(players);
                this.template = _.template(playersTemplate, {players: players});
                this.$el.find(this.playersEl).html(this.template);
            },

            // Renders the view's template to the UI
            render: function () {
                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                var bowlingLane = new BowlingLane({el:"#bowlingLane"});
                this.listenTo(bowlingLane,"pinsHit", this.onPinsHit);

                // Maintains chainability
                return this;
            },

            onRestartClick: function(event){
                event.preventDefault();
                this._restartTheGame();
                return false;
            },

            _updateUIonGameStart: function () {
                this.$el.find("#bowlingLane").show();
                this.$el.find("#rollTheBallControls").show();
                this.$el.find("#gameOverControls").hide();
            },

            _onGameOver: function () {
                this.gameOver = true;
                this.updateUIafterGameOver();
                this.showGameOverModal();
            },

            updateUIafterGameOver: function () {
                this.$el.find("#bowlingLane").hide();
                this.$el.find("#rollTheBallControls").hide();
                this.$el.find("#gameOverControls").show();
            },

            showGameOverModal: function () {
                var winner = "", score = 0;
                _.each(this.model.get("players"), function (player) {
                    if (player.get("score") > score) {
                        winner = player.get("name");
                        score = player.get("score");
                    }
                }, this);
                this.template = _.template(gameOverModal, {winner: winner});
                this.$el.find(this.gameOverModalEl).html(this.template);

                $('#gameOverModal').modal();
            },

            _onBackToMenu: function(event){
                event.preventDefault();
                location.href = "";
                return false;
            }

        });

        // Returns the GameView
        return GameView;

    }

);