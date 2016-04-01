/*global requirejs*/
define(["toolbar",'renderer','data/dataClean'], function(	toolbar,	renderer,	myData) {
	console.log(myData);
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
				,lang:"EN",nbDecimal:5});
					
				
		myToolbar.display();
	addCSS("lib/grid/gt_grid_height.css")
		//var fonctions=myToolbar.getFunctions();
		optGr=myToolbar.getConfigCOLROW();
		console.log(optGr)
		myRenderer.rendererGridFX(myData,"result",optGr);

	};

	
 return  function() {
        return{
       init:init
		}
    };
});
