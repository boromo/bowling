// GameModel.js 
// --------------------------------------

define(["underscore", "jquery", "backbone", "models/Model", "models/Player"],
    function (_, $, Backbone, Model, Player) {

        // Creates a new Backbone Model class object
        var GameModel = Model.extend({
            // Default values for all of the Model attributes
            defaults: {
                currentView: null,
                players: [],
                activePlayer: null
            },

            // Model Constructor
            initialize: function () {
                this.listenTo(this, "change:activePlayer", this._onActivePlayerChanged);
            },

            addPlayer: function (name, firstName, lastName) {
                // make sure that player has some name
                if (name === undefined) {
                    name = "Player";
                }

                if(!this._usernameAlreadyExists(name)){
                    var player = new Player({name: name, firstName:firstName, lastName:lastName, score:0, activeFrame: null});
                    this.listenTo(player, "frameEnd", this._onPlayerFrameEnd);
                    this.listenTo(player, "gameOver", this._onPlayerGameOver);
                    this.listenTo(player, "ballRolled", this._onPlayerBallRolled);
                    this.get("players").push(player);
                    this.trigger("playerAdded", player, this);

                    return player;
                }
            },
            _usernameAlreadyExists: function(name){
                var exists = false;
                if(this.get("players").length === 0){
                    return exists;
                }else{
                    _.each(this.get("players"), function (player) {
                        if(player.get("name") === name){
                            exists = true;
                        }
                    });
                }
                return exists;
            },
            startGame: function () {
                // make sure that we have a least one player in game
                if (!this.get("players").length) {
                    this.addPlayer("Player 1");
                }

                // call nextPlayer method to init the player game
                this.nextPlayer();

                return this;
            },

            restartGame: function(){
                _.each(this.get("players"), function (player, index) {
                    player.restart();
                    this.set("activePlayer", null, {silent:true});
                }, this);

                this.startGame();
            },

            endGame: function () {
                this.reset();
                return this;
            },
            nextPlayer: function () {
                var activePlayer = this.get("activePlayer"), players = this.get("players");

                // if there are no players
                if (players.length === 0) return;

                if (activePlayer === null) {
                    this.set("activePlayer", players[0]);
                    return;
                }

                // same player
                if (players.length === 1 && activePlayer !== null) {
                    this._updateActivePlayerFrame();
                    return;
                }
                else {
                    _.each(players, function (player, index) {
                        if (player === activePlayer) {
                            if (typeof players[index + 1] !== 'undefined') {
                                // if index exits increment player index
                                this.set("activePlayer", players[index + 1]);
                                return;
                            } else {
                                // otherwise set the active player as first
                                this.set("activePlayer", players[0]);
                                return;
                            }
                        }
                    }, this);
                }
            },

            /**
             * Active player changed
             * @private
             */
            _onActivePlayerChanged: function () {
                // after active player changed call to update players frame
                this._updateActivePlayerFrame();
            },

            _updateActivePlayerFrame: function () {
                // call next frame on active player
                this.get("activePlayer").newFrame();
            },

            /**
             * Player finished the frame
             * @private
             */
            _onPlayerFrameEnd: function () {
                if(!this.isGameOver()){
                    // call to change player
                    this.nextPlayer();
                }else{
                    this.gameOver = true;
                    this.trigger("gameOver", this);
                }
            },

            /**
             * Player finished his game
             * @private
             */
            _onPlayerGameOver: function(player){
                this.isGameOver();
                console.log(player.get("score"));
                this.nextPlayer();
            },

            _onPlayerBallRolled: function(player){
                this.trigger("ballRolled", player, this);
            },

            isGameOver: function(){
                var gameOver = true;
                _.each(this.get("players"), function (player, index) {
                    if(player.gameOver === false){
                        gameOver = false;
                    }
                }, this);
                return gameOver;
            },

            reset: function () {
                _.each(this.get("players"), function (player, index) {
                    // remove event listeners
                    player.stopListening();
                }, this);
                this.set("players", []);
                // silently remove active player
                this.set("activePlayer", null, {silent: true});

            }

        });

        // Returns the Model class
        return GameModel;

    }

);
