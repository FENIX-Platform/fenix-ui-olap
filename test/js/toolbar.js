define([
        'jquery',
        "sortable",
        "fx-common/pivotator/functions",
        "fx-common/pivotator/fenixtool"
    ], function ($, Sortable, myFunctions, fenixTool) {


        id_container = "";
        columns = [];
        rows = [];
        aggregations = [];
        hidden = [];
        values = [];
        chGetValue = "classicToNumber";
        chAggregator = {value:"sum",v1:"default"};
        chFormater = "localstring";
        chNbDecimal = 2;
        chshowUnit = false;
        chshowFlag = false;
        chshowCode = false;
        _onChange = null;
        myFunc = new myFunctions();
        var myfenixTool = new fenixTool();

        init = function (id, FX, opt) {

            var lang = "EN";
            if (opt.lang) {
                lang = opt.lang;
            }
            if (opt.decimals) {
                chNbDecimal = opt.decimals;
            }
            if (opt.showUnit) {
                chshowUnit = opt.showUnit;
            }
            if (opt.showFlag) {
                chshowFlag = opt.showFlag;
            }
            if (opt.showCode) {
                chshowCode = opt.showCode;
            }
            id_container = id;

            document.getElementById(id).className = "olapToolbar";

            _onChange = opt.onchange;
            /*for(var i in FX.columns)
             {
             if(FX.columns[i].dataType=="number"){HIDDEN.push({value:FX.columns[i].id,label:FX.columns[i].title[lang]})}
             else if (FX.columns[i].subject!="time" && FX.columns[i].key==true ){ROWS.push({value:FX.columns[i].id,label:FX.columns[i].title[lang]});}
             else if(FX.columns[i].subject=="time"){COLS.push({value:FX.columns[i].id,label:FX.columns[i].title[lang]})}
             else {AGG.push({value:FX.columns[i].id,label:FX.columns[i].title[lang]})}
             }*/
            var retObj = myfenixTool.initFXT(FX, opt)
            //console.log("convertFX",FX,retObj)
            hidden = retObj.hidden;
            rows = retObj.rows;
            columns = retObj.columns;
            aggregations = retObj.aggregations;
            values = retObj.values;

        }


        getConfigCOLROW = function (FX) {
            var ret = {aggregations: {}, columns: {}, rows: {}, hidden: {}, values: {}};
            $.each($("#" + id_container + "_AGG >li"), function (e, a) {
                ret.aggregations[a.getAttribute('value')] = true
            });
            $.each($("#" + id_container + "_ROWS >li"), function (e, a) {
                ret.rows[a.getAttribute('value')] = true
            });
            $.each($("#" + id_container + "_COLS >li"), function (e, a) {
                ret.columns[a.getAttribute('value')] = true
            });
            $.each($("#" + id_container + "_HIDDEN >li"), function (e, a) {
                ret.hidden[a.getAttribute('value')] = true
            });
            $.each($("#" + id_container + "_VALS >li"), function (e, a) {
                ret.values[a.getAttribute('value')] = true
            });
            ret.aggregationFn = chAggregator;
            ret.valueOutputType = chGetValue;
            ret.formatter = chFormater;
            ret.decimals = chNbDecimal;
            ret.showUnit = chshowUnit;
            ret.showFlag = chshowFlag;
            ret.showCode = chshowCode;

            ret2 = myfenixTool.initFXD(FX, ret);
            $.extend(ret, ret2);
//console.log("Ret after extend",ret,ret2)
            return ret;

        }

        showCode = function () {
            chshowCode = !chshowCode;
            _onChange();
        }

        showUnit = function () {
            chshowUnit = !chshowUnit;
            _onChange()
        }

        showFlag = function () {
            chshowFlag = !chshowFlag;
            _onChange()
        }


        display = function () {
            var parent = this;
            $("#" + id_container).append(
                "<input type=checkbox id=showCode onchange=showCode()><label for=showCode>showCode</label></input> <input type=checkbox  onchange=showUnit() id=showUnit><label for=showUnit>showUnit</label></input> <input type=checkbox  id=showFlag onchange=showFlag()><label for=showFlag >showFlag</label></input>" +
                "<fieldset class=\"myFieldset\"><div class=\"title\">HIDDEN</div><ul id=\"" + id_container + "_HIDDEN\"></ul></fieldset>" +
                "<fieldset class=\"myFieldset\"><div class=\"title\">AGG</div><ul id=\"" + id_container + "_AGG\"></ul></fieldset>" +
                "<fieldset class=\"myFieldset\"><div class=\"title\">ROWS</div><ul id=\"" + id_container + "_ROWS\"></ul></fieldset>" +
                "<fieldset class=\"myFieldset\"><div class=\"title\">COLS</div><ul id=\"" + id_container + "_COLS\"></ul></fieldset>" +
                "<fieldset class=\"myFieldset\"><div class=\"title\">VALS</div><ul id=\"" + id_container + "_VALS\"></ul></fieldset>"
            );
            for (var i in rows) {
                $("#" + id_container + "_ROWS").append("<li value=\"" + rows[i].value + "\">" + rows[i].label + "</li>");
            }
            for (var i in columns) {
                $("#" + id_container + "_COLS").append("<li value=\"" + columns[i].value + "\">" + columns[i].label + "</li>");
            }
            for (var i in aggregations) {
                $("#" + id_container + "_AGG").append("<li value=\"" + aggregations[i].value + "\">" + aggregations[i].label + "</li>");
            }
            for (var i in hidden) {
                $("#" + id_container + "_HIDDEN").append("<li value=\"" + hidden[i].value + "\">" + hidden[i].label + "</li>");
            }
            for (var i in values) {
                $("#" + id_container + "_VALS").append("<li value=\"" + values[i].value + "\">" + values[i].label + "</li>");
            }

            /* Sortable */
            var defaultOption = {
                sort: true,
                group: {name: 'myToolbar', pull: true, put: true},
                animation: 150,
                onEnd: function (evt) {
                    _onChange();
                }
            };

            var listAGG = document.getElementById(id_container + "_AGG");
            var test1 = Sortable.create(listAGG, defaultOption); // That's all.

            var listROWS = document.getElementById(id_container + "_ROWS");
            Sortable.create(listROWS, defaultOption); // That's all.var

            var listCOLS = document.getElementById(id_container + "_COLS");
            Sortable.create(listCOLS, defaultOption); // That's all.

            var listCOLS = document.getElementById(id_container + "_HIDDEN");
            Sortable.create(listCOLS, defaultOption); // That's all.

            var listCOLS = document.getElementById(id_container + "_VALS");
            Sortable.create(listCOLS, defaultOption); // That's all.

            /*options*/
// Aggregation functions

        
            /*options*/
			// Aggregation functions
			var mesFunc="<fieldset class=\"options\"><label>functions</label>";
            var liste = myFunc.getListAggregator();
            for (var i in liste) {
			mesFunc+=i+"<select id=\"" + id_container + "_AGGREGATION_"+i+"\" onchange='chAggregator[\""+i+"\"]=this.value;_onChange()'>";
			for(var j in liste[i]){mesFunc+="<option>"+j+"</option>"}
			mesFunc+="</select>"
                //document.getElementById(id_container + "_AGGREGATION").options[document.getElementById(id_container + "_AGGREGATION").options.length] = new Option(liste[i], liste[i])
            }
			
			mesFunc+="</fieldset>"
			console.log("mesFunc",mesFunc)
			  $("#" + id_container).append(mesFunc);
          
			/*
            $("#" + id_container + "_AGGREGATION").on("change", function () {
                chAggregator["value"] = document.getElementById(id_container + "_AGGREGATION").value;
                _onChange()
            })*/

        }
        /*
         getFunctions=function(gv,agg,forma)
         {//return myFunc.fonctionsCum;
         //user.selection
         retold ={
         getValue:function(rec){
         //console.log(rec);
         return rec.value;},
         aggregator:function(cell){
         var a= jStat(cell);
         return this.formater(a.median());},
         cumulative:false,
         formater:function(e){return (Math.floor(e*Math.pow(10,2))/Math.pow(10,2)).toLocaleString()}
         }
         //var ret={
         //getValue:myFunc.getValue(gv),
         //aggregator:myFunc.aggregator(agg),
         //cumulative:false,
         //formater:myFunc.formater(forma)
         //};
         //




         return retold
         }
         */


        return function () {
            return {
                init: init,
                getConfigCOLROW: getConfigCOLROW,
                //getFunctions:getFunctions,
                display: display
            }
        };
    }
);