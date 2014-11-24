 FAOSTATOLAPV3={};
FAOSTATOLAPV3.grouped=true;
function changechkTreeview()
{
   FAOSTATOLAPV3.grouped=document.getElementById('chkTreeview').checked;
   FAOSTATOLAPV3.mygrid="";
$("#testinline").pivotUI(finalData,{"rows":["Area","Item","Year"],"cols":["Element"],"vals":["Value"]},false);}

function newGrid(r){
   var r2d2=[];
    console.log(r);
  $("#myGrid1_div").remove();
for(ligne in r.tree)
    {
        //console.log(ligne);
   var temp=ligne.split('||');
    for(col in r.colKeys)
    { 
        var coldInd=r.colKeys[col].join("||");//.replace(/[^a-zA-Z0-9]/g,"_")
      // console.log(coldInd);
        // for(col in r.tree[ligne])
  /*      console.log("ligne"+ligne+" "+r.tree[ligne]);
        console.log(col+":"+r.tree[ligne][col].value());*/
if( r.tree[ligne][coldInd]!=null){temp.push(r.tree[ligne][coldInd].value());}
else{temp.push( "");}
                // r2d2.push([ligne,col,+r.tree[ligne][col].value()]);
      }
    //  console.log(temp);
      r2d2.push(temp);
     }
       // console.log(r2d2);
var grid_demo_id = "myGrid1" ;


var dsOption= {

	fields :[],

	recordType : 'array',
	data : r2d2
};

/*
		{name : 'Area'  },
		{name : 'Item'  },
		{name : 'Element'  },
                {name : '2007'  },
		{name : '2008'  },
		{name : '2009'  },
                {name : '2010'  }*/


var colsOption = [];
 /*
     {id: 'Area' , header: "Area" , width :60,frozen : true  },
     
	   {id: 'Item' , header: "Item" , width :70,frozen : true  },
	   {id: 'Element' , header: "Element" , width :80 ,frozen : true },
           {id: '2007' , header: "2007" , width :60  },
	   {id: '2008' , header: "2008" , width :70  },
	   {id: '2009' , header: "2009" , width :80  },
            {id: '2010' , header: "2010" , width :70  }*/


for(var i in r.rowAttrs){
   r.rowAttrs[i];
   dsOption.fields.push({name : r.rowAttrs[i]  });
   colsOption.push({id:  r.rowAttrs[i] , header:  r.rowAttrs[i] , width :150,frozen : true ,grouped : FAOSTATOLAPV3.grouped  });
   
}

for(var i in r.colKeys){
 // console.log(r.colKeys[i].toString());
   dsOption.fields.push({name : r.colKeys[i].toString().replace(/[^a-zA-Z0-9]/g,"_")  });
   colsOption.push({id:  r.colKeys[i].toString().replace(/[^a-zA-Z0-9]/g,"_") ,
       width :150,header:  r.colKeys[i].toString()  });
   
}


Sigma.ToolFactroy.register(
	'mybutton',  
	{
		cls : 'mybutton-cls',  
		toolTip : 'I am a new button',
		action : function(event,grid) {  alert( 'The id of this grid is  '+grid.id)  }
	}
);



var gridOption={
	id : grid_demo_id,
	width: "800",  //"100%", // 700,
	height: "330",  //"100%", // 330,
	container :'pvtRendererArea',// 'gridbox',// $(".pvtRendererArea")[0],//
	replaceContainer : true, 
	dataset : dsOption ,
	columns : colsOption,
	pageSize : 15 ,
        pageSizeList : [15,25,50,150],
        SigmaGridPath : 'grid/',
	toolbarContent : 'nav | goto | mybutton | pagesize '
};


console.log(r2d2);
console.log(colsOption );
console.log(dsOption.fields);
//Sigma.Msg.Grid.en.PAGE_AFTER='okokk'+gridOption.pageSize;
  FAOSTATOLAPV3.mygrid=new Sigma.Grid( gridOption );
  
console.log( FAOSTATOLAPV3.mygrid);
 Sigma.Grid.render( FAOSTATOLAPV3.mygrid)() ;
 document.getElementById('page_after').innerHTML="/"+FAOSTATOLAPV3.mygrid.getPageInfo().totalPageNum;
  FAOSTATOLAPV3.mygrid.pageSizeSelect.onchange=function()
  {document.getElementById('page_after').innerHTML="/"+FAOSTATOLAPV3.mygrid.getPageInfo().totalPageNum;};
 
 if(FAOSTATOLAPV3.grouped){$("#myGrid1_div").append($("<label for=\"chkTreeview\">Treeview/sorting columns</label><input checked onchange=\"changechkTreeview()\" type=\"checkbox\" id=\"chkTreeview\">"));}
else{$("#myGrid1_div").append($("<label for=\"chkTreeview\">Treeview/Sorting columns</label><input  onchange=\"changechkTreeview()\" type=\"checkbox\" id=\"chkTreeview\">"));}
}




