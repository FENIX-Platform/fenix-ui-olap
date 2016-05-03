/*global requirejs, define*/
define([
    'loglevel',
    'fx-olap/start',
    'test/js/toolbar',
    //'test/models/data'
    // 'test/models/uneca_population'
    'test/models/dataFAOSTAT'

], function (log, Olap, Toolbar, Model) {
    'use strict';

    function Test() {
    }

    Test.prototype.start = function () {
        log.trace("Test started");
        this._renderOlap();
    };

    Test.prototype._renderOlap = function () {

        var self = this;
        var myRenderer = new Olap();
        //console.log("myRenderer",myRenderer.render)
        var myToolbar = new Toolbar();

        myToolbar.init("toolbar", Model.metadata.dsd, {
            onchange: function () {
                var optGr = myToolbar.getConfigCOLROW(Model.metadata.dsd),
                    config;
                //console.log("rowcol",rowcol);
                optGr["fulldataformat"] = true;

                config = self._harmonizeInput($.extend(true, {}, {
                    model: Model,
                    el: "#result"
                }, optGr));

                //myRenderer.rendererGridFX(Model, "result", config);
                myRenderer.render(config)

            }, lang: "EN", nbDecimal: 2, showCode: false
        });
        myToolbar.display();
        //	console.log("Model",Model)

        var optGr = myToolbar.getConfigCOLROW(Model.metadata.dsd);
        optGr["fulldataformat"] = true;

        //console.log("optGr", optGr)

        var config = this._harmonizeInput($.extend(true, {}, {
            model: Model,
            el: "#result"
        }, optGr));

        console.log("---------------------- NEW CONFIG")
        console.log(config)

        var MYFINALRESULT = myRenderer.render(config);

        //log.info(myRenderer);
        //  log.info(Model);
    };

    Test.prototype._harmonizeInput = function (config) {

        var model = {};

        model.aggregationFn = config.Aggregator;

        model.aggregations = config.AGG.slice(0);
        model.columns = config.COLS.slice(0);
        model.rows = config.ROWS.slice(0);
        model.hidden = config.HIDDEN.slice(0);
        model.values = config.VALS.slice(0);

        model.formatter = config.Formater;
        model.valueOutputType = config.GetValue;
        model.showRowHeaders = config.fulldataformat;
        model.decimals = config.nbDecimal;

        model.showCode = config.showCode;
        model.showFlag = config.showFlag;
        model.showUnit = config.showUnit;

        model.model = Model;
        model.el = "#result";

        return model;

    };

    return new Test();
});
