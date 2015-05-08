HPivot=function(pivotData,id){
	var mydata=[];
	var myfield=
	{/* Area: {field: 'Area', sort: "asc", showAll: true, agregateType: "distinct", label: "Area"},
	Item: {field: 'Item', sort: "asc", showAll: true, agregateType: "distinct", label: "Indicator"},
	Element: {field: 'Element', sort: "asc", showAll: true, agregateType: "distinct", label: "Month"},
	Year: {field: 'Year', sort: "asc", showAll: true, agregateType: "distinct", label: "Year"},*/
    count: {agregateType: "count", groupType: "none", label: "Counts"},
    sum: {field: 'Value', agregateType: "sum", groupType: "none", label: "Sum"},
	average: {field: 'Value', agregateType: "average", groupType: "none", label: "Average", 
    formatter: function(V, f) {var res = null;if (typeof(V) === "number") {res = V.toFixed(2);}return res;}},
	Unit: {field: 'Unit', sort: "asc", showAll: true, agregateType: "distinct", label: "Unit"},
	Flag: {field: 'Flag', sort: "asc", showAll: true, agregateType: "distinct", label: "Flag"}
	};
	for(i in pivotData.rowAttrs){
		myfield[pivotData.rowAttrs[i]]={field: pivotData.rowAttrs[i], sort: "asc",  agregateType: "distinct", label: pivotData.rowAttrs[i]};//showAll: true,
	}
	for(i in pivotData.colAttrs){
		myfield[pivotData.colAttrs[i]]={field: pivotData.colAttrs[i], sort: "asc",  agregateType: "distinct", label: pivotData.colAttrs[i]};//showAll: true,
	}
	for(var i in pivotData.tree){   
		var  rowTemp=i.split("||");
		for(var k in pivotData.tree[i]){
			ft={};
			for(var j=0;j<pivotData.rowAttrs.length;j++)
			{ft[pivotData.rowAttrs[j]]=rowTemp[j];}
		var colTemp=k.split("||");
		for(var j=0;j<pivotData.colAttrs.length;j++)
		{ft[pivotData.colAttrs[j]]=colTemp[j];}

		ft["Value"]=pivotData.tree[i][k].value()[0];
	   /* 	ft["Unit"]=FAOSTATNEWOLAP.internalData.tree[i][k].value()[1];
			ft["flag"]=FAOSTATNEWOLAP.internalData.tree[i][k].value()[2];
		*/
	 mydata.push(ft); 
	}
}
    if( /*typeof HPivott !== 'undefined' 
	&&*/ typeof $(id).data('unc-jbPivot') !== 'undefined'
	){
	
		$(id).data('unc-jbPivot').options.xfields= pivotData.rowAttrs;
		$(id).data('unc-jbPivot').options.yfields= pivotData.colAttrs;
		//$("#fx-olap-graph-div").data('unc-jbPivot')._create()
		$(id).data('unc-jbPivot').reset();
		$(id).data('unc-jbPivot').insertRecords(mydata);
		$(id).data('unc-jbPivot')._renderHtml();
	}
	else{
		$(id).jbPivot({
		 fields: myfield,
		 xfields: pivotData.rowAttrs,
		 yfields: pivotData.colAttrs,
		 zfields: ["sum", "Unit","Flag"],
		 data: mydata,
		 copyright: false,
		 summary: true,
		 l_all: "All",
		 l_unused_fields: "Available fields",
		 InternalID:id
		}
	 );
	}
}

