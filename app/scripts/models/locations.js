/*global define*/

define(function(require){
    'use strict';
    var $ = require('jquery');
    var _ = require('underscore');
    var googleMaps = require('./gmapshelper');
    var Locations = function () {

        var _locations = [];
        // example: {
        //     originalCountryCode: 'us',
        //     originalName: 'San Francisco Bay Area', 
        //     locationName: 'San Francisco Bay'
        //     geocodedData: {
        //         data: is_here
        //     }
        // }

        function cleanLocationName (name) {
            var nameAsList = name.split(' ');
            delete nameAsList[nameAsList.indexOf('Greater')];
            delete nameAsList[nameAsList.indexOf('Area')];
            var address = nameAsList.join(' ');
            return address;
        }

        function getLocationData (address) {
            googleMaps.geocoder.geocode({'address': address}, function (results, status){
                 if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results);
                 }
                 else {
                    console.log(status);
                 }
            });
        }

        return {
            addOrGetByLocation: function (linkedinlocation){
                if (!linkedinlocation) {
                    return []; // if no location ignore
                }

                var countryCode = linkedinlocation.country.code;
                var locationName = linkedinlocation.name;

                if (_.where(_locations, {
                    originalName: locationName,
                    originalCountryCode: countryCode
                })[0] === undefined) {
                    console.log('pushing ' + locationName + ' location...');
                    var tempLocationUrl = cleanLocationName(locationName);
                    _locations.push({
                        originalName: locationName,
                        originalCountryCode: countryCode,
                        locationName: tempLocationUrl,
                        rawLocationData: getLocationData(tempLocationUrl)
                    });
                }
                return _.where(_locations,{
                    originalName: locationName,
                    originalCountryCode: countryCode
                })[0];
            },
            getAll: function () {
                return _locations;
            },
            fetchByLocation: function (linkedinlocation) {
                var location = this.addOrGetByLocation(linkedinlocation);
                location.fetchLocationData();

            }
        };
    };

    return new Locations;
});