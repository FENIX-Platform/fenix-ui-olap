/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'loglevel',
    'fx-olap/config/errors',
    'fx-olap/config/events',
    'fx-olap/config/config',
    'fx-olap/config/renderers/bootstrap-table',
    'bootstrap-table',
    'amplify'
], function ($, _, log, ERR, EVT, C, Pivotator, Config) {

    'use strict';

    function BootstrapTable(o) {
        log.info("FENIX BootstrapTable");
        log.info(o);

        $.extend(true, this, C, o);

        var valid = this._validateInput();

        if (valid === true) {

            this._initVariables();

            this._bindEventListeners();

            this._renderTable(this.pivotatorConfig);

            return this;

        } else {
            log.error("Impossible to create BootstrapTable");
            log.error(valid)
        }
    }

    // API

    /**
     * pub/sub
     * @return {Object} component instance
     */
    BootstrapTable.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    BootstrapTable.prototype.update = function (config) {

        this._renderTable(config);

    };

    BootstrapTable.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {return false;        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    // end API

    BootstrapTable.prototype._validateInput = function () {

        var valid = true,
            errors = [];

        return errors.length > 0 ? errors : valid;

    };

    BootstrapTable.prototype._initVariables = function () {

        //pub/sub
        this.channels = {};

        this.pivotator = new Pivotator();

        //set Chart id
        if (!this.id) {

            window.fx_table_id >= 0 ? window.fx_table_id++ : window.fx_table_id = 0;
            this.id = String(window.fx_table_id);
            log.warn("Impossible to find table id. Set auto id to: " + this.id);
        }

        this.$el = $(this.el);

    };

    BootstrapTable.prototype._bindEventListeners = function () {

        //amplify.subscribe(this._getEventName(EVT.SELECTOR_READY), this, this._onSelectorReady);

    };

    BootstrapTable.prototype._renderTable = function (obj) {

        console.log(obj)

        //RENDER TABLE HERE
        // ----> http://bootstrap-table.wenzhixin.net.cn/

        this._trigger("ready");

        return obj;

    };

    BootstrapTable.prototype._getEventName = function (evt) {

        return this.id.concat(evt);

    };

    //disposition
    BootstrapTable.prototype._unbindEventListeners = function () {

        //amplify.unsubscribe(this._getEventName(EVT.SELECTOR_READY), this._onSelectorReady);

    };

    BootstrapTable.prototype.dispose = function () {

        //this.chart.dispose(); change in highchart destroy

        //unbind event listeners
        this._unbindEventListeners();

    };

    // utils

    return BootstrapTable;
});