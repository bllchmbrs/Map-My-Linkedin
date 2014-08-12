/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PersonModel = Backbone.Model.extend({

        initialize: function() {
            if (this.numConnectionsCapped) {
                this.set({displayConnections : '500+'});
            } else {
                this.set({displayConnections : this.get('numConnections')});
            }
            // need to add in their current position
        },

        defaults: {
            firstName : '',
            lastName : '',
            formattedName : '',
            industry : '',
            numConnections : 0,
            numConnectionsCapped : false,
            displayConnections: 0,
            pictureUrl : '',
            positions : [],
            featured : false
        }
    });

    return PersonModel;
});
