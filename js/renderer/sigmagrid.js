define(["fx-common/pivotator/start",
        "gt_msg_grid",], function (pivotator) {


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

            //console.log("result", result);

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
            //console.log("gridOption", gridOption)

            //Sigma.destroyGrids();
            $("#" + id).empty()
            mygrid = new Sigma.Grid(gridOption);


            Sigma.Grid.render(mygrid)();


            return result;
        }

        function rendererGridFXJSON(obj) {

            //Input parsing
            
            var optGr = {};
            optGr.AGG = obj.aggregations;
            optGr.COLS = obj.columns;
            optGr.VALS = obj.values;
            optGr.ROWS = obj.rows;
            optGr.HIDDEN = obj.hidden;
            optGr.Aggregator = obj.aggregationFn;
            optGr.Formater = obj.formatter;
            optGr.GetValue = obj.valueOutputType;
            optGr.fulldataformat = obj.showRowHeaders;
            optGr.nbDecimal = obj.decimals;
            optGr.showCode = obj.showCode;
            optGr.showFlag = obj.showFlag;
            optGr.showUnit = obj.showUnit;

            //end Input parsing

            // console.log("rendererGridFXJSON",obj)
            var myPivotator = new pivotator();
            var FX = obj.model;

            var id;
            var $el = $(obj.el);

            //Check if box has a valid id
            if (!obj.id) {
                window.fx_olap_id >= 0 ? window.fx_olap_id++ : window.fx_olap_id = 0;
                id = "fx_olap_" + window.fx_olap_id;
            } else {
                id = obj.id;
            }


            var result;
            var tableHeader = "<table id='myHead1' style='display:none'>";
            var rowSpan = optGr.COLS.length;

            result = myPivotator.pivot(FX, optGr);

//console.log("RESULT FIN",result)
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
                tableHeader += "<td rowspan='" + rowSpan + "' columnId='" + result.rowname[i].id + "' resizable='false'>" + result.rowname[i].title["EN"] + "</td>";
                dsOption.fields.push({name: result.rowname[i].id});
            }
            //tableHeader+="</tr><tr>";
            var colstemp = myPivotator.toTree(result.cols2, 'colspan');
            var colstempL = myPivotator.toTree(result.cols2label, 'colspan');
            //  console.log("COLSTEMP",colstemp,colstempL)
            for (var i in colstemp) {
                if (i == 0) {
                    for (var j in colstemp[i]) {
                        tableHeader += "	<td  colspan='" + colstemp[i][j].span + "'>" + colstemp[i][j].id.split("_")[colstemp[i][j].id.split("_").length - 1] + "</td>";
                    }
                    tableHeader += "</tr>";
                }
                else {
                    tableHeader += "<tr>";
                    for (var j in colstemp[i]) {
                        tableHeader += "	<td  colspan='" + colstemp[i][j].span + "'>" + colstemp[i][j].id.split("_")[colstemp[i][j].id.split("_").length - 1] + "</td>";
                    }
                    tableHeader += "</tr>";
                    //  console.log(j)
                }

                if (optGr.VALS.length > 1) {


                    //for(var v in optGr.VALS){
                    if (i == colstemp.length - 1) {
                        for (var j in colstemp[i]) {
                            //console.log("test",optGr.VALS)
                            for (var v in optGr.VALS) {

                                colsOption.push({
                                    id: colstemp[i][j].id.replace(" ", "_") + "_" +
                                    optGr.VALS[v].replace(/\|\*/g, "_"),
                                    header: colstempL[i][j].id.replace(/_/g, "\n") + "\n" + optGr.VALS[v].replace(/.*\|\*/g, "").replace(" ", "_")

                                });
                                dsOption.fields.push({name: colstemp[i][j].id + "_" + optGr.VALS[v]});
                            }
                        }
                    }
                    //}
                }
                else {
                    if (i == colstemp.length - 1) {
                        for (var j in colstemp[i]) {
                            colsOption.push({
                                id: colstemp[i][j].id.replace(" ", "_"),
                                header: colstempL[i][j].id.replace(/_/g, "\n").replace(/ /g, "_"),

                            });
                            dsOption.fields.push({name: colstemp[i][j].id.replace(" ", "_")});

                        }
                    }
                }

            }

            tableHeader += "</tr></table>";

            $("#myHead1").remove();

            $("body").append(tableHeader);

            var gridOption = {
                id: id + "_" + id,
                width: "100%",
                height: "350",
                container: id + "_" + id,
                replaceContainer: false,
                dataset: dsOption,
                //  customHead : 'myHead1',

                columns: colsOption,
                pageSize: 15,
                pageSizeList: [15, 25, 50, 150],
                SigmaGridPath: 'grid/',
                toolbarContent: 'nav | goto | pagesize '
            };
            //   console.log("gridOption", gridOption)

            //Sigma.destroyGrids();
            //	console.log($el,id)
            $el.find(".datagrid").remove();
            $el.find(".datagrid").empty();
            $el.append("<div id='" + id + "_" + id + "' class='datagrid' />");
            $("#" + id + "_" + id).empty();
            var mygrid = new Sigma.Grid(gridOption);

            //	Sigma.Util.onLoad(
            Sigma.Grid.render(mygrid)();
//		);
            return result;
        }

        return rendererGridFXJSON
    }
);