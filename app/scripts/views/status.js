/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var StatusView = Backbone.View.extend({
        template: JST['app/scripts/templates/status.ejs'],
        el: $('#status'),

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function () {
            console.log(this.template(this.model.toJSON()));
            console.log(this.$el);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return StatusView;
});
