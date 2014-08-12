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
            this.on('change:updatedPeople', this.calculate);
            this.on('change:featured', this.setFeaturedPerson);
            this.calculate();
        },

        calculate: function(){
            this.set({
                numberOfPeople: this.get('people').length,
                featuredPerson: _.max(this.get('people'), function(person){
                    return person.get('numConnections');
                })
            });
        },

        appendToPeople: function(person){
            var peeps = this.get('people');
            var timesUpdated = this.get('updatedPeople');
            peeps.push(person);
            this.set({
                people: peeps,
                updatedPeople: timesUpdated + 1
            });
        },

        setFeaturedPerson: function(){
            if (this.get('featured')) {
                this.get('featuredPerson').set({featured:true});
            } else {
                this.get('featuredPerson').set({featured:false});
            }
        },

        geocodeLocal: function () {
            // we use geocode local to load test data, this is not run in prod.
            var data;
            data = testData[this.get('locationName')];
            this.set({
                latLng: data.coordinates,
                officialName: data.formatted_address,
                geocoded:true
            });
        },

        // geocode: function() {
        //     var that = this;
        //     $.ajax({
        //         dataType: 'json',
        //         url: 'api/',
        //         data: {address: that.get('locationName')}  
        //     }).done(function(data){
        //         that.set({
        //             latLng: data['coordinates'], 
        //             officialName: data['formatted_address'],
        //             geocoded:true
        //         });
        //     });
        // },

        defaults: {
            locationName: '',
            people: [],
            geocoded: false,
            latLng: undefined,
            officialName: '',
            featured:false,
            numberOfPeople: 0,
            updatedPeople: 0,
            featuredPerson: undefined
        }
    });

    return ConnectionModel;
});
