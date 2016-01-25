define({
    // id: grid_demo_id,
    width: "100%", //"100%", // 700,
    height: "400", //"100%", // 330,
    // container: "grid_demo_id" + "_div",
    replaceContainer: true,
    //dataset: dsOption,
    resizable: false,
    //columns: colsOption,
    pageSize: 15,
    pageSizeList: [15, 25, 50, 150],
    SigmaGridPath: 'grid/',
    toolbarContent: 'nav | goto | pagesize ', /*| mybutton |*/
    /*onMouseOver: function(value, record, cell, row, colNo, rowNo, columnObj, grid) {
     if (columnObj && columnObj.toolTip) {grid.showCellToolTip(cell, columnObj.toolTipWidth);}
     else {grid.hideCellToolTip();}
     },
     onMouseOut: function(value, record, cell, row, colNo, rowNo, columnObj, grid) {grid.hideCellToolTip();}*/
});