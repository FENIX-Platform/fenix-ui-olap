
requirejs.config({

    baseUrl: '../',

    paths : {
        text: 'lib/text',
        domReady: 'lib/domReady',
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
        jqueryui: "lib/jquery-ui-1.9.2.custom.min",
        i18n: 'lib/jquery.i18n.properties-min',
        jssc3: "lib/highlight/jssc3",
        calendar: "lib/grid/calendar/calendar",
        calendar_utf8: "lib/grid/calendar/calendar-cn-utf8",
        gt_msg: "lib/grid/gt_msg_en",
        gt_msg_grid: "lib/grid/gt_grid_all",
        //fusioncharts: "grid/flashchart/fusioncharts/FusionCharts",        
        configuration: "tests/configuration",
        pivot: "js/pivot"
    },
    shim: {
        i18n : {
            deps: ['jquery']
        },
        calendar: {
            exports: 'Calendar'
        },
        calendar_utf8: {
            exports: 'Calendar'
        },
        gt_msg: {
            deps: ['jquery']  
        },
        gt_msg_grid: {
            deps: ['jquery','gt_msg']
        },
        pivot: {
            deps: [
                'jquery','jqueryui','i18n',
                'jssc3','calendar','calendar_utf8','gt_msg','gt_msg_grid',
                'configuration'
            ]
        }        
    }
});

require(['text!config/dataTest.json','text!config/dataConfig.json','pivot', 'domReady!'],
    function(dataTest, dataConfig, pivot ) {
        
    dataTest = JSON.parse(dataTest);
    dataConfig = JSON.parse(dataConfig);

    $("#testinline").pivotUI(dataTest, dataConfig);

});