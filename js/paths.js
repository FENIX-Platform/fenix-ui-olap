define(function () {
    var config = {

        paths:  {

            'fx-pivot/start': './pivot',

            'fx-pivot/nls': '../nls',

			'underscore':'//fenixrepo.fao.org/cdn/js/underscore/1.8.0/underscore.min',
            'jquery':    '//fenixrepo.fao.org/cdn/js/jquery/2.1.1/jquery.min',//https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
			
            'bootstrap': '//fenixrepo.fao.org/cdn/js/bootstrap/3.2/js/bootstrap.min',
            'text':      '//fenixrepo.fao.org/cdn/js/requirejs/plugins/text/2.0.12/text',
            'i18n':      '//fenixrepo.fao.org/cdn/js/requirejs/plugins/i18n/2.0.4/i18n',
            'amplify' :  '//fenixrepo.fao.org/cdn/js/amplify/1.1.2/amplify.min',
            'highcharts':'//code.highcharts.com/highcharts',
			 jqueryui:   "../lib/jquery-ui-1.9.2.custom.min",
           // 'jquery-ui': '//fenixrepo.fao.org/cdn/js/jquery-ui/1.10.3/jquery-ui-1.10.3.custom.min',
			'HPivot':     '//fenixapps.fao.org/repository/js/jbpivot/0.1.0-olap/jbpivot.min',
	'HPivot':     '../dist/pivot.min',


			gt_msg:      "../lib/grid/gt_msg_en",
			gt_msg_grid: "../lib/grid/gt_grid_all",
			//fusioncharts: "grid/flashchart/fusioncharts/FusionCharts",        
			// configuration: "tests/configuration",

            'fx-olap/nls' : '../nls',
            'fx-olap/config' : '../config',

			pivotRenderersFuncs:   'rend/function_rendererers',
			pivotRenderers:        'rend/rendererers',
			pivotAggregatorsFuncs: 'rend/function_aggregators',
			pivotAggregators:      'rend/aggregators'
	      
        },

        shim: {

            "bootstrap": {
                deps: ["jquery"]
            },
			
            "jqueryui": {
                deps: ["jquery"]
            },/*
            "jquery-ui": {
                deps: ["jquery"]
            },*/
            "amplify": {
                deps: ['jquery'],
                exports: 'amplify'
            },

			"highcharts":  ['jquery'],
			"gt_msg": {
				//exports: 'Sigma',
				deps:      ['jquery']
			},
			"gt_msg_grid": ['jquery','gt_msg','jqueryui'],
			"HPivot": ['jquery','jqueryui'],			
			"pivotRenderers": ['pivotRenderersFuncs'],	
			"pivotAggregators": ['pivotAggregatorsFuncs','jquery']
        }
    };

    return config;
});