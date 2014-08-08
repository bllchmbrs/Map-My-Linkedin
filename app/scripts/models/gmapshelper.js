/*global define*/

define(function(){
    'use strict';

    var map = new google.maps.Map(document.getElementById('map-location'), {
        zoom:3,
        center: new google.maps.LatLng(39.742043, -104.991531)
    });
    var geocoder = new google.maps.Geocoder();

    function geocodeAddress (address) {
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                console.log(results);
            }
            else {
                console.log(status);
            }
        });
        return 'Geo data';
    }

    function cleanAddress (rawJsonResponse) {

        return 'cleaned json';
    }

    function chunkCollection (chunksOf, rawCollection, waitBetweenChunks) {
        var chunked = [];
        var currentPauseTime = 0;
        var chunkNumber;

        for (var i = 0; i < Math.ceil(rawCollection.length/chunksOf); i++) {            
            chunkNumber = chunksOf * i;

            for (var i2 = 0; i2 < chunksOf; i2++) {

                if (chunkNumber + i2 < rawCollection.length) {
                    console.log(currentPauseTime);
                    (function(pauseTime, chunkValue) {
                        setTimeout(function(){
                            rawCollection.at(chunkValue).geocode();
                        }, pauseTime);
                    })(currentPauseTime, chunkNumber + i2);
                    if (i2 === chunksOf - 1) {
                        currentPauseTime += waitBetweenChunks;
                    }
                }
            }

        }
    }

    function geocodeCollection (collection) {
        var chunksList = chunkCollection(10, collection, 1000);
    }

    return {
        map: map,
        geocoder: geocoder,
        geocodeAddress: geocodeAddress,
        geocodeCollection: geocodeCollection
    };
});