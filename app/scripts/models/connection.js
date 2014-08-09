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
            // console.log("here");
            console.log(this.get('locationName'));
            // $.ajax({
            //     dataType: "json",
            //     url: "api/",
            //     data: {address: this.get('locationName')}
            // }).done(function(data) {
            //     console.log("hello");
            //     console.log(data);
            //     console.log("fail " + textStatus + " " + error);
            // }).fail(function(){
            //     console.log("failed");
            // });
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
