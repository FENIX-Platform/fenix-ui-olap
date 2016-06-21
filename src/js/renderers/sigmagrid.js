/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'loglevel',
    'fx-olap/config/errors',
    'fx-olap/config/events',
    'fx-olap/config/config',
    'fx-common/pivotator/start',
    'text!fx-olap/html/renderers/sigmagrid.hbs',
    'fx-olap/config/renderers/sigmagrid',
    'handlebars',
    'gt_msg_grid',
    'amplify'
], function ($, _, log, ERR, EVT, C, Pivotator, templates, sigmagridConfig, Handlebars) {

    'use strict';
var mygrid;
var idj=0;
    var s = {
        TABLE_HEADER : '[data-role="header"]'
    };

    function Sigmagrid(o) {
        log.info("FENIX Sigmagrid");
        log.info(o);

        $.extend(true, this, C, o);

        var valid = this._validateInput();

        if (valid === true) {

            this._initVariables();

            this._bindEventListeners();

            this._renderSigmagrid(this.pivotatorConfig);

            return this;

        } else {
            log.error("Impossible to create Sigmagrid");
            log.error(valid)
        }
    }

    // API

    /**
     * pub/sub
     * @return {Object} Sigmagrid instance
     */
    Sigmagrid.prototype.on = function (channel, fn) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: this, callback: fn});
        return this;
    };

    Sigmagrid.prototype.update = function (config) {

        this._renderSigmagrid(config);

    };

    Sigmagrid.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {return false;        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    // end API

    Sigmagrid.prototype._validateInput = function () {

        var valid = true,
            errors = [];

        return errors.length > 0 ? errors : valid;

    };

    Sigmagrid.prototype._initVariables = function () {

        //pub/sub
        this.channels = {};

        this.pivotator = new Pivotator();

        //set Chart id
        if (!this.id) {

            window.fx_olap_id >= 0 ? window.fx_olap_id++ : window.fx_olap_id = 0;
            this.id = String(window.fx_olap_id);
            log.info("Set signagrid id to: " + this.id);
        }

        this.$el = $(this.el);

    };

    Sigmagrid.prototype._bindEventListeners = function () {

        //amplify.subscribe(this._getEventName(EVT.SELECTOR_READY), this, this._onSelectorReady);

    };

    Sigmagrid.prototype._renderSigmagrid = function (obj) {
		//console.log("_renderSigmagrid", obj)
        var model = this.model,
            dsOption = {fields: [], recordType: 'array', data: model.data},
            colsOption = [],
            colstemp = this.pivotator.toTree(model.cols2, 'colspan'),
            colstempL = this.pivotator.toTree(model.cols2label, 'colspan');
			var hidden2={};
			for(var i in obj.hidden){hidden2[obj.hidden[i]]=true}

        // create sigmagrid config
        for (var i in model.rowname) {
			//console.log(model,obj)
            if (model.rowname.hasOwnProperty(i)) {
				//var b=Math.random()>0.5;

                colsOption.push( {
                    id: model.rowname[i].id,
                    header: model.rowname[i].title[this.lang],
                    frozen: true,
					//hidden:b,
					hidden:hidden2.hasOwnProperty(model.rowname[i].id),
					//hidden:hidden2.hasOwnProperty(model.rowname[i].id),
				//hidden:hidden2.hasOwnProperty(model.rowname[i].id),
                    grouped: obj.groupedRow
                });
                dsOption.fields.push({name: model.rowname[i].id});
            }
        }


		    // hiddenCol
      /*  for (var i in obj.hidden) {
			console.log("hidden",i,obj)
            //if (model.rowname.hasOwnProperty(i)) {
                colsOption.push( {
                    id: obj.hidden[i],
                    header:  obj.hidden[i],

					hidden:false

                });
				console.log("tet iden",obj.hidden[i])
                dsOption.fields.push({name:  obj.hidden[i]});
            //}
        }*/




		//console.log("OBJ",obj,colstemp)

        for (var i in colstemp) {

            if (obj.values.length > 1  || obj.columns.length ==0) {
				//console.log("cas1")

                //for(var v in optGr.VALS){
                if (i == colstemp.length - 1) {
                    for (var j in colstemp[i]) {
                        //console.log("test",optGr.VALS)
                        for (var v in obj.values) {
							var titleV;
							if(v==0){titleV="value"}else{titleV=obj.values[v].replace(/.*\|\*/g, "")/*.replace("\W", "_")*/}
                            colsOption.push({
                                id: colstemp[i][j].id.replace(/\W/g, "_") + "_" +obj.values[v].replace(/\|\*/g, "_").replace(/\W/g, "_")
								,
                                header: colstempL[i][j].id.replace(/_/g, "\n") + "\n" + titleV

                            });
                            //dsOption.fields.push({name: colstemp[i][j].id + "_" + obj.values[v]});
                        dsOption.fields.push({name: colstemp[i][j].id.replace(/\W/g, "_") + "_" +obj.values[v].replace(/\|\*/g, "_").replace(/\W/g, "_")});

						}
                    }
                }
                //}
            }
            else {
//console.log("cas2",colstemp[i])
                if (i == colstemp.length - 1) {
                    for (var j in colstemp[i]) {
                        colsOption.push({
                            id: colstemp[i][j].id.replace(/\W/g, "_"),
                            header: colstempL[i][j].id.replace(/_/g, "\n")/*.replace(/\W/g, "_")*/,

                        });
                        dsOption.fields.push({name: colstemp[i][j].id.replace(/\W/g, "_")});

                    }
                }
            }

        }


idj++;
        var gridOption = $.extend(true, {}, sigmagridConfig, {
            id: this.id + "_" + this.id+idj,
            dataset: dsOption,
         //   customHead : 'myHead1',
            columns: colsOption,
            container: this.id + "_" + this.id+idj
        });


      //  Sigma.destroyGrids();
		mygrid=null;
        //	console.log($el,id)

        this.$el.find(".datagrid").remove();
        //this.$el.find(".datagrid").empty();
        //$("#" + this.id + "_" + this.id+idj).empty();

        this.$el.append("<div id='" + this.id + "_" + this.id+idj + "' class='datagrid' />");
		    //console.log("gridOption", gridOption)

         mygrid = new Sigma.Grid(gridOption);
        	//Sigma.Util.onLoad(

        Sigma.Grid.render(mygrid)();
		//mygrid.reload();
		//);

        this._trigger("ready");

        return model;

    };

    Sigmagrid.prototype._createOlapHeader = function (model, obj, colstemp) {

        var headerModel = {};
        headerModel.rowname = model.rowname.slice(0);
        headerModel.rowSpan = obj.columns.length;
        headerModel.columnHead = {};
        headerModel.columnTail = [];
        headerModel.columnHead=colstemp.slice(0)[0];
        headerModel.columnTail=colstemp.slice(1);

        var templ = Handlebars.compile($(templates).find(s.TABLE_HEADER)[0].outerHTML);

        return templ(headerModel);
    };

    Sigmagrid.prototype._populateData = function (type, model, config) {
        /*switch (type.toLowerCase()) {
            //add type process
            case "heatmap":
                break;
            case "boxplot":
                //console.log(model.data);
                //	console.log(jStat(model.data).quartiles());

                var tempData = [];
                for (var i in model.rows) {
                    //if (i >20) {break;}
                    config.xAxis.categories.push(model.rows[i].join("_"));
                    // config.xAxis.categories.push("test"+i);

                    var ddata = [jStat(model.data[i]).min() + 0].concat(jStat(model.data[i]).quartiles().concat(jStat(model.data[i]).max()))
                    //console.log("JSTAT",ddata)
                    tempData.push(ddata);

                }

                config.series.push({data: tempData});

                break;
            default:

                for (var ii in model.cols) {

                    if (model.cols.hasOwnProperty(ii)) {
                        i = model.cols[ii];

                        config.xAxis.categories.push(i.title[this.lang]);

                    }
                }

                for (var i in model.rows) {
                    if (i > 20) {
                        break;
                    }
                    //	 console.log("1 ",config.series)
                    config.series.push({
                        name: model.rows[i].join(" "),
                        data: model.data[i]
                    });
                    //	 console.log("2 ",config.series)

                }
                ;
        }*/
        return config;
    };

    Sigmagrid.prototype._getEventName = function (evt) {

        return this.id.concat(evt);

    };

    //disposition
    Sigmagrid.prototype._unbindEventListeners = function () {

        //amplify.unsubscribe(this._getEventName(EVT.SELECTOR_READY), this._onSelectorReady);

    };

    Sigmagrid.prototype.dispose = function () {

        //this.chart.dispose(); change in highchart destroy

        //unbind event listeners
        this._unbindEventListeners();

    };

    // utils

    return Sigmagrid;
});