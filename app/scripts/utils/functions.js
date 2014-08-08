/*global define*/

define(function(){
    'use strict';
    
    function cleanLinkedinLocation (rawlocationObject) {
        var name = rawlocationObject ? rawlocationObject.name : undefined;
        var nameAsList, address;

        if (name !== undefined) {
            nameAsList = name.split(' ');
            delete nameAsList[nameAsList.indexOf('Greater')];
            delete nameAsList[nameAsList.indexOf('Area')];
            address = nameAsList.join(' ');
        }
        
        return address;
    }

    function cleanLinkedinConnection (rawConnectionObject) {
        // we'll do all of our cleaning in here, will allow us to easily create people
        var raw = rawConnectionObject;
        var person = {};
        
        person.firstName = raw.firstName;
        person.lastName = raw.lastName;
        person.formattedName = raw.formattedName;
        person.industry = raw.industry;
        person.numConnections = raw.numConnections;
        person.numConnectionsCapped = raw.numConnectionsCapped;
        person.pictureUrl = raw.pictureUrl;
        person.positions = raw.positions;

        return person;
    }
    
    return {
        cleanLinkedinLocation: cleanLinkedinLocation,
        cleanLinkedinConnection: cleanLinkedinConnection
    };
});