FAOSTATOLAP2 = {};
FAOSTATOLAP2.displayOption =
        {
            showUnit: 0,
            showCode: 0,
            showFlag: 0,
            overwrite: true
        };
       //  google.load("visualization", "1", {packages:["corechart", "charteditor"]});

FAOSTATOLAP2.options = {
    E:{
        derivedAttributes: {
                    "Area": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<span class=\"ordre\">" + mp["Var1Order"] + "</span><table class=\"innerCol\"><th>" + mp["Country Code"] + "</th><th>" + mp["Country_"] + "</th></table>";
                        }
                        else {
                            return "<span class=\"ordre\">" + mp["Var1Order"] + "</span>" + mp["Country_"];
                        }
                    },
                    "Element": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<span class=\"ordre\">" + mp["Var2Order"] + "</span><table class=\"innerCol\"><th>" + mp["Element Code"] + "</th><th>" + mp["Element_"]+" ("+mp["Unit"]+")" + "</th></table>";
                        }
                        else {
                            return "<span class=\"ordre\">" + mp["Var2Order"] + "</span>" + mp["Element_"]+" ("+mp["Unit"]+")";
                        }
                    },
                    "Item": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<span class=\"ordre\">" + mp["Var3Order"] + "</span><table class=\"innerCol\"><th>" + mp["Item Code"] + "</th><th>" + mp["Item_"] + "</th></table>";
                        }
                        else {
                            return "<span class=\"ordre\">" + mp["Var3Order"] + "</span>" + mp["Item_"];
                        }
                    }
                },
                rows: ["Area", "Element", "Item"],
                cols: ["Year"],
                vals: ["Value", "Unit", "Flag"],
                linkedAttributes: []
            },
    F:{
                derivedAttributes: {
                    "Pays": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<span class=\"ordre\">" + mp["Var1Order"] + "</span><table class=\"innerCol\"><th>" + mp["Country Code"] + "</th><th>" + mp["Country_"] + "</th></table>";
                        }
                        else {
                            return "<span class=\"ordre\">" + mp["Var1Order"] + "</span>" + mp["Country_"];
                        }
                    },
                    "Elements": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<span class=\"ordre\">" + mp["Var2Order"] + "</span><table class=\"innerCol\"><th>" + mp["Element Code"] + "</th><th>" + mp["Element_"] + "</th></table>";
                        }
                        else {
                            return "<span class=\"ordre\">" + mp["Var2Order"] + "</span>" + mp["Element_"];
                        }
                    },
                    "Articles": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<span class=\"ordre\">" + mp["Var3Order"] + "</span><table class=\"innerCol\"><th>" + mp["Item Code"] + "</th><th>" + mp["Item_"] + "</th></table>";
                        }
                        else {
                            return "<span class=\"ordre\">" + mp["Var3Order"] + "</span>" + mp["Item_"];
                        }
                    }
                },
                rows: ["Pays", "Elements", "Articles"],
                cols: ["Annees"],
                vals: ["Value", "Unit", "Flag"],
                linkedAttributes: []
            }
    , S:{
        derivedAttributes: {
            "Area": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">" + mp["Var1Order"] + "</span><table class=\"innerCol\"><th>" + mp["Country Code"] + "</th><th>" + mp["Country_"] + "</th></table>";
                 }
                 else {
                     return "<span class=\"ordre\">" + mp["Var1Order"] + "</span>" + mp["Country_"];
                 }
             },
            "Element": function(mp)
             {
                 if (F3DWLD.CONFIG.wdsPayload.showCodes)
                 {
                     return "<span class=\"ordre\">" + mp["Var2Order"] + "</span><table class=\"innerCol\"><th>" + mp["Element Code"] + "</th><th>" + mp["Element_"] + "</th></table>";
                 }
                 else {
                     return "<span class=\"ordre\">" + mp["Var2Order"] + "</span>" + mp["Element_"];
                 }
             },
            "Item": function(mp)
             {
                 if (F3DWLD.CONFIG.wdsPayload.showCodes)
                 {
                     return "<span class=\"ordre\">" + mp["Var3Order"] + "</span><table class=\"innerCol\"><th>" + mp["Item Code"] + "</th><th>" + mp["Item_"] + "</th></table>";
                 }
                 else {
                     return "<span class=\"ordre\">" + mp["Var3Order"] + "</span>" + mp["Item_"];
                 }
             }
         },
                 rows: ["Area", "Element", "Item"],
                 cols: ["Year"],
                 vals: ["Value", "Unit", "Flag"],
                 linkedAttributes: []
            }
        };

