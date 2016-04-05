define(function () {
    var config = {

        paths: {

            'fx-olap/start': './start',
            'fx-olap/nls': '../nls',
            'fx-olap/config': '../config',
            'fx-olap' : "./",

            'underscore': '{FENIX_CDN}/js/underscore/1.8.0/underscore.min',
            'jquery': '{FENIX_CDN}/js/jquery/2.1.1/jquery.min',
            'bootstrap': '{FENIX_CDN}/js/bootstrap/3.2/js/bootstrap.min',
            'text': '{FENIX_CDN}/js/requirejs/plugins/text/2.0.12/text',
            'i18n': '{FENIX_CDN}/js/requirejs/plugins/i18n/2.0.4/i18n',
            'amplify': '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',
            gt_msg: "{FENIX_CDN}/js/sigma.grid/2.4/gt_msg_en",
            gt_msg_grid: "{FENIX_CDN}/js/sigma.grid/2.4/gt_grid_all",
            sortable : '{FENIX_CDN}/js/sortable/1.4.2/Sortable.min'

        },

        shim: {

            "jqueryui": {
                deps: ["jquery"]
            },

            "amplify": {
                deps: ['jquery'],
                exports: 'amplify'
            },

            "gt_msg": {
                //exports: 'Sigma',
                deps: ['jquery']
            },

            "gt_msg_grid": ['jquery', 'gt_msg']

            //"HPivot": ['jquery','jqueryui'],
        }
    };

    return config;
});