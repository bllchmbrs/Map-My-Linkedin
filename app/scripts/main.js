/*global require*/
'use strict';

require.config({
    shim: {
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore'
    }
});

define(function(require){
    // Models
    var ConnectionModel = require('./models/connection');
    var GoogleMaps = require('./models/gmapshelper');
    var StatusModel = require('./models/status');
    var PersonModel = require('./models/person');

    // Collections
    var ConnectionCollection = require('./collections/connection');

    // Views
    var ConnectionMappedView = require('./views/connectionMapped');
    var StatusView = require('./views/status');
    var FeaturedPerson = require('./views/featuredPerson');
    var FeaturedConnection = require('./views/featuredConnection');

    //Helpers
    var FunctionHelpers = require('./utils/functions');

    // Instantiations
    var IN = window.IN;
    var status = new StatusModel(),
        liveStatus = new StatusView({model: status});
    var connections = new ConnectionCollection;

    var globalMap = GoogleMaps.map;

    var cleanLinkedinLocation = FunctionHelpers.cleanLinkedinLocation,
        cleanLinkedinConnection = FunctionHelpers.cleanLinkedinConnection;

    function getConnections () {
        status.set({message: 'Getting Connections'});
        IN.API.Connections('me')
        .fields('firstName', 'lastName', 'industry', 'location',
            'picture-url', 'positions', 'num-connections', 'num-connections-capped',
            'formatted-name')
        .result(parseConnectionValues);
    }

    function parseConnectionValues (unParsedConnections) {
        var values = unParsedConnections.values;
        var cleanedLocation, cleanedPerson, tempConnection, tempPeople, cm, cv, fc, fp;

        status.set({message: 'Alright we\'ve found ' + values.length + ' connections, now we need to go through them'});
        for (var i = 0; i < values.length; i++) {
            cleanedPerson = new PersonModel(cleanLinkedinConnection(values[i]));

            cleanedLocation = cleanLinkedinLocation(values[i].location);
            tempConnection = connections.findWhere({locationName: cleanedLocation});

            if (cleanedLocation !== undefined) {
                if (tempConnection !== undefined) { 
                    tempConnection.appendToPeople(cleanedPerson);
                } else {
                    status.set({message: "Now we're getting the people at "+ cleanedLocation});
                    cm = new ConnectionModel({
                            locationName: cleanedLocation,
                            people: [cleanedPerson]
                        });
                    cv = new ConnectionMappedView({model:cm});
                    fc = new FeaturedConnection({model:cm});
                    fp = new FeaturedPerson({model:cleanedPerson});
                    connections.push(cm);
                }
            }
        }
        status.set({message: values.length + ' connections in ' + connections.length + ' locations. Now we\'ve got to put them on the map!'});
        console.log(connections);
    }


    IN.Event.on(IN, 'auth', getConnections);
});