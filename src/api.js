/**
 * Created by YouHan on 2016/9/18.
 */

"use strict";

var api = {
    get: get,
    post: post,
    patch: patch,
    del: del
};

function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return '?' + str.join("&");
}

function get(option) {
    return new Promise(function (resolver, rejector) {
        var xhr = new XMLHttpRequest();
        var url = option.url;
        if (option.params) {
            url += serialize(option.params);
        }
        xhr.open('GET', url, true);
        xhr.send();

        xhr.onerror = function (error) {
            rejector(error);
        };
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolver(JSON.parse(xhr.responseText));
            }
        };
        xhr.onabort = function (error) {
            rejector(error);
        };

    });
}

function post(option) {
    return _basic(option, 'POST');
}

function patch(option) {
    return _basic(option, 'PATCH');
}


function del(option) {
    return new Promise(function (resolver, rejector) {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', option.url, true);
        xhr.send();

        xhr.onerror = function (error) {
            rejector(error);
        };
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolver(JSON.parse(xhr.responseText));
            }
        };
        xhr.onabort = function (error) {
            rejector(error);
        };
    });
}


function _basic(option, method) {
    return new Promise(function (resolver, rejector) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, option.url, true);
        xhr.setRequestHeader('Content-Type', option.contentType || 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(option.data));

        xhr.onerror = function (error) {
            rejector(error);
        };
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolver(JSON.parse(xhr.responseText));
            }
        };
        xhr.onabort = function (error) {
            rejector(error);
        };
    });
}


module.exports = api;