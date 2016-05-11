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