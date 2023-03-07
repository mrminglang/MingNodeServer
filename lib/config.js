const config = {};
const Q = require('q');
const ConfigParser = require('@taf/taf-utils').Config;

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

config.loadConfig = function loadConfig(filename, configFormat) {
    const dfd = Q.defer();
    if (process.env.TAF_CONFIG) {
        // 代表不是本地应用
        const tafConfigHelper = require('@taf/taf-config');
        const helper = new tafConfigHelper();

        helper.loadConfig(filename, configFormat).then((data) => {
            data = parseConf(data, configFormat);
            dfd.resolve(data);
        },
        (err) => {
            dfd.reject(`loadConfig file error ${err.toString()}`);
        });
    } else {
        const fs = require('fs');
        fs.readFile(filename, {
            encoding: 'utf-8',
        },
        (err, data) => {
            if (err) {
                dfd.reject(err);
            } else {
                data = parseConf(data, configFormat);
                dfd.resolve(data);
            }
        });
    }
    return dfd.promise;
};

module.exports = config;
