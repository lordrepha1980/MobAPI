"use strict";
const debug         = require('debug')('app:server:app:system:auth');
const bcrypt        = require('bcrypt');
const _dirname      = process.cwd();
const prod          = process.env.NODE_ENV !== 'production';
const config        = require(_dirname + '/config');
const jwt           = require('jsonwebtoken');
const { match } = require( '../../../routes/data' );

const ClassRouter   = require( _dirname + '/server/database/classRouter.js');
const mob           = new ClassRouter();
module.exports = class Rights {
    
    constructor(  ) {

    }
    //schema table:methode
    async check ( bodyParse, bodyMethode ) { 
        const userApi       = await mob.get('data/user')
        const rightsApi     = await mob.get('data/rights')

        config.debug.extend && debug('checkUser params: ', bodyParse );
        try{
            const { data: usr } = await userApi.findOne(
                { table: 'user', auth: true, noCheck: true, query: { _id: bodyParse?.user?._id || null } }
            );

            let rights = [];

            if ( usr?.rights ) {
                for( let right of usr.rights ) {
                    const { data: result } = await rightsApi.findOne(
                        { table: 'rights', noCheck: true, auth: true, query: { group: right } }
                    );

                    rights = rights.concat(result?.permission || []);

                }
            }

            function checkAsterisk ( string ) {         
                let result = string.indexOf('*')
                if ( result > -1 )
                    return true;
            }

            function checkEndsWithAsterisk ( string ) {
                pattern = `${bodyParse.table}:*`   
                result = string.indexOf(pattern)
                if ( result > -1 )
                    return true;
            }

            function checkMethode ( string ) {
                pattern = `${bodyParse.table}:*`   
                result = string.indexOf(pattern)
                if ( result > -1 )
                    return true;
            }

            //check if table allowed    
            const filterResult = rights.filter( (right) => {
                const rightsArr = right.split(':');

                const table         = rightsArr[0];
                const methode       = rightsArr[1];

                let tableStatus   = false;
                let methodeStatus = false;

                // const record        = rightsArr[2];
                // const field         = rightsArr[3];

                if ( table ) {
                    if ( checkAsterisk(table) )
                        return true;

                    if ( table.indexOf(bodyParse.table) > -1 )
                        tableStatus = true;
                }

                if ( methode && tableStatus ) {
                    if ( checkAsterisk(methode) )
                        return true;
    
                    if ( methode.indexOf(bodyMethode) > -1 ) {
                        methodeStatus = true;
                        return true;
                    }
                }

                return false
            } );

            config.debug.extend && debug('check rights result: ', filterResult );
            
            if ( filterResult.length === 0 )
                throw('not enough rights');
            else
                return true;
        } 
        catch (error) {
            return { error };
        }
    }
}