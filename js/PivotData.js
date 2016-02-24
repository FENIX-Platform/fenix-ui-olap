 /*
     Data Model class
     */
define(
    function() {
	
	 var __indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item)
                return i;
        }
        return -1;
    },
            __slice = [].slice,
            __bind = function(fn, me) {return function() {return fn.apply(me, arguments);};
    },
            __hasProp = {}.hasOwnProperty;
	
	
	
        function PivotData(input, opts) {
            this.getAggregator = __bind(this.getAggregator, this);
            this.getRowKeys = __bind(this.getRowKeys, this);
            this.getColKeys = __bind(this.getColKeys, this);

            this.sortKeys = __bind(this.sortKeys, this);
            this.arrSort = __bind(this.arrSort, this);
            this.natSort = __bind(this.natSort, this);
		
		if(opts.aggregator){this.aggregator = opts.aggregator;
		}
			else{ this.aggregator = opts.aggregatorDisplay["Sum2"](["Value"]);}
         		console.log("opts.aggregator",this.aggregator);


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
                return function(record) {if (opts.filter(record)) {
				
				return _this.processRecord(record);}};
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
            if ($.isFunction(input)) {return input(addRecord);}
            else if ($.isArray(input)) {
                if ($.isArray(input[0])) {
                    _results = [];
                    for (i in input) {
                        if (!{}.hasOwnProperty.call(input, i))
                            continue;
                        compactRecord = input[i];
                        if (!(i > 0)) {
                            continue;
                        }
                        record = {};
                        _ref = input[0];
                        for (j in _ref) {
                            if (!{}.hasOwnProperty.call(_ref, j))
                                continue;
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
				console.log("esport",record,this.aggregator(this, rowKey, colKey))
                return this.tree[flatRowKey][flatColKey].push(record);
            }
        };

		
		
        PivotData.prototype.getAggregator = function(rowKey, colKey) {
            var agg, flatColKey, flatRowKey;
            /*flatRowKey = rowKey.join(String.fromCharCode(0));
             flatColKey = colKey.join(String.fromCharCode(0));*/
            flatRowKey = rowKey.join("||");
            flatColKey = colKey.join("||");
            if (rowKey.length === 0 && colKey.length === 0){agg = this.allTotal;}
            else if (rowKey.length === 0){agg = this.colTotals[flatColKey];}
            else if (colKey.length === 0){agg = this.rowTotals[flatRowKey];}
            else {agg = this.tree[flatRowKey][flatColKey];}

            return agg != null ? agg : {value: (function() {return null;}), format: function() {return "";}};
        };
        return PivotData;
    });
