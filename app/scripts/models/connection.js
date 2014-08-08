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
            var gcode = geocodeAddress(this.get("locationName"));
            console.log("Executing at: " + new Date());
            if (gcode !== true) {
                console.log("-------------------------------------");
                console.log(this.get('locationName') + " failed");
                console.log(gcode);
            // } else {
            //     this.set({geocoded: true});
            //     this.set({geocodedLocation : gcode});
            }
        },

        defaults: {
            locationName: '',
            people: [],
            geocoded: false,
            geocodedLocation: {}
        }
    });

    return ConnectionModel;
});