barhightchart=function(r,id,scope){
var monXaxis=[];
for(entry in r.colKeys)
{monXaxis.push(r.colKeys[entry].toString().replace(/<span class="ordre">\d+<\/span>/g,"").replace(/\|\|/g," X "));}

var maSeries=[];
   if(r.colKeys.length>0){
    for(ligne in r.tree){
        var temp={"name":ligne.replace(/<span class="ordre">\d+<\/span>/g,"").replace(/\|\|/g," X "),"data":[]};
        for(col in r.colKeys){
        var coldInd=r.colKeys[col].join("||");//.replace(/[^a-zA-Z0-9 ]/g,"_");
        if( r.tree[ligne][coldInd]!=null){ temp.data.push(r.tree[ligne][coldInd].value()); }
        else{temp.data.push( null);}
		//temp.push(r.rowTotals[ligne].sum);
		// r2d2.push([ligne,col,+r.tree[ligne][col].value()]);
      }
      maSeries.push(temp);
     }
}
else{/*
     for(ligne in r.rowTotals){
          var temp=ligne.split('||');
          if( r.rowTotals[ligne]!=null){temp.push(r.rowTotals[ligne].value());}
            else{temp.push( null);}
      r2d2.push(temp);
     }*/
}


/*  series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) {
                                hs.htmlExpand(null, { pageOrigin: {x: e.pageX || e.clientX,y: e.pageY || e.clientY},
                                    headingText: this.series.name,
                                    maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                        this.y + ' visits',
                                    width: 200
                                });
                            }
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                },*/



var commonJson={  title: {text: ' '    },
    plotOptions: {  
    column: { pointPadding: 0.2,  borderWidth: 0     },
     line: { connectNulls: false }
    },
	subtitle: {text: 'Source: FAOSTAT'},
    xAxis: {categories:monXaxis ,crosshair: true},
    yAxis: {min: 0/*,  title: {   text: 'Rainfall (mm)'  }*/   },
    tooltip: {
	headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
    footerFormat: '</table>',
    shared: true,
	useHTML: true
    },
	series: maSeries
    };
   
    if(scope=="barchart"){commonJson.chart={type: 'column'};}
    else if(scope=="line"){commonJson.plotLines=[];}
    else if(scope=="area"){
        commonJson.chart= {type: 'area'};
        commonJson.plotOptions={area: {stacking: 'normal'}}
    }
     else if(scope=="stackedColumn"){
		commonJson.chart= {type: 'column'};
        commonJson.plotOptions={column: {  stacking: 'normal'}}
		}
 $(id).highcharts(commonJson);
}

	
newGrid=function(r,id){
	
		var FAOSTATOLAPV3={};
		FAOSTATOLAPV3.grouped=true;
		var r2d2=[];
		$("#"+id+"mesFlags").empty();
		for(ligne in r.tree){
			var temp=ligne.split('||');
			for(col in r.colKeys){
				var coldInd=r.colKeys[col].join("||");//.replace(/[^a-zA-Z0-9]/g,"_")
				if( r.tree[ligne][coldInd]!=null){temp.push(r.tree[ligne][coldInd].value());}
				else{temp.push("");}
			}
			r2d2.push(temp);
		}
	var grid_demo_id = id+"_myGrid1" ;
	var dsOption= {	fields :[],	recordType : 'array',	data : r2d2};

	var colsOption = [];
	for(var i in r.rowAttrs){
		dsOption.fields.push({name : r.rowAttrs[i]  });
		colsOption.push({id:  r.rowAttrs[i] , header:  r.rowAttrs[i] , frozen : true ,grouped : FAOSTATOLAPV3.grouped});  
	}
	var reg = new RegExp("<span class=\"ordre\">[0-9]*</span>", "g"); 
	var reg2 = new RegExp("<span class=\"ordre\">[0-9]*</span><table class=\"innerCol\"><th>([0-9]+)</th><th>([^>]*)</th></table>", "g"); 

	for(var i in r.colKeys){
   dsOption.fields.push({name : r.colKeys[i].toString().replace(/[^a-zA-Z0-9]/g,"_")  });
   montitle="";
   for(var ii=0;ii<r.colKeys[i].length;ii++){
	   if(true || F3DWLD.CONFIG.wdsPayload.showCodes)
	   {montitle+="<br>"+r.colKeys[i][ii].replace(reg2, "$2 ($1)")/*.replace(/[^a-zA-Z0-9]/g,"_")*/;}
	   else{montitle+="<br>"+r.colKeys[i][ii].replace(reg, "")/*.replace(/[^a-zA-Z0-9]/g,"_")*/;}
	   }
	   colsOption.push({id:  r.colKeys[i].join("_").replace(/[^a-zA-Z0-9]/g,"_") ,
		header: montitle, toolTip : true ,toolTipWidth : 150});
}
	var gridOption={
	id : grid_demo_id,
	width: "100%",  //"100%", // 700,
	height: "250",  //"100%", // 330,
	container :grid_demo_id+"_div",//pvtRendererArea",//testinline2",//'',//myGrid1_div',//pivot_table',// 'gridbox',// $(".pvtRendererArea")[0],//
	replaceContainer : true, 
	dataset : dsOption ,
	resizable : false,
	columns : colsOption,
	pageSize : 15 ,
	pageSizeList : [15,25,50,150],
	SigmaGridPath : 'grid/',
	toolbarContent : 'nav | goto | pagesize ',/*| mybutton |*/
	onMouseOver : function(value,  record,  cell,  row,  colNo, rowNo,  columnObj,  grid){
		if (columnObj && columnObj.toolTip) {grid.showCellToolTip(cell,columnObj.toolTipWidth);}
		else{grid.hideCellToolTip();}
	},
	onMouseOut : function(value,  record,  cell,  row,  colNo, rowNo,  columnObj,  grid){grid.hideCellToolTip();}
};
	FAOSTATOLAPV3.mygrid=new Sigma.Grid( gridOption );
  
	Sigma.Grid.render(FAOSTATOLAPV3.mygrid)();
	document.getElementById('page_after').id=id+"_page_after"
	document.getElementById(id+'_page_after').innerHTML="/"+FAOSTATOLAPV3.mygrid.getPageInfo().totalPageNum;
	
	FAOSTATOLAPV3.mygrid.pageSizeSelect.onchange=function()
	{document.getElementById(id+'_page_after').innerHTML="/"+FAOSTATOLAPV3.mygrid.getPageInfo().totalPageNum;};
	if(FAOSTATOLAPV3.grouped){$("#"+id+"_mesFlags").append($("<label for=\"chkTreeview\">Treeview/sorting columns</label><input checked onchange=\"changechkTreeview()\" type=\"checkbox\" id=\"chkTreeview\">"));}
	else{$("#"+id+"mesFlags").append($("<label for=\"chkTreeview\">Treeview/Sorting columns</label><input  onchange=\"changechkTreeview()\" type=\"checkbox\" id=\"chkTreeview\">"));}
	$("#nested_by").hide();
	} 