FAOSTATOLAP2.header = {E: [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
            "Item_", "Year", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order",
            "Var4Order"]],
    F: [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
            "Item_", "Annees", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order",
            "Var4Order"]],
    S: [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
            "Item_", "Year", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order",
            "Var4Order"]]
};


FAOSTATOLAP2.optionsTM = {
    E: {
        derivedAttributes: {
            "Reporter": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ReporterCode"] + "</th><th>" + mp["ReporterName"] + "</th></table>";
                }
                else {
                    return mp["ReporterName"];
                }
            },
            "Partner": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["PartnerCode"] + "</th><th>" + mp["PartnerName"] + "</th></table>";
                }
                else {
                    return mp["PartnerName"];
                }
            },
            "Element": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ElementName"] + "</th><th>" + mp["ElementCode"] + "</th></table>";
                }
                else {
                    return mp["ElementName"];
                }
            },
            "Item": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ItemCode"] + "</th><th>" + mp["ItemName"] + "</th></table>";
                }
                else {
                    return mp["ItemName"];
                }
            }}
        ,
        rows: ["Reporter", "Partner", "Item", "Element"],
        cols: ["Year"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []
    },
    F: {
        derivedAttributes: {
            "Reporteurs": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ReporterCode"] + "</th><th>" + mp["ReporterName"] + "</th></table>";
                }
                else {
                    return mp["ReporterName"];
                }
            },
            "Partnaires": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["PartnerCode"] + "</th><th>" + mp["PartnerName"] + "</th></table>";
                }
                else {
                    return mp["PartnerName"];
                }
            },
            "Elements": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ElementCode"] + "</th><th>" + mp["ElementName"] + "</th></table>";
                }
                else {
                    return mp["ElementName"];
                }
            },
            "Articles": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ItemCode"] + "</th><th>" + mp["ItemName"] + "</th></table>";
                }
                else {
                    return mp["ItemName"];
                }
            }
        }
        ,
        rows: ["Reporteurs", "Partnaires", "Articles", "Elements"],
        cols: ["Annees"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []
    }
    ,
    S: {
        derivedAttributes: {
            "Reporter": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ReporterCode"] + "</th><th>" + mp["ReporterName"] + "</th></table>";
                }
                else {
                    return mp["ReporterName"];
                }
            },
            "Partner": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["PartnerCode"] + "</th><th>" + mp["PartnerName"] + "</th></table>";
                }
                else {
                    return mp["PartnerName"];
                }
            },
            "Element": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ElementCode"] + "</th><th>" + mp["ElementName"] + "</th></table>";
                }
                else {
                    return mp["ElementName"];
                }
            },
            "Item": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ItemCode"] + "</th><th>" + mp["ItemName"] + "</th></table>";
                }
                else {
                    return mp["ItemName"];
                }
            }}
        ,
        rows: ["Reporter", "Partner", "Item", "Element"],
        cols: ["Year"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []}

};


