"use strict";
const debug         = require('debug')('app:server:app:system:auth');
const bcrypt        = require('bcrypt');
const _dirname      = process.cwd();
const prod          = process.env.NODE_ENV !== 'production';
const config        = require(_dirname + '/config');
const jwt           = require('jsonwebtoken');
let user            = null;
try{
    const User = require( _dirname + '/server/database/MongoDB/dataApi/user.js');
    user = new User()
}
catch(error) {
    debug('Please create databasetable "user"');
}
module.exports = class Login {
    
    constructor(  ) {

    }

    async checkUser ( bodyParse ) { 
        config.debug.extend && debug('checkUser params: ', bodyParse );
        try{
            const { data: result } = await user.findOne(
                { noCheck: true, auth: true, query: { username: bodyParse.body.username }, actions: { login: true } }
            );
            
            if ( !result )
                throw ("User does not exist");

            const compare = await bcrypt.compare( bodyParse.body.password, result.password )

            if ( !compare )
                throw ("Login failed");
            
            let token = null;

            if ( result ) {
                delete result.password
                token = jwt.sign(result, config.auth.secret, config.auth.options);
            }
                
            return token;
        } 
        catch (error) {
            console.error(error);
            return { error };
        }
    }
}