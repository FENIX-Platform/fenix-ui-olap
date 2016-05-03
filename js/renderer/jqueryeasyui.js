  var jDataGridObject = {currentPage: 0, pageMax: 150};

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
//console.log("data",data)
            mydata.rows = data;
            var mycolumns = [];
          
          var colstemp=myPivotator.toTree(result.cols2,"colspan");
        //  console.log("toTree finnished",colstemp)
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
		   
		   
			// console.log("mycolumns finnished",mycolumns);
			
			   var rowstemp=myPivotator.toTree(result.rows,"rowspan");
			 
			 // console.log("rowstemp",rowstemp);
			  
			  
			
			
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
                return mydata.rows;
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


/*
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

*/

            var renderConfig = {
                id: id,
                iconCls: 'icon-ok',
                rownumbers: false,
                animate: false,
                collapsible: false,
                fitColumns: false,
                clientPaging: true,
                //url: 'treegrid_data4.json',
                //method: 'get',
               // data:mydata.rows,
                  loader: function (param, success, error) {success(getData2(id));           },
                loadFilter:myLoadFilter,
                idField: 'id',
                treeField: 'ID',
                pagination: true,
                pageSize: 2,
                pageList: [2, 5, 10],
                frozenColumns: [myfrozzencolumn],
                columns: mycolumns
            }
//console.log("MyCol",mycolumns)
          //  console.log("BEFORE RENDERISATION", renderConfig, mydata, '#' + id, mydata);
//console.log(document.getElementById('result'))

            $(function () {

               $el.find('#' + id + "_" + id).treegrid(renderConfig).treegrid('clientPaging');

            })

        }

       function jDatagridPivot(obj)
	   {
		    var myPivotator = new pivotator();
                var FX= obj.model;
                var optGr = $.extend({},obj.config);
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
			
			
			 
			
			
			
			
			
			
			
//console.log("APRES PIVOTATOR",FX,result)	
var myDataR=[];
for(var i in result.data)
{
	if(i>50){break}
	var temp={value:"VALUES"};//value:"VALUES"};
	for(var j in result.rowname){temp[result.rowname[j].id]=result.rows[i][j]}
	for(var j in result.cols){temp[result.cols[j].id]=result.data[i][j]	}
		myDataR.push(temp)
	
}
	   var rowNameR=[];
	   for(var i in result.rowname)
	   {rowNameR.push(result.rowname[i].id)}
   //['form','name']
var colNameR=['value'];
//for(var i in result.colname)  {colNameR.push(result.colname[i].id)}
//['year'],
   var valNameR=[];
for(var i in result.cols)  {valNameR.push({field:result.cols[i].id})}/*:[
                        {field:'gdp'},
                        {field:'oil'},
                        {field:'balance'}
                    ]*/
   //result
    
    /*        $el.find(".datagrid").remove(); 
			$el.find(".datagrid").empty();
      */  
	   $el.append("<div id='" + id + "_" + id + "' />");
			
			
			//console.log("before render",rowNameR,myDataR)
			   var mycolumns = [];
          
          var colstemp=myPivotator.toTree(result.cols2,"colspan");
        //console.log("toTree finnished",colstemp)
           for(var i in colstemp)
		   {
		   mycolumns.push([]);
		   for (var j in colstemp[i]){
				if(i==colstemp.length-1){
				mycolumns[i].push({title:colstemp[i][j].id.split("_")[i],field:"VALUES_"+colstemp[i][j].id,tt:["VALUES"].concat([colstemp[i][j].id])})
				}
				else{				mycolumns[i].push({title:colstemp[i][j].id.split("_")[i],colspan:colstemp[i][j].span,tt:["VALUES"].concat([colstemp[i][j].id])})
}
				
			}
		   }
			
			
			/*
			for(var i in result.cols)
			{
					mycolumns[i].push({title:colstemp[i][j].id,colspan:colstemp[i][j].span,tt=}
			}*/
			
			
			//console.log('#' + id + "_" + id,JSON.stringify(mycolumns))
			
			
		
			
			var finalOptr={
pagination:true,
	 /* url:'pivotgrid_data2.json',
                method:'get',
                */
				data:myDataR,
				// loadFilter:myLoadFilter,
				pivot:{
                    rows:rowNameR,
                    columns:colNameR,
                    values:valNameR
                },
                valuePrecision:3,
				//columns:mycolumns
               // valueStyler:function(value,row,index){if (/balance$/.test(this.field) && value<0){return 'background:pink'}}
            }
			
			//console.log	("finalOptr"	,finalOptr	)
			
			
			
      $el.find('#' + id + "_" + id).pivotgrid(finalOptr)//.treegrid({columns:mycolumns})



		
		   
	   }


