// MultiplayerGameView.js
// --------------------------------------

define(["jquery", "backbone", "views/View", "models/Model", "text!templates/multiplayerView.html", "text!templates/playersTable.html"],

    function ($, Backbone, View, Model, template, playersTable) {

        var MultiplayerGameView = View.extend({

            // The DOM Element associated with this view
            el: "#game-multiplayer",

            // View Event Handlers
            events: {
                "click #add-player-btn": "_onAddPlayerClick",
                "click #play-btn" : "_onStartGame",
                "click #back-to-menu-btn": "_onBackToMenu"
            },

            initialize: function () {
                this.listenTo(this.model, "change:currentView", this._onCurrentViewChangeHandler);
                this.listenTo(this.model, "playerAdded", this._onGameModelPlayerAdded);
            },

            // Renders the view's template to the UI
            render: function () {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                this._updatePlayersTable();

                // Maintains chainability
                return this;

            },

            _onAddPlayerClick: function (event) {
                event.preventDefault();
                var firstName = this.$el.find("#firstName").val();
                var lastName = this.$el.find("#lastName").val();
                var username = this.$el.find("#username").val();

                if (username != "") {
                    this.model.addPlayer(username, firstName, lastName);
                    this.$el.find("#firstName").val("").focus();;
                    this.$el.find("#lastName").val("");
                    this.$el.find("#username").val("");
                }

                return false;
            },

            _onGameModelPlayerAdded: function () {
                this._updatePlayersTable();
            },

            _updatePlayersTable: function () {
                var players = [];
                _.each(this.model.get("players"), function (player) {
                    var playerObj = player.toJSON();
                    playerObj.frames = player.frames.toJSON();
                    playerObj.activeClass = "";
                    players.push(playerObj);
                }, this);
                console.log(players)
                var playersTableTemplate = _.template(playersTable, {players: players});
                this.$el.find("#playersTable").html(playersTableTemplate);
            },

            _onStartGame: function(){
                location.href = "#start";
            },

            _onBackToMenu: function(event){
                event.preventDefault();
                location.href = "";
                return false;
            }

        });

        // Returns the MultiplayerGameView
        return MultiplayerGameView;

    }

);