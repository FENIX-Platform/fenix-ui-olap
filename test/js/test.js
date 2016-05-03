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
	
    function Test() { }

    Test.prototype.start = function () {
        log.trace("Test started");
        this._renderOlap();
		};

    Test.prototype._renderOlap = function () {

        var myRenderer = new Olap();
		//console.log("myRenderer",myRenderer.render)
        var myToolbar = new Toolbar();

        myToolbar.init("toolbar", Model.metadata.dsd, {
            onchange: function () {
					var optGr = myToolbar.getConfigCOLROW(Model.metadata.dsd);
					//console.log("rowcol",rowcol);
					optGr["fulldataformat"]=true;
					
					//myRenderer.rendererGridFX(Model, "result", optGr);
					myRenderer.render({
						model : Model,
						el : "#result",
						config: optGr
					})
				}, lang: "EN", nbDecimal: 2,showCode:false
        });
        myToolbar.display();
	//	console.log("Model",Model)
		
        var optGr = myToolbar.getConfigCOLROW(Model.metadata.dsd);
		optGr["fulldataformat"]=true;
		console.log("optGr",optGr)
		//  var MYFINALRESULT = myRenderer.renderJDataGrid(Model, "result", optGr);
		//console.log("optGr",optGr)

		var MYFINALRESULT = myRenderer.render({
              model : Model,
              el : "#result",
              config: optGr
          });
		//log.info(myRenderer);
		//  log.info(Model);
    };

    return new Test();
});
