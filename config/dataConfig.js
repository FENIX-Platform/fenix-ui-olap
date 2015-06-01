define({
    "rows": [
        "Element",
        "Area",
        "Item"
    ],
    "cols": ["Year"],
    "vals": [
        "Value",
        "Flag"
    ],
    "hiddenAttributes": [
        "AreaCode",
        "ElementCode",
        "ItemCode",
        "Unit",
        "Value",
        "Flag",
        "VarOrder1",
        "VarOrder2",
        "VarOrder3",
        "VarOrder4",
        "Var1Order",
        "Var2Order",
        "Var3Order",
        "Var4Order",
        "NoRecords",
        "RecordOrder"
    ],
    "InstanceRenderers": [
        {label: "Grid", func: "Table"}
    ],
    "InstanceAggregators": [
        {label: "SOMME", func: "Sum2"},
        {label: "Sum", func: "Sum"},
        {label: "Average", func: "Average"}
    ],
    "showAgg": false,
    "showRender": false
});		