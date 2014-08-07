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

    // Collections
    var ConnectionCollection = require('./collections/connection');

    // Views
    var ConnectionMapView = require('./views/connection-map');

    //Helpers
    var FunctionHelpers = require('./utils/functions');

    // Instantiations
    var IN = window.IN;
    var connections = new ConnectionCollection;
    var globalMap = googleMaps.map;
    var geocodeAddress = googleMaps.geocodeAddress;
    var cleanLinkedinLocation = FunctionHelpers.cleanLinkedinLocation,
    cleanLinkedinConnection = FunctionHelpers.cleanLinkedinConnection;

    function getConnections () {
        console.log('getting connections');
        IN.API.Connections('me')
        .fields('firstName', 'lastName', 'industry', 'location',
            'picture-url', 'positions', 'num-connections', 'num-connections-capped',
            'formatted-name')
        .result(parseConnectionValues);
    }

    function parseConnectionValues (unParsedConnections) {
        console.log('Now parsing raw LinkedIn connections...');
        var values = unParsedConnections.values;
        var cleanedLocation, cleanedConnection, tempConnection, tempPeople;

        for (var i = 0; i < values.length; i++) {
            cleanedLocation = cleanLinkedinLocation(values[i].location);
            cleanedConnection = cleanLinkedinConnection(values[i]);
            tempConnection = connections.findWhere({locationName: cleanedLocation});

            if (tempConnection !== undefined) {
                tempPeople = tempConnection.get('people');
                tempPeople.push(cleanedConnection);
                tempConnection.set({people: tempPeople});
            } else {
                connections.add([
                        new ConnectionModel({
                            locationName: cleanedLocation,
                            people: [cleanedConnection],
                            geocodedLocationData: cleanedLocation ? geocodeAddress(cleanedLocation) : undefined
                        })
                    ]);
            }
        }
    }


    IN.Event.on(IN, 'auth', getConnections);
});