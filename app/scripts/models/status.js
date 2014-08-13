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
            message: 'Please Login to Get Started'
        }
    });

    return StatusModel;
});
