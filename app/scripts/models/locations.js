/*global define*/

define(['underscore'], function(_) {
    'use strict';
    var Locations = function () {

        var _locations = [];
        // example: {
        //     originalCountryCode: 'us',
        //     originalName: 'San Francisco Bay Area', 
        //     geocodedUrl: http://.....
        //     geocodedData: {
        //         data: is_here
        //     }
        // }

        function generateGeocoded (name){
            var first = 'https://maps.googleapis.com/maps/api/geocode/json?';
            var key = 'key=AIzaSyD9HhZRFpmhfYuEgkfmkE-5ucBnEE8rZzo&';
            var nameAsList = name.split(' ');
            delete nameAsList[nameAsList.indexOf('Greater')];
            delete nameAsList[nameAsList.indexOf('Area')];
            var address = 'address=' + encodeURIComponent(nameAsList.join(' '));
            return first + key + address;
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
                    _locations.push({
                        originalName: locationName,
                        originalCountryCode: countryCode,
                        geocodedUrl: generateGeocoded(locationName),
                    });
                }
                return _.where(_locations,{
                    originalName: locationName,
                    originalCountryCode: countryCode
                })[0];
            },
            getAll: function () {
                return _locations;
            }
        };
    };

    return new Locations;
});