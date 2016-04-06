define([
	'jquery',
	"sortable",
	"fx-common/pivotator/functions",
], function($, Sortable,myFunctions) {


id_container="";
COLS=[];
ROWS=[];
AGG=[];
HIDDEN=[];
chGetValue="classicToNumber";
chAggregator="sum";
chFormater="value";
chNbDecimal=2;

_onChange=null;
myFunc=new myFunctions();
init=function(id,FX,opt)
	{
		
		var lang="EN";
		if (opt.lang){lang=opt.lang;}
		if (opt.nbDecimal){chNbDecimal=opt.nbDecimal;}
	id_container=id;
	
	document.getElementById(id).className="olapToolbar";

	_onChange=opt.onchange;
	for(var i in FX.columns)
		{
			if(FX.columns[i].dataType=="number"){HIDDEN.push({value:FX.columns[i].id,label:FX.columns[i].title[lang]})}
			else if (FX.columns[i].subject!="time" && FX.columns[i].key==true ){ROWS.push({value:FX.columns[i].id,label:FX.columns[i].title[lang]});}
			else if(FX.columns[i].subject=="time"){COLS.push({value:FX.columns[i].id,label:FX.columns[i].title[lang]})}
			else {AGG.push({value:FX.columns[i].id,label:FX.columns[i].title[lang]})}
		}
	}
getConfigCOLROW=function()
{
var ret={AGG:[],COLS:[],ROWS:[]};
		$.each($("#"+id_container+"_AGG >li"),function(e,a){ret.AGG.push(a.getAttribute('value'))});
		$.each($("#"+id_container+"_ROWS >li"),function(e,a){ret.ROWS.push(a.getAttribute('value'))});
		$.each($("#"+id_container+"_COLS >li"),function(e,a){ret.COLS.push(a.getAttribute('value'))});
		ret.Aggregator=chAggregator;
		ret.GetValue=chGetValue;
		ret.Formater=chFormater;
		ret.nbDecimal=chNbDecimal;
		return ret;

}
display=function()
{
var parent=this;
$("#"+id_container).append(
"<fieldset class=\"myFieldset\"><ul id=\""+id_container+"_HIDDEN\"><div class=\"title\">HIDDEN</div></ul></fieldset>"+
"<fieldset class=\"myFieldset\"><ul id=\""+id_container+"_AGG\"><div class=\"title\">AGG</div></ul></fieldset>"+
"<fieldset class=\"myFieldset\"><ul id=\""+id_container+"_ROWS\"><div class=\"title\">ROWS</div></ul></fieldset>"+
"<fieldset class=\"myFieldset\"><ul id=\""+id_container+"_COLS\"><div class=\"title\">COLS</div></ul></fieldset>");
for(var i in ROWS){$("#"+id_container+"_ROWS").append("<li value=\""+ROWS[i].value+"\">"+ROWS[i].label+"</li>");}
for(var i in COLS){$("#"+id_container+"_COLS").append("<li value=\""+COLS[i].value+"\">"+COLS[i].label+"</li>");}
for(var i in AGG){$("#"+id_container+"_AGG").append("<li value=\""+AGG[i].value+"\">"+AGG[i].label+"</li>");}
for(var i in HIDDEN){$("#"+id_container+"_HIDDEN").append("<li value=\""+HIDDEN[i].value+"\">"+HIDDEN[i].label+"</li>");}
/* Sortable */
var defaultOption={	sort: true,group: {name: 'myToolbar',pull: true,put: true},animation: 150,	onEnd: function (evt){_onChange();}};

var listAGG = document.getElementById(id_container+"_AGG");
var test1=Sortable.create(listAGG,defaultOption ); // That's all.

var listROWS = document.getElementById(id_container+"_ROWS");
Sortable.create(listROWS, defaultOption); // That's all.var 
		listCOLS = document.getElementById(id_container+"_COLS");
Sortable.create(listCOLS, defaultOption); // That's all.

/*options*/
// Aggregation functions

$("#"+id_container).append("<fieldset class=\"options\"><label>functions</label><select id=\""+id_container+"_AGGREGATION\"></select></fieldset>");
var liste=myFunc.getListAggregator();
for(i in liste){document.getElementById(id_container+"_AGGREGATION").options[document.getElementById(id_container+"_AGGREGATION").options.length]=new Option(liste[i],liste[i])}
$("#"+id_container+"_AGGREGATION").on("change",function(){chAggregator=document.getElementById(id_container+"_AGGREGATION").value;_onChange()})
	
}

getFunctions=function(gv,agg,forma)
{//return myFunc.fonctionsCum;
//user.selection
retold ={
getValue:function(rec){
				//console.log(rec);
				return rec.value;},
aggregator:function(cell){
				var a= jStat(cell);
				return this.formater(a.median());},
cumulative:false,
formater:function(e){return (Math.floor(e*Math.pow(10,2))/Math.pow(10,2)).toLocaleString()}
}
/*var ret={
getValue:myFunc.getValue(gv),
aggregator:myFunc.aggregator(agg),
cumulative:false,
formater:myFunc.formater(forma)
};
*/




return retold
}



 return function() {
        return{
        init:init,
		getConfigCOLROW:getConfigCOLROW,
		getFunctions:getFunctions,
		display:display
		}
    };
}
);