var test;


FAOSTATNEWOLAP = {};
FAOSTATNEWOLAP.pivotlimit = 10000;
FAOSTATNEWOLAP.pivotlimitExcel = 200000;
FAOSTATNEWOLAP.limitPivotPreview = 5000;//lignes
FAOSTATNEWOLAP.PP = {PP1: [], PP2: [], PP3: []};
//para&meters for the exclstoredprocedure : to be change to avoir SQL injection
FAOSTATNEWOLAP.excelpayload = {};
FAOSTATNEWOLAP.schema = {};
FAOSTATNEWOLAP.rendererV = 0;
FAOSTATNEWOLAP.nestedby = 0;
FAOSTATNEWOLAP.viewVals = 0;
FAOSTATNEWOLAP.decimal = 2;
FAOSTATNEWOLAP.firstCall = 1;
FAOSTATNEWOLAP.flags = {};
FAOSTATNEWOLAP.internalData = {};
FAOSTATNEWOLAP.originalData = [];
FAOSTATNEWOLAP.thousandSeparator = " ";
FAOSTATNEWOLAP.decimalSeparator = ".";
FAOSTATNEWOLAP.traduction = {"Var1": "Country",
    "Var2": "Element", "Var3": "Item", "Var4": "Year"};

function utf8_encode(argString) {
  //  discuss at: http://phpjs.org/functions/utf8_encode/
  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: sowberry
  // improved by: Jack
  // improved by: Yves Sucaet
  // improved by: kirilloid
  // bugfixed by: Onno Marsman
  // bugfixed by: Onno Marsman
  // bugfixed by: Ulrich
  // bugfixed by: Rafal Kukawski
  // bugfixed by: kirilloid
  //   example 1: utf8_encode('Kevin van Zonneveld');
  //   returns 1: 'Kevin van Zonneveld'

  if (argString === null || typeof argString === 'undefined') { return ''; }

  var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  var utftext = '', start, end, stringl = 0;

  start = end = 0;
  stringl = string.length;
  for (var n = 0; n < stringl; n++) {
    var c1 = string.charCodeAt(n);
    var enc = null;

    if (c1 < 128) {      end++;    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode(     (c1 >> 6) | 192, (c1 & 63) | 128   );
    } else if ((c1 & 0xF800) != 0xD800) {
      enc = String.fromCharCode(        (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128      );
    } else { // surrogate pairs
      if ((c1 & 0xFC00) != 0xD800) { throw new RangeError('Unmatched trail surrogate at ' + n);      }
      var c2 = string.charCodeAt(++n);
      if ((c2 & 0xFC00) != 0xDC00) {  throw new RangeError('Unmatched lead surrogate at ' + (n - 1));   }
      c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
      enc = String.fromCharCode( (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128 );
    }
    if (enc !== null) {
      if (end > start) {        utftext += string.slice(start, end);      }
      utftext += enc;
      start = end = n + 1;
    }
  }

  if (end > start) {    utftext += string.slice(start, stringl);  }

  return utftext;
}
function addCommas(nStr) {
        var rgx, x, x1, x2;
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? FAOSTATNEWOLAP.decimalSeparator + x[1] : '';
        rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {  x1 = x1.replace(rgx, '$1' + FAOSTATNEWOLAP.thousandSeparator + '$2');  }
        //console.log("ij"+FAOSTATNEWOLAP.thousandSeparator+"r");
        if (FAOSTATNEWOLAP.thousandSeparator === " ") { x1 = x1.replace(/\s/g, ""); }
        return x1 + x2;
    };
function ExtractCode(arr, separateur)
{
    ret = [];
    for (i = 0; i < arr.length; i++)
    {
        if (arr[i].type === ">") {   ret.push(separateur + arr[i].code + ">" + separateur);     }
        else {  ret.push(separateur + arr[i].code + separateur);   }
    }
    return ret;
}
function ExtractCodel(arr)//for aggregate
{
    ret = [];
    for (i = 0; i < arr.length; i++){
        if (arr[i].type === ">") {ret.push({'code':arr[i].code,'type':'list'} );  }
    }
    return ret;
}

function checkMemory()
{for (var b in window) {
        if (window.hasOwnProperty(b)){ console.log(b + ' ' + memorySizeOf(eval(b)));}
    }
}

function memorySizeOf(obj) {
    var bytes = 0;

    function sizeOf(obj) {
        if (obj !== null && obj !== undefined) {
            switch (typeof obj) {
                case 'number':
                    bytes += 8;
                    break;
                case 'string':
                    bytes += obj.length * 2;
                    break;
                case 'boolean':
                    bytes += 4;
                    break;
                case 'object':
                    var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                    if (objClass === 'Object' || objClass === 'Array') {
                        for (var key in obj) {
                            if (!obj.hasOwnProperty(key))
                                continue;
                            sizeOf(obj[key]);
                        }
                    } else
                        bytes += obj.toString().length * 2;
                    break;
            }
        }
        return bytes;
    }
    ;

    function formatByteSize(bytes) {
        if (bytes < 1024)
            return bytes + " bytes";
        else if (bytes < 1048576)
            return(bytes / 1024).toFixed(3) + " KiB";
        else if (bytes < 1073741824)
            return(bytes / 1048576).toFixed(3) + " MiB";
        else
            return(bytes / 1073741824).toFixed(3) + " GiB";
    }
    ;

    return formatByteSize(sizeOf(obj));
}
;


function oldSchoolCSV(format)
{
    var selectFinal = "EXECUTE Warehouse.dbo.usp_GetDataTESTP " +
            " @DomainCode = '" + F3DWLD.CONFIG.domainCode + "',  " +
            " @lang = '" + F3DWLD.CONFIG.lang + "',  " +
            " @List1Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[0], "''") + ")', " +
            "  @List2Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[1], "''") + ")',  " +
            " @List3Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[2], "''") + ")', " +
            "  @List4Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[3], "") + ")', " +
            "   @List5Codes = '',  " +
            "   @List6Codes = '',  " +
            "   @List7Codes = '',  " +
            "   @NullValues = 0,  " +
            "   @Thousand = '',  " +
            "   @Decimal = '.',  " +
            "   @DecPlaces = 2 , " +
            "  @Limit ="+FAOSTATNEWOLAP.pivotlimitExcel ;

var mesOptionsPivot = {};
for(var j in FAOSTATOLAP2.options)
{mesOptionsPivot[j]=FAOSTATOLAP2.options[j];}
mesOptionsPivot.lang=F3DWLD.CONFIG.lang;
    if (F3DWLD.CONFIG.domainCode == "HS" ||F3DWLD.CONFIG.domainCode == "TM" || F3DWLD.CONFIG.domainCode == "FT") {
        mesOptionsPivot.rows=["Reporter Countries","Partner Countries","Item","Element"];
	mesOptionsPivot.cols= ["Year"];
        selectFinal = "EXECUTE Warehouse.dbo.usp_GetData " +
            " @DomainCode = '" + F3DWLD.CONFIG.domainCode + "',  " +
            " @lang = '" + F3DWLD.CONFIG.lang + "',  " +
            " @List1Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[0], "''") + ")', " +
            "  @List2Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[1], "''") + ")',  " +
            " @List3Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[2], "''") + ")', " +
            "  @List4Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[3], "''") + ")', " +
            "   @List5Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[4], "") + ")',  " +
            "   @List6Codes = '',  " +
            "   @List7Codes = '',  " +
            "   @NullValues = 0,  " +
            "   @Thousand = '',  " +
            "   @Decimal = '.',  " +
            "   @DecPlaces = 2 , " +
            "  @Limit ="+FAOSTATNEWOLAP.pivotlimitExcel ;
}
if(FAOSTATNEWOLAP.firstCall==0){
    mesOptionsPivot.rows = FAOSTATNEWOLAP.internalData.rowAttrs;
    mesOptionsPivot.cols = FAOSTATNEWOLAP.internalData.colAttrs;}
else{mesOptionsPivot.rows =null;mesOptionsPivot.cols=null}
    mesOptionsPivot.vals = ["Value"];
    mesOptionsPivot.domain = F3DWLD.CONFIG.domainCode;
    if (F3DWLD.CONFIG.wdsPayload.showUnits){ mesOptionsPivot.vals.push("Unit");}
    if (F3DWLD.CONFIG.wdsPayload.showFlags){  mesOptionsPivot.vals.push("Flag");}


document.getElementById('CSVOLAPsql').value= selectFinal;  
document.getElementById('CSVOLAPjson').value= JSON.stringify(mesOptionsPivot);
document.getElementById('CSVOLAPoption').value= JSON.stringify({decimal:FAOSTATNEWOLAP.decimal,
    decimalSeparator:FAOSTATNEWOLAP.decimalSeparator,
    thousandSeparator:FAOSTATNEWOLAP.thousandSeparator,
    showUnits:F3DWLD.CONFIG.wdsPayload.showUnits,
 showFlags:F3DWLD.CONFIG.wdsPayload.showFlags, 
 showCodes:F3DWLD.CONFIG.wdsPayload.showCodes,
fileFormat:format 
    });
