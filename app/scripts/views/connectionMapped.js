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
        template: JST['app/scripts/templates/connectionMapped.ejs'],

        tagName: 'div',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            var lat, lng, latlng, mapPoint, infoWindow, marker;
            //I think some of this logic should live in the model...although it is stateworthy
            // If we keep it here it's completely naive to google maps
            // which is probably the way to do it. Now we can swap out google maps
            // for another provider if we so desire.
            latlng = this.model.get("latLng");
            lat = latlng[0]
            lng = latlng[1]
            mapPoint = googleMaps.mapsLatLng(lat,lng);
            // This next part is where we'll have to fill out our template
            infoWindow = googleMaps.mapsInfoWindow(this.template(this.model.toJSON()));

            marker = new google.maps.Marker({
                position: mapPoint,
                map: googleMaps.map
            });
            googleMaps.mapsAddEventListener(marker, 'click', function(){
                infoWindow.open(googleMaps.map, marker);
            })

        }
    });

    return ConnectionmappedView;
});
