/**
 * Created by YouHan on 2016/5/12.
 */
'use strict';
(function () {
    var utils = require('./../utils/utils');


    function abstract() {
        var me = this;
        me.child = function (value) {
            if (!value) {
                throw TypeError('no child name!');
            }
            var child = new abstract();
            if (me.name.length > 0) {
                for (var i = 0, ii = me.name.length; i < ii; i++) {
                    child.name.push(me.name[i]);
                }
                child.name.push(value);
                child.ws = me.ws;
            }
            return child;
        };
        me.value = function (value) {
            if (value) {
                this.ws.update(this.name, value);
            } else {
                this.ws.get(this.name);
            }
        };
        me.on = function (name, handler) {
            if (name === 'change') {
                this.ws.listen(me.path, handler);
            } else {
                throw TypeError('no such event');
            }
        };
        me.name = [];

        return this;
    }

    /**
     * @example
     * var s = new ws('ws://localhost:8080');
     * s.on('open', function(cb){
     *      //do something
     * })
     * .on('message', function(cb){
     *      //do something
     * })
     * .on('close', function(cb){
     *      //do something
     * })
     *
     *
     * set or get data
     * s.child('location').value()
     * data change
     * s.child('location').on('change', function(){
     *      //do something
     * })
     *
     * @param uri
     * @returns {abstract}
     */

    function ws(uri) {
        if (uri) {
            var me = this;
            var result = new abstract();
            var socket = me.socket = new WebSocket(uri);
            me.data = {};
            socket.onopen = function (e) {
                //TODO
                if (e && e.data) {
                    me.data = e.data;
                }
                if (me.onopen) {
                    me.onopen(arguments);
                }
                return this;
            };
            socket.onmessage = function (e) {
                if (e && e.data) {
                    me.data = e.data;
                }
                if (me.onmessage) {
                    me.onmessage(arguments);
                }
                return this;
            };
            socket.onclose = function (e) {
                if (me.onclose) {
                    me.onclose(arguments);
                }
                return this;
            };
            result.ws = me;
            return result;
        }
    }

    ws.on = function (name, handler) {
        if (name && cb) {
            this['on' + name] = handler;
        }
    };

    ws.update = function (path, value) {
        //TODO validate
        var temp = this.data;
        if (path.length > 0) {
            for (var i = 0, ii = path.length - 1; i < ii; i++) {
                temp = temp[i];
            }
            temp[path[path.length - 1]] = value;
        } else {
            this.data = value;
        }
        this.socket.send(this.data);
    };

    ws.listen = function (path, handler) {
        //TODO
    };

    ws.get = function (path) {
        var result = null;
        for (var i = 0, ii = path.length; i < ii; i++) {
            result = this.data[path[i]];
        }
        return result;
    };


    function getDataByName(data, path) {
        var result = data;
        try {
            if (path.length > 0 && data) {
                for (var i = 0, ii = path.length - 1; i < ii; i++) {
                    result = data[path[i]];
                }
            }
        } catch (e) {
            throw TypeError('error to find data by path' + e);
        }
        return result;
    }


    module.exports.ws = ws;
})();