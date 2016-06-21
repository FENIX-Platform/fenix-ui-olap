/*global define, amplify*/
define([
    'jquery',
    'require',
    'underscore',
    'loglevel',
    'fx-olap/config/errors',
    'fx-olap/config/events',
    'fx-olap/config/config',
    'fx-common/pivotator/start',
    'fx-common/pivotator/fenixtool',
    'handlebars',
    'amplify'
], function ($, require, _, log, ERR, EVT, C, Pivotator, FenixTool, Handlebars) {
    'use strict';

    function Olap(o) {
        log.info("FENIX Olap");
        log.info(o);

        this._registerHandlebarsHelpers();

        $.extend(true, this, C, {initial: o});

        this._parseInput(o);

        var valid = this._validateInput();

        if (valid === true) {
            this._initVariables();
            this._bindEventListeners();
            this._preloadPluginScript();
            return this;
        } else {
            log.error("Impossible to create Olap");
            log.error(valid)
        }
    }

    // API
    Olap.prototype.update = function (config) {
        this.olap.model = this.pivotator.pivot(this.model, config);
        this.olap.update(config);
    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    Olap.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    Olap.prototype._trigger = function (channel) {
        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };

    // end API

    Olap.prototype._parseInput = function () {
        this.id = this.initial.id;
        this.$el = $(this.initial.el);
        this.model = this.initial.model;

        var pc = {};
        pc.inputFormat = this.initial.inputFormat || "raw";
        pc.aggregationFn = this.initial.aggregationFn;

        pc.aggregations = this.initial.aggregations || [];
        pc.columns = this.initial.columns || [];
        pc.rows = this.initial.rows || [];
        pc.derivedAttribute = this.initial.derivedAttribute;
        // pc.hidden = this.initial.hidden||[];
        pc.values = this.initial.values || [];
        if (this.initial.hasOwnProperty("groupedRow")) {
            pc.groupedRow = this.initial.groupedRow;
        }
        else {
            pc.groupedRow = false;
        }
        pc.derived = this.initial.derived;
        pc.formatter = this.initial.formatter;
        pc.valueOutputType = this.initial.valueOutputType;
        pc.showRowHeaders = this.initial.showRowHeaders;
        pc.decimals = this.initial.decimals;

        pc.showCode = this.initial.showCode;
        pc.showFlag = this.initial.showFlag;
        pc.showUnit = this.initial.showUnit;

        // add more pivotator config
        this.pivotatorConfig = pc;
        this.type = this.initial.type || C.type;
        this.lang = this.initial.lang ||  C.lang;
        this.lang = this.lang.toUpperCase();
    };

    Olap.prototype._validateInput = function () {
        var valid = true,
            errors = [];

        //set olap id
        if (!this.id) {
            window.fx_olap_id >= 0 ? window.fx_olap_id++ : window.fx_olap_id = 0;
            this.id = String(window.fx_olap_id);
            log.info("Set table id to: " + this.id);
        }

        if (!this.$el) {
            errors.push({code: ERR.MISSING_CONTAINER});
            log.warn("Impossible to find table container");
        }

        //Check if $el exist
        if (this.$el.length === 0) {
            errors.push({code: ERR.MISSING_CONTAINER});
            log.warn("Impossible to find box container");
        }

        //add validation
        return errors.length > 0 ? errors : valid;
    };

    Olap.prototype._bindEventListeners = function () {

    };

    Olap.prototype._initVariables = function () {

        //pub/sub
        this.channels = {};

        this.pivotator = new Pivotator();
        this.fenixTool = new FenixTool();
    };

    // Preload scripts

    Olap.prototype._getPluginPath = function (name) {

        var registeredSelectors = $.extend(true, {}, this.pluginRegistry), path;
        var conf = registeredSelectors[name];
        if (!conf) {
            log.error('Registration not found for "' + name + ' plugin".');
        }

        if (conf.path) {
            path = conf.path;
        }
        else {
            log.error('Impossible to find path configuration for "' + name + ' plugin".');
        }
        return path;
    };

    Olap.prototype._preloadPluginScript = function () {
        var paths = [];
        paths.push(this._getPluginPath(this.type));
        log.info("olap path to load");
        log.info(paths);
        //Async load of plugin js source
        require(paths, _.bind(this._preloadPluginScriptSuccess, this));
    };

    Olap.prototype._preloadPluginScriptSuccess = function () {
        log.info('Plugin script loaded successfully');
        this._renderOlap();
    };

    Olap.prototype._renderOlap = function () {
        var Renderer = this._getRenderer(this.type);
//console.log("_renderOlap",this.pivotatorConfig,"initi",this.initial)
        var myPivotatorConfig = $.extend(true, {}, this.initial, this.fenixTool.parseInput(this.model.metadata.dsd, this.pivotatorConfig));

//console.log("myPivotatorConfig",myPivotatorConfig)
//console.log("OLAP",this.model, myPivotatorConfig)

        var model = this.pivotator.pivot(this.model, myPivotatorConfig);

        var config = $.extend(true, {}, {
            pivotatorConfig: myPivotatorConfig,
            model: model,
            el: this.$el,
            lang: this.lang
        });
//console.log("olap renderer",config)
        this.olap = new Renderer(config);
        this._trigger("ready");
    };

    Olap.prototype._getEventName = function (evt) {
        return this.id.concat(evt);
    };

    Olap.prototype._getRenderer = function (name) {
        return require(this._getPluginPath(name));
    };

    //disposition
    Olap.prototype._unbindEventListeners = function () {

        //amplify.unsubscribe(this._getEventName(EVT.SELECTOR_READY), this._onSelectorReady);

    };

    Olap.prototype.dispose = function () {
        this.olap.dispose();
        //unbind event listeners
        this._unbindEventListeners();
    };

    Olap.prototype._callSelectorInstanceMethod = function (name, method, opts1, opts2) {
        var Instance = this.olap;
        if ($.isFunction(Instance[method])) {
            return Instance[method](opts1, opts2);
        }
        else {
            log.error(name + " selector does not implement the mandatory " + method + "() fn");
        }
    };

    //Utils
    Olap.prototype._registerHandlebarsHelpers = function () {

        var self = this;

        Handlebars.registerHelper('i18n', function (keyword) {
            return typeof keyword === 'object' ? keyword[self.lang.toUpperCase()] : "";
        });
    };
    return Olap;
});