FAOSTATOLAP2.headerTM = {
    E: [["n1", "n2",
            "Domain", "DomainName",
            "ReporterCode", "ReporterName",
            "PartnerCode", "PartnerName",
            "ElementCode", "ElementName",
            "ItemCode", "ItemName",
            "YearCode", "Year",
            "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]],
    F: [["n1", "n2",
            "Domain", "DomainName",
            "ReporterCode", "ReporterName",
            "PartnerCode", "PartnerName",
            "ElementCode", "ElementName",
            "ItemCode", "ItemName",
            "YearCode", "Annees",
            "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]],
    S: [["n1", "n2",
            "Domain", "DomainName",
            "ReporterCode", "ReporterName",
            "PartnerCode", "PartnerName",
            "ElementCode", "ElementName",
            "ItemCode", "ItemName",
            "YearCode", "Year",
            "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]]

};


FAOSTATOLAP2.headerFA = {E: [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
            "Item_", "Year", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order",
            "Var4Order"]],
    F: [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
            "Item_", "Annee", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order",
            "Var4Order"]],
    S: [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
            "Item_", "Year", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order",
            "Var4Order"]]
};


FAOSTATOLAP2.optionsFA = {
    E: {
        derivedAttributes: {
            "Recipient_Country": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["Country Code"] + "</th><th>" + mp["Country_"] + "</th></table>";
                }
                else {
                    return mp["Country_"];
                }
            },
            "Donor_Country": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["Element Code"] + "</th><th>" + mp["Element_"] + "</th></table>";
                }
                else {
                    return mp["Element_"];
                }
            },
            "Item": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["Item Code"] + "</th><th>" + mp["Item_"] + "</th></table>";
                }
                else {
                    return mp["Item_"];
                }
            }

        },
        rows: ["Recipient_Country", "Donor_Country", "Item"],
        cols: ["Year"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []

    }, F: {
        derivedAttributes: {
            "Pays_beneficiaire": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["Country Code"] + "</th><th>" + mp["Country_"] + "</th></table>";
                }
                else {
                    return mp["Country_"];
                }
            },
            "Pays_Donateur": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["Element Code"] + "</th><th>" + mp["Element_"] + "</th></table>";
                }
                else {
                    return mp["Element_"];
                }
            },
            "Article": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["Item Code"] + "</th><th>" + mp["Item_"] + "</th></table>";
                }
                else {
                    return mp["Item_"];
                }
            }

        },
        rows: ["Pays_beneficiaire", "Pays_Donateur", "Article"],
        cols: ["Annee"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []

    },
    S: {
        derivedAttributes: {
            "Recipient_Country": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["Country Code"] + "</th><th>" + mp["Country_"] + "</th></table>";
                }
                else {
                    return mp["Country_"];
                }
            },
            "Donor_Country": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["Element Code"] + "</th><th>" + mp["Element_"] + "</th></table>";
                }
                else {
                    return mp["Element_"];
                }
            },
            "Item": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["Item Code"] + "</th><th>" + mp["Item_"] + "</th></table>";
                }
                else {
                    return mp["Item_"];
                }
            }

        },
        rows: ["Recipient_Country", "Donor_Country", "Item"],
        cols: ["Year"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []

    }



};




