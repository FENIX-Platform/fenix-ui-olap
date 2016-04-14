define([
        "fx-common/pivotator/start",
        "gt_msg_grid",
        'jdatagrid',
       // 'localpagination'
    ], function (pivotator) {

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

        function rendererGridFXJSON(obj) {
            console.log("rendererGridFXJSON", FX, id, optGr)
            var myPivotator = new pivotator();
			var FX= obj.model;
                var optGr = obj.config;
                var id;
                var $el = $(obj.el);

                //Check if box has a valid id
                if (!obj.id) {
					window.fx_olap_id >= 0 ? window.fx_olap_id++ : window.fx_olap_id = 0;
                    id = "fx_olap_" + window.fx_olap_id;
                } else {      id = obj.id;                }
            /*default OptGr={
             myfunction: optGr.GetValue,
             cumulative: false,
             aggregator: optGr.Aggregator,
             formater: optGr.Formater,
             nbDecimal: optGr.nbDecimal,
             fulldataformat:true
             }*/

            var result;
            var tableHeader = "<table id='myHead1' style='display:none'>";
            var rowSpan = optGr.COLS.length;
            if (optGr.COLS.length > 0) {
                result = myPivotator.pivot(FX, optGr);
            }
            else {
                result = myPivotator.toFXJson(FX);
            }

            console.log("result", result, optGr);


            var dsOption = {fields: [], recordType: 'array', data: result.data}
            var colsOption = [];
            tableHeader += "<tr>";
            for (var i in result.rowname) {
                colsOption.push(
                    {
                        id: result.rowname[i].id,
                        header: result.rowname[i].title["EN"],
                        frozen: true,
                        grouped: true
                    });
                tableHeader += "	<td rowspan='" + rowSpan + "' columnId='" + result.rowname[i].id + "' resizable='false'>" + result.rowname[i].title["EN"] + "</td>";
                dsOption.fields.push({name: result.rowname[i].id});
            }
            //tableHeader+="</tr><tr>";
			var colstemp=myPivotator.toTree(result.cols2,'colspan');
			console.log("colstemp",colstemp)
            
			for(var i in colstemp)
			{
				if(i==0){
					for(var j in colstemp[i])
						{
							
							 tableHeader += "	<td  colspan='"+colstemp[i][j].span+"'>"+colstemp[i][j].id.split("_")[colstemp[i][j].id.split("_").length-1]+ "</td>";
							
						}
						 tableHeader += "</tr>";
				}
				else{
					 tableHeader += "<tr>";
					 for(var j in colstemp[i])
						{ tableHeader += "	<td  colspan='"+colstemp[i][j].span+"'>"+colstemp[i][j].id.split("_")[colstemp[i][j].id.split("_").length-1]+ "</td>";
						}
					  tableHeader += "</tr>";
					  console.log(j)
				
				}
					if(i==colstemp.length-1){
						 for(var j in colstemp[i])
						{ 
						 colsOption.push({
                    id: colstemp[i][j].id,
                    header: colstemp[i][j].id
                });
                dsOption.fields.push({name: colstemp[i][j].id});
						
					}
					}
				
				
			}
			/*for (var i in result.cols) {
                tableHeader += "	<td rowspan='" + rowSpan + "' columnId='" + result.cols[i].id + "' resizable='false'>TESTON" + result.cols[i].title["EN"] + "</td>";

                colsOption.push({
                    id: result.cols[i].id,
                    header: result.cols[i].title["EN"]
                });
                dsOption.fields.push({name: result.cols[i].id});
            }*/
            tableHeader += "</tr></table>";
            console.log("TABLE HEADER", tableHeader);
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


            $("body").append(tableHeader);

            var gridOption = {
                id:  id + "_" + id,
                width: "100%",
                height: "350",
                container: id+"_"+id,
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
			console.log($el,id)
			 $el.find(".datagrid").remove(); $el.find(".datagrid").empty();
            $el.append("<div id='" + id + "_" + id + "' class='datagrid' />");
            $("#" + id+"_"+id).empty();
            var mygrid = new Sigma.Grid(gridOption);

            //	Sigma.Util.onLoad(
            Sigma.Grid.render(mygrid)();
//		);


            return result;
        }

        var jDataGridObject = {currentPage: 0, pageMax: 150};

        //function renderJDataGrid(FX, id, optGr) {
        function renderJDataGrid(obj)  {

                var myPivotator = new pivotator();
                var FX= obj.model;
                var optGr = obj.config;
                var id;
                var $el = $(obj.el);

                //Check if box has a valid id
                if (!obj.id) {
					window.fx_olap_id >= 0 ? window.fx_olap_id++ : window.fx_olap_id = 0;
                    id = "fx_olap_" + window.fx_olap_id;
                } else {      id = obj.id;                }

              /*  console.log("model", FX)
                console.log("id", id)
                console.log("optGr", optGr)
                console.log("$el", $el)

*/
            optGr["fulldataformat"] = false;
            var result = myPivotator.pivot(FX, optGr);
//console.log("result",result);

            var mydata = { "total": result.rows.length, "rows": [], "footer": [] };


            /*
             var root={"ID":"root",id:0,"iconCls":"icon-ok",1990:"test"};
             for(var j in result.rowname){root[result.rowname[j]=result.rowname[j]]}
             */

            var data = [];
            //var data=[];

            var keyParentOld = [];

            //for(var i=jDataGridObject.currentPage;i<jDataGridObject.currentPage+ jDataGridObject.pageMax;i++)

            for (var i in result.data) {
                if (i > 10) {     break;           }
                var temp = {};
                var keyParent = result.rows[i].slice(0, result.rows[i].length - 1).join("_");
                var mykey;
                if (keyParentOld != keyParent) {
                    mykey = {ID: keyParent, id: keyParent, children: []};
                    data.push(mykey);
                    keyParentOld = keyParent;
                }
                for (var j in result.rowname) {
                    var myID = result.rows[i].join(" ");
                    temp["ID"] = myID;
                    //temp["ID_Name"]=result.rows[i].join(" - ");
                    temp["id"] = parseInt(i) + 2;
                    temp[result.rowname[j].id] = result.rows[i][j]
                }
                for (var j in result.cols) {
                    temp[result.cols[j].id] = result.data[i][j]
                }
                temp["parentId"] = keyParent;
               mykey.children.push(temp);
            }

//	console.log(JSON.stringify(data))
console.log("data",data)
            mydata.rows = data;
            var mycolumns = [];
          
          var colstemp=myPivotator.toTree(result.cols2,"colspan");
          console.log("toTree finnished",colstemp)
           for(var i in colstemp)
		   {
		   mycolumns.push([]);
		   for (var j in colstemp[i]){
				if(i==colstemp.length-1){
				mycolumns[i].push({title:colstemp[i][j].id,field:colstemp[i][j].id})
				}
				else{				mycolumns[i].push({title:colstemp[i][j].id,colspan:colstemp[i][j].span})
}
				
			}
		   }
		   
		   /*
            for (var i in result.cols) {
                mycolumns.push({field: result.cols[i].id, title: result.cols[i].title["EN"], width: 80, align: 'right'})
            }
            mycolumns = [[{title: "Value", colspan: 6}], mycolumns];
            
            
            
            */
		   
		   
			 console.log("mycolumns finnished",mycolumns);
			
			   var rowstemp=myPivotator.toTree(result.rows,"rowspan");
			 
			  console.log("rowstemp",rowstemp);
			  
			  
			
			
            var myfrozzencolumn = [{field: "ID", title: "ID", width: 80}];
            for (var i in result.rowname) {
               // if (i > result.rowname.length - 2)
                    myfrozzencolumn.push({field: result.rowname[i].id, title: result.rowname[i].title["EN"], width: 80})
            }

            //console.log(id,data,myfrozzencolumn,mycolumns,$('#'+id))


            $el.find(".datagrid").remove();
            $el.append("<div id='" + id + "_" + id + "' />");

            function getData1() {
                return [{
                    id: "root",
                    ID: 'parent 1',
                    state: 'closed',
                    parentId: 0,
                    children: mydata.rows/*{id: 11,
                     ID: 'child 1',
                     parentId: "root"},
                     {id: 12,
                     ID: 'child 2',
                     parentId: "root"}]*/
                }
                ];
            }

            function getData2(id) {
                //console.log("test",$("#"+id+"_"+id).treegrid().pagination('options').page)
                /*var myPage=$("#"+id+"_"+id).treegrid().pagination('options').page;
                 var myRoms=$("#"+id+"_"+id).treegrid().pagination('options').rows
                 */
                return mydata;
             //   return mydata.rows.slice((myPage - 1) * myRows, myRows);
                /*return [
                 {id: "root",
                 ID: 'root',
                 parentId:0},
                 {id: 11,
                 ID: 'child 1',
                 parentId: "root"},
                 {id: 12,
                 ID: 'child 2',
                 parentId: "root"},
                 {id: 13,
                 ID: 'child 23',
                 parentId: "root2"}
                 ]*/
            }



function myLoadFilter(data,parentId){
    function setData(data){
        var todo = [];
        for(var i=0; i<data.length; i++){
            todo.push(data[i]);
        }
        while(todo.length){
            var node = todo.shift();
            if (node.children && node.children.length){
                node.state = 'closed';
                node.children1 = node.children;
                node.children = undefined;
                todo = todo.concat(node.children1);
            }
        }
    }
    
    setData(data);
    var tg = $(this);
    var opts = tg.treegrid('options');
    opts.onBeforeExpand = function(row){
        if (row.children1){
            tg.treegrid('append',{
                parent: row[opts.idField],
                data: row.children1
            });
            row.children1 = undefined;
            tg.treegrid('expand', row[opts.idField]);
        }
        return row.children1 == undefined;
    };
    return data;
}



            var renderConfig = {
                id: id,
                iconCls: 'icon-ok',
                rownumbers: true,
                animate: false,
                collapsible: false,
                fitColumns: false,
                clientPaging: true,
                //url: 'treegrid_data4.json',
                //method: 'get',
                data:mydata.rows,
                //  loader: function (param, success, error) {success(getData2(id));           },
               // loadFilter:myLoadFilter,
                idField: 'id',
                treeField: 'ID',
                pagination: false,
                pageSize: 2,
                pageList: [2, 5, 10],
                frozenColumns: [myfrozzencolumn],
                columns: mycolumns
            }

            console.log("BEFORE RENDERISATION", renderConfig, mydata, '#' + id, mydata);
//console.log(document.getElementById('result'))

            $(function () {

               $el.find('#' + id + "_" + id).treegrid(renderConfig);//.treegrid('clientPaging');

            })

        }

        return function () {
            return {
                render: rendererGridFXJSON,
                rendererTable: rendererTable,
                rendererGrid: rendererGrid,
                rendererGridFX: rendererGridFXJSON,
                renderJDataGrid: renderJDataGrid

            }
        };
    });
