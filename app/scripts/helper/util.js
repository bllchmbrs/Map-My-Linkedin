define(function(){
    'use strict';

    function showMe (it){
        console.log(it);
    }

    function cleanLocation (location) {
        if (location) {
            // showMe(location.name);
            // showMe(location.country.code.toUpperCase());
        }
        return {
            name: '',
            geocoded: ''
        };
    }



    return {
        cleanLocation: cleanLocation
    };
});