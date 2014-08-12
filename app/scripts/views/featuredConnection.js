/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var FeaturedconnectionView = Backbone.View.extend({
        template: JST['app/scripts/templates/featuredConnection.ejs'],
        el: $('#featured-connection'),

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change:featured', this.render);
        },

        render: function () {
            if (this.model.get("featured")) {
                this.$el.html(this.template(this.model.toJSON()));
            };
        }
    });

    return FeaturedconnectionView;
});
