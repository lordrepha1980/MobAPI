"use strict";
const _dirname  = process.cwd()
const config    = require( _dirname + "/config");
const debug     = require('debug')('app:server:database:MongoDB:connection');

module.exports = class Connection { 
        
        constructor(  ) {
            
        }

        async init() {
            try {
                const { MongoClient }   = require('mongodb');
                const ReadPref          = require('mongodb').ReadPreference;
                let url               = `${config.database.host}:${config.database.port}`;

                if ( Array.isArray(config.database.host) )
                    url               = `${config.database.host.join(`:${config.database.port},`)}:${config.database.port}`;

                if ( config.database.credentials && config.database.credentials.username && config.database.credentials.password )
                    url               = `${config.database.credentials.username}:${config.database.credentials.password}@${url}`;

                url = `mongodb://${url}/${config.database.name}`;

                if ( config.database.replicaSet )
                    url      += `/?replicaSet=${config.database.replicaSet}&w=majority`;

                config.debug.extend && debug('MongoDB Connect: ', url );

                const client            = new MongoClient(
                    url,
                    {
                        readPreference:     ReadPref.NEAREST,
                        w:                  'majority'
                    }
                );

                // Database Name
                const dbName            = config.database.name || 'defaultDb';

                await client.connect();
                const db                = client.db(dbName);
                
                return { db, client }
            } catch (error) {
                debug(error)
                throw error ;
            }
        }
        
}