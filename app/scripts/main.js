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
    var googleMaps = require('./models/gmapshelper');
    var StatusModel = require('./models/status');

    // Collections
    var ConnectionCollection = require('./collections/connection');

    // Views
    var ConnectionMapView = require('./views/connection-map');
    var StatusView = require('./views/status');

    //Helpers
    var FunctionHelpers = require('./utils/functions');

    // Instantiations
    var IN = window.IN;
    var status = new StatusModel(),
        liveStatus = new StatusView({model: status});
    var connections = new ConnectionCollection;

    var globalMap = googleMaps.map;
    var geocodeCollection = googleMaps.geocodeCollection;

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
        var cleanedLocation, cleanedConnection, tempConnection, tempPeople;

        status.set({message: 'Alright we\'ve found ' + values.length + ' connections, now we need to go through them'});
        for (var i = 0; i < values.length; i++) {
            cleanedLocation = cleanLinkedinLocation(values[i].location);            
            cleanedConnection = cleanLinkedinConnection(values[i]);
            if (cleanedLocation === "") {
                cleanedLocation = "No Location";
            }
            tempConnection = connections.findWhere({locationName: cleanedLocation});

            if (tempConnection !== undefined) {
                tempPeople = tempConnection.get('people');
                tempPeople.push(cleanedConnection);
                tempConnection.set({people: tempPeople});
            } else {
                connections.add([
                    new ConnectionModel({
                        locationName: cleanedLocation,
                        people: [cleanedConnection]
                    })
                ]);
            }
        }
        status.set({message: values.length + ' connections in ' + connections.length + ' locations. Now we\'ve got to put them on the map!'});
        geocodeCollection(connections);
    }


    IN.Event.on(IN, 'auth', getConnections);
});