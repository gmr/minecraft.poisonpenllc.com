define(['backbone', 'underscore', 'status'], function(Backbone, _, Status) {
    return Backbone.View.extend({

        directives: {
            players: {
                marker: {
                    "data-target": function() {
                        return this.name;
                    }
                },
                skin: {
                    src: function() {
                        return 'http://overviewer.org/avatar/' + this.name;
                    }
                }
            }
        },

        events: {
            "click a[href='#close']": "onClose",
            "click a[href='#marker']": "onShowAvatar"
        },

        model: new Status(),

        initialize: function() {
            this.$players = this.$el.find('.player-list');
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'sync', this.render);
            this.model.fetch();
        },

        onClose: function(e) {
            e.preventDefault();
            Backbone.trigger('sidebar:close', true);
        },

        onShowAvatar: function(e) {
            e.preventDefault();
            Backbone.trigger('avatar:click', e.currentTarget['data-target']);
        },

        render: function() {
            var data = this.model.toJSON();
            this.$el.render(data, this.directives);
            if (data.players_online === 0) {
                this.$players.addClass('hidden');
            } else {
                this.$players.removeClass('hidden');
            }
            setTimeout(_.bind(function(){this.model.fetch()}, this), 30000);
        }
    });
});
