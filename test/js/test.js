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
                var optGr = myToolbar.getConfigCOLROW();
                //console.log("rowcol",rowcol);
				optGr["fulldataformat"]=true;
                //myRenderer.rendererGridFX(Model, "result", optGr);
				myRenderer.render(Model, "result", optGr)
            }
            , lang: "EN", nbDecimal: 2
        });
        myToolbar.display();

        var optGr = myToolbar.getConfigCOLROW();
		optGr["fulldataformat"]=true;
        var MYFINALRESULT = myRenderer.render(Model, "result", optGr);
            

    //    log.info(myRenderer);
      //  log.info(Model);
    };

    return new Test();
});