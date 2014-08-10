/*global define*/

define(function(){
    'use strict';

    var map = new google.maps.Map(document.getElementById('map-location'), {
        zoom:3,
        center: new google.maps.LatLng(39.742043, -104.991531)
    });

    function mapsLatLng(lat,lng){
        return new google.maps.LatLng(lat, lng);
    }

    function mapsInfoWindow(contentString){
        return new google.maps.InfoWindow({
            content: contentString
        });
    }

    function mapsAddEventListener(object, evnt, callback) {
        google.maps.event.addListener(object, evnt, callback);
    }

    return {
        map: map,
        mapsLatLng: mapsLatLng,
        mapsInfoWindow: mapsInfoWindow,
        mapsAddEventListener: mapsAddEventListener
    };
});