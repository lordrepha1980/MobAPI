"use strict";

const _dirname      = process.cwd();
const Data          = require(_dirname + '/server/database/MongoDB/Data.js');
const GlobalHooks   = require(_dirname + '/server/custom/system/globalHooks.js');
const DataClass     = new Data();
const debug         = require('debug')('app:server:database:MongoDB:mainTemplate');
const dayjs         = require('dayjs');
const ClassRouter   = require( _dirname + '/server/database/classRouter.js');
const mob           = new ClassRouter();
const globalHooks   = GlobalHooks();
const defaultCollection = '{{ collection }}';

{% block main %}{% endblock %}

class {{ table }} extends Data { 

    {% block methodConstructor %}
        constructor() {
            super();
        }
    {% endblock %}
    
    {% block methodUpdate %}
        async update( request ) {
            try {
                if ( !request.auth )
                    throw('Not Authorized')

                if ( request && !request.table )
                    request.table = defaultCollection

                {% block updateBefore %}{% endblock %}
                if ( globalHooks.updateBefore )
                    await globalHooks.updateBefore( { 
                        io: request.io, 
                        body: request.body, 
                        actions: request.actions,
                        user: request.ctx?.user,
                        auth: request.auth, 
                        noCheck: request.noCheck, 
                        table: request.table,
                        query: request.query,
                        ctx: request.ctx
                    } )

                const result = await super.update( request )
                {% block updateAfter %}{% endblock %}
                if ( globalHooks.updateAfter )
                    await globalHooks.updateAfter( { 
                        io: request.io, 
                        body: request.body, 
                        user: request.ctx?.user,
                        actions: request.actions,
                        auth: request.auth, 
                        noCheck: request.noCheck, 
                        table: request.table,
                        query: request.query,
                        ctx: request.ctx,
                        result
                    } )

                return result
            }
            catch (error) { 
                debug(error)
                return { error }
            }
            
        }
    {% endblock %}

    {% block methodFindeOne %}
        async findOne( request ) {
            try {
                if ( !request.auth )
                    throw('Not Authorized')
                if ( request && !request.table )
                    request.table = defaultCollection

                {% block findOneBefore %}{% endblock %}
                if ( globalHooks.findOneBefore )
                    await globalHooks.findOneBefore( { 
                        io: request.io, 
                        body: request.body, 
                        user: request.ctx?.user,
                        actions: request.actions,
                        auth: request.auth, 
                        noCheck: request.noCheck, 
                        table: request.table,
                        query: request.query,
                        ctx: request.ctx,
                    } )


                const result = await super.findOne( request )

                {% block findOneAfter %}{% endblock %}
                if ( globalHooks.findOneAfter )
                    await globalHooks.findOneAfter( { 
                        io: request.io, 
                        body: request.body, 
                        auth: request.auth, 
                        actions: request.actions,
                        user: request.ctx?.user,
                        noCheck: request.noCheck, 
                        table: request.table,
                        query: request.query,
                        ctx: request.ctx,
                        result
                    } )
                return result
            }
            catch (error) { 
                debug(error)
                return { error }
            }
        }
    {% endblock %}

    {% block methodFind %}
        async find( request ) {
            try {
                if ( !request.auth )
                    throw('Not Authorized')
                if ( request && !request.table )
                    request.table = defaultCollection

                {% block findBefore %}{% endblock %}
                if ( globalHooks.findBefore )
                    await globalHooks.findBefore( { 
                        io: request.io, 
                        body: request.body, 
                        auth: request.auth, 
                        actions: request.actions,
                        user: request.ctx?.user,
                        noCheck: request.noCheck, 
                        table: request.table,
                        query: request.query,
                        ctx: request.ctx
                    } )

                const result = await super.find( request )

                {% block findAfter %}{% endblock %}
                if ( globalHooks.findAfter )
                    await globalHooks.findAfter( { 
                        io: request.io, 
                        body: request.body, 
                        auth: request.auth, 
                        actions: request.actions,
                        user: request.ctx?.user,
                        noCheck: request.noCheck, 
                        table: request.table,
                        query: request.query,
                        ctx: request.ctx,
                        result
                    } )
                return result
            }
            catch (error) { 
                debug(error)
                return { error }
            }
        }
    {% endblock %}

