"use strict";
const debug         = require('debug')('app:server:database:MongoDB:default:auth');
const _dirname      = process.cwd();
const prod          = process.env.NODE_ENV !== 'production';

const User = require( _dirname + '/server/database/MongoDB/dataApi/user.js');
const user = new User()

module.exports = class Login {
    
    constructor(  ) {

    }

    async checkUser ( ctx ) { 
        debug('checkUser params: ', ctx );
        try{
            const { data: result } = await user.findOne(
                { table: 'user', auth: true, query: { username: ctx.request.body.username } }
            );
            return result;
        } 
        catch (error) {
            console.error(error);
            return 'Database error: ' + error
        }
    }
}