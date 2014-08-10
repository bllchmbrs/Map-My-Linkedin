/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PersonModel = Backbone.Model.extend({

        initialize: function() {
        },

        defaults: {
            firstName = '';
            lastName = '';
            formattedName = '';
            industry = '';
            numConnections = 0;
            numConnectionsCapped = false;
            pictureUrl = '';
            positions = [];
        }
    });

    return PersonModel;
});
