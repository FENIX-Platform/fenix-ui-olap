[![Stories in Ready](https://badge.waffle.io/FENIX-Platform/fenix-ui-olap.png?label=ready&title=Ready)](https://waffle.io/FENIX-Platform/fenix-ui-olap)
fenix-ui-olap
=============


#FENIX UI OLAP


Requirejs import : 
define(['fx-olap/start'], function (OlapCreator) {
...

General principe:
From a ressource Fenix (FX in this document) and some extra-configurations provided, a pivotator based creator apply two mains operations : 
	-denormalisation of the dataset
	-aggregation
	-renderisation of the result with an external library


Constructor :
   this.olap = new OlapCreator(config);
with config is a json Object with these fields :


columns and rows:
	Define the operations of denormalization of FX : wich columns have to be display as rows and wich in columns
	example columns:["Country","Indicator_EN"],rows:["Year"]




aggregations: FX columns we want to aggregate 
			exemple aggregations:["IndicatorCode_EN","Year"]
			they will not appears in the Grid

values: describe wich columns in the ressources will be aggregates and displayed in the values part of the grid


aggregationFn: 
			exemple : {value:"sum",um:"dif"}
			This object is needed to identify which 					aggregation function have to be applied for each field on the "values" part of the dataset. The functions identifiers "sum" and dif in this example refer to a function of aggregation implemented in the functions part of the application

formatter: "localstring" or "value" : iditifier of the formater function for the value field localstring result will be in this format : "1 250,12", value will return 1250,12 


hidden: not yet implemented : now it is an equivalent of the "aggregations" parameter

decimals: number of decimal for the values



el: the ID of the dom container where the grid will be displayed

model: The ressource FENIX to display

showRowHeaders: boolean to show the row header in the output matrix of the pivotator (cf pivotator documention)

Full example : 
var FX={
  metadata:{
	dsd:{
	columns:[
		{"id" : "country","title" : {"EN" : "COUNTRY CODE"},key:true},
		{"id" : "country_EN","title" : {"EN" : "COUNTRIES"}},
		{"id" : "element","title" : { "EN" : "elementcode"},key:true},
		{"id" : "element_EN","title" : {"EN" : "element"}},
		{"id" : "item","title" : {"EN" : "Item"},key:true},
		{"id" : "item_EN","title" : {"EN" : "item"}},
		{"id" : "year","title" : {"EN" : "year"},key:true,subject:"time"},
		{"id" : "um","title" : {"EN" : "um"},subject:"um"},
		{"id" : "value","title" : {"EN" : "value"},subject:"value",dataType:"number"},
		{"id" : "flag","title" : {"EN" : "flag"},subject:"flag"},
		{"id" : "v1","title" : {"EN" : "v1"},dataType:"number",subject:"value"},
		{"id" : "v1|*v2","title" : {"EN" : "v2"},subject:"flag"}	,{"id" : "v3","title" : {"EN" : "v3"}},{"id" : "v4","title" : {"EN" : "v4"}},{"id" : "v5","title" : {"EN" : "v5"}}
		]
		}
		},
  
  "data" : [
  ["4","Algeria","5312","Area_harvested","366","Artichokes","2006","Ha","1713.00","","","003","1","007",""],
  ["4","Algeria","5312","Area_harvested","366","Artichokes","2007","Ha","1813.00","","","003","1","007",""]]};

var config={
rows :["country_EN","element_EN","item_EN"],
 columns :["year"],
aggregations:["item_EN"],
values:["value"],
aggregationFn:{value:"sum"},
formatter:"localstring",
showRowHeaders:true,
model:FX,
el:"#result"
}


   this.olap = new OlapCreator(config);
will create a grid in the container with the ID=result with country label, element label in row and the year in columns, group by the item: the aggregation function used will be the sum for the columns "value"



#update
the update function allow the user to modify the config file and refresh the grid : model,el have don't need to be provided.
example
this.olap.update({type:"area"})

