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
            if (this.get('locationName') == ""){
                console.log("-----");
                console.log(this.get("locationName"));
                console.log(this);
            }
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
