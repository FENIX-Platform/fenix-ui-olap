define(["pivotator","gt_msg_grid","commonutilities",], function(pivotator) {
function rendererTable(result,id,fonctions){
ret="<table border=1><tr>";
var span=result.rowHeaders[0].length;
ret+="<th colspan="+span+"></th>";
for(var i in result.columnHeaders)
{ret+="<th>"+result.columnHeaders[i]+" </th>";}
ret+="</tr>";
count=0;
for(var i in result.rowHeaders)
{
count++;
//if(count>100)continue;
	ret+="<tr>";
	for(var j in result.rowHeaders[i])
	{
	ret+="<th>"+result.rowHeaders[i][j]+"</th>";
	}
	for(var j in result.columnHeaders)
	{
	if(result.data[i][j]){ret+="<td>"+fonctions.aggregator(result.data[i][j])+"</td>";}
	else{ret+="<td></td>";}
	}
	ret+="</tr>";
}

ret+="</table>";
document.getElementById(id).innerHTML= ret;
}


function rendererGrid(result,id,fonctions){

addCSS("lib/grid/gt_grid_height.css")



//document.getElementById(id).innerHTML="";
var r2d2=[];
for(var i in result.rowHeaders)
{

var rowtemp=[];
for (var j in result.rowHeaders[i])
	{rowtemp.push( result.rowHeaders[i][j]);}
for (var j=0;j<result.data[i].length;j++)
	{	if(result.data[i][j]){	rowtemp.push(fonctions.aggregator(result.data[i][j]));	}
		else{rowtemp.push('')}
	}
r2d2.push(rowtemp);
}
var dsOption= {

	fields :[],
	//recordType : 'array',

	recordType : 'array',
	//data : __TEST_DATA__
	data : r2d2

	}

//"region","subregion","country","domain","incomes","indicator"
var colsOption = [];
for(var i in result.rowNames)
{
//if( result.rowNames[i].length>1)
{
colsOption.push({id :  result.rowNames[i], frozen: true, grouped: true  });
dsOption.fields.push({name :  result.rowNames[i] });
}
}
for(var i in result.columnHeaders)
{
//if(result.columnHeaders[i].length>1)
{
colsOption.push({id : result.columnHeaders[i].join(""), header: result.columnHeaders[i].join("\n")    });
dsOption.fields.push({name : result.columnHeaders[i].join("") });
}
}

var gridOption={
	id :id,
	width: "100%",  //"100%", // 700,
	height: "350",  //"100%", // 330,
	container : id, 
	replaceContainer : false, 
	dataset : dsOption ,
	columns : colsOption,
	pageSize: 15,
    pageSizeList: [15, 25, 50, 150],
    SigmaGridPath: 'grid/',
    toolbarContent: 'nav | goto | pagesize '
};


  //Sigma.destroyGrids();
//if(mygrid==null){
 mygrid=new Sigma.Grid( gridOption );

//Sigma.Util.onLoad(

 Sigma.Grid.render(mygrid)();
// );}

}
 
 
 

 


function rendererGridFX(FX,id,optGr){
	//addCSS("lib/grid/gt_grid_height.css")

	var myPivotator=new pivotator();
	
	var result; 
	console.log("optGr",optGr)
	if(optGr.COLS.length>0){
	result = myPivotator.pivot(FX,optGr.ROWS, optGr.COLS, {myfunction:optGr.GetValue,cumulative:false,aggregator:optGr.Aggregator,formater:optGr.Formater,nbDecimal:optGr.nbDecimal});//,'subsubject'
	}
	else{result=FX;}
	
	console.log("result",result);

var dsOption= {	fields :[],	recordType : 'array',	data : result.data	}
var colsOption = [];
for(var i in result.metadata.dsd.columns)
{
	if(!result.metadata.dsd.columns[i].subject || result.metadata.dsd.columns[i].subject!="value"){
		//console.log("dimension",result.metadata.dsd.columns[i].id)
		colsOption.push({id :  result.metadata.dsd.columns[i].id, header: result.metadata.dsd.columns[i].title["EN"] , frozen: true, grouped: true  });
		dsOption.fields.push({name : result.metadata.dsd.columns[i].id
		});}
	else{
		//console.log('value',result.metadata.dsd.columns[i].id);
		colsOption.push({id : result.metadata.dsd.columns[i].id, header: result.metadata.dsd.columns[i].title["EN"]  });
		dsOption.fields.push({name : result.metadata.dsd.columns[i].id });
	}
	
}
	
	var gridOption={
	id :id,
	width: "100%", 
	height: "350",  
	container :id, 
	replaceContainer : false, 
	dataset : dsOption ,
	columns : colsOption,
	pageSize: 15,
    pageSizeList: [15, 25, 50, 150],
    SigmaGridPath: 'grid/',
    toolbarContent: 'nav | goto | pagesize '
};
console.log("gridOption",gridOption)

  //Sigma.destroyGrids();
$("#"+id).empty()
 mygrid=new Sigma.Grid( gridOption );



 Sigma.Grid.render(mygrid)();
	
	
}
 

 
 

 return  function() {
        return{
       rendererTable:rendererTable,
	   rendererGrid:rendererGrid,
	   rendererGridFX:rendererGridFX
	   
		}
    };
});