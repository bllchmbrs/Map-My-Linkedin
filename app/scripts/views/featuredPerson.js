/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var FeaturedpersonView = Backbone.View.extend({
        template: JST['app/scripts/templates/featuredPerson.ejs'],
        el: $('#featured-person'),

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change:featured', this.render);
        },

        render: function () {
            if (this.model.get("featured")) {
                this.$el.html(this.template(this.model.toJSON()));
                console.log("hello");
            };
        }
    });

    return FeaturedpersonView;
});
