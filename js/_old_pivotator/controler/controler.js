/*global requirejs*/
define(["toolbar",'renderer','data/data'], function(	toolbar,	renderer,	myData) {
var MYFINALRESULT;

	function init(){
	
	
	var mygrid=null;
	var myToolbar=new toolbar();
	//var myPivotator=new pivotator();
	var myRenderer=new renderer();
		
		myToolbar.init("toolbar",myData.metadata.dsd,{
		onchange:function(){
				var rowcol=myToolbar.getConfigCOLROW();
				//console.log("rowcol",rowcol);
				myRenderer.rendererGridFX(myData,"result",rowcol);
				}
				,lang:"EN",nbDecimal:2});
					
				
		myToolbar.display();
		addCSS("lib/grid/gt_grid_height.css")
		//var fonctions=myToolbar.getFunctions();
		optGr=myToolbar.getConfigCOLROW();
		MYFINALRESULT=myRenderer.rendererGridFX(myData,"result",optGr);

	};

	function getResult(){return MYFINALRESULT}
 return  function() {
        return{
       init:init,
	   getResult:getResult
		}
    };
});
