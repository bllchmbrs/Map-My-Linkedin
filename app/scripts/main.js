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
    var ConnectionModel = require('./models/connection');
    var ConnectionCollection = require('./collections/connection');
    var ConnectionMapView = require('./views/connection-map');
    var Util = require('./helper/util');
    var IN = window.IN;
    var connections = new ConnectionCollection;
    var globalMap = require('./models/map');

    function getConnections () {
        IN.API.Connections('me')
        .fields('firstName', 'lastName', 'industry', 'location',
            'picture-url', 'positions', 'num-connections', 'num-connections-capped',
            'formatted-name')
        .result(parseConnectionValues);
    }

    function parseConnectionValues (unParsedConnections) {
        var values = unParsedConnections.values;
        for (var i = 0; i < values.length; i++) {
            var cleanedLocation = Util.cleanLocation(values[i].location);
            var createdModel = new ConnectionModel({
                    name: values[i].formattedName,
                    industry: values[i].industry,
                    location: cleanedLocation.name,
                    // location: cleanedLocation.name,
                    // geocodedLocation: cleanedLocation.geocoded,
                    geocodedLocation: new google.maps.LatLng(37.733795, -122.446747),
                    map: globalMap
            });
            connections.add(
                createdModel
            );
            // need to parse this collection to find all the places
        }
    }

    IN.Event.on(IN, 'auth', getConnections);
});