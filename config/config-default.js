/*global define*/

define(function () {

    'use strict';

    var selectorPath = "fx-olap/renderers/";

    return {

        renderer: "sigmagrid",

        plugin_registry: {
            'sigmagrid': {
                path: selectorPath + 'sigmagrid'
            }
        }

    }

});