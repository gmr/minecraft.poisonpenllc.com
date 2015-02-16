define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        url: 'http://minecraft.poisonpenllc.com/status',
        defaults: {
            desc: '',
            online: false,
            hostname: document.location.hostname,
            port: 25565,
            players: [],
            players_max: 0,
            players_online: 0,
            version: '1.8.1'
        }
    });
});
