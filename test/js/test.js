/*global requirejs, define*/
define([
    'loglevel',
    'jquery',
    'underscore',
    'fx-olap/start',
    'fx-filter/start',
    'fx-common/pivotator/fenixtool',
    'text!test/models/UNECA_Education.json',
    'test/models/filter-interaction'
], function (log, $, _, OlapCreator, Filter, FenixTool, Model, FilterModel) {
	
	/*[16:24:54] Daniele  Salvatore: Richiesta Dataset con label:
[16:25:29] Daniele  Salvatore: URL:  http://fenixservices.fao.org//d3s/processes/:uid_dataset
=> http://fenixservices.fao.org//d3s/processes/UNECA_Population?full=true&dsd=true&language=EN
METHOD: POST
header: content-type: application/json
body: []*/
	
//http://fenix.fao.org/d3s_dev/msd/resources/uid/UNECA_BalanceOfPayments?full=true&dsd=true
//http://fenixservices.fao.org/d3s/msd/resources/uid/UNECA_ExpenditureGDPCurrent?full=true&dsd=true
/*
UNECA_Education
UNECA_Population
UNECA_Health
UNECA_BalanceOfPayments
UNECA_Debt
UNECA_MiningProduction4
UNECA_Infrastructure
UNECA_AgricultureProduction3
ILO_Labour

Uneca_PopulationNew
UNECA_Labour
UNECA_MonetaryStatistics
UNECA_Inflation


UNECA_Poverty
UNECA_FinancialFlows
UNECA_Tourism
UNECA_PublicFinance



UNECA_GDP
UNECA_GDP_NC
UNECA_ExpenditureGDPCostant
UNECA_ExpenditureGDPCurrent
UNECA_GDP_USD*/



    'use strict';
	Model=JSON.parse(Model);
	
    var s = {
        CONFIGURATION_EXPORT: "#configuration-export",
        FILTER_INTERACTION: "#filter-interaction",
        OLAP_INTERACTION: "#olap-interaction"
    };

    function Test() {
        this.fenixTool = new FenixTool();
    }

    Test.prototype.start = function () {
        log.trace("Test started");
        this._testFilterInteraction();
    };

    Test.prototype._testFilterInteraction = function () {

        //create filter configuration
        var itemsFromFenixTool = this.fenixTool.toFilter(Model);
        //FilterModel contains static filter selectors, e.g. show code, show unit
           var  items = $.extend(true, {}, FilterModel, itemsFromFenixTool);

        log.trace("Filter configuration from FenixTool", items);

        this.filter = new Filter({
            el: s.FILTER_INTERACTION,
            items: items
        });

        this.filter.on("ready", _.bind(function () {

            var config = this._getOlapConfigFromFilter();
		//	console.log("config",config)
			//console.log("Model",Model)
			//var derived={derived:{"Indicator_EN_":function(rec){return "("+rec["IndicatorCode"]+")"+rec["IndicatorCode_EN"]}}}
			/* config={"values":["Value"],
			 "formatter":"localstring",
			 "aggregationFn":{"value":"sum","Value":"sum"},
			 "decimals":["2"],"showRowHeaders":true,"aggregations":[],
			 }*/
			 
			 /*{"aggregationFn":{"value":"sum","Value":"sum"},
			"formatter":"localstring",
			"decimals":["2"],
			//"groupedRow":true,
			"showRowHeaders":true,
			"hidden":[],
			//"rows":["Commodity_EN","CountryCode_EN","IndicatorCode_EN"],
			//"columns":["Year"],
			"aggregations":[],
			"values":["Value"],
			//"inputFormat" : "fenixtool"
			
			}*/;
			
			
			
			//console.log("config",config)

            config = $.extend(true, {}, {
                model: Model,
                el: "#olap-interaction"
            }, config
			//,derived
			);

            log.trace("Init Olap");
            log.trace(config);
			
			
			for(var d in config.derived)
			{
				config.aggregations.push(d);
			}
			
			

            this.olap = new OlapCreator(config);
        }, this));

       this.filter.on("change", _.bind(function () {

            var config = this._getOlapConfigFromFilter();

            log.trace("Update chart");
            log.trace(config);
//console.log("config2",config)
            this.olap.update(config);
        }, this));

    };

    Test.prototype._getOlapConfigFromFilter = function () {
        var values = this.filter.getValues();
		//console.log("_getOlapConfigFromFilter",values)
		var config = this.fenixTool.toTableConfig(values);

        this._printOlapConfiguration(config);

        return config;

    };

    Test.prototype._printOlapConfiguration = function () {

        var values = this.filter.getValues(),
            config = this.fenixTool.toTableConfig(values);

        //Export configuration
        $(s.CONFIGURATION_EXPORT).html(JSON.stringify(config));

        return config;
    };

    return new Test();
});
