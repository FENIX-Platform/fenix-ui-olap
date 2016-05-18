/*global requirejs, define*/
define([
    'loglevel',
    'jquery',
    'underscore',
    'fx-olap/start',
    'fx-filter/start',
    'fx-common/pivotator/fenixtool',
    'test/models/dataFAOSTAT',
    'test/models/filter-interaction'
], function (log, $, _, OlapCreator, Filter, FenixTool, Model, FilterModel) {

    'use strict';

    var s = {
        CONFIGURATION_EXPORT: "#configuration-export",
        FILTER_INTERACTION : "#filter-interaction",
        OLAP_INTERACTION : "#olap-interaction"
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
        var itemsFromFenixTool = this.fenixTool.toFilter(Model),
        //FilterModel contains static filter selectors, e.g. show code, show unit
            items = $.extend(true, {}, FilterModel, itemsFromFenixTool);

        log.trace("Filter configuration from FenixTool", items);

        this.filter = new Filter({
            el : s.FILTER_INTERACTION,
            items: items
        });

        this.filter.on("ready", _.bind(function () {

            var config = this._getOlapConfigFromFilter();

            log.trace("Init chart");
            log.trace(config);

            this.olap = new OlapCreator(config);
        }, this));

        this.filter.on("change", _.bind(function () {

            var config = this._getOlapConfigFromFilter();

            log.trace("Update chart");
            log.trace(config);

            this.olap.update(config);
        }, this));

    };

    Test.prototype._getOlapConfigFromFilter = function () {

        var values = this.filter.getValues(),
            config = this.fenixTool.toTableConfig(values);
 config = $.extend(true, {}, {
	  aggregationFn:"sum",formatter:"value",decimals:2,showRowHeaders:true,
            model : Model,
            el : "#olap-interaction"
        }, config);
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
