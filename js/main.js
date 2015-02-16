requirejs.config({
    baseUrl: 'js',
    paths: {
        backbone: 'backbone',
        bootstrap: 'bootstrap.min',
        underscore: 'underscore-min',
        jquery: 'jquery.min',
        transparency: 'transparency.min'
    },
    shim: {
         backbone: {
             deps: ['underscore', 'jquery'],
             exports: 'Backbone'
         },
         bootstrap: {
             deps: ['jquery'],
             exports: 'Bootstrap'
         },
         transparency: {
             deps: ['jquery']
         },
         underscore: {
             exports: '_'
         }
    }
});

require(['jquery', 'underscore', 'backbone', 'bootstrap', 'transparency', 'sidebar'],
        function($, _, Backbone, Bootstrap, Transparency, Sidebar) {

    jQuery.fn.render = Transparency.jQueryPlugin;

    var $sidebar = $('#sidebar');
    var $openbar = $('#openbar');
    var $overviewer = $('#overviewer');

    var sidebar = new Sidebar({el: document.getElementById('sidebar')});

    var $iframe = $('iframe');
    $iframe.attr('src', $iframe.attr('src') + document.location.hash);
    $(window.frames[0]).on('hashchange', function(e){
        document.location.hash = e.currentTarget.location.hash;
    });


    Backbone.on('sidebar:close', function(){
        $sidebar.addClass('hidden');
        $openbar.removeClass('hidden');
        $overviewer.css('left', '40px');
    });

    $openbar.find('a').on('click', function(e){
        $openbar.addClass('hidden');
        $sidebar.removeClass('hidden');
        $overviewer.css('left', '300px');
    });

    Backbone.on('avatar:click', function(username) {
        var iframe = $iframe[0].contentWindow;
        var showPopup = true;
        if (iframe.overviewer.collections.infoWindow !== undefined && iframe.overviewer.collections.infoWindow !== null) {
            if (iframe.overviewer.collections.infoWindow.content.indexOf(username) > -1) showPopup = false;
            iframe.overviewer.collections.infoWindow.close();
            iframe.overviewer.collections.infoWindow = null;
        }
        if (showPopup === true) {
            var marker = _(iframe.markers['normalrender'][0].markerObjs).find(function(y){return y.icon === "http://overviewer.org/avatar/" + username});
            new iframe.google.maps.event.trigger(marker, "click");
        }
    });

});
