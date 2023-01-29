#!/usr/bin/env node

var fs = require('fs');
var buildAll = require('./buildAll.js');

var callback = function(event, filename) {
    buildAll();
    console.log('buildAll: ' + new Date);
}

callback();
fs.watch(__dirname + '/data', callback);
fs.watch(__dirname + '/view', callback);