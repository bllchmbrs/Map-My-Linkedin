/*global define*/

define(function(){
    'use strict';
    var map = new google.maps.Map(document.getElementById('map-location'),
    {
        zoom:3,
        center: new google.maps.LatLng(39.742043, -104.991531)
    });
    var geocoder = new google.maps.Geocoder();

    function geocodeAddress (address) {
        // Need a way of slowing this down...

        // geocoder.geocode({'address': address}, function (results, status){
        //      if (status == google.maps.GeocoderStatus.OK) {
        //         console.log(results);
        //      }
        //      else {
        //         console.log(status);
        //      }
        // });
        return 'Geo data';
    }


    return {
        map: map,
        geocoder: geocoder,
        geocodeAddress: geocodeAddress
    };
});