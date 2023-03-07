/*
 * 获取config, 使用这个文件一定要再获取了config之后
 */
const ConfigParser = require('@taf/taf-utils').Config;
const fs = require('fs');
const path = require('path');

function parseConf(content, configFormat) {
    let ret = content;
    if (configFormat === 'c') {
        const configParser = new ConfigParser();
        configParser.parseText(content, 'utf8');
        ret = configParser.data;
    } else if (configFormat === 'json') {
        ret = JSON.parse(content);
    }
    return ret;
}

function loadConfig(filename) {
    if (process.env.TAF_CONFIG || global.CONFIG) { // 只要是Taf环境就走global.CONFIG，提前暴露错误
        return global.CONFIG;
    }

    const data = fs.readFileSync(filename, { encoding: 'utf-8' });
    return parseConf(data, 'c');
}

const config = loadConfig(path.resolve(__dirname, '../MingNodeServer.conf'));

module.exports = config;
