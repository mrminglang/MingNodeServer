const Config = require('./lib/config');
const logger = require('./lib/logger');
const Taf = require('@taf/taf-rpc');

/*
 @author:jerrewu
 @date:2017-03-08
 @description:服务启动
 */
function startServer() {
    const MingApp = require('./jce/MingNodeServerImp').MingApp;
    const svr = new Taf.server();
    svr.initialize(process.env.TAF_CONFIG || './server.local.conf', (server) => {
        server.addServant(MingApp.MingNodeServerImp, `${server.Application}.${server.ServerName}.MingNodeServerObj`);
        logger.data.info('start server succ', process.pid);
    });

    svr.start();
}


/*
 @author:jerrewu
 @date:2016-04-22
 @description:拉取服务的taf配置顶
 */
function loadConfig() {
    Config.loadConfig('MingNodeServer.conf', 'c').then((configData) => {
        logger.data.info('configData', configData);
        // console.log(configData);
        global.CONFIG = configData;
        startServer();
        logger.data.info('start server succ');
    }).fail((err) => {
        logger.error.error('start server error', err);
    }).done();
}

loadConfig();
