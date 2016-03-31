define(function () {
    var config = {

        paths:  {

			
            'jquery':    '//fenixrepo.fao.org/cdn/js/jquery/2.1.1/jquery.min',
			'highcharts':'//code.highcharts.com/highcharts',
			'HPivot':     '//fenixapps.fao.org/repository/js/jbpivot/0.1.0-olap/jbpivot.min',

			gt_msg:      "lib/grid/gt_msg_en",
			gt_msg_grid: "lib/grid/gt_grid_all",
			pivotator:	"utilities/pivotator",
			jstat:"dist/jstat.min",
			
			Sortable:"lib/Sortable.min",
			controler:"controler/controler",
			toolbar:"toolbar/toolbar",
			renderer:"renderer/renderer",
			"commonutilities":"utilities/commonutilities",
			functions:"toolbar/functions/function"
        },

        shim: {

       

			"highcharts":  ['jquery'],
			"gt_msg": {deps:['jquery']},
			"gt_msg_grid": ['jquery','gt_msg'],
			"HPivot": ['jquery'],			
			"pivotator":["jstat"],
			"toolbar":["Sortable","jquery"],
			"controler":["toolbar","pivotator","renderer"]
        }
    };

    return config;
});