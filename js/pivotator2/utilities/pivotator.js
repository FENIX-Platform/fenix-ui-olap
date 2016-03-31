define(["functions"], function(myFunction) {

var myfunc=new myFunction();

  var SortedSet = (function () {

    function find(val, array, comparator) {
      var l = 0;
      var r = array.length - 1;
      var i;
      var compare;
      while (l <= r) {
        i = ((l + r) / 2) | 0;
        compare = comparator(array[i], val);
        if (compare < 0) {
          l = i + 1;
          continue;
        }
        if (compare > 0) {
          r = i - 1;
          continue;
        }
        return i;
      }
      return null;
    }

    var concat = (function(){
      var a = [];
      var c = a.concat;
      function concat(){
        return c.apply(a, arguments);
      }
      return concat;
    }());


    function insert(value, comparator, values) {
		//console.log("insert",value,comparator,values)
      var r = values.length - 1;
      if (r === -1) {      return [value];      }
      var l = 0;
      var i, compare;
      while (l <= r) {
        i = ((l + r) / 2) | 0;
        compare = comparator(values[i], value);
        if (compare < 0) {
          //array[i] is less than our value
          l = i + 1;

        } else if (compare > 0) {
          r = i - 1;
        } else {
          //already here
          return values;
        }
      }
	  
      if (comparator(values[i], value) < 0) {
        //insert after i
        return concat(values.slice(0, i + 1), [value], values.slice(i + 1));
      } else {
        //insert before i

        return concat(values.slice(0, i), [value], values.slice(i));
      }
    }
	
	 

    function SortedSet(comparator) {
      this.comparator = comparator;
      this.values = [];
    }

    SortedSet.prototype.insert = function(value) {
      this.values = insert(value, this.comparator, this.values);
    };

    SortedSet.prototype.indexOf = function(value) {
      return find(value, this.values, this.comparator);
    };

    SortedSet.prototype.size = function() {
      return this.values.length;
    };

    return SortedSet;
  }());

  var Utils = {
    copyProperties : function(source, dest) {
      for (var k in source) {
        if (source.hasOwnProperty(k)) {
          dest[k] = source[k];
        }
      }
    },
    isArray : function(testObject) {
      return testObject && !(testObject.propertyIsEnumerable('length'))
          && typeof testObject === 'object' && typeof testObject.length === 'number';
    },
    stringComparator : function(a, b) {
      return a.localeCompare(b);
    },
    numberComparator : function(a, b) {
      if (a > b) {
        return 1;
      } else if (b > a) {
        return -1;
      } else {
        return 0;
      }
    },
    defaultComparator : function() {
      return 0;
    },
    makeComparator : function(fields, data, comparators) {
      var len = fields.length;
      var i;
      var c = [];
      for (i = 0; i < len; i++) {
	  //console.log(data,fields,i)
        var entry = data[0][fields[i]];
        var entryType = typeof entry;
        if (typeof comparators[fields[i]] === 'function'){
          c[i] = comparators[fields[i]];
        } else if (entryType === 'number') {
          c[i] = this.numberComparator;
        } else if (entryType === 'string') {
          c[i] = this.stringComparator;
        } else if (Utils.isArray(entry)) {
          c[i] = this.defaultComparator;
        } else {
          c[i] = this.defaultComparator;
        }
      }
      return function(a, b) {
        var v = 0;
        for (i = 0; i < len; i++) {
          var field = fields[i];
          v = c[i](a[field], b[field]);
          if (v !== 0) {
            return v;
          }
        }
        return 0;
      }
    }
  };

   var pivot = (function() {

    var defaultOptions = {
      extractor : null,
      comparators : {}
    };

    function extractData(data, options) {
      var extractor = options.extractor;
      if (typeof extractor === 'function') {
        var extracted = [];
        var length = data.length;
        for (var i = 0; i < length; i++) {
          //console.log("verif",data[i])
		  extracted = extracted.concat(extractor(data[i]));
        //extracted.push(extractor(data[i]));
		}
        return extracted;
      } else {
        return data;
      }
    }

  
  function buildPivotResult(data, row, cols,getValue,cumulative) {
		
// console.log("data",data, "row",row,"cols", cols);
	if(!getValue){getValue=function(a){return a}}//mapping
	
	var listTotalColumns={};
	var listTotalRows={};
    var len = data.length;
	 var dat;
	 
	 var result={};
	 for (var i = 0; i < len; i++) {
		 var indexR=[];
		var indexC=[];
        dat = data[i];
       for(var r in row){indexR.push(data[i][row[r]]);}
		for(var c in cols){indexC.push(data[i][cols[c]]);}
		indexR=indexR.join("|*");
		indexC=indexC.join("|*");
		if(!result[indexR]){result[indexR]={}}
		
		
		if(!result[indexR][indexC]){result[indexR][indexC]=[getValue(dat)]}
		else{result[indexR][indexC].push(getValue(dat))}
		
		listTotalColumns[indexC]=true;
		listTotalRows[indexR]=true;
	 }
	

   return {data:result,columns:listTotalColumns,rows:listTotalRows};
    }



  function makeHeaders(data, fieldNames){
      var result = [];
      var dataLength = data.length;
      var namesLength = fieldNames.length;
      var i,j;
      for (i=0; i<dataLength; i++){
        var datum = data[i];
        var entry = [];
        for (j=0; j<namesLength; j++){
          entry[j] = datum[fieldNames[j]];
        }
        result[i] = entry;
      }
      return result;
    }

	function toFenix(FX, rowNames, columnNames, userOptions)
	{
		var data=[];
		
		for(var i in FX.data)
		{
			//if(i>1000)break;
			var tmp={}
			for(var j in FX.metadata.dsd.columns){tmp[FX.metadata.dsd.columns[j].id]=FX.data[i][j];}
			data.push(tmp);
		}
		var result={data:[],metadata:{dsd:{columns:[]}}}
		var pivotdata=pivotData(data, rowNames, columnNames, userOptions);
		for (var i in pivotdata.data)
		{
			var temp=i.split("|*");
			for (var j in pivotdata.columns){
				if(pivotdata.data[i][j]){
					temp.push(myfunc.getAgg(userOptions.aggregator)(pivotdata.data[i][j],myfunc.getFormater(userOptions.formater),userOptions.nbDecimal) )
				}
				else{temp.push(null);}
			}
			result.data.push(temp)
			
		}
		var traduc={}
		for(var i in FX.metadata.dsd.columns)
		{traduc[FX.metadata.dsd.columns[i].id]=FX.metadata.dsd.columns[i].title["EN"]}
		for(var i in rowNames)
		{result.metadata.dsd.columns.push({id:rowNames[i],title:{EN:traduc[rowNames[i]]}})}
		for(var i in pivotdata.columns){result.metadata.dsd.columns.push({id:i.replace(/\|\*/g,"_"),title:{EN:i.replace(/\|\*/g,"\n") },subject:"value"})}
		return result;
		
	}
	
    function pivotData(data, rowNames, columnNames, userOptions) {
      if (userOptions === undefined){userOptions = {};}
      var options = {};
      Utils.copyProperties(defaultOptions, options);
      if (userOptions) {Utils.copyProperties(userOptions, options);}
      var leftSet = new SortedSet(Utils.makeComparator(rowNames, data, options));
      var topSet = new SortedSet(Utils.makeComparator(columnNames, data, options));
	//console.log("leftSet",leftSet,"topSet",topSet)
//ONLY if we want to use an derived attributs function or a filter attribute
	//options.extractor=function(e){return e}
	if(options.extractor){data = extractData(data, options);}
	
	

      return buildPivotResult(data, rowNames, columnNames,myfunc.getGetValue(userOptions.myfunction),userOptions.cumulative);
    }

    return toFenix;
  }());

  
  
  
  return  function() {
        return{
       pivot:pivot,
		}
    };
});