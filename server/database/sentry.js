"use strict";
const _dirname  = process.cwd()
const config    = require( _dirname + "/config");
const debug     = require('debug')('app:server:database:main');
const Sentry    = require("@sentry/node");

const SentryIO            = require("@sentry/node");

if ( config.sentryDSN ) {
    SentryIO.init({
        ...{
            dsn: config.sentryDSN,
            tracesSampleRate: 1.0,
        },
        ...config.sentryOptions
    });
}

module.exports = class Sentry { 
        
        constructor(  ) {
            
        }

        async error ( err, ctx ) {
            if ( config.sentryDSN )
                SentryIO.withScope(scope => {
                    scope.setSDKProcessingMetadata({ request: ctx.request });
                    SentryIO.captureException(err);
                });
        }

        async captureException ( error ) { 
            if ( config.sentryDSN )
                SentryIO.captureException(error);
        }

        async addBreadcrumb ( data ) { 
            //{
            //    type: "debug",
            //    level: "fatal", "critical", "error", "warning", "log", "info", "debug"
            //    category: free text,
            //    message: free text,
            //}
            if ( config.sentryDSN )
                SentryIO.addBreadcrumb({
                    type: data.debug || "query",
                    level: data.info || "info",
                    category: data.category || "",
                    message: data.message || "no message"
                });
        }
        
}