"use strict";
const debug         = require('debug')('app:server:database:MongoDB:Data');
const _dirname      = process.cwd();
const prod          = process.env.NODE_ENV !== 'production';
const uuid          = require('uuid');

module.exports = class Data {
    
    constructor(  ) {

    }

    async initDb ( ) {
        const Connection        = require( _dirname + '/server/database/MongoDB/Connection.js');
        let connection          = new Connection();
        const db                = await connection.init();     
        return db;
    }

    
    async update ( request ) {
        debug('update params: ', request );
        try{
            const db = await this.initDb();
            
            if ( request.body && request.body._id ) {
                if ( !request.query )
                    request.query = {}

                request.query._id = request.body._id;
            } else {
                const id = uuid.v4();
                console.error('No _id found in body generate ID: ', id);
                request.body._id    = id;
            }

            const res = await db.collection(request.table).updateOne(
                request.query || { _id: request.body._id }, 
                { $set: 
                    request.body || {}
                },
                request.options || { upsert: true }
            );

            if ( res.acknowledged ) {
                const result = await db.collection(request.table).findOne(
                    { _id: request.body._id }
                );

                return { data: result, inserted: res.upsertedId ? true : undefined }
            }

            throw({ error: 'Fehler beim Speichern' })
        } 
        catch (error) {
            console.error(error);
            return error
        }
    }

    async delete ( request ) {
        debug('delete params: ', request );
        try{
            const db = await this.initDb();

            if ( !request.query || Object.keys(request.query).length === 0 )
                throw('No query found')

            const res = await db.collection(request.table).deleteOne(
                request.query
            );

            if ( res.acknowledged )
                return { data: res.deletedCount }

            throw(res)
        } 
        catch (error) {
            console.error(error);
            return error
        }
    }

    async findOne ( request ) {
        debug('findOne params: ', request );
        const db = await this.initDb();

        const result = await db.collection(request.table).findOne(
            request.query
        );

        return { data: result }
    }

    async find ( request ) {
        debug('find params: ', request );
        const db = await this.initDb();

        const result = await db.collection(request.table).find(
            request.query
        ).toArray();

        return { data: result }
    }

    async count ( request ) {
        debug('count params: ', request );
        const db = await this.initDb();

        const result = await db.collection(request.table).count(
            request.query
        );

        return { data: result }
    }
    
}