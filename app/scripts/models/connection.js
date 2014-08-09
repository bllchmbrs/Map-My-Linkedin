/*global define*/

define([
    'underscore',
    'backbone',
    'jquery'
], function (_, Backbone, $) {
    'use strict';

    var ConnectionModel = Backbone.Model.extend({
        initialize: function() {
            this.geocode();
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
