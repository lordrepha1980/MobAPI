"use strict";
const debug         = require('debug')('app:server:app:system:register');
const bcrypt        = require('bcrypt');
const _dirname      = process.cwd();
const prod          = process.env.NODE_ENV !== 'production';
const config        = require(_dirname + '/config');
const bcryptSalt    = config.bcrypt.saltRounds;
let user            = null

try{
    const User = require( _dirname + '/server/database/MongoDB/dataApi/user.js');
    user = new User()
}
catch(error) {
    if ( config.module.useRegister )
        debug('Please create databasetable "user" or disable "useRegister" in config.js');
}

module.exports = class Register {
    
    constructor(  ) {

    }

    async register ( {body, ctx} ) { 

        config.debug.extend && debug('register params: ', body );
        try {
            if ( !user )
                throw ("User does not exist");

            const {data: userExists} = await user.findOne({ ctx, noCheck: true, query: { username: body.body.username }, auth: true, actions: { register: true, auth: true } });

            if ( userExists )
                throw ("User already exists");

            const hash = await bcrypt.hash( body.body.password, bcryptSalt )
            
            if ( hash )
                body.body.password = hash

            const { data: createdUser } = await user.update({ ctx, body: body.body, noCheck: true, auth: true, actions: { register: true, auth: true } });

            if ( createdUser )
                delete createdUser.password;

            return { data: createdUser };
        } 
        catch (error) {
            console.error(error);
            return { error };
        }
    }
}