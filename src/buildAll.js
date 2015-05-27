#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var build = require('./build.js');
var exec = require('child_process').exec;

/**
 * @function buildAll 生成全部文档
 * @return {void}
 */
function buildAll() {
    // 动态加载，require有缓存
    try {
    	var tags = fs.readFileSync(__dirname + '/data/tags.json', {encoding: 'utf8'});
    	tags = JSON.parse(tags);
    	var links = fs.readFileSync(__dirname + '/data/links.json', {encoding: 'utf8'});
    	links = JSON.parse(links);
    	var data = {tags: tags, links: links};
    } catch(e) {
        console.log('!!!!!!!!!!!!!! ' + e);
        return;
    }

    // 加载common中的模板
    var template = {
        head: fs.readFileSync(__dirname + '/view/head.ejs', {encoding: 'utf8'}),
        body: fs.readFileSync(__dirname + '/view/body.ejs', {encoding: 'utf8'}),
        foot: fs.readFileSync(__dirname + '/view/foot.ejs', {encoding: 'utf8'}),
    }

    // 清理文件
    var command = path.join(__dirname, '../public/tags');
    if(!fs.existsSync(command))
        fs.mkdirSync(command);

    command = 'rm "' + command + '"/*';
    console.log(command);
    exec(command, function(err, out) {
        if(err)
            console.log(err);

        // 遍历sitemap生成所有文档
        build({}, data, template);
        tags.forEach(function(category) {
            category.children.forEach(function(tag) {
                build({category: category, tag: tag}, data, template);
            })
        });
    });

}

if(!module.parent)
    buildAll();

module.exports = buildAll;
