/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var StatusModel = Backbone.Model.extend({
        initialize: function() {
        },

        defaults: {
            message: "Starting the Connection"
        }
    });

    return StatusModel;
});
