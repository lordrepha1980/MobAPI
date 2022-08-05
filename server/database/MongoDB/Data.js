"use strict";
const _dirname  = process.cwd();

module.exports = class Data {
    
    constructor(  ) {
        this.coll       = null
    }

    async initDb ( ) {
        const Connection    = require( _dirname + '/server/database/MongoDB/Connection.js');
        let connection      = new Connection();
        const db             = await connection.init();     
        return db;
    }

    
    async update ( ctx ) {
        console.log('request params: ', ctx.params, ctx.request.query);
        const db = await this.initDb();

        const result = await db.collection(ctx.params.table).updateOne(
            { _id: '1'}, 
            { $set: 
                { _id: '1', text: 'first entry' }
            },
            { upsert: true }
        );
    }

    async findOne ( ctx ) {
        console.log('request params: ', ctx.params, ctx.request.query);
        const db = await this.initDb();

        const result = await db.collection(ctx.params.table).findOne(
            ctx.request.query
        );

        return result
    }

    async find ( ctx ) {
        console.log('request params: ', ctx.params, ctx.request.query);
        const db = await this.initDb();

        const result = await db.collection(ctx.params.table).find(
            ctx.request.query
        ).toArray();

        return result
    }
    
}