/*global requirejs, define*/
define([
    'loglevel',
    'fx-olap/start',
    'test/js/toolbar',
    'test/models/data'
], function (log, Olap, Toolbar, Model) {

    'use strict';

    function Test() { }

    Test.prototype.start = function () {

        log.trace("Test started");

        this._renderOlap();

    };

    Test.prototype._renderOlap = function () {

        var myRenderer = new Olap();
        var myToolbar = new Toolbar();

        myToolbar.init("toolbar", Model.metadata.dsd, {
            onchange: function () {
                var rowcol = myToolbar.getConfigCOLROW();
                //console.log("rowcol",rowcol);
                myRenderer.rendererGridFX(Model, "result", rowcol);
            }
            , lang: "EN", nbDecimal: 2
        });
        myToolbar.display();

        var optGr = myToolbar.getConfigCOLROW();
        var MYFINALRESULT = myRenderer.rendererGridFX(Model, "result", optGr);

    //    log.info(myRenderer);
      //  log.info(Model);
    };

    return new Test();
});
