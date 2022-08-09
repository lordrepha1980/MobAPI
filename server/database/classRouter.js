"use strict";
const debug         = require('debug')('app:server:database:classRouter');
const _dirname      = process.cwd();
const fs            = require('fs');
const config        = require(_dirname + '/config.json');

module.exports = class Secret {
    
    constructor(  ) {

    }

    get ( route ) { 
        try{
            const routes = route.split('/')
            
            let path = ''

            if ( routes[0] === 'data' )
                path    = `${_dirname}/server/database/${config.database.type}/dataApi/${routes[1]}.js`;

            if ( routes[0] === 'custom' )
                path    = `${_dirname}/server/database/customApi/${routes[1]}.js`;

            let ClassRouter = null
            if ( path )
                ClassRouter = require(path);

            if ( ClassRouter )
                return new ClassRouter();
            else
                return null;
        } 
        catch (error) {
            console.error(error);
            return 'Database error: ' + error
        }
    }
}