    {% block methodDelete %}
        async delete( request ) {
            try {
                if ( !request.auth )
                    throw('Not Authorized')
                if ( request && !request.table )
                    request.table = defaultCollection

                {% block deleteBefore %}{% endblock %}
                if ( globalHooks.deleteBefore )
                    await globalHooks.deleteBefore( { 
                        io: request.io, 
                        body: request.body, 
                        auth: request.auth, 
                        actions: request.actions,
                        user: request.ctx?.user,
                        noCheck: request.noCheck, 
                        table: request.table,
                        query: request.query,
                        ctx: request.ctx
                    } )

                const result = await super.delete( request )

                {% block deleteAfter %}{% endblock %}
                if ( globalHooks.deleteAfter )
                    await globalHooks.deleteAfter( { 
                        io: request.io, 
                        body: request.body, 
                        auth: request.auth, 
                        actions: request.actions,
                        user: request.ctx?.user,
                        noCheck: request.noCheck, 
                        table: request.table,
                        query: request.query,
                        ctx: request.ctx,
                        result
                    } )
                return result
            }
            catch (error) { 
                debug(error)
                return { error } 
            }
        }
    {% endblock %}

    {% block methodDeleteMany %}
        async deleteMany( request ) {
            try {
                if ( !request.auth )
                    throw('Not Authorized')

                if ( request && !request.table )
                    request.table = defaultCollection

                {% block deleteManyBefore %}{% endblock %}
                if ( globalHooks.deleteManyBefore )
                    await globalHooks.deleteManyBefore( { 
                        io: request.io, 
                        body: request.body, 
                        auth: request.auth, 
                        actions: request.actions,
                        user: request.ctx?.user,
                        noCheck: request.noCheck, 
                        table: request.table,
                        query: request.query,
                        ctx: request.ctx
                    } )

                const result = await super.deleteMany( request )

                {% block deleteManyAfter %}{% endblock %}
                if ( globalHooks.deleteManyAfter )
                    await globalHooks.deleteManyAfter( { 
                        io: request.io, 
                        body: request.body, 
                        auth: request.auth, 
                        actions: request.actions,
                        user: request.ctx?.user,
                        noCheck: request.noCheck, 
                        table: request.table,
                        query: request.query,
                        ctx: request.ctx,
                        result
                    } )
                return result
            }
            catch (error) { 
                debug(error)
                return { error } 
            }
        }
    {% endblock %}

    {% block methodCount %}
        async count( request ) {
            try {
                if ( !request.auth )
                    throw('Not Authorized')
                    
                if ( request && !request.table )
                    request.table = defaultCollection

                {% block countBefore %}{% endblock %}
                if ( globalHooks.countBefore )
                    await globalHooks.countBefore( { 
                        io: request.io, 
                        body: request.body, 
                        auth: request.auth, 
                        actions: request.actions,
                        user: request.ctx?.user,
                        noCheck: request.noCheck, 
                        table: request.table,
                        query: request.query,
                        ctx: request.ctx
                    } )

                const result = await super.count( request )

                {% block countAfter %}{% endblock %}
                if ( globalHooks.countAfter )
                    await globalHooks.countAfter( { 
                        io: request.io, 
                        body: request.body, 
                        auth: request.auth, 
                        actions: request.actions,
                        user: request.ctx?.user,
                        noCheck: request.noCheck, 
                        table: request.table,
                        query: request.query,
                        ctx: request.ctx,
                        result
                    } )
                return result
            }
            catch (error) { 
                debug(error)
                return { error } 
            }
        }
    {% endblock %}

}

module.exports = {{ table }};