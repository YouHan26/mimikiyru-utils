/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by YouHan on 2016/2/28.
	 */
	'use strict';
	__webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Created by YouHan on 2016/5/10.
	 */
	(function () {

	    var client = function () {
	        var engine = {
	            ie: 0,
	            gecko: 0,
	            webkit: 0,
	            khtml: 0,
	            opera: 0,

	            ver: null
	        };

	        var browser = {
	            ie: 0,
	            firefox: 0,
	            safari: 0,
	            kong: 0,
	            opera: 0,
	            chrome: 0,

	            ver: null
	        };


	        var ua = navigator.userAgent;
	        if (window.opera) {
	            engine.ver = browser.ver = window.opera.version();
	            engine.opera = browser.opera = parseFloat(engine.ver);
	        } else if (/AppleWebKit\/(\S+)/.test(ua)) {
	            engine.ver = RegExp['$1'];
	            engine.webkit = parseFloat(engine.ver);

	            if (/Chrome\/(\S+)/.test(ua)) {
	                browser.ver = RegExp["$1"];
	                browser.chrome = parseFloat(browser.ver);
	            } else if (/Version\/(\S+)/.test(ua)) {
	                browser.ver = RegExp["$1"];
	                browser.safari = parseFloat(browser.ver);
	            } else {
	                var safariVersion = 1;
	                if (engine.webkit < 100) {
	                    safariVersion = 1;
	                } else if (engine.webkit < 312) {
	                    safariVersion = 1.2;
	                } else if (engine.webkit < 412) {
	                    safariVersion = 1.3
	                } else {
	                    safariVersion = 2;
	                }

	                browser.safari = browser.ver = safariVersion;
	            }
	        } else if (/KHTML\/(\S+)/.test(ua) || /Kongqueror\/([^;]+)/.test(ua)) {
	            engine.ver = browser.ver = RegExp['$1'];
	            engine.khtml = browser.kong = parseFloat(engine.ver);
	        } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
	            engine.ver = RegExp['$1'];
	            engine.gecko = parseFloat(engine.ver);

	            if (/Firefox\/(\S+)/.test(ua)) {
	                browser.ver = RegExp['$1'];
	                browser.firefox = parseFloat(browser.ver);
	            }
	        } else if (/MSIE ([^;]+)/.test(ua)) {
	            engine.ver = browser.ver = RegExp('$1');
	            engine.ie = browser.ie = parseFloat(engine.ver);
	        }

	        return {
	            engine: engine,
	            browser: browser
	        }
	    }();


	    module.exports.client = client;
	})();

/***/ }
/******/ ]);