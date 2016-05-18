/*global define*/

define(function () {

    'use strict';

    return {

        format : {

            selector : {
                id : 'dropdown',
                source : [
                    { value : "localstring", label : "Local String"},
                    { value : "value", label : "Raw Value"}
                ],
                config : {
                    maxItems : 1
                },
                default : ['localstring']
            },

            template : {
                title : "Format"
            }
        },

        show : {

            selector : {
                id : "input",
                type : "checkbox",
                source : [
                    { value : "unit", label : "Unit"},
                    { value : "flag", label : "Flag"},
                    { value : "code", label : "Code"}
                ]
            },

            template : {
                title : "Show"
            }
        }

    }

});