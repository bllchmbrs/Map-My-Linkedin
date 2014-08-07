/*global define*/

define(function(require){
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

            //         person = {
            //     firstName: values[i].firstName,
            //     lastName: values[i].lastName,
            //     formattedName: values[i].formattedName,
            //     industry: values[i].industry,
            //     numConnections: values[i].numConnections,
            //     numConnectionsCapped: values[i].numConnectionsCapped,
            //     pictureUrl: values[i].pictureUrl,
            //     positions: values[i].positions
            // }

            // console.log(person);
        return {};
    }
    return {
        cleanLinkedinLocation: cleanLinkedinLocation,
        cleanLinkedinConnection: cleanLinkedinConnection
    };
});