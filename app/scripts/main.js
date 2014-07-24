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
    var util = require('./helper/util');
    var IN = window.IN;

    IN.Event.on(IN, 'auth', util.getConnections);
});