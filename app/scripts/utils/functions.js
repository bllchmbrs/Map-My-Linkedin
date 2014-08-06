/*global define*/

define(function(require){
    'use strict';
    
    function cleanLocationName (name) {
            var nameAsList = name.split(' ');
            delete nameAsList[nameAsList.indexOf('Greater')];
            delete nameAsList[nameAsList.indexOf('Area')];
            var address = nameAsList.join(' ');
            return address;
        }

    return {
        cleanLocationName: cleanLocationName
    };
});