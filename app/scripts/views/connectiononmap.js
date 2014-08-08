/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../models/gmapshelper'
], function ($, _, Backbone, googleMaps) {
    'use strict';

    var ConnectiononmapView = Backbone.View.extend({
        events: {}, // need to add our "add in geocode value"

        initialize: function () {
            // this.listenTo(this.model, 'change', this.render);
            // this.listenTo(this.model, 'geocode', this.render); // Think it will be something like this
        },

        render: function () {
            console.log(this.model);
            this.marker = new google.maps.Marker({
                position: this.model.get('geocodedLocation'),
                map: this.model.get('map'),
                title: 'Hello'
            });
            console.log(this.marker);
        }
    });

    return ConnectiononmapView;
});
