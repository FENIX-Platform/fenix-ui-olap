(function($){
            function pagerFilter(data){
                if ($.isArray(data)){    // is array  
                    data = {  
                        total: data.length,  
                        rows: data  
                    }  
                }
                var target = this;
                var tg = $(target);  
                var state = tg.data('treegrid');
                var opts = tg.treegrid('options');  
                if (!state.allRows){
                    state.allRows = data.rows;
                }
                if (!opts.remoteSort && opts.sortName){
                    var names = opts.sortName.split(',');
                    var orders = opts.sortOrder.split(',');
                    state.allRows.sort(function(r1,r2){
                        var r = 0;
                        for(var i=0; i<names.length; i++){
                            var sn = names[i];
                            var so = orders[i];
                            var col = $(target).treegrid('getColumnOption', sn);
                            var sortFunc = col.sorter || function(a,b){
                                return a==b ? 0 : (a>b?1:-1);
                            };
                            r = sortFunc(r1[sn], r2[sn]) * (so=='asc'?1:-1);
                            if (r != 0){
                                return r;
                            }
                        }
                        return r;
                    });
                }
                var topRows = [];
                var childRows = [];
                $.map(state.allRows, function(row){
                    row._parentId ? childRows.push(row) : topRows.push(row);
                    row.children = null;
                });
                data.total = topRows.length;
                var pager = tg.treegrid('getPager');
                pager.pagination('refresh', {
                    total: data.total,
                    pageNumber: opts.pageNumber
                });
                opts.pageNumber = pager.pagination('options').pageNumber || 1;
                var start = (opts.pageNumber-1)*parseInt(opts.pageSize);  
                var end = start + parseInt(opts.pageSize);  
                data.rows = topRows.slice(start, end).concat(childRows);
                return data;
            }
 
            var appendMethod = $.fn.treegrid.methods.append;
            var removeMethod = $.fn.treegrid.methods.remove;
            var loadDataMethod = $.fn.treegrid.methods.loadData;
            $.extend($.fn.treegrid.methods, {
                clientPaging: function(jq){
				
                    return jq.each(function(){
                        var tg = $(this);
                        var state = tg.data('treegrid');
                        var opts = state.options;
                        opts.loadFilter = pagerFilter;
                        var onBeforeLoad = opts.onBeforeLoad;
                        opts.onBeforeLoad = function(row,param){
                            state.allRows = null;
                            return onBeforeLoad.call(this, row, param);
                        }
                        var pager = tg.treegrid('getPager');
                        pager.pagination({
                            onSelectPage:function(pageNum, pageSize){
                                opts.pageNumber = pageNum;
                                opts.pageSize = pageSize;
                                pager.pagination('refresh',{
                                    pageNumber:pageNum,
                                    pageSize:pageSize
                                });
                                tg.treegrid('loadData',state.allRows);
                            }
                        });
						
                        tg.treegrid('loadData', state.data);
                        if (opts.url){
                            tg.treegrid('reload');
                        }
                    });
                },
                loadData: function(jq, data){
                    jq.each(function(){
                        $(this).data('treegrid').allRows = null;
                    });
					console.log("loadDataMethod", jq, data);
                    return loadDataMethod.call($.fn.treegrid.methods, jq, data);
                },
                append: function(jq, param){
                    return jq.each(function(){
                        var state = $(this).data('treegrid');
                        if (state.options.loadFilter == pagerFilter){
                            $.map(param.data, function(row){
                                row._parentId = row._parentId || param.parent;
                                state.allRows.push(row);
                            });
                            $(this).treegrid('loadData', state.allRows);
                        } else {
                            appendMethod.call($.fn.treegrid.methods, $(this), param);
                        }
                    })
                },
                remove: function(jq, id){
                    return jq.each(function(){
                        if ($(this).treegrid('find', id)){
                            removeMethod.call($.fn.treegrid.methods, $(this), id);
                        }
                        var state = $(this).data('treegrid');
                        if (state.options.loadFilter == pagerFilter){
                            for(var i=0; i<state.allRows.length; i++){
                                if (state.allRows[i][state.options.idField] == id){
                                    state.allRows.splice(i,1);
                                    break;
                                }
                            }
                            $(this).treegrid('loadData', state.allRows);
                        }
                    })
                },
                getAllRows: function(jq){
                    return jq.data('treegrid').allRows;
                }
            });
 
        })(jQuery);
	