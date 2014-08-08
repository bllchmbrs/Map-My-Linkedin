/*global define*/

define([
    'underscore',
    'backbone',
    './gmapshelper'
], function (_, Backbone, googleMaps) {
    'use strict';

    var geocodeAddress = googleMaps.geocodeAddress;

    var ConnectionModel = Backbone.Model.extend({
        initialize: function() {
        },

        geocode: function() {
            // this.set({geocodedLocationData : geocodeAddress(this.locationName)});
        },

        defaults: {
            locationName: '',
            people: [],
            geocodedLocationData: {}
        }
    });

    return ConnectionModel;
});
