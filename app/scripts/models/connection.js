/*global define*/

define([
    'underscore',
    'backbone',
    'jquery',
    '../../testingdump'
], function (_, Backbone, $, testData) {
    'use strict';

    var ConnectionModel = Backbone.Model.extend({
        initialize: function() {
            // this.geocode();
            this.geocodeLocal();
        },

        geocodeLocal: function () {
            // we use geocode local to load test data, this is not run in prod.
        },

        geocode: function() {
            var that = this;
            $.ajax({
                dataType: "json",
                url: "api/",
                data: {address: that.get('locationName')}  
            }).done(function(data){
                that.set({
                    latLong: data['coordinates'], 
                    officialName: data['name'],
                    geocoded:true
                });
            });
        },

        defaults: {
            locationName: '',
            people: [],
            geocoded: false,
            latLong: undefined,
            officialName: ""
        }
    });

    return ConnectionModel;
});
