/**
 * Created by YouHan on 2016/9/18.
 */
'use strict';

var basic = {
    extend: extend,
    baseExtend: baseExtend,
    isObject: isObject,
    isFunction: isFunction,
    isDate: isDate,
    isNumber: isNumber,
    isBlob: isBlob,
    isWindow: isWindow,
    isBoolean: isBoolean,
    isPromiseLike: isPromiseLike,
    isString: isString,
    isBlankObject: isBlankObject
};

function extend(dst) {
    return baseExtend(dst, slice.call(arguments, 1), false);
}

function baseExtend(dst, objs, deep) {
    var h = dst.$$hashKey;

    for (var i = 0, ii = objs.length; i < ii; ++i) {
        var obj = objs[i];
        if (!isObject(obj) && !isFunction(obj)) continue;
        var keys = Object.keys(obj);
        for (var j = 0, jj = keys.length; j < jj; j++) {
            var key = keys[j];
            var src = obj[key];

            if (deep && isObject(src)) {
                if (isDate(src)) {
                    dst[key] = new Date(src.valueOf());
                } else {
                    if (!isObject(dst[key])) dst[key] = Array.isArray(src) ? [] : {};
                    baseExtend(dst[key], [src], true);
                }
            } else {
                dst[key] = src;
            }
        }
    }

    setHashKey(dst, h);
    return dst;
}

function isObject(arg) {
    return arg !== null && typeof arg === 'object';
}

function isFunction(arg) {
    return typeof arg === 'function';
}

function isDate(value) {
    return toString.call(value) === '[object Date]';
}

function isNumber(value) {
    return typeof value === 'number';
}

function isWindow(obj) {
    return obj && obj.window === obj;
}

function isBlob(obj) {
    return toString.call(obj) === '[object Blob]';
}

function isBoolean(value) {
    return typeof value === 'boolean';
}

function isPromiseLike(obj) {
    return obj && isFunction(obj.then);
}

function isString(value) {
    return typeof value === 'string';
}

function isBlankObject(value) {
    return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
}

function setHashKey(obj, h) {
    if (h) {
        obj.$$hashKey = h;
    } else {
        delete obj.$$hashKey;
    }
}

module.exports = basic;