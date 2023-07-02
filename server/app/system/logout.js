"use strict";
const debug         = require('debug')('app:server:app:system:logout');
const _dirname      = process.cwd();
const prod          = process.env.NODE_ENV !== 'production';
const config        = require(_dirname + '/config');

const Auth = require( _dirname + '/server/app/system/auth.js');
const auth = new Auth()

module.exports = class Logout {
    
    constructor(  ) {

    }

    async logout ( bodyParse ) { 
        config.debug.extend && debug('logout params: ', bodyParse );
        try {
            return { data: true };
        } 
        catch (error) {
            console.error(error);
            return { error };
        }
    }
}