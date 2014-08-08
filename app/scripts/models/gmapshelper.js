/*global define*/

define(function(){
    'use strict';

    var map = new google.maps.Map(document.getElementById('map-location'), {
        zoom:3,
        center: new google.maps.LatLng(39.742043, -104.991531)
    });
    var geocoder = new google.maps.Geocoder();

    function geocodeAddress (address) {
        var finalResults = false;
        console.log("geocoding " + address);
        geocoder.geocode({'address': address}, function (results, status) {
            console.log(status);
            if (status === google.maps.GeocoderStatus.OK) {
                finalResults = true;
            }
            else {
                finalResults = status;
            }
        });
        return finalResults;
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
        chunkCollection(8, collection, 5000);
    }

    return {
        map: map,
        geocodeAddress: geocodeAddress,
        geocodeCollection: geocodeCollection
    };
});