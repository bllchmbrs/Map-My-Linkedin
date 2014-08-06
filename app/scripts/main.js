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
    var cleanLocationName = FunctionHelpers.cleanLocationName;

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

        for (var i = 0; i < values.length; i++) {
            // need to check if it's the collection here
            console.log(values[i]);
            // if not
            new ConnectionModel({
                linkedLocationName: values[i].location ? values[i].location.name : "",
                linkedinlocationCountryCode: values[i].location ? values[i].location.country.code : "",
                displayLocationName: values[i].location ? cleanLocationName(values[i].location.name) : "",
                people: [values[i]],
                geocodedLocationData: values[i].location ? geocodeAddress(values[i].location.name) : ""
            })
        }
    }


    IN.Event.on(IN, 'auth', getConnections);
});