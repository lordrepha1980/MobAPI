"use strict";
const debug         = require('debug')('app:server:app:system:register');
const _dirname      = process.cwd();
const prod          = process.env.NODE_ENV !== 'production';
const config        = require(_dirname + '/config');

const Auth = require( _dirname + '/server/app/system/auth.js');
const auth = new Auth()

module.exports = class Signin {
    
    constructor(  ) {

    }

    async signin ( bodyParse ) { 
        config.debug.extend && debug('signin params: ', bodyParse );
        try {
            const token = await auth.checkUser( bodyParse );
            return token;
        } 
        catch (error) {
            console.error(error);
            return { error };
        }
    }
}