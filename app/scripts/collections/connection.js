/*global define*/

define([
    'underscore',
    'backbone',
    'models/connection'
], function (_, Backbone, ConnectionModel) {
    'use strict';

    var ConnectionCollection = Backbone.Collection.extend({
        model: ConnectionModel
    });

    return ConnectionCollection;
});
