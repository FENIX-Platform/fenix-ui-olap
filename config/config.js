/*global define*/

define(function () {

    'use strict';

    var selectorPath = "fx-olap/renderers/";

    return {

        type: "olap",

        pluginRegistry: {
            'olap': {
                path: selectorPath + 'sigmagrid'
            },
            'grid' : {
                path: selectorPath + 'bootstrap-table'
            }
        }
    }

});