FAOSTATOLAP2.optionsHS = {
    E: {
        derivedAttributes: {
            "Survey": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ReporterCode"] + "</th><th>" + mp["ReporterName"] + "</th></table>";
                }
                else {
                    return mp["ReporterName"];
                }
            },
            "Breakdown_Variable": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["PartnerCode"] + "</th><th>" + mp["PartnerName"] + "</th></table>";
                }
                else {
                    return mp["PartnerName"];
                }
            },
            "Breakdown_by_Sex": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ElementCode"] + "</th><th>" + mp["ElementName"] + "</th></table>";
                }
                else {
                    return mp["ElementName"];
                }
            },
            "Indicator": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ItemCode"] + "</th><th>" + mp["ItemName"] + "</th></table>";
                }
                else {
                    return mp["ItemName"];
                }
            }

        },
        rows: ["Survey", "Breakdown_Variable", "Breakdown_by_Sex", "Indicator"],
        cols: ["Measure"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []

    },
    F: {
        derivedAttributes: {
            "Survey": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ReporterCode"] + "</th><th>" + mp["ReporterName"] + "</th></table>";
                }
                else {
                    return mp["ReporterName"];
                }
            },
            "Breakdown_Variable": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["PartnerCode"] + "</th><th>" + mp["PartnerName"] + "</th></table>";
                }
                else {
                    return mp["PartnerName"];
                }
            },
            "Breakdown_by_Sex": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ElementCode"] + "</th><th>" + mp["ElementName"] + "</th></table>";
                }
                else {
                    return mp["ElementName"];
                }
            },
            "Indicator": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ItemCode"] + "</th><th>" + mp["ItemName"] + "</th></table>";
                }
                else {
                    return mp["ItemName"];
                }
            }

        },
        rows: ["Survey", "Breakdown_Variable", "Breakdown_by_Sex", "Indicator"],
        cols: ["Measure"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []

    },
    S: {
        derivedAttributes: {
            "Survey": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ReporterCode"] + "</th><th>" + mp["ReporterName"] + "</th></table>";
                }
                else {
                    return mp["ReporterName"];
                }
            },
            "Breakdown_Variable": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["PartnerCode"] + "</th><th>" + mp["PartnerName"] + "</th></table>";
                }
                else {
                    return mp["PartnerName"];
                }
            },
            "Breakdown_by_Sex": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ElementCode"] + "</th><th>" + mp["ElementName"] + "</th></table>";
                }
                else {
                    return mp["ElementName"];
                }
            },
            "Indicator": function(mp)
            {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<table class=\"innerCol\"><th>" + mp["ItemCode"] + "</th><th>" + mp["ItemName"] + "</th></table>";
                }
                else {
                    return mp["ItemName"];
                }
            }

        },
        rows: ["Survey", "Breakdown_Variable", "Breakdown_by_Sex", "Indicator"],
        cols: ["Measure"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []

    }


};
FAOSTATOLAP2.headerHS = {E: [["n1", "n2",
            "Domain", "DomainName",
            "ReporterCode", "ReporterName",
            "PartnerCode", "PartnerName",
            "ElementCode", "ElementName",
            "ItemCode", "ItemName",
            "YearCode", "Measure",
            "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]],
    F: [["n1", "n2",
            "Domain", "DomainName",
            "ReporterCode", "ReporterName",
            "PartnerCode", "PartnerName",
            "ElementCode", "ElementName",
            "ItemCode", "ItemName",
            "YearCode", "Measure",
            "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]],
    S: [["n1", "n2",
            "Domain", "DomainName",
            "ReporterCode", "ReporterName",
            "PartnerCode", "PartnerName",
            "ElementCode", "ElementName",
            "ItemCode", "ItemName",
            "YearCode", "Measure",
            "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]]

};

function retConfig(domain, lang)
{//mesOptionsPivotSend
    var response2_2 = [];
    var mesOptionsPivot = {};
    if (domain == "TM" || domain == "FT")
    {
        response2_2 = FAOSTATOLAP2.headerTM[lang];

        for (j in FAOSTATOLAP2.optionsTM[lang]) {
            mesOptionsPivot[j] = FAOSTATOLAP2.optionsTM[lang][j];
        }
    }
    else if (domain == "HS")
    {
        response2_2 = FAOSTATOLAP2.headerHS[lang];
        mesOptionsPivot = {};
        for (j in FAOSTATOLAP2.optionsHS[lang]) {
            mesOptionsPivot[j] = FAOSTATOLAP2.optionsHS[lang][j];
        }
    }
    else if (domain == "FA")
    {
        response2_2 = FAOSTATOLAP2.headerFA[lang];
        mesOptionsPivot = {};
        for (j in FAOSTATOLAP2.optionsFA[lang]) {
            mesOptionsPivot[j] = FAOSTATOLAP2.optionsFA[lang][j];
        }
    }
    else {
        response2_2 = FAOSTATOLAP2.header[lang];
        mesOptionsPivot = {};
        for (j in FAOSTATOLAP2.options[lang]) {
            mesOptionsPivot[j] = FAOSTATOLAP2.options[lang][j];
        }
    }

    return [response2_2, mesOptionsPivot];

}
		