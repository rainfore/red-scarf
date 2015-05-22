#!/usr/bin/env node

var fs = require('fs');
var ejs = require('ejs');

/**
 * @function build 通过`tag`生成单个文档
 * @param {string} category 分类
 * @param {string} tag 当前tag
 * @return {void}
 */
function build(route, data, template) {
    // 组织模板数据
    data.route = route;
    data.relativePath = '';

    var path = 'index';
    if(route.tag) {
        path = 'tags/' + route.tag.name;
        data.relativePath = '../';
    }

    // 渲染HTML文件
    var tpl = template.head + template.body + template.foot;
    var html = ejs.render(tpl, data);

    // console.log(__dirname + '/../public/' + path + '.html');
    fs.writeFileSync(__dirname + '/../public/' + path + '.html', html, {encoding: 'utf8', mode: 0644});
}

module.exports = build;