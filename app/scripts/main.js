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
    var Locations = require('./models/locations');
    var globalMap = require('./models/map');

    // Collections
    var ConnectionCollection = require('./collections/connection');

    // Views
    var ConnectionMapView = require('./views/connection-map');
    // Instantiations

    var IN = window.IN;
    var connections = new ConnectionCollection;

    function getConnections () {
        console.log('getting connections');
        IN.API.Connections('me')
        .fields('firstName', 'lastName', 'industry', 'location',
            'picture-url', 'positions', 'num-connections', 'num-connections-capped',
            'formatted-name')
        .result(parseConnectionValues);
    }

    function parseConnectionValues (unParsedConnections) {
        var values = unParsedConnections.values;
        console.log('got our values... now going through them');

        for (var i = 0; i < values.length; i++) {
            console.log(i);
            console.log(Locations);

            Locations.addOrGetByLocation(values[i].location);
            var createdModel = new ConnectionModel({
                    name: values[i].formattedName,
                    industry: values[i].industry,
                    linkedinLocation: values[i].location
                });
            connections.add(
                createdModel
            );
            console.log(Locations.getAll());
        }
    }

    IN.Event.on(IN, 'auth', getConnections);
});