document.getElementById('exportCSVOLAP').submit();

    
   /*
    $.post("/faostat-download-js/pivotAgg/exportCSVOLAP.jsp", {
        sql:selectFinal,
        json:JSON.stringify(mesOptionsPivot),
        option:JSON.stringify(
                {decimal:FAOSTATNEWOLAP.decimal,
    decimalSeparator:FAOSTATNEWOLAP.decimalSeparator,
    thousandSeparator:FAOSTATNEWOLAP.thousandSeparator,
    showUnits:F3DWLD.CONFIG.wdsPayload.showUnits,
 showFlags:F3DWLD.CONFIG.wdsPayload.showFlags, 
 showCodes:F3DWLD.CONFIG.wdsPayload.showCodes,
fileFormat:format 
    })}).done(function(data)  
    {
        console.log(data)
    });
   */
    /*
   var w;

function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("/faostat-download-js/pivotAgg/worker.js");
      var message={sql:selectFinal,json:mesOptionsPivot,option:{decimal:FAOSTATNEWOLAP.decimal,
    decimalSeparator:FAOSTATNEWOLAP.decimalSeparator,
    thousandSeparator:FAOSTATNEWOLAP.thousandSeparator,
    showUnits:F3DWLD.CONFIG.wdsPayload.showUnits,
 showFlags:F3DWLD.CONFIG.wdsPayload.showFlags, 
 showCodes:F3DWLD.CONFIG.wdsPayload.showCodes,
fileFormat:format 
    }};

console.log(JSON.stringify(message));
           w.postMessage(JSON.stringify(message));

        }
        w.onmessage = function(event) {
            alert(event);
            document.getElementById("testinline").innerHTML = event.data.id+" "+event.data.mess;
        };
    } else {
        document.getElementById("testinline").innerHTML = "Sorry! No Web Worker support.";
    }
}

function stopWorker() {     w.terminate();} 
    
    
   startWorker();  
    
    */
}
function oldSchool(maLimit, excel){
    var selectFinal = "EXECUTE Warehouse.dbo.usp_GetDataTESTP " +
            " @DomainCode = '" + F3DWLD.CONFIG.domainCode + "',  " +
            " @lang = '" + F3DWLD.CONFIG.lang + "',  " +
            " @List1Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[0], "''") + ")', " +
            "  @List2Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[1], "''") + ")',  " +
            " @List3Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[2], "''") + ")', " +
            "  @List4Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[3], "") + ")', " +
            "   @List5Codes = '',  " +
            "   @List6Codes = '',  " +
            "   @List7Codes = '',  " +
            "   @NullValues = 0,  " +
            "   @Thousand = '',  " +
            "   @Decimal = '.',  " +
            "   @DecPlaces = 2 , " +
            "  @Limit =" + maLimit;


    if (F3DWLD.CONFIG.domainCode == "HS" || F3DWLD.CONFIG.domainCode == "TM" || F3DWLD.CONFIG.domainCode == "FT") {
   /*   mesOptionsPivot.rows=["Reporter Countries","Partner Countries","Item","Element"];
	mesOptionsPivot.cols= ["Year"];*/
selectFinal = "EXECUTE Warehouse.dbo.usp_GetData " +
            " @DomainCode = '" + F3DWLD.CONFIG.domainCode + "',  " +
            " @lang = '" + F3DWLD.CONFIG.lang + "',  " +
            " @List1Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[0], "''") + ")', " +
            "  @List2Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[1], "''") + ")',  " +
            " @List3Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[2], "''") + ")', " +
            "  @List4Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[3], "''") + ")', " +
            "   @List5Codes = '(" + ExtractCode(F3DWLD.CONFIG.selectedValues[4], "") + ")',  " +
            "   @List6Codes = '',  " +
            "   @List7Codes = '',  " +
            "   @NullValues = 0,  " +
            "   @Thousand = '',  " +
            "   @Decimal = '.',  " +
            "   @DecPlaces = 2 , " +
            "  @Limit ="+FAOSTATNEWOLAP.pivotlimitExcel ;
    }
    var test2 = {
        datasource: F3DWLD.CONFIG.datasource,thousandSeparator: ',',decimalSeparator: '.',decimalNumbers: '2',
        json: JSON.stringify({"limit": null,   "query": selectFinal, "frequency": "NONE"}),cssFilename: '',valueIndex: 5};
    $("#testinline").html("<center><img src=\"/faostat-download-js/pivotAgg/Preload.gif\" /></center>");
    FAOSTATNEWOLAP.flags = {};
    $.ajax({
        type: 'POST', url: F3DWLD.CONFIG.data_url + "/table/json", data: test2,
        success: function(response_1) {
            var response2_2 =[];
            var mesOptionsPivot = {};
            var t=retConfig(F3DWLD.CONFIG.domainCode,F3DWLD.CONFIG.lang);
            response2_2=t[0];
            mesOptionsPivot=t[1];
            response_1 = response2_2.concat(response_1);
            FAOSTATNEWOLAP.firstCall = 0;
            var derivers = $.pivotUtilities.derivers;
            var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.gchart_renderers);
            mesOptionsPivot.vals = ["Value"];
            if (F3DWLD.CONFIG.wdsPayload.showUnits) {mesOptionsPivot.vals.push("Unit");}
            if (F3DWLD.CONFIG.wdsPayload.showFlags){mesOptionsPivot.vals.push("Flag"); }
            FAOSTATNEWOLAP.originalData = response_1;
            $("#testinline").pivotUI(response_1, mesOptionsPivot, true);
            $("#options_menu_box").css("display", "block");
            var newFlag = "";
            for (var i in FAOSTATNEWOLAP.flags) {if (newFlag != "") {  newFlag += ":";} newFlag += "'" + i + "'"; }
            if (newFlag == "") {newFlag = "''";}
//           try{ $(".pvtAxisLabel")[$(".pvtAxisLabel").length - 1].setAttribute("colspan", 2);} catch(e){console.log("erreur"+e)}
         /*   var header=$(".pvtAxisLabel");
             for(var i=0;i<header.length;i++){header[i].innerHTML=header[i].innerHTML.replace("_","");}
              var header=$("#rows li nobr");
              for(var i=0;i<header.length;i++){header[i].innerHTML=header[i].innerHTML.replace("_","");}
                var header=$("#cols li nobr");
                for(var i=0;i<header.length;i++){header[i].innerHTML=header[i].innerHTML.replace("_","");}
           */
            $.get("http://faostat3.fao.org/faostat.olap.ws/rest/GetFlags/" + F3DWLD.CONFIG.lang + "/" + newFlag, function(data) {
                data = data.replace("localhost:8080/", "faostat3.fao.org/");
               // alert("ok5")
                $("#mesFlags").append(data);
            //    $("#myGrid1_div").height(500);
                 if(excel){decolrowspanNEW();}
            });
        }
    });
//}});
}


function newFunctions() {
    FAOSTATNEWOLAP.viewVals = 1;
    $("#mesVals").css("display", "block");
    $("#unused").css("display", "block");
    $("#renderer").css("display", "block");
    $("#aggregator").css("display", "block");
    $("#unused").css("background-color", "#ececec");
    $("#unused li nobr").css("color", "#666");
}

function changeNested(){ 
    if (document.getElementById('cbNestedBy').checked) {FAOSTATNEWOLAP.nestedby = 1; }
    else {FAOSTATNEWOLAP.nestedby = 0;}
}

function directExcel(query){
    var sql = {};
    sql.query = "SELECT D.ItemCode, D.ElementCode, AVG(D.value) " +
            "FROM Data AS D " +
            "WHERE D.DomainCode IN ('GT', 'GM', 'GE', 'GR', 'GY', 'GU', 'GP', 'GA', 'GV', 'GB') " +
            "AND D.AreaCode = 10 " +
            "AND D.ElementCode IN (7244, 7243, 72254, 72256, 72306, 72255, 7243, 72343, 72341, 72342, 72308, 72340, 7237, 72259, 72309, 72257, 72307) " +
            "AND D.ItemCode IN (1711, 1755, 27, 1709, 3107, 1712, 6729, 5057, 6795) " +
            "GROUP BY D.ItemCode, D.ElementCode";
    var data = {};
    data.datasource = FAOSTATDownload.datasource; 
    data.thousandSeparator = ',';
    data.decimalSeparator = '.';
    data.decimalNumbers = 2;
    data.json = JSON.stringify({"limit": null,"query": query, "frequency": "NONE"}),
    data.cssFilename = '';
    data.nowrap = false;
    data.valuesIndex = 0;
    $('#datasource_WQ').val(FAOSTATDownload.datasource);
    $('#json_WQ').val(data.json);
    document.excelFormWithQuotes.submit();
}

function directCSV(query) {
    var sql = {};
    sql.query = "SELECT D.ItemCode, D.ElementCode, AVG(D.value) " +
            "FROM Data AS D " +
            "WHERE D.DomainCode IN ('GT', 'GM', 'GE', 'GR', 'GY', 'GU', 'GP', 'GA', 'GV', 'GB') " +
            "AND D.AreaCode = 10 " +
            "AND D.ElementCode IN (7244, 7243, 72254, 72256, 72306, 72255, 7243, 72343, 72341, 72342, 72308, 72340, 7237, 72259, 72309, 72257, 72307) " +
            "AND D.ItemCode IN (1711, 1755, 27, 1709, 3107, 1712, 6729, 5057, 6795) " +
            "GROUP BY D.ItemCode, D.ElementCode";
    var data = {};
    data.datasource = FAOSTATDownload.datasource;
    data.thousandSeparator = ',';
    data.decimalSeparator = '.';
    data.decimalNumbers = 2;
    data.json = JSON.stringify({"limit": null, "query": query,"frequency": "NONE" }),
    data.cssFilename = '';
    data.nowrap = false;
    data.valuesIndex = 0;
    $('#datasource_WQ_csv').val(FAOSTATDownload.datasource);
    $('#json_WQ_csv').val(data.json);
    document.csvFormWithQuotes.submit();
}

function recTab1(label, arr, ind){
    ret = "";
    if (arr.length == ind + 1){
        for (var i = 0; i < arr[ind].data.length; i++){
            /* ret+=",MIN(["+label+arr[ind].data[i].label+"]) as ["+label+arr[ind].data[i].label+
             "],MIN(["+label+arr[ind].data[i].label+"_u]) as ["
             +label+arr[ind].data[i].label+"_u],MIN(["+label+arr[ind].data[i].label+"_f]) as ["+label+arr[ind].data[i].label+"_f]";*/
            ret += ",CONCAT('''',MIN([" + label + arr[ind].data[i].label + "])) as [" + label + arr[ind].data[i].label +
                    "],CONCAT('''',MIN([" + label + arr[ind].data[i].label + "_u])) as ["
                    + label + arr[ind].data[i].label + "_u],CONCAT('''',MIN([" + label + arr[ind].data[i].label + "_f])) as [" + label + arr[ind].data[i].label + "_f]";
        }
    }
    else{ for (var i = 0; i < arr[ind].data.length; i++){ret += recTab1(label + arr[ind].data[i].label + "_", arr, ind + 1);}}
    return ret;
}

function recHeader(label, arr, ind){
    ret = "";
    if (arr.length == ind + 1){
        for (var i = 0; i < arr[ind].data.length; i++){
            ret += ",\"" + label + arr[ind].data[i].label +
                "\",\"" + label + arr[ind].data[i].label + "_u\",\"" + label + arr[ind].data[i].label + "_f\"";
        }
    }
    else{
        for (var i = 0; i < arr[ind].data.length; i++){
            //label+=arr[ind][i].label;
            ret += recHeader(label + arr[ind].data[i].label + "_", arr, ind + 1);
        }
    }
    return ret;
}


function recTab2(label, cond, arr, ind){
    ret = "";
    if (arr.length == ind + 1) {
        for (var i = 0; i < arr[ind].data.length; i++){
            ret += ",CASE when " + cond + " [" + FAOSTATNEWOLAP.traduction[arr[ind].title] + " Code]=''" + arr[ind].data[i].code + "''  then MIN(Value) end as [" + label + arr[ind].data[i].label + "],";
            ret += "CASE when " + cond + " [" + FAOSTATNEWOLAP.traduction[arr[ind].title] + " Code]=''" + arr[ind].data[i].code + "''   then MIN(Unit) end as [" + label + arr[ind].data[i].label + "_u],";
            ret += "CASE when " + cond + " [" + FAOSTATNEWOLAP.traduction[arr[ind].title] + " Code]=''" + arr[ind].data[i].code + "''   then MIN(Flag) end as [" + label + arr[ind].data[i].label + "_f]";
        }
    }
    else {for (var i = 0; i < arr[ind].data.length; i++) {
            my_cond = "[" + FAOSTATNEWOLAP.traduction[arr[ind].title] + " Code]=''" + arr[ind].data[i].code + "''";
            ret += recTab2(label + arr[ind].data[i].label + "_", my_cond + " AND " + cond, arr, ind + 1);
        }
    }
    return ret;
}


function retPivot1() {
    var ret = "'" + retPivot3();
    ret += recTab1("", FAOSTATNEWOLAP.PP.PP1, 0);
    ret += "'";
    return ret;
}

function retPivot2() {
    var ret = "'" + retPivot3();
    ret += recTab2("", "", FAOSTATNEWOLAP.PP.PP1, 0);
    ret += "'"; 
    return ret;
}

function retPivot3() {
    ret = "";
    for (i = 0; i < FAOSTATNEWOLAP.PP.PP3.length; i++){
        if (i > 0) { ret += "," + FAOSTATNEWOLAP.traduction[FAOSTATNEWOLAP.PP.PP3[i]]; }
        else {ret += FAOSTATNEWOLAP.traduction[FAOSTATNEWOLAP.PP.PP3[0]]; }
    }
    return ret;
   }



