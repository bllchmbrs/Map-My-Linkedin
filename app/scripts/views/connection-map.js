/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ConnectionMapView = Backbone.View.extend({
        initialize: function () {
            this.render();
        },

        render: function () {
            console.log(this.model);
            this.marker = new google.maps.Marker({
                position: this.model.get("geocodedLocation"),
                map: this.model.get("map"),
                title: "Hello"
            });
            console.log(this.marker);
        }
    });

    return ConnectionMapView;
});
