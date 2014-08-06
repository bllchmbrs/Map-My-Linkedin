/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ConnectionModel = Backbone.Model.extend({
        initialize: function() {
        },

        defaults: {
            linkedinLocationName: "",
            linkedinLocationCountryCode: "",
            displayLocationName: "",
            people: [],
            geocodedLocationData: {}
        }
    });

    return ConnectionModel;
});