function ExcelComplete2(outputFormat){
    FAOSTATNEWOLAP.PP = {PP1: [], PP2: [], PP3: []};
    for (i = 0; i < document.getElementById('rows').getElementsByTagName('nobr').length; i++){
        var d = document.getElementById('rows').getElementsByTagName('nobr')[i];
        FAOSTATNEWOLAP.PP.PP3.push(d.innerHTML);
    }
    for (i = 0; i < document.getElementById('cols').getElementsByTagName('nobr').length; i++){
        var d = document.getElementById('cols').getElementsByTagName('nobr')[i];
        jj = -1;   title = "";
        for (j = 0; j < FAOSTATNEWOLAP.schema.length; j++) {
            if (FAOSTATNEWOLAP.schema[j][6] == d.innerHTML) {
                jj = parseInt(FAOSTATNEWOLAP.schema[j][4]) - 1;
                title = FAOSTATNEWOLAP.schema[j][1];
                break;
            }
        }
        if (jj > -1) {FAOSTATNEWOLAP.PP.PP1.push({"title": title, "data": F3DWLD.CONFIG.selectedValues[jj]});}
        else { alert('not found' + d.innerHTML);}
    }
}
function ExcelComplete(outputFormat){
    FAOSTATNEWOLAP.PP = {PP1: [], PP2: [], PP3: []};
    for (i = 0; i < document.getElementById('rows').getElementsByTagName('nobr').length; i++){
        var d = document.getElementById('rows').getElementsByTagName('nobr')[i];
        for (j = 0; j < FAOSTATNEWOLAP.schema.length; j++) {
            if (FAOSTATNEWOLAP.schema[j][6] == d.innerHTML) {FAOSTATNEWOLAP.PP.PP3.push(FAOSTATNEWOLAP.schema[j][1]);}
        }
    }
    for (i = 0; i < document.getElementById('cols').getElementsByTagName('nobr').length; i++){
        var d = document.getElementById('cols').getElementsByTagName('nobr')[i];
        jj = -1;  title = "";
        for (j = 0; j < FAOSTATNEWOLAP.schema.length; j++) {
            if (FAOSTATNEWOLAP.schema[j][6] == d.innerHTML){
                jj = parseInt(FAOSTATNEWOLAP.schema[j][4]) - 1;
                title = FAOSTATNEWOLAP.schema[j][1];
                break;
            }
        }
        if (jj > -1) { FAOSTATNEWOLAP.PP.PP1.push({"title": title, "data": F3DWLD.CONFIG.selectedValues[jj]}); }
        else { alert('not found' + d.innerHTML); }
    }
    var data2 = {
        datasource: F3DWLD.CONFIG.datasource,
        thousandSeparator: " ",
        decimalSeparator: ".",
        decimalNumbers: "2",
        json: JSON.stringify({"selects": null,
            "froms": null, "wheres": null,"limit": null,
            "query": "EXECUTE Warehouse.dbo.usp_GetData4 @DomainCode = " + F3DWLD.CONFIG.domainCode + ", " +
                    "@lang = 'E'," +
                    "@List1Codes = " + JSON.stringify(FAOSTATNEWOLAP.excelpayload.list1Codes).replace(/\"/g, "'").replace(/\[/g, "'(").replace(/\]/g, ")'") + "," +
                    "@List2Codes = " + JSON.stringify(FAOSTATNEWOLAP.excelpayload.list2Codes).replace(/\"/g, "'").replace(/\[/g, "'(").replace(/\]/g, ")'") + ", " +
                    "@List3Codes = " + JSON.stringify(FAOSTATNEWOLAP.excelpayload.list3Codes).replace(/\"/g, "'").replace(/\[/g, "'(").replace(/\]/g, ")'") + "," +
                    "@List4Codes = " + JSON.stringify(FAOSTATNEWOLAP.excelpayload.list4Codes).replace(/\"/g, "'").replace(/\[/g, "'(").replace(/\]/g, ")'") + ", " +
                    "@List5Codes = '', @List6Codes = '',  @List7Codes = '', " +
                    "@NullValues = 0, " +
                    "@Thousand = ''," +
                    "@Decimal = ',',  " +
                    "@DecPlaces = 2, " +
                    "@Pivot1=" + retPivot1() + "," +
                    "@Pivot2=" + retPivot2() + "," +
                    "@Pivot3='" + retPivot3() + "'",
            "frequency": "NONE"}),   cssFilename: "faostat", valueIndex: 1
    };
 $.ajax({
        type: 'POST', url: F3DWLD.CONFIG.data_url + '/table/' + outputFormat,data: data2,
        success: function(response) {
            document.getElementById('csvData').value = "";
            for (j = 0; j < FAOSTATNEWOLAP.PP.PP3.length; j++){
                if (j > 0) {   document.getElementById('csvData').value += ",";}
                document.getElementById('csvData').value += FAOSTATNEWOLAP.traduction[FAOSTATNEWOLAP.PP.PP3[j]]
            }
            document.getElementById('csvData').value += recHeader("", FAOSTATNEWOLAP.PP.PP1, 0);
            document.getElementById('csvData').value += "\n";
           
            if (outputFormat === 'html') {
                document.getElementById("excelData").value = response;
                document.getElementById("formExcel").submit();
            }
            else {
                for (var i = 0; i < response.length; i++)
                { document.getElementById('csvData').value += '"' + response[i].join('","') + "\"\n"; }
                var r = confirm("Press a button!");
                if (r == true) { document.getElementById('csvDataForm').submit();}
            }
        },
        error: function(err, b, c) {   console.log(err);    }
    });
}

function my_exportNewHTML() {
    monclone = $("#pivot_table").clone();
    $("#renderer", monclone).remove();
    $(".ordre", monclone).remove();
    $("#unused", monclone).remove();
    $("#aggregator", monclone).remove();
    $("#vals", monclone).remove();
    $("#cols", monclone).remove();
    $("#rows", monclone).remove();
    $(".pvtTotalLabel", monclone).remove();
    $(".pvtTotal", monclone).remove();
    $(".invi", monclone).remove();
    $("thead", monclone).remove();
    $(".pvtGrandTotal", monclone).remove();
    $("td", monclone).css("border", "1px solid black");
    $("th", monclone).css("border", "1px solid black");
    $(".table", monclone).css("border", "1px solid black");
// var c=window.open('data:application/vnd.ms-excel,'+encodeURIComponent(monclone.html())) ;//t.preventDefault();

    var today = new Date();
    document.getElementById("excelData").value = "<table><tr><td>FAOSTAT " + today.getFullYear() + "</td><td colspan=2>Date : " + today.toLocaleDateString() + "</td></tr></table><table>" + monclone.html() + "</table>";
    document.getElementById("excelData").value += "<table><tr><td></td></tr>";

    var testtd = document.getElementById("hor-minimalist-b").getElementsByTagName('td');
    j = 0;
    for (i = 0; i < testtd.length; i++) {       
        if (j == 0) { document.getElementById("excelData").value += "<tr><td>"; j = 1;}
        else { document.getElementById("excelData").value += "</td><td>";j = 0; }
        document.getElementById("excelData").value += testtd[i].innerHTML;
        if (j == 0) {  document.getElementById("excelData").value += "</tr>";  }
    }
    document.getElementById("excelData").value += "</table>";
    document.getElementById("formExcel").submit();
}

function stringify(obj) {
  var type = Object.prototype.toString.call(obj);
  // IE8 <= 8 does not have array map
  var map = Array.prototype.map || function map(callback) {
    var ret = [];
    for (var i = 0; i < this.length; i++) { ret.push(callback(this[i]));}
    return ret;
  };
  if (type === '[object Object]') {
    var pairs = [];
    for (var k in obj) {
      if (!obj.hasOwnProperty(k)) continue;
      pairs.push([k, stringify(obj[k])]);
    }
    pairs.sort(function(a, b) { return a[0] < b[0] ? -1 : 1 });
    pairs = map.call(pairs, function(v) {
        if(v[0]!="format" && v[0]!="push" &&  v[0]!="value"){return '"' + v[0].replace(/"/g,"\\\"") + '":' +v[1];}
        else{  return '"' + v[0].replace(/"/g,"\\\"") + '":""'; }
    }
);
    return '{' + pairs + '}';
  }
  if (type === '[object Array]') {  return '[' + map.call(obj, function(v) {  return stringify(v) }) + ']';  }
  return JSON.stringify(obj);
};

function my_exportNew() {
  var mycols=[];
  
      for(var c=0;c<FAOSTATNEWOLAP.internalData.rowAttrs.length;c++){
           if(F3DWLD.CONFIG.wdsPayload.showCodes){ mycols.push(FAOSTATNEWOLAP.internalData.rowAttrs[c]+"Code");
        }
          mycols.push(FAOSTATNEWOLAP.internalData.rowAttrs[c]+"Name");
         
  }
//console.log(FAOSTATNEWOLAP.internalData.tree);
 document.getElementById("myJson").value=stringify( {data:FAOSTATNEWOLAP.internalData.tree,
     header:FAOSTATNEWOLAP.internalData.flatColKeys,cols:mycols,swUnit:FAOSTATNEWOLAP.showUnits,swFlag:FAOSTATNEWOLAP.showFlags
 
    });
   //document.getElementById("myJson").value=JSON.stringify({data:FAOSTATNEWOLAP.originalData,header:FAOSTATNEWOLAP.internalData.flatColKeys});
    document.getElementById("xlsDataForm").submit();
  }



function decolrowspanNEW(){
    var today = new Date();
    var reg = new RegExp("<span class=\"ordre\">[0-9]+</span>", "g");
    var reg3 = new RegExp("<span class=\"ordre\"></span>", "g");
    var reg2 = new RegExp("<table class=\"innerCol\"><th>([0-9]+)</th><th>([^>]*)</th></table>", "g"); 
    var row = FAOSTATNEWOLAP.internalData.tree;
    var col = FAOSTATNEWOLAP.internalData.flatColKeys.sort();
    var ret = "";
    for (var j = 0; j < FAOSTATNEWOLAP.internalData.rowKeys[0].length; j++) {
        
        if (F3DWLD.CONFIG.wdsPayload.showCodes) { ret += "Code,";  }
        ret += '"'+FAOSTATNEWOLAP.internalData.rowAttrs[j].replace("_", "") + "\",";
    }
   
    for (j in col){
        ret += '"'+col[j].replace(/,/g, "").replace(/\|\|/g, "-").replace(/&nbsp;/g, "").replace(reg2, "$1").replace(reg, "").replace(reg3, "")+'"';
        if (FAOSTATNEWOLAP.showUnits) { ret += ",unit"; }
        if (FAOSTATNEWOLAP.showFlags) {ret += ",flag"; }
        ret += ",";
    }
    ret += "\n";
    for (i in row) {
        var temp=i.split("||");
       for(var count=0;count<temp.length;count++)
       {ret+='"'+temp[count].replace(/,/g, "").replace(reg2, "$1\",\"$2").replace(reg, "").replace(reg3, "")+"\",";}
        for (j in col) {
            try {
                if (!row[i][col[j]]) {
                    ret += ",";
                    if (FAOSTATNEWOLAP.showUnits) {    ret += ","; }
                    if (FAOSTATNEWOLAP.showFlags) { ret += ","; }
                }
                else {
                    ret += '"' + addCommas(row[i][col[j]].value()[0]) + '",';
                     if (FAOSTATNEWOLAP.showUnits) {   ret += '"' + row[i][col[j]].value()[1].replace(/&nbsp;/g, " ") + '",';  }
                        if (FAOSTATNEWOLAP.showFlags) {
                            if(FAOSTATNEWOLAP.showUnits){ ret += '"' + row[i][col[j]].value()[2].replace(/&nbsp;/g, " ") + '",';}
                            else{ret += '"' + row[i][col[j]].value()[1].replace(/&nbsp;/g, " ") + '",';}
                        }
                    }
                }  catch (ER) {}
        }
        ret += "\n";
    }
   try{ var testtd = document.getElementById("hor-minimalist-b").getElementsByTagName('td');
    j = 0;
    for (i = 0; i < testtd.length; i++) {
        if (j == 0) {   ret += "\n";     j = 1;  }
        else {ret += ",";  j = 0;   }
        ret += testtd[i].innerHTML;
    }
}catch(e){ console.log("WS getFlag not available");}
    ret += "\n\nFAOSTAT " + today.getFullYear() + ", Date : " + today.toLocaleDateString() + "\n";
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var blob = new Blob(["\ufeff",ret], {type: 'text/csv;charset=UTF-8;'});
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "fileName.csv");
        link.style = "visibility:hidden";
    }
    else if (navigator.msSaveBlob) { // IE 10+
        link.addEventListener("click", function(event) {
            var blob = new Blob(["\ufeff",ret], { "type": "text/csv;charset=UTF-8;"});
            navigator.msSaveBlob(blob, "fileName.csv");
        }, false);
    }
    else{ document.getElementById('csvData').value=ret;   document.getElementById('csvDataForm').submit();}
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function decolrowspanExcell(table){
    var today = new Date(); 
    ret="";
    ret += "FAOSTAT " + today.getFullYear() + ", Date : " + today.toLocaleDateString() + "\n";
//ret=utf8_encode(ret);
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var blob = new Blob(["\ufeff",ret,table], {type: 'text/csv;charset=UTF-8;'});
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "fileName.xls");
        link.style = "visibility:hidden";
    }
    else  if (navigator.msSaveBlob) { // IE 10+
        link.addEventListener("click", function(event) {
            var blob = new Blob(["\ufeff",ret,table], {"type": "text/csv;charset=UTF-8;"});
            navigator.msSaveBlob(blob, "fileName.xls");
        }, false);
    }
    else{document.getElementById('csvData').value=ret+table;document.getElementById('csvDataForm').submit();}
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function colapseCol(t, colspan, pos){
    /*
     var mySel=[];
     for(var i=0;i<colspan;i++)
     {c=pos+i;
     mySel.push(".col"+c);}
     test=$(mySel.join(","));
     */
}
function showHideTotals() {//Not yet used
    if ($("#cols li nobr").length * $("#rows li nobr").length == 0) {
        $(".pvtTotalLabel").show();
        $(".pvtTotal").show();
        $(".pvtGrandTotal").show();
    }
    else {
        $(".pvtTotalLabel").hide();
        $(".pvtTotal").hide();
        $(".pvtGrandTotal").hide();
    }
}

function my_export(t) {
    monclone = $("#newOlap").clone();
    $("#renderer", monclone).remove();
    $("#unused", monclone).remove();
    $("#aggregator", monclone).remove();
    $("#vals", monclone).remove();
    $("#cols", monclone).remove();
    $("#rows", monclone).remove();
    $(".pvtTotalLabel", monclone).remove();
    $(".pvtTotal", monclone).remove();
    $(".invi", monclone).remove();
    $(".pvtGrandTotal", monclone).remove();
    $("td", monclone).css("border-left", "1px solid black");
    $("td", monclone).css("border-top", "1px solid black");
    $("th", monclone).css("border-left", "1px solid black");
    $("th", monclone).css("border-top", "1px solid black");
    $(".table", monclone).css("border-right", "1px solid black");
    $(".table", monclone).css("border-bottom", "1px solid black");
    document.getElementById("excelData").value = monclone.html();
    document.getElementById("formExcel").submit();
    //var c=window.open('data:application/vnd.ms-excel,'+encodeURIComponent(monclone.html())) ;//t.preventDefault();
    // c.document.write(encodeURIComponent(monclone.html()));
}

function myInitOLAP(){
    monXML = "";
    var mesItems = "";
    var bItem = 0;
    var mesItemsXML = "{name:'ItemCode','nb':'1','val':{";
    var arrItem = $('#gridItemsAggregated').jqxGrid('selectedrowindexes');
    var listItem = "";
    var mySelecteds = F3DWLD.CONFIG.selectedValues;
    //if (FAOSTATDownload.domainCode != 'GY')
    {
        for (i = 0; i < mySelecteds.items.length; i++) {
            arr = mySelecteds.items[i];
            if (arr.type == "list") {
                if (listItem == "") {listItem = "[{code:'" + arr.code + "',type:'list'}"; }
                else {listItem += ",{code:'" + arr.code + "',type:'list'}"; }
            }
            else {
                if (mesItems == "") {   mesItems = arr.code;  }
                else { mesItems += "," + arr.code;}
                if (bItem != 0) { mesItemsXML += ",";}
                else { bItem = 1;  }
                mesItemsXML += "'" + arr.code + "':{'E':'" + arr.label.replace(/'/g, " ") + "'}";
            }
        }
    }
    if (listItem != "") {listItem += "]";}
    else {listItem = "[]"; }
    var mesElements = "";
    var mesElementsXML = "{name:'ElementCode','nb':'1','val':{";
    for (i = 0; i < mySelecteds.elements.length; i++) {
        arr = mySelecteds.elements[i];
        if (mesElements == "") { mesElements = arr.code;}
        else {mesElements += "," + arr.code;}
        if (i != 0) {mesElementsXML += ",";}
        mesElementsXML += "'" + arr.code + "':{'E':'" + arr.label.replace(/'/g, " ") + "'}";
    }
    mesElementsXML += "}}";
    var mesCountries = "";
    var bCountry = 0;
    var mesCountriesXML = "{'name':'AreaCode','nb':'1','val':{";
    var listCountry = "";
    for (i = 0; i < mySelecteds.countries.length; i++) {
        arr = mySelecteds.countries[i];
        if (arr.type == "list") {
            if (listCountry == "") {listCountry = "[{code:'" + arr.code + "',type:'list'}"; }
            else { listCountry += ",{code:'" + arr.code + "',type:'list'}";}
        }
        else {
            if (mesCountries == "") {mesCountries = arr.code;}
            else {mesCountries += "," + arr.code;}
            if (bCountry != 0) {mesCountriesXML += ",";} else { bCountry = 1;}
            mesCountriesXML += "'" + arr.code + "':{'E':'" + arr.label.replace(/'/g, " ") + "'}";
        }
    }
    if (listCountry != "" || listCountry == null) {listCountry += "]";}
    else { listCountry = "[]";}
    var data = {};
    data.datasource = FAOSTATDownload.datasource;
    data.domainCode = FAOSTATDownload.domainCode;
    data.language = FAOSTATDownload.language;
    data.countries = listCountry;
    data.items = listItem;

    $.ajax({
        type: 'POST',
        url: 'http://' + FAOSTATDownload.baseurl + '/bletchley/rest/codes/list/post',
        data: data,
        success: function(response) {
            if (response.constructor === String) { response = jQuery.parseJSON(response);}  ;
            testAjax = response[0];
            for (var i = 0; i < testAjax.length; i++){
                testAjax2 = testAjax[i];
                if (mesCountries == "") {  mesCountries = testAjax2.code;}
                else {mesCountries += "," + testAjax2.code;}
                if (bCountry != 0) {mesCountriesXML += ",";}
                else {bCountry = 1;}
                mesCountriesXML += "'" + testAjax2.code + "':{'E':'" + testAjax2.label.replace(/'/g, " ") + "'}";
            }
            mesCountriesXML += "}}";
            testAjax = response[1];
            for (var i = 0; i < testAjax.length; i++) {
                testAjax2 = testAjax[i];
                if (mesItems == "") { mesItems = testAjax2.code;}
                else {mesItems += "," + testAjax2.code;  }
                if (bItem != 0) { mesItemsXML += ",";} else {bItem = 1;}
                mesItemsXML += "'" + testAjax2.code + "':{'E':'" + testAjax2.label.replace(/'/g, " ") + "'}";
            }
            mesItemsXML += "}}";
            var mesYears = "";
            var mesYearsXML = "{'name':'Year',nb:'1','val':{";
            for (i = 0; i < mySelecteds.years.length; i++) {
                arr = mySelecteds.years[i];
                if (mesYears == "") {mesYears = arr.code; }
                else {mesYears += "," + arr.code;}
                if (i != 0) {mesYearsXML += ",";}
                mesYearsXML += "'" + arr.code + "':{'E':'" + arr.label.toString().replace(/'/g, " ") + "'}";
            }
            mesYearsXML += "}}";
            FAOSTATOLAP2.queryParams.json = JSON.stringify(
                    {"selects": [{"aggregation": "NONE", "column": "DOM.DomainNameE", "alias": "Domain"},
                            {"aggregation": "NONE", "column": "A.AreaCode", "alias": "AreaCode"},
                            {"aggregation": "NONE", "column": "A.AreaNameE", "alias": "Area"},
                            {"aggregation": "NONE", "column": "I.ItemCode", "alias": "ItemCode"},
                            {"aggregation": "NONE", "column": "I.ItemNameE", "alias": "Item"},
                            {"aggregation": "NONE", "column": "E.ElementCode", "alias": "ElementCode"},
                            {"aggregation": "NONE", "column": "E.ElementNameE", "alias": "Element"}, {"aggregation": "NONE", "column": "D.Year", "alias": "Year"},
                            {"aggregation": "NONE", "column": "D.Value", "alias": "Value"},
                            {"aggregation": "NONE", "column": "E.UnitNameE", "alias": "Unit"},
                            {"aggregation": "NONE", "column": "Flag", "alias": "Flag"}
                        ], "froms": [{"column": "Data", "alias": "D"}, {"column": "Item", "alias": "I"}, {"column": "Element", "alias": "E"},
                            {"column": "Area", "alias": "A"}, {"column": "Domain", "alias": "DOM"}],
                        "wheres": [
                            {"datatype": "TEXT", "column": "D.DomainCode", "operator": "=", "value": "" + FAOSTATDownload.domainCode + "", "ins": []},
                            {"datatype": "TEXT", "column": "DOM.DomainCode", "operator": "=", "value": "" + FAOSTATDownload.domainCode + "", "ins": []},
                            {"datatype": "DATE", "column": "D.AreaCode", "operator": "=", "value": "A.AreaCode", "ins": []}, {"datatype": "DATE", "column": "D.DomainCode", "operator": "=", "value": "DOM.DomainCode", "ins": []}, {"datatype": "DATE", "column": "D.ItemCode", "operator": "=", "value": "I.ItemCode", "ins": []}, {"datatype": "DATE", "column": "D.ElementCode", "operator": "=", "value": "E.ElementCode", "ins": []}, {"datatype": "TEXT", "column": "D.ElementCode", "operator": "IN", "value": "E.ElementCode", "ins": eval("[" + mesElements + "]")}, {"datatype": "TEXT", "column": "D.AreaCode", "operator": "IN", "value": "A.AreaCode", "ins": eval("[" + mesCountries + "]")}, {"datatype": "TEXT", "column": "D.ItemCode", "operator": "IN", "value": "I.ItemCode", "ins": eval("[" + mesItems + "]")}, {"datatype": "TEXT", "column": "D.Year", "operator": "IN", "value": "D.Year", "ins": eval("[" + mesYears + "]")}], "orderBys": [{"column": "D.Year", "direction": "DESC"}, {"column": "A.AreaNameE", "direction": "ASC"}, {"column": "I.ItemNameE", "direction": "ASC"},
                            {"column": "E.ElementNameE", "direction": "ASC"}], "limit": null, "query": null, "frequency": "NONE"}
            );
            //console.log(mesElements+"#"+mesCountries+"#"+mesItems+"#"+mesYears);
            //myInitOLAP();
            $.post("/wds/rest/table/json", FAOSTATOLAP2.queryParams).done(function(data) {
                data = FAOSTATOLAP2.attr.concat(data);
                $("#newOlap").pivotUI(data, FAOSTATOLAP2.options, FAOSTATOLAP2.displayOption.overwrite);
            });
        }
    });
}

var internalTest;


// Generated by CoffeeScript 1.7.1
(function() {
  var $, PivotData, addSeparators, aggregatorTemplates, aggregators, dayNamesEn, derivers, locales, mthNamesEn, naturalSort, numberFormat, pivotTableRenderer, renderers, usFmt, usFmtInt, usFmtPct, zeroPad,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty;

  $ = jQuery;


  /*
  Utilities
   */

  addSeparators = function(nStr, thousandsSep, decimalSep) {
    var rgx, x, x1, x2;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? decimalSep + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + thousandsSep + '$2');
    }
    return x1 + x2;
  };

  numberFormat = function(opts) {
    var defaults;
    defaults = {
      digitsAfterDecimal: 2,
      scaler: 1,
      thousandsSep: ",",
      decimalSep: ".",
      prefix: "",
      suffix: "",
      showZero: false
    };
    opts = $.extend(defaults, opts);
    return function(x) {
      var result;
      if (isNaN(x) || !isFinite(x)) {
        return "";
      }
      if (x === 0 && !opts.showZero) {
        return "";
      }
      result = addSeparators((opts.scaler * x).toFixed(opts.digitsAfterDecimal), opts.thousandsSep, opts.decimalSep);
      return "" + opts.prefix + result + opts.suffix;
    };
  };

  usFmt = numberFormat();

  usFmtInt = numberFormat({
    digitsAfterDecimal: 0
  });

  usFmtPct = numberFormat({
    digitsAfterDecimal: 1,
    scaler: 100,
    suffix: "%"
  });

  aggregatorTemplates = {
    count: function(formatter) {
      if (formatter == null) {
        formatter = usFmtInt;
      }
      return function() {
        return function(data, rowKey, colKey) {
          return {
            count: 0,
            push: function() {
              return this.count++;
            },
            value: function() {
              return this.count;
            },
            format: formatter
          };
        };
      };
    },
    countUnique: function(formatter) {
      if (formatter == null) {
        formatter = usFmtInt;
      }
      return function(_arg) {
        var attr;
        attr = _arg[0];
        return function(data, rowKey, colKey) {
          return {
            uniq: [],
            push: function(record) {
              var _ref;
              if (_ref = record[attr], __indexOf.call(this.uniq, _ref) < 0) {
                return this.uniq.push(record[attr]);
              }
            },
            value: function() {
              return this.uniq.length;
            },
            format: formatter,
            numInputs: attr != null ? 0 : 1
          };
        };
      };
    },
    listUnique: function(sep) {
      return function(_arg) {
        var attr;
        attr = _arg[0];
        return function(data, rowKey, colKey) {
          return {
            uniq: [],
            push: function(record) {
              var _ref;
              if (_ref = record[attr], __indexOf.call(this.uniq, _ref) < 0) {
                return this.uniq.push(record[attr]);
              }
            },
            value: function() {
              return this.uniq.join(sep);
            },
            format: function(x) {
              return x;
            },
            numInputs: attr != null ? 0 : 1
          };
        };
      };
    },
    sum: function(formatter) {
      if (formatter == null) {
        formatter = usFmt;
      }
      return function(_arg) {
        var attr;
        attr = _arg[0];
        return function(data, rowKey, colKey) {
          return {
            sum: 0,
            push: function(record) {
              if (!isNaN(parseFloat(record[attr]))) {
                return this.sum += parseFloat(record[attr]);
              }
            },
            value: function() {
              return this.sum;
            },
            format: formatter,
            numInputs: attr != null ? 0 : 1
          };
        };
      };
    },
    average: function(formatter) {
      if (formatter == null) {
        formatter = usFmt;
      }
      return function(_arg) {
        var attr;
        attr = _arg[0];
        return function(data, rowKey, colKey) {
          return {
            sum: 0,
            len: 0,
            push: function(record) {
              if (!isNaN(parseFloat(record[attr]))) {
                this.sum += parseFloat(record[attr]);
                return this.len++;
              }
            },
            value: function() {
              return this.sum / this.len;
            },
            format: formatter,
            numInputs: attr != null ? 0 : 1
          };
        };
      };
    },
    sumOverSum: function(formatter) {
      if (formatter == null) {
        formatter = usFmt;
      }
      return function(_arg) {
        var denom, num;
        num = _arg[0], denom = _arg[1];
        return function(data, rowKey, colKey) {
          return {
            sumNum: 0,
            sumDenom: 0,
            push: function(record) {
              if (!isNaN(parseFloat(record[num]))) {
                this.sumNum += parseFloat(record[num]);
              }
              if (!isNaN(parseFloat(record[denom]))) {
                return this.sumDenom += parseFloat(record[denom]);
              }
            },
            value: function() {
              return this.sumNum / this.sumDenom;
            },
            format: formatter,
            numInputs: (num != null) && (denom != null) ? 0 : 2
          };
        };
      };
    },
    sumOverSumBound80: function(upper, formatter) {
      if (upper == null) {
        upper = true;
      }
      if (formatter == null) {
        formatter = usFmt;
      }
      return function(_arg) {
        var denom, num;
        num = _arg[0], denom = _arg[1];
        return function(data, rowKey, colKey) {
          return {
            sumNum: 0,
            sumDenom: 0,
            push: function(record) {
              if (!isNaN(parseFloat(record[num]))) {
                this.sumNum += parseFloat(record[num]);
              }
              if (!isNaN(parseFloat(record[denom]))) {
                return this.sumDenom += parseFloat(record[denom]);
              }
            },
            value: function() {
              var sign;
              sign = upper ? 1 : -1;
              return (0.821187207574908 / this.sumDenom + this.sumNum / this.sumDenom + 1.2815515655446004 * sign * Math.sqrt(0.410593603787454 / (this.sumDenom * this.sumDenom) + (this.sumNum * (1 - this.sumNum / this.sumDenom)) / (this.sumDenom * this.sumDenom))) / (1 + 1.642374415149816 / this.sumDenom);
            },
            format: formatter,
            numInputs: (num != null) && (denom != null) ? 0 : 2
          };
        };
      };
    },
    fractionOf: function(wrapped, type, formatter) {
      if (type == null) {
        type = "total";
      }
      if (formatter == null) {
        formatter = usFmtPct;
      }
      return function() {
        var x;
        x = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return function(data, rowKey, colKey) {
          return {
            selector: {
              total: [[], []],
              row: [rowKey, []],
              col: [[], colKey]
            }[type],
            inner: wrapped.apply(null, x)(data, rowKey, colKey),
            push: function(record) {
              return this.inner.push(record);
            },
            format: formatter,
            value: function() {
              return this.inner.value() / data.getAggregator.apply(data, this.selector).inner.value();
            },
            numInputs: wrapped.apply(null, x)().numInputs
          };
        };
      };
    }
  };

  aggregators = (function(tpl) {
    return {    "Sum": tpl.sum(usFmt),
      "Count": tpl.count(usFmtInt),
      "Count Unique Values": tpl.countUnique(usFmtInt),
      "List Unique Values": tpl.listUnique(", "),
  
      "Integer Sum": tpl.sum(usFmtInt),
      "Average": tpl.average(usFmt),
      "Sum over Sum": tpl.sumOverSum(usFmt),
      "80% Upper Bound": tpl.sumOverSumBound80(true, usFmt),
      "80% Lower Bound": tpl.sumOverSumBound80(false, usFmt),
      "Sum as Fraction of Total": tpl.fractionOf(tpl.sum(), "total", usFmtPct),
      "Sum as Fraction of Rows": tpl.fractionOf(tpl.sum(), "row", usFmtPct),
      "Sum as Fraction of Columns": tpl.fractionOf(tpl.sum(), "col", usFmtPct),
      "Count as Fraction of Total": tpl.fractionOf(tpl.count(), "total", usFmtPct),
      "Count as Fraction of Rows": tpl.fractionOf(tpl.count(), "row", usFmtPct),
      "Count as Fraction of Columns": tpl.fractionOf(tpl.count(), "col", usFmtPct)
    };
  })(aggregatorTemplates);

  renderers = {
    "Table": function(pvtData, opts) {
      return pivotTableRenderer(pvtData, opts);
    },
    "Table Barchart": function(pvtData, opts) {
      return $(pivotTableRenderer(pvtData, opts)).barchart();
    },
    "Heatmap": function(pvtData, opts) {
      return $(pivotTableRenderer(pvtData, opts)).heatmap();
    },
    "Row Heatmap": function(pvtData, opts) {
      return $(pivotTableRenderer(pvtData, opts)).heatmap("rowheatmap");
    },
    "Col Heatmap": function(pvtData, opts) {
      return $(pivotTableRenderer(pvtData, opts)).heatmap("colheatmap");
    }
  };
   renderers2 = {
       "NewOLAP":function(pvtData, opts){
           
          newGrid(pvtData);
       //   return pivotTableRenderer(pvtData, opts)
           // return pivotTableRenderer(pvtData, opts);
       },
    "Table": function(pvtData, opts) {
      return pivotTableRenderer(pvtData, opts);
    },
    "Table Barchart": function(pvtData, opts) {
      return $(pivotTableRenderer(pvtData, opts)).barchart();
    }
  };
  

  locales = {
    en2: {
      aggregators: aggregators,
      renderers: renderers,
      localeStrings: {
        renderError: "An error occurred rendering the PivotTable results.",
        computeError: "An error occurred computing the PivotTable results.",
        uiRenderError: "An error occurred rendering the PivotTable UI.",
        selectAll: "Select All",
        selectNone: "Select None",
        tooMany: "(too many to list)",
        filterResults: "Filter results",
        totals: "Totals",
        vs: "vs",
        by: "by"
      }
    },
               en: {
      aggregators: aggregators,
      renderers: renderers2,
      localeStrings: {
        renderError: "An error occurred rendering the PivotTable results.",
        computeError: "An error occurred computing the PivotTable results.",
        uiRenderError: "An error occurred rendering the PivotTable UI.",
        selectAll: "Select All",
        selectNone: "Select None",
        tooMany: "(too many to list)",
        filterResults: "Filter results",
        totals: "Totals",
        vs: "vs",
        by: "by"
      }
    }
  };

  mthNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  dayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  zeroPad = function(number) {
    return ("0" + number).substr(-2, 2);
  };

  derivers = {
    bin: function(col, binWidth) {
      return function(record) {
        return record[col] - record[col] % binWidth;
      };
    },
    dateFormat: function(col, formatString, mthNames, dayNames) {
      if (mthNames == null) {
        mthNames = mthNamesEn;
      }
      if (dayNames == null) {
        dayNames = dayNamesEn;
      }
      return function(record) {
        var date;
        date = new Date(Date.parse(record[col]));
        if (isNaN(date)) {
          return "";
        }
        return formatString.replace(/%(.)/g, function(m, p) {
          switch (p) {
            case "y":
              return date.getFullYear();
            case "m":
              return zeroPad(date.getMonth() + 1);
            case "n":
              return mthNames[date.getMonth()];
            case "d":
              return zeroPad(date.getDate());
            case "w":
              return dayNames[date.getDay()];
            case "x":
              return date.getDay();
            case "H":
              return zeroPad(date.getHours());
            case "M":
              return zeroPad(date.getMinutes());
            case "S":
              return zeroPad(date.getSeconds());
            default:
              return "%" + p;
          }
        });
      };
    }
  };

  naturalSort = (function(_this) {
    return function(as, bs) {
      var a, a1, b, b1, rd, rx, rz;
      rx = /(\d+)|(\D+)/g;
      rd = /\d/;
      rz = /^0/;
      if (typeof as === "number" || typeof bs === "number") {
        if (isNaN(as)) {
          return 1;
        }
        if (isNaN(bs)) {
          return -1;
        }
        return as - bs;
      }
      a = String(as).toLowerCase();
      b = String(bs).toLowerCase();
      if (a === b) {
        return 0;
      }
      if (!(rd.test(a) && rd.test(b))) {
        return (a > b ? 1 : -1);
      }
      a = a.match(rx);
      b = b.match(rx);
      while (a.length && b.length) {
        a1 = a.shift();
        b1 = b.shift();
        if (a1 !== b1) {
          if (rd.test(a1) && rd.test(b1)) {
            return a1.replace(rz, ".0") - b1.replace(rz, ".0");
          } else {
            return (a1 > b1 ? 1 : -1);
          }
        }
      }
      return a.length - b.length;
    };
  })(this);

  $.pivotUtilities = {
    aggregatorTemplates: aggregatorTemplates,
    aggregators: aggregators,
    renderers: renderers,
    derivers: derivers,
    locales: locales,
    naturalSort: naturalSort,
    numberFormat: numberFormat
  };


  /*
  Data Model class
   */

  PivotData = (function() {
    function PivotData(input, opts) {
      this.getAggregator = __bind(this.getAggregator, this);
      this.getRowKeys = __bind(this.getRowKeys, this);
      this.getColKeys = __bind(this.getColKeys, this);
      this.sortKeys = __bind(this.sortKeys, this);
      this.arrSort = __bind(this.arrSort, this);
      this.natSort = __bind(this.natSort, this);
      this.aggregator = opts.aggregator;
      this.aggregatorName = opts.aggregatorName;
      this.colAttrs = opts.cols;
      this.rowAttrs = opts.rows;
      this.valAttrs = opts.vals;
      this.tree = {};
      this.rowKeys = [];
      this.colKeys = [];
      this.rowTotals = {};
      this.colTotals = {};
      this.allTotal = this.aggregator(this, [], []);
      this.sorted = false;
      PivotData.forEachRecord(input, opts.derivedAttributes, (function(_this) {
        return function(record) {
          if (opts.filter(record)) {
            return _this.processRecord(record);
          }
        };
      })(this));
    }

    PivotData.forEachRecord = function(input, derivedAttributes, f) {
      var addRecord, compactRecord, i, j, k, record, tblCols, _i, _len, _ref, _results, _results1;
      if ($.isEmptyObject(derivedAttributes)) {
        addRecord = f;
      } else {
        addRecord = function(record) {
          var k, v, _ref;
          for (k in derivedAttributes) {
            v = derivedAttributes[k];
            record[k] = (_ref = v(record)) != null ? _ref : record[k];
          }
          return f(record);
        };
      }
      if ($.isFunction(input)) {
        return input(addRecord);
      } else if ($.isArray(input)) {
        if ($.isArray(input[0])) {
          _results = [];
          for (i in input) {
            if (!__hasProp.call(input, i)) continue;
            compactRecord = input[i];
            if (!(i > 0)) {
              continue;
            }
            record = {};
            _ref = input[0];
            for (j in _ref) {
              if (!__hasProp.call(_ref, j)) continue;
              k = _ref[j];
              record[k] = compactRecord[j];
            }
            _results.push(addRecord(record));
          }
          return _results;
        } else {
          _results1 = [];
          for (_i = 0, _len = input.length; _i < _len; _i++) {
            record = input[_i];
            _results1.push(addRecord(record));
          }
          return _results1;
        }
      } else if (input instanceof jQuery) {
        tblCols = [];
        $("thead > tr > th", input).each(function(i) {
          return tblCols.push($(this).text());
        });
        return $("tbody > tr", input).each(function(i) {
          record = {};
          $("td", this).each(function(j) {
            return record[tblCols[j]] = $(this).text();
          });
          return addRecord(record);
        });
      } else {
        throw new Error("unknown input format");
      }
    };

    PivotData.convertToArray = function(input) {
      var result;
      result = [];
      PivotData.forEachRecord(input, {}, function(record) {
        return result.push(record);
      });
      return result;
    };

    PivotData.prototype.natSort = function(as, bs) {
      return naturalSort(as, bs);
    };

    PivotData.prototype.arrSort = function(a, b) {
      return this.natSort(a.join(), b.join());
    };

    PivotData.prototype.sortKeys = function() {
      if (!this.sorted) {
        this.rowKeys.sort(this.arrSort);
        this.colKeys.sort(this.arrSort);
      }
      return this.sorted = true;
    };

    PivotData.prototype.getColKeys = function() {
      this.sortKeys();
      return this.colKeys;
    };

    PivotData.prototype.getRowKeys = function() {
      this.sortKeys();
      return this.rowKeys;
    };

    PivotData.prototype.processRecord = function(record) {
      var colKey, flatColKey, flatRowKey, rowKey, x, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
      colKey = [];
      rowKey = [];
      _ref = this.colAttrs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        colKey.push((_ref1 = record[x]) != null ? _ref1 : "null");
      }
      _ref2 = this.rowAttrs;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        x = _ref2[_j];
        rowKey.push((_ref3 = record[x]) != null ? _ref3 : "null");
      }
    /*FIG MODIF  flatRowKey = rowKey.join(String.fromCharCode(0));
      flatColKey = colKey.join(String.fromCharCode(0));*/
         flatRowKey = rowKey.join("||");
      flatColKey = colKey.join("||");
      this.allTotal.push(record);
      if (rowKey.length !== 0) {
        if (!this.rowTotals[flatRowKey]) {
          this.rowKeys.push(rowKey);
          this.rowTotals[flatRowKey] = this.aggregator(this, rowKey, []);
        }
        this.rowTotals[flatRowKey].push(record);
      }
      if (colKey.length !== 0) {
        if (!this.colTotals[flatColKey]) {
          this.colKeys.push(colKey);
          this.colTotals[flatColKey] = this.aggregator(this, [], colKey);
        }
        this.colTotals[flatColKey].push(record);
      }
      if (colKey.length !== 0 && rowKey.length !== 0) {
        if (!this.tree[flatRowKey]) {
          this.tree[flatRowKey] = {};
        }
        if (!this.tree[flatRowKey][flatColKey]) {
          this.tree[flatRowKey][flatColKey] = this.aggregator(this, rowKey, colKey);
        }
        return this.tree[flatRowKey][flatColKey].push(record);
      }
    };

    PivotData.prototype.getAggregator = function(rowKey, colKey) {
      var agg, flatColKey, flatRowKey;
      /*flatRowKey = rowKey.join(String.fromCharCode(0));
      flatColKey = colKey.join(String.fromCharCode(0));*/
        flatRowKey = rowKey.join("||");
      flatColKey = colKey.join("||");
      if (rowKey.length === 0 && colKey.length === 0) {
        agg = this.allTotal;
      } else if (rowKey.length === 0) {
        agg = this.colTotals[flatColKey];
      } else if (colKey.length === 0) {
        agg = this.rowTotals[flatRowKey];
      } else {
         /* console.log( this.tree);
           console.log( flatRowKey);
            console.log( flatColKey);
             console.log(this.tree[flatRowKey]);*/
        agg = this.tree[flatRowKey][flatColKey];
      }
      return agg != null ? agg : {
        value: (function() {
          return null;
        }),
        format: function() {
          return "";
        }
      };
    };

    return PivotData;

  })();


  /*
  Default Renderer for hierarchical table layout
   */

  pivotTableRenderer = function(pivotData, opts) {
    var aggregator, c, colAttrs, colKey, colKeys, defaults, i, j, r, result, rowAttrs, rowKey, rowKeys, spanSize, td, th, totalAggregator, tr, txt, val, x;
    defaults = {
      localeStrings: {
        totals: "Totals"
      }
    };
    opts = $.extend(defaults, opts);
    colAttrs = pivotData.colAttrs;
    rowAttrs = pivotData.rowAttrs;
    rowKeys = pivotData.getRowKeys();
    colKeys = pivotData.getColKeys();
    result = document.createElement("table");
    result.className = "pvtTable";
    spanSize = function(arr, i, j) {
      var len, noDraw, stop, x, _i, _j;
      if (i !== 0) {
        noDraw = true;
        for (x = _i = 0; 0 <= j ? _i <= j : _i >= j; x = 0 <= j ? ++_i : --_i) {
          if (arr[i - 1][x] !== arr[i][x]) {
            noDraw = false;
          }
        }
        if (noDraw) {
          return -1;
        }
      }
      len = 0;
      while (i + len < arr.length) {
        stop = false;
        for (x = _j = 0; 0 <= j ? _j <= j : _j >= j; x = 0 <= j ? ++_j : --_j) {
          if (arr[i][x] !== arr[i + len][x]) {
            stop = true;
          }
        }
        if (stop) {
          break;
        }
        len++;
      }
      return len;
    };
    for (j in colAttrs) {
      if (!__hasProp.call(colAttrs, j)) continue;
      c = colAttrs[j];
      tr = document.createElement("tr");
      if (parseInt(j) === 0 && rowAttrs.length !== 0) {
        th = document.createElement("th");
        th.setAttribute("colspan", rowAttrs.length);
        th.setAttribute("rowspan", colAttrs.length);
        tr.appendChild(th);
      }
      th = document.createElement("th");
      th.className = "pvtAxisLabel";
      th.textContent = c;
      tr.appendChild(th);
      for (i in colKeys) {
        if (!__hasProp.call(colKeys, i)) continue;
        colKey = colKeys[i];
        x = spanSize(colKeys, parseInt(i), parseInt(j));
        if (x !== -1) {
          th = document.createElement("th");
          th.className = "pvtColLabel";
          th.textContent = colKey[j];
          th.setAttribute("colspan", x);
          if (parseInt(j) === colAttrs.length - 1 && rowAttrs.length !== 0) {
            th.setAttribute("rowspan", 2);
          }
          tr.appendChild(th);
        }
      }
      if (parseInt(j) === 0) {
        th = document.createElement("th");
        th.className = "pvtTotalLabel";
        th.innerHTML = opts.localeStrings.totals;
        th.setAttribute("rowspan", colAttrs.length + (rowAttrs.length === 0 ? 0 : 1));
        tr.appendChild(th);
      }
      result.appendChild(tr);
    }
    if (rowAttrs.length !== 0) {
      tr = document.createElement("tr");
      for (i in rowAttrs) {
        if (!__hasProp.call(rowAttrs, i)) continue;
        r = rowAttrs[i];
        th = document.createElement("th");
        th.className = "pvtAxisLabel";
        th.textContent = r;
        tr.appendChild(th);
      }
      th = document.createElement("th");
      if (colAttrs.length === 0) {
        th.className = "pvtTotalLabel";
        th.innerHTML = opts.localeStrings.totals;
      }
      tr.appendChild(th);
      result.appendChild(tr);
    }
    for (i in rowKeys) {
      if (!__hasProp.call(rowKeys, i)) continue;
      rowKey = rowKeys[i];
      tr = document.createElement("tr");
      for (j in rowKey) {
        if (!__hasProp.call(rowKey, j)) continue;
        txt = rowKey[j];
        x = spanSize(rowKeys, parseInt(i), parseInt(j));
        if (x !== -1) {
          th = document.createElement("th");
          th.className = "pvtRowLabel";
          th.innerHTML =txt;
          th.setAttribute("rowspan", x);
          if (parseInt(j) === rowAttrs.length - 1 && colAttrs.length !== 0) {
            th.setAttribute("colspan", 2);
          }
          tr.appendChild(th);
        }
      }
      for (j in colKeys) {
        if (!__hasProp.call(colKeys, j)) continue;
        colKey = colKeys[j];
        aggregator = pivotData.getAggregator(rowKey, colKey);
        val = aggregator.value();
        td = document.createElement("td");
        td.className = "pvtVal row" + i + " col" + j;
        td.innerHTML = aggregator.format(val);
        td.setAttribute("data-value", val);
        tr.appendChild(td);
      }
      totalAggregator = pivotData.getAggregator(rowKey, []);
      val = totalAggregator.value();
      td = document.createElement("td");
      td.className = "pvtTotal rowTotal";
      td.innerHTML = totalAggregator.format(val);
      td.setAttribute("data-value", val);
      td.setAttribute("data-for", "row" + i);
      tr.appendChild(td);
      result.appendChild(tr);
    }
    tr = document.createElement("tr");
    th = document.createElement("th");
    th.className = "pvtTotalLabel";
    th.innerHTML = opts.localeStrings.totals;
    th.setAttribute("colspan", rowAttrs.length + (colAttrs.length === 0 ? 0 : 1));
    tr.appendChild(th);
    for (j in colKeys) {
      if (!__hasProp.call(colKeys, j)) continue;
      colKey = colKeys[j];
      totalAggregator = pivotData.getAggregator([], colKey);
      val = totalAggregator.value();
      td = document.createElement("td");
      td.className = "pvtTotal colTotal";
      td.innerHTML = totalAggregator.format(val);
      td.setAttribute("data-value", val);
      td.setAttribute("data-for", "col" + j);
      tr.appendChild(td);
    }
    totalAggregator = pivotData.getAggregator([], []);
    val = totalAggregator.value();
    td = document.createElement("td");
    td.className = "pvtGrandTotal";
    td.innerHTML = totalAggregator.format(val);
    td.setAttribute("data-value", val);
    tr.appendChild(td);
    result.appendChild(tr);
    result.setAttribute("data-numrows", rowKeys.length);
    result.setAttribute("data-numcols", colKeys.length);
    return result;
  };


  /*
  Pivot Table core: create PivotData object and call Renderer on it
   */

  $.fn.pivot = function(input, opts) {
    var defaults, e, pivotData, result, x;
    defaults = {
      cols: [],
      rows: [],
      filter: function() {
        return true;
      },
      aggregator: aggregatorTemplates.count()(),
      aggregatorName: "Count",
      derivedAttributes: {},
      renderer: pivotTableRenderer,
      rendererOptions: null,
      localeStrings: locales.en.localeStrings
    };
    opts = $.extend(defaults, opts);
    result = null;
    //try 
    {
        FAOSTATNEWOLAP.internalData = new PivotData(input, opts);
    //  pivotData = new PivotData(input, opts);
  
  //    try
      {
         
       // result = opts.renderer(pivotData, opts.rendererOptions);
       result = opts.renderer(FAOSTATNEWOLAP.internalData, opts.rendererOptions);
    
      } 
      /*catch (_error) {
        e = _error;
        if (typeof console != "undefined")  {
          console.error(e.stack);
        }
        if( console != null){console.error("trois");console.error(e.stack);}
        result = $("<span>").html(opts.localeStrings.renderError);
      }*/
    }
    /*catch (_error) {
      e = _error;
      if (typeof console !== "undefined" && console !== null) {
        console.error(e.stack);
      }
      result = $("<span>").html(opts.localeStrings.computeError);
    }*/
    x = this[0];
    while (x.hasChildNodes()) {
      x.removeChild(x.lastChild);
    }
    return this.append(result);
  };


  /*
  Pivot Table UI: calls Pivot Table core above with options set by user
   */

  $.fn.pivotUI = function(input, inputOpts, overwrite, locale) {
    var a, aggregator, attrLength, axisValues, c, colList, defaults, e, existingOpts, i, initialRender, k, opts, pivotTable, refresh, refreshDelayed, renderer, rendererControl, shownAttributes, tblCols, tr1, tr2, uiTable, unusedAttrsVerticalAutoOverride, x, _fn, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4;
    if (overwrite == null) {
      overwrite = false;
    }
    if (locale == null) {
      locale = "en";
    }
    defaults = {
      derivedAttributes: {},
      aggregators: locales[locale].aggregators,
      renderers: locales[locale].renderers,
      hiddenAttributes: [],
      menuLimit: 200,
      cols: [],
      rows: [],
      vals: [],
      exclusions: {},
      unusedAttrsVertical:false,// "auto",
      autoSortUnusedAttrs: false,
      rendererOptions: {
        localeStrings: locales[locale].localeStrings
      },
      onRefresh: null,
      filter: function() {
        return true;
      },
      localeStrings: locales[locale].localeStrings
    };
    existingOpts = this.data("pivotUIOptions");
    if ((existingOpts == null) || overwrite) {
      opts = $.extend(defaults, inputOpts);
    } else {
      opts = existingOpts;
    }
    //try 
	{
      input = PivotData.convertToArray(input);
      
      tblCols = (function() {
        var _ref, _results;
        _ref = input[0];
        _results = [];
        for (k in _ref) {
          if (!__hasProp.call(_ref, k)) continue;
          _results.push(k);
        }
        return _results;
      })();
      _ref = opts.derivedAttributes;
      for (c in _ref) {
        if (!__hasProp.call(_ref, c)) continue;
        if ((__indexOf.call(tblCols, c) < 0)) {
          tblCols.push(c);
        }
      }
      axisValues = {};
      for (_i = 0, _len = tblCols.length; _i < _len; _i++) {
        x = tblCols[_i];
        axisValues[x] = {};
      }
      PivotData.forEachRecord(input, opts.derivedAttributes, function(record) {
        var v, _base, _results;
        _results = [];
        for (k in record) {
          if (!__hasProp.call(record, k)) continue;
          v = record[k];
          if (!(opts.filter(record))) {
            continue;
          }
          if (v == null) {
            v = "null";
          }
          if ((_base = axisValues[k])[v] == null) {
            _base[v] = 0;
          }
          _results.push(axisValues[k][v]++);
        }
        return _results;
      });
      uiTable = $("<table cellpadding='5'>");
      rendererControl = $("<td id='vals'>");
      renderer = $("<select class='pvtRenderer'>").appendTo(rendererControl).bind("change", function() {
        return refresh();
      });
      _ref1 = opts.renderers;
      for (x in _ref1) {
        if (!__hasProp.call(_ref1, x)) continue;
        $("<option>").val(x).html(x).appendTo(renderer);
      }
  
      colList = $("<td id='unused' class='pvtAxisContainer pvtUnused'>");
      shownAttributes = (function() {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = tblCols.length; _j < _len1; _j++) {
          c = tblCols[_j];
          if (__indexOf.call(opts.hiddenAttributes, c) < 0) {
            _results.push(c);
          }
        }
        return _results;
      })();
      unusedAttrsVerticalAutoOverride = false;
      if (opts.unusedAttrsVertical === "auto") {
        attrLength = 0;
        for (_j = 0, _len1 = shownAttributes.length; _j < _len1; _j++) {
          a = shownAttributes[_j];
          attrLength += a.length;
        }
        unusedAttrsVerticalAutoOverride = attrLength > 120;
      }
      if (opts.unusedAttrsVertical === true || unusedAttrsVerticalAutoOverride) {
        colList.addClass('pvtVertList');
      } else {
        colList.addClass('pvtHorizList');
      }
      _fn = function(c) {
        var attrElem, btns, checkContainer, filterItem, filterItemExcluded, hasExcludedItem, keys, showFilterList, triangleLink, updateFilter, v, valueList, _k, _len2, _ref2;
        keys = (function() {
          var _results;
          _results = [];
          for (k in axisValues[c]) {
            _results.push(k);
          }
          return _results;
        })();
        hasExcludedItem = false;
        valueList = $("<div>").addClass('pvtFilterBox').hide();
        valueList.append($("<h4>").text("" + c + " (" + keys.length + ")"));
        if (keys.length > opts.menuLimit) {
          valueList.append($("<p>").html(opts.localeStrings.tooMany));
        } else {
          btns = $("<p>").appendTo(valueList);
          btns.append($("<button>").html(opts.localeStrings.selectAll).bind("click", function() {
            return valueList.find("input:visible").prop("checked", true);
          }));
          btns.append($("<button>").html(opts.localeStrings.selectNone).bind("click", function() {
            return valueList.find("input:visible").prop("checked", false);
          }));
          btns.append($("<input>").addClass("pvtSearch").attr("placeholder", opts.localeStrings.filterResults).bind("keyup", function() {
            var filter;
            filter = $(this).val().toLowerCase();
            return $(this).parents(".pvtFilterBox").find('label span').each(function() {
              var testString;
              testString = $(this).text().toLowerCase().indexOf(filter);
              if (testString !== -1) {
                return $(this).parent().show();
              } else {
                return $(this).parent().hide();
              }
            });
          }));
          checkContainer = $("<div>").addClass("pvtCheckContainer").appendTo(valueList);
          _ref2 = keys.sort(naturalSort);
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            k = _ref2[_k];
            v = axisValues[c][k];
            filterItem = $("<label>");
            filterItemExcluded = opts.exclusions[c] ? (__indexOf.call(opts.exclusions[c], k) >= 0) : false;
            hasExcludedItem || (hasExcludedItem = filterItemExcluded);
            $("<input type='checkbox' class='pvtFilter'>").attr("checked", !filterItemExcluded).data("filter", [c, k]).appendTo(filterItem);
            filterItem.append($("<span>").html("" + k + " (" + v + ")"));
            checkContainer.append($("<p>").append(filterItem));
          }
        }
        updateFilter = function() {
          var unselectedCount;
          unselectedCount = $(valueList).find("[type='checkbox']").length - $(valueList).find("[type='checkbox']:checked").length;
          if (unselectedCount > 0) {
            attrElem.addClass("pvtFilteredAttribute");
          } else {
            attrElem.removeClass("pvtFilteredAttribute");
          }
          if (keys.length > opts.menuLimit) {
            return valueList.toggle();
          } else {
            return valueList.toggle(0, refresh);
          }
        };
        $("<p>").appendTo(valueList).append($("<button>").text("OK").bind("click", updateFilter));
        showFilterList = function(e) {
          console.log(valueList);
          valueList.css({
            left: 50,//e.pageX,
            top: e.pageY
          }).toggle();
          $('.pvtSearch').val('');
          return $('label').show();
        };
      
        triangleLink = $("<span class='pvtTriangle'>").html(" &#x25BE;").bind("click", showFilterList);
        attrElem = $("<li class='axis_" + i + "'>").append($("<span class='pvtAttr'>").html(c).data("attrName", c).append(triangleLink));
        if (hasExcludedItem) {
          attrElem.addClass('pvtFilteredAttribute');
        }
        colList.append(attrElem).append(valueList);
       // $("body").append(attrElem).append(valueList);
        
        return attrElem.bind("dblclick", showFilterList);
      };
      for (i in shownAttributes) {
        c = shownAttributes[i];
        _fn(c);
      }
      tr1 = $("<tr>").appendTo(uiTable);
      aggregator = $("<select class='pvtAggregator'>").bind("change", function() {
        return refresh();
      });
      _ref2 = opts.aggregators;
      for (x in _ref2) {
        if (!__hasProp.call(_ref2, x)) continue;
        aggregator.append($("<option>").val(x).html(x));
      }
      $("<td class='pvtVals'>").appendTo(tr1).append(aggregator).append($("<br>"));
      $("<td class='pvtAxisContainer pvtHorizList pvtCols'>").appendTo(tr1);
     tr2 = $("<tr>").appendTo(uiTable);
      
     // tr2.append($("<td id='rows' valign='top' class='pvtAxisContainer pvtRows pvtHorizList'>"));
     
  tr2.append($("<td id=pretd1>"));
      
      
      
     pivotTable = $("<td valign='top' id='pvtRendererArea' class='pvtRendererArea'>").append("<div  id='pivot_table'>").appendTo(tr2);
      if (opts.unusedAttrsVertical === true || unusedAttrsVerticalAutoOverride) {
        uiTable.find('tr:nth-child(1)').prepend(rendererControl);
        uiTable.find('tr:nth-child(2)').prepend(colList);
        
      } else {
          uiTable.prepend($("<tr>").append($("<td id='rows' valign='top' class='pvtAxisContainer pvtRows pvtHorizList'>")).prepend($("<td id='pretd'>&nbsp;</td>")));
          uiTable.prepend($("<tr>").append(rendererControl).append(colList));
    }
      this.html(uiTable);
      _ref3 = opts.cols;
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        x = _ref3[_k];
        this.find(".pvtCols").append(this.find(".axis_" + (shownAttributes.indexOf(x))));
      }
      _ref4 = opts.rows;
      for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
        x = _ref4[_l];
        this.find(".pvtRows").append(this.find(".axis_" + (shownAttributes.indexOf(x))));
      }
      if (opts.aggregatorName != null) {
        this.find(".pvtAggregator").val(opts.aggregatorName);
      }
      if (opts.rendererName != null) {
        this.find(".pvtRenderer").val(opts.rendererName);
      }
      initialRender = true;
      refreshDelayed = (function(_this) {
        return function() {
          var attr, exclusions, natSort, newDropdown, numInputsToProcess, pivotUIOptions, pvtVals, subopts, unusedAttrsContainer, vals, _len4, _m, _n, _ref5;
          subopts = {
            derivedAttributes: opts.derivedAttributes,
            localeStrings: opts.localeStrings,
            rendererOptions: opts.rendererOptions,
            cols: [],
            rows: []
          };
          numInputsToProcess = (_ref5 = opts.aggregators[aggregator.val()]([])().numInputs) != null ? _ref5 : 0;
          vals = [];
          _this.find(".pvtRows li span.pvtAttr").each(function() {
            return subopts.rows.push($(this).data("attrName"));
          });
          _this.find(".pvtCols li span.pvtAttr").each(function() {
            return subopts.cols.push($(this).data("attrName"));
          });
          _this.find(".pvtVals select.pvtAttrDropdown").each(function() {
            if (numInputsToProcess === 0) {
              return $(this).remove();
            } else {
              numInputsToProcess--;
              if ($(this).val() !== "") {
                return vals.push($(this).val());
              }
            }
          });
          if (numInputsToProcess !== 0) {
            pvtVals = _this.find(".pvtVals");
            for (x = _m = 0; 0 <= numInputsToProcess ? _m < numInputsToProcess : _m > numInputsToProcess; x = 0 <= numInputsToProcess ? ++_m : --_m) {
              newDropdown = $("<select class='pvtAttrDropdown'>").append($("<option>")).bind("change", function() {
                return refresh();
              });
              for (_n = 0, _len4 = shownAttributes.length; _n < _len4; _n++) {
                attr = shownAttributes[_n];
                newDropdown.append($("<option>").val(attr).html(attr));
              }
              pvtVals.append(newDropdown);
            }
          }
          if (initialRender) {
            vals = opts.vals;
            i = 0;
            _this.find(".pvtVals select.pvtAttrDropdown").each(function() {
              $(this).val(vals[i]);
              return i++;
            });
            initialRender = false;
          }
          subopts.aggregatorName = aggregator.val();
          subopts.vals = vals;
          subopts.aggregator = opts.aggregators[aggregator.val()](vals);
          subopts.renderer = opts.renderers[renderer.val()];
          exclusions = {};
          _this.find('input.pvtFilter').not(':checked').each(function() {
            var filter;
            filter = $(this).data("filter");
            if (exclusions[filter[0]] != null) {
              return exclusions[filter[0]].push(filter[1]);
            } else {
              return exclusions[filter[0]] = [filter[1]];
            }
          });
          subopts.filter = function(record) {
            var excludedItems, _ref6;
            if (!opts.filter(record)) {
              return false;
            }
            for (k in exclusions) {
              excludedItems = exclusions[k];
              if (_ref6 = "" + record[k], __indexOf.call(excludedItems, _ref6) >= 0) {
                return false;
              }
            }
            return true;
          };
        
          pivotTable.pivot(input, subopts);
          pivotUIOptions = $.extend(opts, {
            cols: subopts.cols,
            rows: subopts.rows,
            vals: vals,
            exclusions: exclusions,
            aggregatorName: aggregator.val(),
            rendererName: renderer.val()
          });
          _this.data("pivotUIOptions", pivotUIOptions);
          if (opts.autoSortUnusedAttrs) {
            natSort = $.pivotUtilities.naturalSort;
            unusedAttrsContainer = _this.find("td.pvtUnused.pvtAxisContainer");
            $(unusedAttrsContainer).children("li").sort(function(a, b) {
              return natSort($(a).text(), $(b).text());
            }).appendTo(unusedAttrsContainer);
          }
          pivotTable.css("opacity", 1);
          if (opts.onRefresh != null) {
            return opts.onRefresh(pivotUIOptions);
          }
        };
      })(this);
      refresh = (function(_this) {
        return function() {
          pivotTable.css("opacity", 0.5);
          return setTimeout(refreshDelayed, 10);
        };
      })(this);
      refresh();
      this.find(".pvtAxisContainer").sortable({
        update: function(e, ui) {
          if (ui.sender == null) {
            return refresh();
          }
        },
        connectWith: this.find(".pvtAxisContainer"),
        items: 'li',
        placeholder: 'pvtPlaceholder'
      });
    }
	/*catch (_error) {
      e = _error;
      if (typeof console !== "undefined" && console !== null) {
        console.error(e.stack);
      }
      this.html(opts.localeStrings.uiRenderError);
    }*/
    return this;
  };


  /*
  Heatmap post-processing
   */

  $.fn.heatmap = function(scope) {
    var colorGen, heatmapper, i, j, numCols, numRows, _i, _j;
    if (scope == null) {
      scope = "heatmap";
    }
    numRows = this.data("numrows");
    numCols = this.data("numcols");
    colorGen = function(color, min, max) {
      var hexGen;
      hexGen = (function() {
        switch (color) {
          case "red":
            return function(hex) {
              return "ff" + hex + hex;
            };
          case "green":
            return function(hex) {
              return "" + hex + "ff" + hex;
            };
          case "blue":
            return function(hex) {
              return "" + hex + hex + "ff";
            };
        }
      })();
      return function(x) {
        var hex, intensity;
        intensity = 255 - Math.round(255 * (x - min) / (max - min));
        hex = intensity.toString(16).split(".")[0];
        if (hex.length === 1) {
          hex = 0 + hex;
        }
        return hexGen(hex);
      };
    };
    heatmapper = (function(_this) {
      return function(scope, color) {
        var colorFor, forEachCell, values;
        forEachCell = function(f) {
          return _this.find(scope).each(function() {
            var x;
            x = $(this).data("value");
            if ((x != null) && isFinite(x)) {
              return f(x, $(this));
            }
          });
        };
        values = [];
        forEachCell(function(x) {
          return values.push(x);
        });
        colorFor = colorGen(color, Math.min.apply(Math, values), Math.max.apply(Math, values));
        return forEachCell(function(x, elem) {
          return elem.css("background-color", "#" + colorFor(x));
        });
      };
    })(this);
    switch (scope) {
      case "heatmap":
        heatmapper(".pvtVal", "red");
        break;
      case "rowheatmap":
        for (i = _i = 0; 0 <= numRows ? _i < numRows : _i > numRows; i = 0 <= numRows ? ++_i : --_i) {
          heatmapper(".pvtVal.row" + i, "red");
        }
        break;
      case "colheatmap":
        for (j = _j = 0; 0 <= numCols ? _j < numCols : _j > numCols; j = 0 <= numCols ? ++_j : --_j) {
          heatmapper(".pvtVal.col" + j, "red");
        }
    }
    heatmapper(".pvtTotal.rowTotal", "red");
    heatmapper(".pvtTotal.colTotal", "red");
    return this;
  };


  /*
  Barchart post-processing
   */

  $.fn.barchart = function() {
    var barcharter, i, numCols, numRows, _i;
    numRows = this.data("numrows");
    numCols = this.data("numcols");
    barcharter = (function(_this) {
      return function(scope) {
        var forEachCell, max, scaler, values;
        forEachCell = function(f) {
          return _this.find(scope).each(function() {
            var x;
            x = $(this).data("value");
            if ((x != null) && isFinite(x)) {
              return f(x, $(this));
            }
          });
        };
        values = [];
        forEachCell(function(x) {
          return values.push(x);
        });
        max = Math.max.apply(Math, values);
        scaler = function(x) {
          return 100 * x / (1.4 * max);
        };
        return forEachCell(function(x, elem) {
          var text, wrapper;
          text = elem.text();
          wrapper = $("<div>").css({
            "position": "relative",
            "height": "55px"
          });
          wrapper.append($("<div>").css({
            "position": "absolute",
            "bottom": 0,
            "left": 0,
            "right": 0,
            "height": scaler(x) + "%",
            "background-color": "gray"
          }));
          wrapper.append($("<div>").text(text).css({
            "position": "relative",
            "padding-left": "5px",
            "padding-right": "5px"
          }));
          return elem.css({
            "padding": 0,
            "padding-top": "5px",
            "text-align": "center"
          }).html(wrapper);
        });
      };
    })(this);
    for (i = _i = 0; 0 <= numRows ? _i < numRows : _i > numRows; i = 0 <= numRows ? ++_i : --_i) {
      barcharter(".pvtVal.row" + i);
    }
    barcharter(".pvtTotal.colTotal");
    return this;
  };

}).call(this);
