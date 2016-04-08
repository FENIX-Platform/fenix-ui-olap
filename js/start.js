define([
    "fx-common/pivotator/start", 
    "gt_msg_grid",'jdatagrid','localpagination'
],
    
    function (pivotator) {
    function rendererTable(result, id, fonctions) {
        ret = "<table border=1><tr>";
        var span = result.rowHeaders[0].length;
        ret += "<th colspan=" + span + "></th>";
        for (var i in result.columnHeaders) {
            ret += "<th>" + result.columnHeaders[i] + " </th>";
        }
        ret += "</tr>";
        count = 0;
        for (var i in result.rowHeaders) {
            count++;
//if(count>100)continue;
            ret += "<tr>";
            for (var j in result.rowHeaders[i]) {
                ret += "<th>" + result.rowHeaders[i][j] + "</th>";
            }
            for (var j in result.columnHeaders) {
                if (result.data[i][j]) {
                    ret += "<td>" + fonctions.aggregator(result.data[i][j]) + "</td>";
                }
                else {
                    ret += "<td></td>";
                }
            }
            ret += "</tr>";
        }

        ret += "</table>";
        document.getElementById(id).innerHTML = ret;
    }


    function rendererGrid(result, id, fonctions) {


//document.getElementById(id).innerHTML="";
        var r2d2 = [];
        for (var i in result.rowHeaders) {

            var rowtemp = [];
            for (var j in result.rowHeaders[i]) {
                rowtemp.push(result.rowHeaders[i][j]);
            }
            for (var j = 0; j < result.data[i].length; j++) {
                if (result.data[i][j]) {
                    rowtemp.push(fonctions.aggregator(result.data[i][j]));
                }
                else {
                    rowtemp.push('')
                }
            }
            r2d2.push(rowtemp);
        }
        var dsOption = {

            fields: [],
            //recordType : 'array',

            recordType: 'array',
            //data : __TEST_DATA__
            data: r2d2

        }

//"region","subregion","country","domain","incomes","indicator"
        var colsOption = [];
        for (var i in result.rowNames) {
//if( result.rowNames[i].length>1)
            {
                colsOption.push({id: result.rowNames[i], frozen: true, grouped: true});
                dsOption.fields.push({name: result.rowNames[i]});
            }
        }
        for (var i in result.columnHeaders) {
//if(result.columnHeaders[i].length>1)
            {
                colsOption.push({id: result.columnHeaders[i].join(""), header: result.columnHeaders[i].join("\n")});
                dsOption.fields.push({name: result.columnHeaders[i].join("")});
            }
        }

        var gridOption = {
            id: id,
            width: "100%",  //"100%", // 700,
            height: "350",  //"100%", // 330,
            container: id,
            replaceContainer: false,
            dataset: dsOption,
            columns: colsOption,
            pageSize: 15,
            pageSizeList: [15, 25, 50, 150],
            SigmaGridPath: 'grid/',
            toolbarContent: 'nav | goto | pagesize '
        };


        //Sigma.destroyGrids();
//if(mygrid==null){
        mygrid = new Sigma.Grid(gridOption);

//Sigma.Util.onLoad(

        Sigma.Grid.render(mygrid)();
// );}

    }


    function rendererGridFX(FX, id, optGr) {

        var myPivotator = new pivotator();

        var result;
        if (optGr.COLS.length > 0) {
            result = myPivotator.pivot(FX, optGr.ROWS, optGr.COLS, {
                myfunction: optGr.GetValue,
                cumulative: false,
                aggregator: optGr.Aggregator,
                formater: optGr.Formater,
                nbDecimal: optGr.nbDecimal
            });//,'subsubject'
        }
        else {
            result = FX;
        }

        console.log("result", result);

        var dsOption = {fields: [], recordType: 'array', data: result.data}
        var colsOption = [];
        for (var i in result.metadata.dsd.columns) {
            if (!result.metadata.dsd.columns[i].subject || result.metadata.dsd.columns[i].subject != "value") {
                //console.log("dimension",result.metadata.dsd.columns[i].id)
                colsOption.push({
                    id: result.metadata.dsd.columns[i].id,
                    header: result.metadata.dsd.columns[i].title["EN"],
                    frozen: true,
                    grouped: true
                });
                dsOption.fields.push({
                    name: result.metadata.dsd.columns[i].id
                });
            }
            else {
                //console.log('value',result.metadata.dsd.columns[i].id);
                colsOption.push({
                    id: result.metadata.dsd.columns[i].id,
                    header: result.metadata.dsd.columns[i].title["EN"]
                });
                dsOption.fields.push({name: result.metadata.dsd.columns[i].id});
            }

        }

        var gridOption = {
            id: id,
            width: "100%",
            height: "350",
            container: id,
            replaceContainer: false,
            dataset: dsOption,
            columns: colsOption,
            pageSize: 15,
            pageSizeList: [15, 25, 50, 150],
            SigmaGridPath: 'grid/',
            toolbarContent: 'nav | goto | pagesize '
        };
        console.log("gridOption", gridOption)

        //Sigma.destroyGrids();
        $("#" + id).empty()
        mygrid = new Sigma.Grid(gridOption);


        Sigma.Grid.render(mygrid)();


        return result;
    }


	
	function rendererGridFXJSON(FX, id, optGr) {
console.log("rendererGridFXJSON",FX,id,optGr)
        var myPivotator = new pivotator();

/*default OptGr={
                myfunction: optGr.GetValue,
                cumulative: false,
                aggregator: optGr.Aggregator,
                formater: optGr.Formater,
                nbDecimal: optGr.nbDecimal,
				fulldataformat:true
            }*/		
		
        var result;
		var tableHeader="<table id='myHead1' style='display:none'>";
		var rowSpan=optGr.COLS.length;
        if (optGr.COLS.length > 0) {result = myPivotator.pivot(FX, optGr);}
        else {result = myPivotator.toFXJson(FX);}

        console.log("result", result,optGr);
		
	
        var dsOption = {fields: [], recordType: 'array', data: result.data}
        var colsOption = [];
		tableHeader+="<tr>";
		for(var i in result.rowname){
			colsOption.push(
					{
						id: result.rowname[i].id,
						header: result.rowname[i].title["EN"],
						frozen: false,
						grouped: true
					});
			tableHeader+="	<td rowspan='"+rowSpan+"' columnId='"+result.rowname[i].id+"' resizable='false'>"+result.rowname[i].title["EN"]+"</td>";
			dsOption.fields.push({name: result.rowname[i].id});
		}
		//tableHeader+="</tr><tr>";
		for(var i in result.cols)
			{
			tableHeader+="	<td rowspan='"+rowSpan+"' columnId='"+result.cols[i].id+"' resizable='false'>"+result.cols[i].title["EN"]+"</td>";
		
			  colsOption.push({
                    id: result.cols[i].id,
                    header: result.cols[i].title["EN"]
                });
                dsOption.fields.push({name: result.cols[i].id});
			}
		tableHeader+="</tr></table>";
		console.log("TABLE HEADER",tableHeader);
		$("#myHead1").remove();
        /*for (var i in result.cols) {
            if (!result.metadata.dsd.columns[i].subject || result.metadata.dsd.columns[i].subject != "value") {
                colsOption.push({
                    id: result.metadata.dsd.columns[i].id,
                    header: result.metadata.dsd.columns[i].title["EN"],
                    frozen: true,
                    grouped: true
                });
                dsOption.fields.push({
                    name: result.metadata.dsd.columns[i].id
                });
            }
            else {
                //console.log('value',result.metadata.dsd.columns[i].id);
                colsOption.push({
                    id: result.metadata.dsd.columns[i].id,
                    header: result.metadata.dsd.columns[i].title["EN"]
                });
                dsOption.fields.push({name: result.metadata.dsd.columns[i].id});
            }

        }
*/
        
		 // customHead : 'myHead1',
		 /*" <table id='myHead1' style='display:block'>"+
"<tr>"+
"	<td rowspan='2' columnId='no' resizable='false'>Order No</td>"+
"	<td rowspan='2' columnId='employee' resizable='false'>Employee</td>"+
 " <td colspan='7'>Order Info</td>"+
"</tr>"+
"<tr>"+
"	<td columnId='country'>Country</td>"+
"	<td columnId='customer'>Customer</td>"+
"	<td columnId='bill2005'>2005</td>"+
"	<td columnId='bill2006'>2006</td>"+
"	<td columnId='bill2007'>2007</td>"+
"	<td columnId='bill2008'>2008</td>"+
"	<td columnId='orderDate'>Ship Date</td>"+
"</tr>"+
"</table>"*/
		 
		 
$("body").append(  tableHeader);
		
		var gridOption = {
            id: id,
            width: "100%",
            height: "350",
            container: id,
            replaceContainer: false,
            dataset: dsOption,
			customHead : 'myHead1',

            columns: colsOption,
            pageSize: 15,
            pageSizeList: [15, 25, 50, 150],
            SigmaGridPath: 'grid/',
            toolbarContent: 'nav | goto | pagesize '
        };
       console.log("gridOption", gridOption)

        //Sigma.destroyGrids();
        $("#" + id).empty();
        var mygrid = new Sigma.Grid(gridOption);
		
	//	Sigma.Util.onLoad(
		Sigma.Grid.render(mygrid)();
//		);


        return result;
    }

	
	
	
	
	
	function renderJDataGrid(FX, id, optGr)
	{
	var myPivotator = new pivotator();
	optGr["fulldataformat"]=false;
	result = myPivotator.pivot(FX, optGr);
console.log(result);

var mydata={"total":result.rows.length,"rows":[],

"footer":[]
};





	var data=[];
	for(var i in result.data)
		{
	if(i>100){break;}
		var temp={};
		for(var j in result.rowname)
			{
			
			temp[result.rowname[j].id]=result.rows[i][j]}
		for(var j in result.cols)
			{temp[result.cols[j].id]=result.data[i][j]}
			data.push(temp);
		}
	
	//console.log(data)
	mydata.rows=data;
	var mycolumns=[];
	for(var i in result.cols){mycolumns.push({field:result.cols[i].id,title:result.cols[i].title["EN"],width:80,align:'right'})}
	/*[
	[
        {field:'listprice',title:'List Price',width:80,align:'right',colspan:4},
       
    ],
	[
        {field:'listprice',title:'List Price',width:80,align:'right'},
        {field:'unitcost',title:'Unit Cost',width:80,align:'right'},
        {field:'attr1',title:'Attribute',width:100},
        {field:'status',title:'Status',width:60}
    ]];*/
	var myfrozzencolumn=[];
	for(var i in result.rowname){myfrozzencolumn.push({field:result.rowname[i].id,title:result.rowname[i].title["EN"],width:80})}
	
	/*[[
        {field:'itemid',title:'Item ID',width:80},
        {field:'productid',title:'Product ID',width:80},
    ]];*/
	//console.log(id,data,myfrozzencolumn,mycolumns,$('#'+id))
	
$('#'+id).empty();

var renderConfig={
	      
	 //treeField:	  result.rowname[0].id,
		  pagination:true,
		   pageSize: 4,
		   pageList: [4,5,10],
		   rownumbers: true,
	title:'NEW GRID',
	pagination:true,
	                

    //iconCls:'icon-save',
    width:500,
    height:250,
    //url:'data/datagrid_data.json',
	//data:data,
    frozenColumns:[myfrozzencolumn],
    columns:[mycolumns]
}

console.log("BEFORE RENDERISATION",renderConfig,mydata)
	$('#'+id).treegrid(renderConfig).treegrid('clientPaging');
$('#'+id).treegrid("loadData",mydata)
	}
	
    return function () {
        return {
		render:rendererGridFXJSON,
            rendererTable: rendererTable,
            rendererGrid: rendererGrid,
            rendererGridFX: rendererGridFXJSON,
			renderJDataGrid:renderJDataGrid

        }
    };
});