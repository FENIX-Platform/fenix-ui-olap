define([
        'jquery',
        "sortable",
        "fx-common/pivotator/functions",
        "fx-common/pivotator/fenixtool"
    ], function ($, Sortable, myFunctions, fenixTool) {


        id_container = "";
        COLS = [];
        ROWS = [];
        AGG = [];
        HIDDEN = [];
        VALS = [];
        chGetValue = "classicToNumber";
        chAggregator = "sum";
        chFormater = "value";
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
            if (opt.nbDecimal) {
                chNbDecimal = opt.nbDecimal;
            }
            if (opt.showUnit) {
                chshowUnit = opt.chshowUnit;
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
            HIDDEN = retObj.HIDDEN;
            ROWS = retObj.ROWS;
            COLS = retObj.COLS;
            AGG = retObj.AGG;
            VALS = retObj.VALS;

        }


        getConfigCOLROW = function (FX) {
            var ret = {AGG: {}, COLS: {}, ROWS: {}, HIDDEN: {}, VALS: {}};
            $.each($("#" + id_container + "_AGG >li"), function (e, a) {
                ret.AGG[a.getAttribute('value')] = true
            });
            $.each($("#" + id_container + "_ROWS >li"), function (e, a) {
                ret.ROWS[a.getAttribute('value')] = true
            });
            $.each($("#" + id_container + "_COLS >li"), function (e, a) {
                ret.COLS[a.getAttribute('value')] = true
            });
            $.each($("#" + id_container + "_HIDDEN >li"), function (e, a) {
                ret.HIDDEN[a.getAttribute('value')] = true
            });
            $.each($("#" + id_container + "_VALS >li"), function (e, a) {
                ret.VALS[a.getAttribute('value')] = true
            });

            ret.Aggregator = chAggregator;
            ret.GetValue = chGetValue;
            ret.Formater = chFormater;
            ret.nbDecimal = chNbDecimal;
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
                "<fieldset class=\"myFieldset\">><div class=\"title\">COLS</div><ul id=\"" + id_container + "_COLS\"</ul></fieldset>" +
                "<fieldset class=\"myFieldset\"><div class=\"title\">VALS</div><ul id=\"" + id_container + "_VALS\"></ul></fieldset>"
            );
            for (var i in ROWS) {
                $("#" + id_container + "_ROWS").append("<li value=\"" + ROWS[i].value + "\">" + ROWS[i].label + "</li>");
            }
            for (var i in COLS) {
                $("#" + id_container + "_COLS").append("<li value=\"" + COLS[i].value + "\">" + COLS[i].label + "</li>");
            }
            for (var i in AGG) {
                $("#" + id_container + "_AGG").append("<li value=\"" + AGG[i].value + "\">" + AGG[i].label + "</li>");
            }
            for (var i in HIDDEN) {
                $("#" + id_container + "_HIDDEN").append("<li value=\"" + HIDDEN[i].value + "\">" + HIDDEN[i].label + "</li>");
            }
            for (var i in VALS) {
                $("#" + id_container + "_VALS").append("<li value=\"" + VALS[i].value + "\">" + VALS[i].label + "</li>");
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

            $("#" + id_container).append("<fieldset class=\"options\"><label>functions</label><select id=\"" + id_container + "_AGGREGATION\"></select></fieldset>");
            var liste = myFunc.getListAggregator();
            for (i in liste) {
                document.getElementById(id_container + "_AGGREGATION").options[document.getElementById(id_container + "_AGGREGATION").options.length] = new Option(liste[i], liste[i])
            }
            $("#" + id_container + "_AGGREGATION").on("change", function () {
                chAggregator = document.getElementById(id_container + "_AGGREGATION").value;
                _onChange()
            })

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