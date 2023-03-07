/**
 * Created by jerrewu on 2015/4/21.
 */

/** **几种打log方式的主要场景
 * debug模块：适用开发的时候打印数据。方便本地调试的时候，对日志filter，并不需要在服务器上展示出来。但是如果确实有需要临时展示，可能通过改taf日志级别来实现。
 * console.log:适用次要log。无法filter，主要用于本地调试和服务器上没有必要持久存储的log
 *logger.error.error: 适用于比较重要的error log，会在服务器存储一段时间
 *logger.data.debug: 适用于比较重要的data log，会在服务器存储一段时间
 *
 * logger.error和logger.data两个日志方式是一样的，只不过文件名不一样。
 *一般的不需要创建远程log，如果确实有需要，请自行创建。例如本js的logger.access_log。会永久存储log.
 */

const TafLogs = require('@taf/taf-logs');

class Logger {
    constructor() {
        /* 错误日志存在本地就可以了，没有必要存远程。error是文件名
        var logger = require("./logger");
        logger.error.error("xxxx");
        */
        this.error = new TafLogs('TafDate', 'error');

        /* 关键的数据日志，希望保存几天的。data是文件名
       var logger = require("./logger");
       logger.data.debug("xxxx"); logger.data.warn("xx")等
       */
        this.data = new TafLogs('TafDate', 'data');
        this.dataError = new TafLogs('TafDate', 'dataError');

        /**
         * 进入请求日志
         */
        this.incoming = new TafLogs('TafDate', 'incoming');
    }
}

module.exports = new Logger();
