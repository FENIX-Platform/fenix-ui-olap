define(["jstat"], function() {
	/*
ret=
	{
		CUMULATIVE:{median:{
getValue:function(rec){
				//console.log(rec);
				return rec.value;},
aggregator:function(cell){
				var a= jStat(cell);
				return this.formater(a.median());},
cumulative:false,
formater:function(e){return (Math.floor(e*100)/100).toLocaleString()}
}

		}

,



		NONCUMULATIVE:{sum:{
getValue:function(entry,rec){

				if(entry === undefined){entry={sum:rec.value,num:1}}
				else{entry.sum+=rec.value;entry.num++;}
				return entry;},
aggregator:function(cell){
				return this.formater(cell.sum)},
cumulative:true,
formater:function(e){return Math.floor(e*100)/100}
		}}
		
	};



var fonctionsNoCum={
getValue:function(rec){
				//console.log(rec);
				return rec.value;},
aggregator:function(cell){
				var a= jStat(cell);
				return this.formater(a.sum());},
cumulative:false,
formater:function(e){return Math.floor(e*100)/100}
		}



		//cumulative sum function
		var fonctionsCum={
getValue:function(entry,rec){

				if(entry === undefined){entry={sum:rec.value,num:1}}
				else{entry.sum+=rec.value;entry.num++;}
				return entry;},
aggregator:function(cell){
				return this.formater(cell.sum)},
cumulative:true,
formater:function(e){return Math.floor(e*100)/100}

		}
		return function()
		{
			return{
			fonctionsCum:fonctionsCum,
			fonctionsNoCum:fonctionsNoCum,
			list:ret
			}
		}
		
}
*/
var Aggregator={sum:function(cell,format,nbDec){var a= jStat(cell);return format(a.sum(),nbDec)},
				avg:function(cell,format,nbDec){var a= jStat(cell);return format(a.mean(),nbDec)},
				median:function(cell,format,nbDec){var a= jStat(cell);return format(a.median(),nbDec)},
				stdev:function(cell,format,nbDec){var a= jStat(cell);return format(a.stdev(),nbDec)},
				count:function(cell,format,nbDec){var a= cell;return format(a.length,nbDec)},
				concat:function(cell,format,nbDec){var a= cell;console.log(a);return a.join(" - ")}
				}
var GetValue={Classic:function(rec){return rec.Value},classic:function(rec){return rec.value},
ClassicToNumber:function(rec){return parseFloat(rec.Value)},classicToNumber:function(rec){return parseFloat(rec.value)||null}
};

var Formater={localstring:function(e,nbdecimal){return (Math.floor(e*Math.pow(10,nbdecimal))/Math.pow(10,nbdecimal)).toLocaleString()},
value:function(e,nbdecimal){return Math.floor(e*Math.pow(10,nbdecimal))/Math.pow(10,nbdecimal)}};

var getListAggregator=function(){//for toolbar
ret=[];
		for(var i in Aggregator){ret.push(i)}
		return ret;
	}
var getAgg=function(choix){return Aggregator[choix]}

var getGetValue=function(choix){return GetValue[choix]}
var getFormater=function(choix){return Formater[choix]}

return function(){
	return {
getListAggregator:getListAggregator,
			getAgg:getAgg,
			getGetValue:getGetValue,
			getFormater:getFormater
			}
			
	
}

}
);