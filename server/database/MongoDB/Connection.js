"use strict";
const _dirname  = process.cwd()
const config    = require( _dirname + "/config")
const debug     = require('debug')('app:server:database:MongoDB:connection')
let DB          = null
let Client      = null

module.exports = {
    init,
    initNew
}
async function  init () { 
    try {
        if (DB)
            return { db: DB,  client: { close: () => { console.log('MongoDB: client is debrecated' ) } } }
        
        if (!DB && Client)
            Client.close()

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

        Client            = new MongoClient(
            url,
            {
                readPreference:     ReadPref.NEAREST,
                w:                  'majority'
            }
        );

        // Database Name
        const dbName            = config.database.name || 'defaultDb';

        await Client.connect();
        const db                = Client.db(dbName);

        DB = db
        return { db: DB, client: { close: () => {console.log('MongoDB: client is debrecated' ) } } };
    } catch (error) {
        debug(error)
        throw error ;
    }
}

async function  initNew () { 
    return this.init()
}