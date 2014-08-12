/*global define*/

define([
    'underscore',
    'backbone',
    'models/connection'
], function (_, Backbone, ConnectionModel) {
    'use strict';

    var ConnectionCollection = Backbone.Collection.extend({
        model: ConnectionModel,

        initialize:function (){
            this.on("change:featured", this.resetAllOthersFeatured, this);
        },

        resetAllOthersFeatured: function (model, val, options){            
            this.forEach(function(pluckedModel){
                if (model.cid !== pluckedModel.cid) {
                    pluckedModel.set({
                        "featured": false
                    });
                }
            });
        }
    });

    return ConnectionCollection;
});
