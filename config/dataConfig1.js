define({
	"rows": [
		"Element",
		"Area",
		"Item"
	],
	"cols": ["Year"],
	"vals": ["Value",
		"Flag"],
	"hiddenAttributes":[
		"AreaCode",
		"ElementCode",
		"ItemCode",
		"Unit",
		"Value",
		"Flag",
		"VarOrder1",
		"VarOrder2",
		"VarOrder3",
		"VarOrder4"
	],
	"InstanceRenderers":[{label:"Grid",func:"Table"},{label:"Table",func:"Table2"},{label:"HTable",func:"OLAP"}]
	,"InstanceAggregators":[{label:"SOMME",func:"Sum2"},{label:"Sum",func:"Sum"},{label:"Average",func:"Average"}]
});		