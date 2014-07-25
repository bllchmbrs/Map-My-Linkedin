/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ConnectionModel = Backbone.Model.extend({
        defaults: {
            name: '',
            industry: '',
            geocodedLocation: '',
            location: '',
            locationUrl: '',
            map: ''
        },
        
        geocodeLocation: function () {
            if (this.geocodedLocation === '') {
                
            }
        }
    });

    return ConnectionModel;
});
