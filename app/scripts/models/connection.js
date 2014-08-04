/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ConnectionModel = Backbone.Model.extend({
        defaults: {
            name: '',
            industry: '',
            linkedinLocation: {}
        }
    });

    return ConnectionModel;
});
