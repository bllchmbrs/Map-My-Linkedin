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

    // Collections
    var ConnectionCollection = require('./collections/connection');

    // Views
    var ConnectionMappedView = require('./views/connectionMapped');
    var StatusView = require('./views/status');

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
        var cleanedLocation, cleanedConnection, tempConnection, tempPeople, cm, cv;

        status.set({message: 'Alright we\'ve found ' + values.length + ' connections, now we need to go through them'});
        for (var i = 0; i < values.length; i++) {
            cleanedLocation = cleanLinkedinLocation(values[i].location);
            cleanedConnection = cleanLinkedinConnection(values[i]);
            tempConnection = connections.findWhere({locationName: cleanedLocation});
            if (cleanedLocation !== undefined) {
                if (tempConnection !== undefined) { 
                    tempPeople = tempConnection.get('people');
                    tempPeople.push(cleanedConnection);
                    tempConnection.set({people: tempPeople});
                } else {
                    status.set({message: "Now we're getting the people at "+ cleanedLocation});
                    cm = new ConnectionModel({
                            locationName: cleanedLocation,
                            people: [cleanedConnection]
                        });
                    cv = new ConnectionMappedView({model:cm});
                    cv.render();
                    connections.push(cm);
                }
            }
        }
        status.set({message: values.length + ' connections in ' + connections.length + ' locations. Now we\'ve got to put them on the map!'});
        console.log(connections);
    }


    IN.Event.on(IN, 'auth', getConnections);
});