"use strict";
const debug         = require('debug')('app:server:database:MongoDB:data');
const _dirname      = process.cwd();
const prod          = process.env.NODE_ENV !== 'production';
const uuid          = require('uuid');
const config        = require(_dirname + '/config');
const z             = require("zod");

const main          = require(_dirname + '/server/app/main');
const Rights        = require(_dirname + '/server/app/system/rights.js');
const rights        = new Rights();

const sentry        = require(_dirname + '/server/database/sentry.js');
const Sentry        = new sentry();

const update = z.object({
    auth:       z.boolean(),
    table:      z.string(),
    body:       z.object({}),
    query:      z.object({
        _id:        z.string().optional()
    }).optional(),
    cmd:        z.object({}).optional(),
    options:    z.object({}).optional(),
    user:       z.object({}).optional()
});

const _delete = z.object({ 
    auth:       z.boolean(),
    table:      z.string(),
    query:      z.object({}),
    user:       z.object({}).optional()
})

const findOne = z.object({ 
    auth:       z.boolean(),
    table:      z.string(),
    query:      z.object({}),
    user:       z.object({}).optional()
})

const find = z.object({
    auth:       z.boolean(),
    query:      z.object({}),
    table:      z.string(),
    sort:       z.object({}).optional(),
    skip:       z.number().optional(),
    limit:      z.number().optional(),
    user:       z.object({}).optional()
})

const count = z.object({ 
    auth:       z.boolean(),
    table:      z.string(),
    query:      z.object({}),
    user:       z.object({}).optional()
})

module.exports = class Data {
    
    constructor(  ) {

    }

    async initDb ( ) {
        try {
            const Connection        = require( _dirname + '/server/database/MongoDB/Connection.js');
            let connection          = new Connection();
            const { db, client }    = await connection.init();     
            return { db, client };
        } catch (error) {
            throw error;
        }
    }

    async closeDb ( client ) {
        client.close()
    }

    async update ( request ) {
        try{
            Sentry.addBreadcrumb({message: JSON.stringify({ query: request.query, body: request.body }), category: 'update'})

            config.debug.extend && debug('update params: ', request );

            update.parse(request)

            if ( !request.auth )
                throw 'Not Authorized'
            
            if ( config.module.useRights && !request.noCheck ) {
                const { error } = await rights.check(request, 'update')
                if ( error )
                    throw error
            }
            
            if ( request.body && !request.body._id ) {
                const id = uuid.v4();
                request.body._id    = id;
            }

            if ( request.query && request.query._id )
                request.body._id = request.query._id;

            let query   = request.query || { _id: request.body._id }

            const { db, client }    = await this.initDb();
            const res = await db.collection(request.table).updateOne(
                query, 
                request.cmd ? request.cmd : { $set: 
                    request.body || {}
                },
                request.options || { upsert: true }
            );

            if ( res.acknowledged ) {
                const result = await db.collection(request.table).findOne(
                    { _id: query._id }
                )
                this.closeDb( client );
                return { data: result, inserted: res.upsertedId ? true : false, updated: res.modifiedCount > 0 ? true : false, matched: res.matchedCount > 0 ? true : false }
            }

            this.closeDb( client );

            throw 'Save abort'
        } 
        catch (error) {
            Sentry.captureException(error);
            return { error };
        }
    }

    async delete ( request ) {
        try{
            Sentry.addBreadcrumb({message: JSON.stringify({ query: request.query }), category: 'delete'})

            config.debug.extend && debug('delete params: ', request );

            _delete.parse(request)

            if ( !request.auth )
                throw 'Not Authorized'

            if ( config.module.useRights && !request.noCheck ) {
                const { error } = await rights.check(request, 'delete')
                if ( error )
                    throw error
            }

            if ( Object.keys(request.query).length === 0 )
                throw 'Query Empty'

            const { db, client }     = await this.initDb();
            const item = await db.collection(request.table).findOne(
                request.query
            )
            const res = await db.collection(request.table).deleteOne(
                request.query
            );
            this.closeDb( client );

            if ( res.acknowledged )
                return { data: true, deletedCount: res.deletedCount, query: request.query, deletedId: item._id }

            throw res
        } 
        catch (error) {
            Sentry.captureException(error);
            return { error };
        }
    }

    async findOne ( request ) {
        try {
            Sentry.addBreadcrumb({message: JSON.stringify({ query: request.query }), category: 'findOne'})

            config.debug.extend && debug('findOne params: ', request );

            findOne.parse(request)

            if ( !request.auth )
                throw 'Not Authorized'

            if ( config.module.useRights && !request.noCheck ) {
                const { error } = await rights.check(request, 'find')
                if ( error )
                    throw error
            }

            const { db, client }     = await this.initDb();
            const result = await db.collection(request.table).findOne(
                request.query,
                {
                    projection: request.project || {}
                }
            )
            
            const count = await db.collection(request.table).count();
            this.closeDb(client);

            return { data: result, total: count }
        } 
        catch (error) {
            Sentry.captureException(error);
            return { error };
        }
    }

    async find ( request ) {
        try {
            Sentry.addBreadcrumb({message: JSON.stringify({ query: request.query }), category: 'find'})

            config.debug.extend && debug('find params: ', request );

            if ( !request.auth )
                throw 'Not Authorized'

            if ( config.module.useRights && !request.noCheck ) {
                const { error } = await rights.check(request, 'find')
                if ( error )
                    throw(error)
            }
            
            const { db, client }     = await this.initDb();

            const result = await db.collection(request.table).find(
                request.query
            )
            .project( request.project || {} )
            .sort( request.sort || null )
            .skip( request.skip || 0 )
            .limit( request.limit || 0 )
            .toArray();
            
            const count = await db.collection(request.table).countDocuments(
                request.query
            );

            this.closeDb(client);

            return { data: result, total: count }
        } 
        catch (error) {
            Sentry.captureException(error);
            return { error };
        }
    }

    async count ( request ) {
        try {
            Sentry.addBreadcrumb({message: JSON.stringify({ query: request.query }), category: 'count'})

            config.debug.extend && debug('count params: ', request );

            count.parse(request);

            if ( !request.auth )
                throw 'Not Authorized'

            if ( config.module.useRights && !request.noCheck ) {
                const { error } = await rights.check(request, 'count')
                if ( error )
                    throw error
            }

            const { db, client }     = await this.initDb();
            const count = await db.collection(request.table).countDocuments(
                request.query
            );   
            this.closeDb(client);

            return { data: result }
        } catch (error) {
            Sentry.captureException(error);
            return { error };
        }
    }
}