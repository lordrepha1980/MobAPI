"use strict";
const debug         = require('debug')('app:server:app:system:secret');
const _dirname      = process.cwd();

const crypto        = require('crypto');

module.exports = class Secret {
    
    constructor(  ) {

    }

    async generate () { 
        debug('generate secrets: ');
        let secretTable = {};
        try{
            for( let i = 1; i <= 10; i++ ) {
                const secret = crypto.randomBytes(32).toString('hex');
                secretTable[i] = secret
            }
            console.table(secretTable)
            return secretTable;
        } 
        catch (error) {
            console.error(error);
            return 'Database error: ' + error
        }
    }
}