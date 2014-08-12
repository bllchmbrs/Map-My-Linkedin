/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    '../models/gmapshelper'
], function ($, _, Backbone, JST, googleMaps) {
    'use strict';

    var ConnectionmappedView = Backbone.View.extend({
        // template: JST['app/scripts/templates/connectionMapped.ejs'],

        tagName: 'div',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            var lat, lng, latlng, mapPoint, marker;
            var that = this;
            latlng = this.model.get('latLng');
            lat = latlng[0];
            lng = latlng[1];
            mapPoint = googleMaps.mapsLatLng(lat,lng);
            marker = new google.maps.Marker({
                position: mapPoint,
                map: googleMaps.map // could consider making this a model variable
            });
            googleMaps.mapsAddEventListener(marker, 'click', function(){
                that.model.set({'featured': true});
            });

        }
    });

    return ConnectionmappedView;
});
